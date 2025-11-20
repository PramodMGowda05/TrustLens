# TrustLens AI - Local Setup Instructions

This guide provides step-by-step instructions to set up and run the TrustLens AI platform on a local machine (tested on Windows).

## Prerequisites

Before you begin, ensure you have the following installed:
1.  **Node.js**: Version 18.x or later.
2.  **npm** or **yarn**: Package manager for Node.js.
3.  **MySQL Server**: A local MySQL instance. You can use tools like XAMPP, WAMP, or Docker.
4.  **Firebase Account**: A Google Firebase project is required for authentication.

---

## 1. Install Dependencies

Clone the repository and navigate into the project directory. Then, install the required npm packages.

```bash
git clone <repository_url>
cd trustlens-ai
npm install
```

---

## 2. Firebase Configuration

The application uses Firebase for authentication.

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

---

## 3. MySQL Database Setup

1.  **Start MySQL Server**:
    - Ensure your local MySQL server is running.

2.  **Create a Database**:
    - Using a MySQL client (like MySQL Workbench, phpMyAdmin, or command line), create a new database.
    - `CREATE DATABASE trustlens_db;`

3.  **Run Migrations**:
    - The `schema.sql` file in the project root contains the table definitions.
    - Import or execute the contents of `schema.sql` into your `trustlens_db` database to create the necessary tables.

4.  **Configure Database Connection**:
    - Add your MySQL connection details to the `.env.local` file. The application's database library (not included in this scaffold) would use these variables.

    ```.env.local
    DB_HOST="localhost"
    DB_PORT="3306"
    DB_USER="your_mysql_user"
    DB_PASSWORD="your_mysql_password"
    DB_NAME="trustlens_db"
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
    - The login page is the entry point. For this scaffold, a default user is provided.
    - Click the "Sign in" button to navigate to the dashboard at `/dashboard`.

2.  **Review Analysis**:
    - On the dashboard, you can use the main panel to analyze a review.
    - Enter any text, select options from the dropdowns, and click "Analyze Review".
    - You will see a loading state, followed by the analysis results powered by Google Genkit AI.

3.  **Admin and User Roles**:
    - The scaffold currently simulates a logged-in user. To test admin functionality, you would typically need to set up Firebase custom claims.
    - For now, you can navigate directly to admin pages like `/admin/dashboard` to see the placeholder UI. In a real setup, these routes would be protected.

---

## 6. Running ML Demo Scripts (Optional)

The ML models in the `/models/demo` directory are not used for live predictions but can be trained for demonstration.

1.  **Setup Python Environment**:
    - Ensure you have Python installed.
    - Create a virtual environment and install dependencies from a `requirements.txt` file (you would need to create this file based on the scripts' imports like `torch`, `xgboost`, `shap`, `pandas`, `scikit-learn`).

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r models/demo/requirements.txt
    ```

2.  **Run Scripts**:
    - You can then run the training and explanation scripts.

    ```bash
    python models/demo/train.py
    ```

---

## Troubleshooting

-   **Firebase Errors**: Double-check that your `.env.local` file has the correct `NEXT_PUBLIC_` prefixes and that the values match your Firebase project's web config.
-   **Database Errors**: Ensure your MySQL server is running and that the database name and credentials in `.env.local` are correct.
-   **Genkit Errors**: This scaffold uses Genkit flows that are already implemented. If you encounter issues, ensure you are connected to the internet, as it makes calls to Google AI services.
