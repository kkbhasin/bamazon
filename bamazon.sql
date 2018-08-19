CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER NOT NULL,
primary key(item_id)
)

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES
		("Nintendo Switch", "Video Games", 399.99, 100),
		("Samsung 55' LED Curved Television", "Television and Home Theatre", 899.99, 25),
        ("Edifier R1700BT Bluetooth Bookshelf Speakers", "Television and Home Theatre", 179.99, 250),
        ("Playstation 4 Pro 1TB Console", "Video Games", 499.99, 150),
        ("Microsoft Xbox One X 1TB Console", "Video Games", 599.99, 100),
        ("Bose QuietComfort 25 Acoustic Noise Cancelling Headphones", "Electronics", 295.00, 200),
        ("AUTO-VOX D6 Pro FHD 1080P Dashboard Camera Recorder", "Electronics", 119.99, 350),
        ("Nest Learning Thermostat", "Home and Security", 298.00, 75),
        ("Ring Motion-Activated HD Security Cam", "Home and Security", 399.99, 75),
        ("Oculus Rift + Touch Virtual Reality System", "Video Games", 529.99, 125);
        
SELECT * from products;

