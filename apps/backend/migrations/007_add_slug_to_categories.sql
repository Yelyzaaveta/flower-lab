ALTER TABLE categories
ADD COLUMN slug VARCHAR(255) UNIQUE;

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
