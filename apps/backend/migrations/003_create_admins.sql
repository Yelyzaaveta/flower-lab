CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin'
);

-- Default admin: admin@flowerstore.com / admin123
-- Password hash generated with bcryptjs (10 rounds)
INSERT INTO admins (email, password, role)
VALUES ('admin@flowerstore.com', '$2a$10$FHLyH8K.Flocv7urtGfS9eBlpR66w2cK9lcxc6wmZOHZFE1iZdppu', 'admin')
ON CONFLICT (email) DO NOTHING;
