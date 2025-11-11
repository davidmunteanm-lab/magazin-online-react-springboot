🛒 Magazin Online - Aplicație Fullstack
Descriere

Această aplicație este un magazin online construit cu React (frontend) și Spring Boot (backend) folosind o bază de date relațională (MySQL).
Permite vizualizarea produselor, filtrarea după nume și preț, adăugarea produselor noi și gestionarea coșului de cumpărături.

Structura proiectului

backend/ - cod Spring Boot (Java)

frontend/ - cod React

database/create_tables.sql - script SQL pentru crearea tabelelor

Funcționalități
Overview produse

Listare produse într-un tabel (sau carduri)

Filtrare după nume sau interval de preț

New Product

Formular pentru adăugarea unui produs nou

Coș de cumpărături

Adăugare, modificare cantitate, ștergere produse

Checkout și plasare comenzi

Endpoint-uri Backend

GET /api/products – listare produse (opțional cu filtre: ?name=... sau ?minPrice=...&maxPrice=...)

POST /api/products – adăugare produs nou

POST /api/orders – plasare comanda

Structura bazei de date

product (id, name, description, category, subcategory, sellerName, price, quantity)

orders (id)

order_item (id, product_id, name, price, quantity, order_id)

Tehnologii folosite

React 18, Vite

Java 17, Spring Boot 3

MySQL

Axios pentru request-uri HTTP

JPA / Hibernate

Pași pentru rulare
1. Setare baza de date
# Creează o bază de date MySQL (ex: shop_db)
# Rulează scriptul database/create_tables.sql pentru a crea tabelele

2. Configurare backend

Deschide folderul backend/ într-un IDE (IntelliJ, Eclipse)

Setează application.properties cu datele bazei tale de date

Rulează aplicația Spring Boot:

mvn spring-boot:run

3. Rulare frontend

Deschide folderul frontend/

Instalează dependențele:

npm install


Rulează aplicația:

npm start


Accesează frontend-ul la http://localhost:5173

🛒 Online Shop - Fullstack Application
Description

This is an online shop built with React (frontend) and Spring Boot (backend) using a relational database (MySQL).
It allows viewing products, filtering by name and price, adding new products, and managing the shopping cart.

Project Structure

backend/ - Spring Boot (Java) code

frontend/ - React code

database/create_tables.sql - SQL script to create tables

Features
Product Overview

List products in a table or cards

Filter by name or price range

New Product

Form to add a new product

Shopping Cart

Add, change quantity, remove products

Checkout and place orders

Backend Endpoints

GET /api/products – list all products (optional filters: ?name=... or ?minPrice=...&maxPrice=...)

POST /api/products – add a new product

POST /api/orders – place a new order

Database Tables

product (id, name, description, category, subcategory, sellerName, price, quantity)

orders (id)

order_item (id, product_id, name, price, quantity, order_id)

Technologies

React 18, Vite

Java 17, Spring Boot 3

MySQL

Axios for HTTP requests

JPA / Hibernate

Steps to Run
1. Database Setup
# Create a MySQL database (e.g., shop_db)
# Run the script database/create_tables.sql to create tables

2. Backend Setup

Open backend/ folder in an IDE (IntelliJ, Eclipse)

Configure application.properties with your database details

Run Spring Boot application:

mvn spring-boot:run

3. Frontend Setup

Open frontend/ folder

Install dependencies:

npm install


Run the frontend:

npm start


Access frontend at http://localhost:5173