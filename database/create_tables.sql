CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    subcategory VARCHAR(255),
    seller_name VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE order_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT,
    order_id BIGINT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
