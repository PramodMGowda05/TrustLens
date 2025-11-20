import os
import pickle
import numpy as np
import shap
import torch
from transformers import BertTokenizer, BertModel
import pandas as pd
import xgboost as xgb

# --- Configuration ---
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'bin')
BERT_MODEL_PATH = os.path.join(MODEL_DIR, 'bert_finetuned')
XGB_MODEL_PATH = os.path.join(MODEL_DIR, 'xgb_classifier.pkl')
MAX_LEN = 128

# --- Load Models and Tokenizer ---
def load_models():
    """Loads the fine-tuned BERT model, tokenizer, and XGBoost classifier."""
    try:
        tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_PATH)
        # Load the base BERT model for embeddings, not the sequence classification head
        bert_model = BertModel.from_pretrained(BERT_MODEL_PATH)
        
        with open(XGB_MODEL_PATH, 'rb') as f:
            xgb_classifier = pickle.load(f)
            
        return tokenizer, bert_model, xgb_classifier
    except (OSError, FileNotFoundError) as e:
        print(f"Error loading models: {e}")
        print("Please ensure you have run 'train.py' successfully before running this script.")
        exit()

# --- Prediction and Explanation Function ---
def predict_and_explain(text, tokenizer, bert_model, xgb_classifier):
    """
    Generates a prediction and SHAP explanation for a single review text.
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    bert_model.to(device)
    bert_model.eval()

    # 1. Tokenize the input text
    encoded_review = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=MAX_LEN,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )
    input_ids = encoded_review['input_ids'].to(device)
    attention_mask = encoded_review['attention_mask'].to(device)

    # 2. Get BERT embedding
    with torch.no_grad():
        outputs = bert_model(input_ids, attention_mask=attention_mask)
    embedding = outputs.last_hidden_state[:, 0, :].cpu().numpy()

    # 3. Get XGBoost prediction
    prediction = xgb_classifier.predict(embedding)
    prediction_proba = xgb_classifier.predict_proba(embedding)

    print(f"Review Text: '{text}'")
    print(f"Predicted Class: {'Genuine (1)' if prediction[0] == 1 else 'Fake (0)'}")
    print(f"Prediction Probabilities: [Fake: {prediction_proba[0][0]:.4f}, Genuine: {prediction_proba[0][1]:.4f}]")

    # 4. Generate SHAP Explanation
    print("\nGenerating SHAP explanation...")
    
    # SHAP needs a function that it can pass a numpy array to.
    # This function will convert token IDs back to embeddings and then predict.
    def f(x):
        # x is a matrix of token ids (num_samples, max_len)
        embeddings_list = []
        for row in x:
            # SHAP might pass string representations, so we clean them
            tokens = [int(i) for i in row if str(i) != '<pad>'] 
            input_ids = torch.tensor([tokens]).to(device)
            
            with torch.no_grad():
                outputs = bert_model(input_ids)
            # Use the [CLS] token embedding
            emb = outputs.last_hidden_state[:, 0, :].cpu().numpy()
            embeddings_list.append(emb)

        embeddings_matrix = np.vstack(embeddings_list)
        return xgb_classifier.predict_proba(embeddings_matrix)[:, 1] # Probability of 'Genuine'

    # Create the SHAP explainer
    explainer = shap.Explainer(f, tokenizer)

    # Tokenize the input and prepare for SHAP
    shap_input_tokens = tokenizer.convert_ids_to_tokens(input_ids[0])
    # The explainer expects the raw tokens (strings)
    shap_values = explainer([text])
    
    # Associate SHAP values with tokens
    # shap_values.data[0] contains the tokens used by SHAP
    # shap_values.values[0] contains the corresponding SHAP values
    
    print("\nSHAP Values (contribution of each token to the 'Genuine' prediction):")
    # Clean up tokens for display
    tokens = [t.replace('##', '') for t in shap_values.data[0]]
    values = shap_values.values[0]
    
    token_shap_pairs = sorted(list(zip(tokens, values)), key=lambda x: x[1], reverse=True)
    
    print("\nTop 5 tokens increasing 'Genuine' score:")
    for token, value in token_shap_pairs[:5]:
        if token not in ['[CLS]', '[SEP]', '[PAD]']:
            print(f"  - '{token}': {value:.4f}")

    print("\nTop 5 tokens decreasing 'Genuine' score (increasing 'Fake' score):")
    for token, value in token_shap_pairs[-5:]:
         if token not in ['[CLS]', '[SEP]', '[PAD]']:
            print(f"  - '{token}': {value:.4f}")

    # To generate a force plot, you would typically use this in a Jupyter notebook:
    # shap.force_plot(explainer.expected_value, shap_values[0,:], X.iloc[0,:])
    # For a script, we print the values instead.
    print("\n--- Explanation Finished ---")


if __name__ == "__main__":
    print("--- Starting SHAP Explanation Demo ---")
    tokenizer, bert_model, xgb_classifier = load_models()
    
    # Example reviews to test
    fake_review = "This product is an absolute scam, never buy from this company. The worst experience of my life and I want a refund now! Total garbage."
    genuine_review = "I've been using this laptop for about a month for my software development work. The keyboard is comfortable for long coding sessions and the screen resolution is crisp. Battery life is decent, lasts a full workday."

    print("\n--- Explaining a likely FAKE review ---")
    predict_and_explain(fake_review, tokenizer, bert_model, xgb_classifier)
    
    print("\n\n--- Explaining a likely GENUINE review ---")
    predict_and_explain(genuine_review, tokenizer, bert_model, xgb_classifier)
