CREATE TABLE participants (
    participants_id SERIAL PRIMARY KEY,
    participants_name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(16) NOT NULL,
    points BIGINT
)