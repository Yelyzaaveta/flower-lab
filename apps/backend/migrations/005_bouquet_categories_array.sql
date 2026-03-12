ALTER TABLE bouquets ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}';

UPDATE bouquets
SET categories = ARRAY[category]
WHERE category IS NOT NULL AND category != '';

ALTER TABLE bouquets DROP COLUMN IF EXISTS category;

DROP INDEX IF EXISTS idx_bouquets_category;

CREATE INDEX IF NOT EXISTS idx_bouquets_categories ON bouquets USING GIN(categories);
