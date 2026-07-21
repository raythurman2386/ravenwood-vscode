-- SQL sample — comprehensive feature coverage.
-- Highlights: keywords (red), functions (yellow), strings (green),
-- types/tables/columns (aqua), variables (blue).

CREATE TABLE users (
    id          INTEGER PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role        VARCHAR(50) DEFAULT 'user'
);

ALTER TABLE users ADD COLUMN last_login TIMESTAMP;

DROP TABLE old_users;

CREATE INDEX idx_users_email ON users(email);

INSERT INTO users (name, email, role) VALUES ('Alice', 'alice@example.com', 'admin');

SELECT
    u.id,
    u.name,
    u.email,
    COUNT(r.id) AS role_count,
    AVG(u.id) AS avg_id
FROM users AS u
LEFT JOIN user_roles AS r ON u.id = r.user_id
WHERE u.role = 'admin'
    AND u.created_at > '2020-01-01'
GROUP BY u.id
HAVING COUNT(r.id) > 0
ORDER BY u.name ASC;

DECLARE @user_id INT = 1;
SELECT @user_id;