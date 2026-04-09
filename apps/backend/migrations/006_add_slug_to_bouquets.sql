DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name='bouquets' AND column_name='slug') THEN
    ALTER TABLE bouquets ADD COLUMN slug VARCHAR(255) UNIQUE;
    CREATE INDEX idx_bouquets_slug ON bouquets(slug);
  END IF;
END $$;
