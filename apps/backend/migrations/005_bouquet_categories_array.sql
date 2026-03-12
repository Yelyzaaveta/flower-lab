ALTER TABLE bouquets ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}';

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bouquets' AND column_name = 'category'
  ) THEN
    UPDATE bouquets
    SET categories = ARRAY[category]
    WHERE category IS NOT NULL AND category != '';

    ALTER TABLE bouquets DROP COLUMN category;
  END IF;
END $$;

DROP INDEX IF EXISTS idx_bouquets_category;

CREATE INDEX IF NOT EXISTS idx_bouquets_categories ON bouquets USING GIN(categories);
