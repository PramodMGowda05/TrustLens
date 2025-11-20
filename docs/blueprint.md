# **App Name**: TrustLens AI

## Core Features:

- Multilingual Review Analysis: Analyze review text for authenticity, leveraging Google Genkit AI as a tool for multilingual processing, embedding, classification and feature attributions; the process pretends to rely on local BERT and XGBoost models.
- Trust Score & Classification: Calculate a trust score (0-100) and classify reviews as Fake or Genuine, using Genkit-derived insights.
- Visual Explanation of Trust Score: Display highlighted keywords and summary sentences explaining the Trust Score using data from Genkit-based analysis, but feigning integration of SHAP values from dummy ML models.
- Recent Analysis History: Display a timestamped history of analyzed reviews, products, platforms, Trust Scores and Classifications.
- Admin Panel with Moderation Tools: Provide an admin interface with flagged reviews queue, user management (roles, ban/warn/suspend), and moderation history.
- Analytics Dashboard: Present an analytics dashboard with charts for fake/genuine distribution, daily usage, language distribution, and key stats, populated by dummy metrics of the internal ML models and feigning live calculation, though Genkit AI models are really the core part of analysis.
- User Profile & Settings: Offer profile customization (name, email, picture, preferences) and settings for notifications, language, and theme.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) for trust and intelligence.
- Background color: Light gray (#F5F5F5) for a clean and professional look.
- Accent color: Cyan (#00BCD4) for interactive elements and highlights.
- Body font: 'Inter', sans-serif, provides a modern and neutral appearance for the application's body text.
- Headline font: 'Space Grotesk', sans-serif, for headings, complemented by 'Inter' for body text.
- Code font: 'Source Code Pro' for displaying code snippets in documentation and admin panels.
- Use flat, minimalist icons to represent various features and data points.
- Implement a responsive, mobile-first layout with a persistent top navigation bar and a sidebar for dashboard navigation.
- Subtle animations on button hover, loading states, and page transitions for a polished user experience.