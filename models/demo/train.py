import os
import numpy as np
import pandas as pd
import torch
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_linear_schedule_with_warmup
from torch.utils.data import DataLoader, TensorDataset, random_split
from tqdm import tqdm
import pickle

# --- Configuration ---
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'bin')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
BERT_MODEL_NAME = 'bert-base-uncased'
MAX_LEN = 128
BATCH_SIZE = 16
EPOCHS = 1  # For demonstration; use 3-4 for real training
LEARNING_RATE = 2e-5
NUM_SAMPLES = 20000 # Using a subset for faster demo training

# Ensure output directories exist
os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)


# --- Helper Functions ---
def load_data(path, num_samples):
    """Loads a subset of the Amazon review data."""
    try:
        df = pd.read_csv(path, header=None, names=['label', 'title', 'text'])
        # Amazon Polarity dataset: 1 is negative, 2 is positive. We map it to 0 and 1.
        df['label'] = df['label'].apply(lambda x: 0 if x == 1 else 1)
        df['review'] = df['title'].fillna('') + ' ' + df['text'].fillna('')
        return df[['review', 'label']].sample(n=num_samples, random_state=42)
    except FileNotFoundError:
        print(f"Error: Dataset not found at {path}")
        print("Please download the Amazon Polarity dataset from Kaggle and place 'train.csv' in the 'models/demo/data/' directory.")
        exit()


def tokenize_data(df, tokenizer):
    """Tokenizes text data for BERT."""
    input_ids = []
    attention_masks = []

    for review in tqdm(df['review'].values, desc="Tokenizing"):
        encoded_dict = tokenizer.encode_plus(
            review,
            add_special_tokens=True,
            max_length=MAX_LEN,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )
        input_ids.append(encoded_dict['input_ids'])
        attention_masks.append(encoded_dict['attention_mask'])

    return torch.cat(input_ids, dim=0), torch.cat(attention_masks, dim=0)


def train_bert(model, dataloader, optimizer, scheduler, device):
    """Fine-tuning loop for BERT."""
    model.train()
    total_loss = 0
    for batch in tqdm(dataloader, desc="Training BERT"):
        b_input_ids, b_attention_mask, b_labels = [b.to(device) for b in batch]
        model.zero_grad()
        outputs = model(b_input_ids, token_type_ids=None, attention_mask=b_attention_mask, labels=b_labels)
        loss = outputs.loss
        total_loss += loss.item()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        scheduler.step()
    return total_loss / len(dataloader)


def get_bert_embeddings(model, dataloader, device):
    """Extracts [CLS] token embeddings from BERT."""
    model.eval()
    embeddings = []
    labels = []
    for batch in tqdm(dataloader, desc="Extracting BERT Embeddings"):
        b_input_ids, b_attention_mask, b_labels = [b.to(device) for b in batch]
        with torch.no_grad():
            outputs = model(b_input_ids, token_type_ids=None, attention_mask=b_attention_mask)
        # Get the hidden state of the [CLS] token
        cls_embeddings = outputs[0][:, 0, :].cpu().numpy()
        embeddings.append(cls_embeddings)
        labels.append(b_labels.cpu().numpy())
    return np.concatenate(embeddings), np.concatenate(labels)


# --- Main Training Pipeline ---
if __name__ == "__main__":
    print("--- Starting Dummy ML Model Training Pipeline ---")

    # 1. Load and Preprocess Data
    print(f"\n[1/5] Loading data... (using {NUM_SAMPLES} samples)")
    df = load_data(os.path.join(DATA_DIR, 'train.csv'), num_samples=NUM_SAMPLES)
    labels = torch.tensor(df['label'].values)

    # 2. Tokenize Data for BERT
    print("\n[2/5] Tokenizing data for BERT...")
    tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_NAME)
    input_ids, attention_masks = tokenize_data(df, tokenizer)

    # 3. Fine-Tune BERT Model
    print("\n[3/5] Fine-tuning BERT model...")
    dataset = TensorDataset(input_ids, attention_masks, labels)
    train_size = int(0.9 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

    train_dataloader = DataLoader(train_dataset, sampler=torch.utils.data.RandomSampler(train_dataset), batch_size=BATCH_SIZE)
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    bert_model = BertForSequenceClassification.from_pretrained(BERT_MODEL_NAME, num_labels=2)
    bert_model.to(device)

    optimizer = AdamW(bert_model.parameters(), lr=LEARNING_RATE, eps=1e-8)
    total_steps = len(train_dataloader) * EPOCHS
    scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)

    for epoch in range(EPOCHS):
        print(f"  Epoch {epoch + 1}/{EPOCHS}")
        avg_train_loss = train_bert(bert_model, train_dataloader, optimizer, scheduler, device)
        print(f"  Average training loss: {avg_train_loss:.2f}")

    print("BERT fine-tuning complete.")
    
    # Save the fine-tuned BERT model (its sequence classification head)
    bert_model_path = os.path.join(MODEL_DIR, 'bert_finetuned')
    bert_model.save_pretrained(bert_model_path)
    tokenizer.save_pretrained(bert_model_path)
    print(f"Fine-tuned BERT model saved to {bert_model_path}")

    # 4. Extract Embeddings for XGBoost
    print("\n[4/5] Extracting embeddings from BERT to train XGBoost...")
    # Use the full dataset for embedding extraction
    full_dataloader = DataLoader(dataset, sampler=None, batch_size=BATCH_SIZE)
    # We need the base model without the classification head to get hidden states
    bert_embedding_model = bert_model.bert.to(device)
    embeddings, emb_labels = get_bert_embeddings(bert_embedding_model, full_dataloader, device)

    X_train, X_test, y_train, y_test = train_test_split(embeddings, emb_labels, test_size=0.2, random_state=42)

    # 5. Train XGBoost Classifier
    print("\n[5/5] Training XGBoost classifier...")
    xgb_classifier = xgb.XGBClassifier(
        objective='binary:logistic',
        eval_metric='logloss',
        use_label_encoder=False,
        n_estimators=200,
        learning_rate=0.1,
        max_depth=6,
        random_state=42
    )

    xgb_classifier.fit(X_train, y_train)
    print("XGBoost training complete.")

    # Evaluate XGBoost
    y_pred = xgb_classifier.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    print(f"--- Evaluation ---")
    print(f"XGBoost Accuracy on hold-out set: {accuracy * 100:.2f}%")
    print(f"XGBoost F1-Score on hold-out set: {f1:.3f}")
    if accuracy > 0.85:
        print("Successfully achieved accuracy > 85%!")
    else:
        print("Did not meet accuracy target of 85%. Consider training on more data or for more epochs.")

    # Save the XGBoost model
    xgb_model_path = os.path.join(MODEL_DIR, 'xgb_classifier.pkl')
    with open(xgb_model_path, 'wb') as f:
        pickle.dump(xgb_classifier, f)
    print(f"XGBoost model saved to {xgb_model_path}")

    print("\n--- Training Pipeline Finished ---")
