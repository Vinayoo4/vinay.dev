-- Seed initial brands
INSERT INTO brands (code, name, brand_type) VALUES ('triu', 'TRIU', 'ecommerce') ON CONFLICT DO NOTHING;
INSERT INTO brands (code, name, brand_type) VALUES ('shri-nandi', 'Shri Nandi', 'services') ON CONFLICT DO NOTHING;
