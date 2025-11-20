# Dummy ML Models

The models and scripts in this directory are for demonstration purposes only. They showcase a potential training pipeline for a fake review detection system using BERT, XGBoost, and SHAP.

**These models are NOT used for live inference in the production application.**

The actual review analysis is handled by the Google Genkit AI engine, which is called via the Next.js backend. This setup is designed to simulate a complex MLOps environment while leveraging a powerful, managed AI service for the core logic.

## Contents

- `train.py`: A script for fine-tuning a BERT model and training an XGBoost classifier on a review dataset.
- `explain.py`: A script demonstrating how to generate SHAP explanations for model predictions.
- `evaluation.py`: Scripts to evaluate model performance, including accuracy, F1-score, and generating confusion matrices or ROC curves.
