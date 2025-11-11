CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  seller_name VARCHAR(255),
  price NUMERIC(12,2) NOT NULL,
  quantity INTEGER NOT NULL
);

-- Test Data
INSERT INTO product (name, description, category, subcategory, seller_name, price, quantity) VALUES
('Telefon X', 'Telefon performant', 'Electronics', 'Mobile', 'Magazin A', 1999.99, 10),
('Casti Y', 'Casti wireless', 'Electronics', 'Audio', 'Magazin B', 299.50, 25),
('Canapea Z', 'Canapea 3 locuri', 'Home', 'Furniture', 'Mobila SRL', 1250.00, 5);
