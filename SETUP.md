# TrustLens AI - Local Setup Instructions

This guide provides step-by-step instructions to set up and run the TrustLens AI platform on a local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
1.  **Node.js**: Version 18.x or later.
2.  **npm**: Package manager for Node.js.
3.  **Python**: Version 3.8 or later (for optional ML model training).
4.  **Firebase Account**: A Google Firebase project is required for authentication (though the scaffold runs without it).

---

## 1. Install Project Dependencies

Clone the repository and navigate into the project directory. Then, install the required npm packages.

```bash
git clone <repository_url>
cd trustlens-ai
npm install
```

---

## 2. Firebase Configuration (Optional but Recommended)

The application is scaffolded to use Firebase for authentication. While the UI is currently mocked, you can connect it to a real Firebase backend.

1.  **Create a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the steps to create a new project.

2.  **Enable Authentication**:
    - In your Firebase project, go to the **Authentication** section.
    - Click "Get started".
    - Under the "Sign-in method" tab, enable **Email/Password** and **Google**.

3.  **Get Firebase Config**:
    - In your project's settings (`Project settings` > `General` tab), scroll down to "Your apps".
    - Click the web icon (`</>`) to register a new web app.
    - Give it a nickname (e.g., "TrustLens Web") and click "Register app".
    - Firebase will provide you with a `firebaseConfig` object.

4.  **Create Environment File**:
    - In the root of the project, create a file named `.env.local`.
    - Add your Firebase configuration keys to this file. The keys must be prefixed with `NEXT_PUBLIC_`.

    ```.env.local
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

5.  **Set up Genkit AI**:
    - The project uses Genkit for AI-powered analysis. You need to provide a Google AI API key.
    - See the section below on how to generate a key.
    - Add the key to your `.env.local` file.

    ```.env.local
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

---

## 3. How to Generate a New Google AI API Key

If you're facing API errors or need to refresh your credentials, follow these steps to get a new key.

1.  **Navigate to Google AI Studio**:
    - Open your web browser and go to [https://aistudio.google.com/](https://aistudio.google.com/).

2.  **Sign In**:
    - Sign in with your Google account if you haven't already.

3.  **Access the API Key Page**:
    - On the left-hand sidebar, click on **"Get API key"**.

4.  **Create a New API Key**:
    - On the API keys page, click the **"Create API key in new project"** button. This will instantly generate a new key for you.
    - A dialog will appear displaying your new API key.

5.  **Copy and Secure Your Key**:
    - Click the copy icon next to the key to copy it to your clipboard.
    - **Important**: Treat this key like a password. Do not share it publicly or commit it to version control.

6.  **Update Your Environment File**:
    - Open the `.env.local` file in your project's root directory.
    - Replace the old key with the new one you just copied:

    ```.env.local
    GEMINI_API_KEY="YOUR_NEWLY_GENERATED_API_KEY"
    ```

7.  **Restart Your Application**:
    - **This is a critical step.** Stop your development server (Ctrl+C in the terminal).
    - The server does not automatically detect changes to `.env.local`. You must restart it to load the new API key.
    - Restart the server:

    ```bash
    npm run dev
    ```
---

## 4. Running the Application

Once the configuration is complete, you can start the development server.

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

---

## 5. Testing the Application

1.  **Login**:
    - The login page is the entry point. The scaffold uses mocked user data, so you can click the "Sign in" button directly to navigate to the dashboard at `/dashboard`.

2.  **Review Analysis**:
    - On the dashboard, use the main panel to analyze a review.
    - Enter any text, select options from the dropdowns, and click "Analyze Review".
    - You will see a loading state, followed by the analysis results powered by Google Genkit AI.

3.  **Admin and User Roles**:
    - The scaffold simulates a logged-in user with an 'admin' role by default. This gives you access to the Admin section in the sidebar.
    - You can navigate to admin pages like `/admin/dashboard` to see the UI. In a real setup, these routes would be protected based on user roles (e.g., Firebase Custom Claims).

---

## 6. Running ML Demo Scripts (Optional)

The ML models in the `/models/demo` directory are for demonstration purposes only and are **not** used for live predictions in the app. They showcase a potential training pipeline.

1.  **Setup Python Environment**:
    - Ensure you have Python installed (3.8+ recommended).
    - Navigate to the `models/demo` directory.
    - Create a virtual environment and install the required Python packages.

    ```bash
    # From the project root
    cd models/demo

    # Create a virtual environment
    python -m venv venv

    # Activate the environment
    # On Windows:
    # venv\Scripts\activate
    # On macOS/Linux:
    # source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt
    ```

2.  **Download Dataset (Manual Step)**:
    - These scripts assume you have the "Amazon Polarity" dataset.
    - Download it from [Kaggle](https://www.kaggle.com/datasets/bittlingmayer/amazonreviews) or another source. It typically includes `train.csv` and `test.csv`.
    - Place the `train.csv` and `test.csv` files inside the `models/demo/data/` directory (you may need to create the `data` folder).

3.  **Run Scripts**:
    - You can now run the training and explanation scripts. The training script will save model artifacts into the `models/demo/bin/` directory.

    ```bash
    # Run the training pipeline
    python train.py

    # Run the explanation script (after training is complete)
    python explain.py
    ```

---

## Troubleshooting

-   **Firebase Errors**: Double-check that your `.env.local` file has the correct `NEXT_PUBLIC_` prefixes and that the values match your Firebase project's web config.
-   **Genkit Errors**: Ensure your `GEMINI_API_KEY` is correct, you have an active internet connection, and you have restarted the dev server after changing the key.
-   **Python/ML Errors**: Make sure your Python virtual environment is activated and that you've placed the dataset files in the correct `models/demo/data/` directory.
