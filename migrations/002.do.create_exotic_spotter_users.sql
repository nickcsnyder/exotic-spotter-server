CREATE TABLE exotic_spotter_users (
id SERIAL PRIMARY KEY,
user_name TEXT NOT NULL,
full_name TEXT NOT NULL,
password TEXT NOT NULL,
date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);