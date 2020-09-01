CREATE TABLE exotic_spotter_content (
    id SERIAL PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    location TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    user_id INTEGER 
        REFERENCES exotic_spotter_content(id) ON DELETE CASCADE NOT NULL
);