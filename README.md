# bamazon
Amazon-like CLI app that takes commands from Inquirer and utilizes SQL for its backend database.


[Video](https://youtu.be/IelA8lAPSxc)

## Installation

These Node Packages are Required:

* [mysql](https://www.npmjs.com/package/mysql)
* [inquirer](https://www.npmjs.com/package/inquirer)
* [table](https://www.npmjs.com/package/table)

```
npm install
```
This will install all the node packages. 

## Usage

***MySql database is required.***

Create a 'products' table and insert dummy data in it.
```
CREATE TABLE products ( 
    item_id int NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100),
    price DECIMAL(13,2) NULL,
    stock_quantity int NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (item, department, price, quantity);
```
***Command-line***

* Customer view

*Uses Inquirer to display products table.*

* Manager view








## Authors

* Justin P. Romanos
