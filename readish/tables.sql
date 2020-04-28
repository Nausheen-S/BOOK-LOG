CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
  name TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS books(
	id SERIAL PRIMARY KEY,
  name TEXT,
  author TEXT,
  genre TEXT,
  about TEXT
);

CREATE TABLE IF NOT EXISTS readinglist(
	id SERIAL PRIMARY KEY,
  user_id INTEGER,
  book_id INTEGER,
  completed BOOLEAN DEFAULT false
);