-- Enable RLS for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_brand_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;


-- Basic Policies

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Brands
CREATE POLICY "Brands are viewable by everyone."
  ON brands FOR SELECT
  USING ( true );

-- User Brand Memberships
CREATE POLICY "Users can view their own memberships."
  ON user_brand_memberships FOR SELECT
  USING ( auth.uid() = user_id );

-- App Access
CREATE POLICY "Users can view their own app access."
  ON app_access FOR SELECT
  USING ( auth.uid() = user_id );

-- Cart Items
CREATE POLICY "Users can view their own cart."
  ON cart_items FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert into their own cart."
  ON cart_items FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own cart."
  ON cart_items FOR UPDATE
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can delete from their own cart."
  ON cart_items FOR DELETE
  USING ( auth.uid() = user_id );

-- Orders
CREATE POLICY "Users can view their own orders."
  ON orders FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own orders."
  ON orders FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- Products and Services (Publicly readable)
CREATE POLICY "Products are viewable by everyone."
  ON products FOR SELECT
  USING ( true );

CREATE POLICY "Product images are viewable by everyone."
  ON product_images FOR SELECT
  USING ( true );

CREATE POLICY "Services are viewable by everyone."
  ON services FOR SELECT
  USING ( true );

-- Leads (Authenticated users can create leads, or anonymous via service key)
CREATE POLICY "Anyone can create leads."
  ON leads FOR INSERT
  WITH CHECK ( true );

CREATE POLICY "Users can view their own consultation bookings."
  ON consultation_bookings FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own consultation bookings."
  ON consultation_bookings FOR INSERT
  WITH CHECK ( auth.uid() = user_id );
