CREATE TABLE IF NOT EXISTS bouquets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  "imgUrl" TEXT,
  "shortDescription" TEXT,
  "longDescription" TEXT,
  categories TEXT[] DEFAULT '{}',
  price INTEGER NOT NULL,
  "flowersAmount" INTEGER DEFAULT 0,
  "buyAmount" INTEGER DEFAULT 0,
  "creationDate" TIMESTAMPTZ DEFAULT NOW(),
  "updationDate" TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bouquets_categories ON bouquets USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_bouquets_price ON bouquets(price);
CREATE INDEX IF NOT EXISTS idx_bouquets_updation_id ON bouquets("updationDate" DESC, id DESC);
