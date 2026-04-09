DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name='categories' AND column_name='slug') THEN
    ALTER TABLE categories ADD COLUMN slug VARCHAR(255) UNIQUE;
    CREATE INDEX idx_categories_slug ON categories(slug);
  END IF;
END $$;
