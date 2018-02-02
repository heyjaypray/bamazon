-- Drops the favorite_db if it exists cache index --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "favorite_db" database --
CREATE DATABASE bamazon;

-- Make it so all of the following code will affect favorite_db --
USE bamazon;

CREATE TABLE products ( 
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100),
    price DECIMAL(15,2) NULL,
    stock_quantity INTEGER NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone", "technology",1000, 500),
("drum set", "music",750, 100),
("guitar", "music",400, 75),
("ps4", "entertainment",400, 400),
("plates", "kitchen-ware",20, 400),
("knives", "kitchen-ware",17, 700),
("desktop monitor", "technology",150, 75),
("oculus rift", "entertainment",400, 25),
("sunglasses", "clothing",20, 500),
("shirt", "clothing",20, 750),
("keyboard", "music",200, 180),
("call of duty", "entertainment",60, 500),
("robovac", "technology",300, 4);


USE bamazon;
SELECT * FROM products;
