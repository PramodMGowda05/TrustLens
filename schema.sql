-- TrustLens AI MySQL Schema

-- Users table to store user information and roles
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY, -- Firebase UID
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    photo_url VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Reviews table to store submitted reviews for analysis
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    language VARCHAR(50) NOT NULL,
    review_text TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Predictions table to store the analysis results
CREATE TABLE predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    trust_score INT NOT NULL,
    classification ENUM('Fake', 'Genuine') NOT NULL,
    explanation_keywords TEXT,
    explanation_summary TEXT,
    confidence_breakdown TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- Moderation logs for admin actions
CREATE TABLE moderation_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id VARCHAR(255) NOT NULL,
    review_id INT,
    target_user_id VARCHAR(255),
    action ENUM('approve_review', 'reject_review', 'mark_suspicious', 'ban_user', 'warn_user', 'suspend_user') NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id),
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    FOREIGN KEY (target_user_id) REFERENCES users(id)
);

-- User actions for general activity logging
CREATE TABLE user_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    action_type VARCHAR(255) NOT NULL, -- e.g., 'login', 'submit_review', 'view_analytics'
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Support tickets for the customer support page
CREATE TABLE support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Add indexes for performance
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_predictions_review_id ON predictions(review_id);
CREATE INDEX idx_moderation_logs_admin_id ON moderation_logs(admin_id);
CREATE INDEX idx_user_actions_user_id ON user_actions(user_id);
