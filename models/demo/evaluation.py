import os
import pickle
import numpy as np
import pandas as pd
import torch
import xgboost as xgb
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix, roc_auc_score, classification_report
from transformers import BertTokenizer, BertModel
from torch.utils.data import DataLoader, TensorDataset
from tqdm import tqdm
import matplotlib.pyplot as plt
import seaborn as sns

# --- Configuration ---
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'bin')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
BERT_MODEL_PATH = os.path.join(MODEL_DIR, 'bert_finetuned')
XGB_MODEL_PATH = os.path.join(MODEL_DIR, 'xgb_classifier.pkl')
MAX_LEN = 128
BATCH_SIZE = 32
NUM_SAMPLES = 5000  # Number of samples from the test set to evaluate

# --- Load Models and Data ---
def load_dependencies():
    """Loads models, tokenizer, and test data."""
    print("Loading models and tokenizer...")
    try:
        tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_PATH)
        bert_model = BertModel.from_pretrained(BERT_MODEL_PATH)
        with open(XGB_MODEL_PATH, 'rb') as f:
            xgb_classifier = pickle.load(f)
    except (OSError, FileNotFoundError) as e:
        print(f"Error loading models: {e}")
        print("Please ensure 'train.py' has been run successfully.")
        exit()

    print("Loading test data...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'test.csv'), header=None, names=['label', 'title', 'text'])
        df['label'] = df['label'].apply(lambda x: 0 if x == 1 else 1)
        df['review'] = df['title'].fillna('') + ' ' + df['text'].fillna('')
        df_sample = df.sample(n=NUM_SAMPLES, random_state=1)
    except FileNotFoundError:
        print(f"Error: test.csv not found in {DATA_DIR}")
        print("Please download the Amazon Polarity dataset and place 'test.csv' in the 'models/demo/data/' directory.")
        exit()
        
    return tokenizer, bert_model, xgb_classifier, df_sample

def get_bert_embeddings(model, tokenizer, texts, device):
    """Extracts [CLS] token embeddings for a list of texts."""
    model.eval()
    model.to(device)
    embeddings = []

    for text in tqdm(texts, desc="Generating Embeddings"):
        encoded = tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=MAX_LEN,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        input_ids = encoded['input_ids'].to(device)
        attention_mask = encoded['attention_mask'].to(device)
        
        with torch.no_grad():
            outputs = model(input_ids, attention_mask=attention_mask)
        cls_embedding = outputs.last_hidden_state[:, 0, :].cpu().numpy()
        embeddings.append(cls_embedding)

    return np.concatenate(embeddings)

def plot_confusion_matrix(cm, class_names, filename='confusion_matrix.png'):
    """Plots and saves a confusion matrix."""
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.title('Confusion Matrix')
    output_path = os.path.join(MODEL_DIR, filename)
    plt.savefig(output_path)
    print(f"Confusion matrix saved to {output_path}")

# --- Main Evaluation ---
if __name__ == "__main__":
    print("--- Starting Model Evaluation ---")
    tokenizer, bert_model, xgb_classifier, df_test = load_dependencies()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # 1. Get embeddings for the test set
    test_texts = df_test['review'].tolist()
    y_true = df_test['label'].values
    test_embeddings = get_bert_embeddings(bert_model, tokenizer, test_texts, device)

    # 2. Make predictions with XGBoost
    print("Making predictions with XGBoost classifier...")
    y_pred = xgb_classifier.predict(test_embeddings)
    y_pred_proba = xgb_classifier.predict_proba(test_embeddings)[:, 1]

    # 3. Calculate and print metrics
    print("\n--- Performance Metrics ---")
    accuracy = accuracy_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred)
    roc_auc = roc_auc_score(y_true, y_pred_proba)

    print(f"Accuracy: {accuracy:.4f}")
    print(f"F1-Score: {f1:.4f}")
    print(f"ROC AUC Score: {roc_auc:.4f}")
    
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, target_names=['Fake', 'Genuine']))

    # 4. Generate and save confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    plot_confusion_matrix(cm, class_names=['Fake', 'Genuine'])

    print("\n--- Evaluation Finished ---")
