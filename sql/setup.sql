DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    profile_photo_url TEXT NOT NULL
    
);

-- CREATE TABLE posts (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     user_id BIGINT REFERNCES users(id),
--     photo_url TEXT NOT NULL,
--     caption TEXT NOT NULL,
--     tags TEXT[]
-- );