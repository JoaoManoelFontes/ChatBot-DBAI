CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    city_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO subscriptions (name, email, city_name) VALUES
    ('Alice Johnson', 'alice@example.com', 'New York'),
    ('Bob Smith', 'bob@example.com', 'London'),
    ('Charlie Brown', 'charlie@example.com', 'New York'),
    ('Dave Johnson', 'dave@example.com', 'New York'),
    ('Eve Smith', 'eve@example.com', 'London'),
    ('Frank Brown', 'frank@example.com', 'New York'),
    ('Grace Johnson', 'grace@example.com', 'New York')
ON CONFLICT (email) DO NOTHING;
