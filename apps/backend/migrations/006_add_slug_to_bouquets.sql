ALTER TABLE bouquets
ADD COLUMN slug VARCHAR(255) UNIQUE;

CREATE INDEX IF NOT EXISTS idx_bouquets_slug ON bouquets(slug);
