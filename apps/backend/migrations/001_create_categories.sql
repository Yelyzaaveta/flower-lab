CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  "prewiewImgUrl" TEXT,
  "creationDate" TIMESTAMPTZ DEFAULT NOW(),
  "updationDate" TIMESTAMPTZ DEFAULT NOW()
);
