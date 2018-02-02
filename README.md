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

<img width="347" alt="screen shot 2018-02-01 at 3 59 55 pm" src="https://user-images.githubusercontent.com/25106794/35711334-a7a15344-0779-11e8-994b-1be1455c5ef8.png">



* Manager view

<img width="438" alt="screen shot 2018-02-01 at 5 19 25 pm" src="https://user-images.githubusercontent.com/25106794/35711344-afddbfe8-0779-11e8-8a68-81377906f608.png">

<img width="448" alt="screen shot 2018-02-01 at 5 19 46 pm" src="https://user-images.githubusercontent.com/25106794/35711348-b53fc44a-0779-11e8-8c1d-760d660bd1e1.png">

<img width="392" alt="screen shot 2018-02-01 at 5 20 27 pm" src="https://user-images.githubusercontent.com/25106794/35711353-bb541b38-0779-11e8-897f-f2b6f3b79d2d.png">

<img width="381" alt="screen shot 2018-02-01 at 5 21 13 pm" src="https://user-images.githubusercontent.com/25106794/35711366-c7314674-0779-11e8-876e-6a98fca0e064.png">

<img width="497" alt="screen shot 2018-02-01 at 5 21 23 pm" src="https://user-images.githubusercontent.com/25106794/35711378-ce045496-0779-11e8-9a74-2df91ab30912.png">


## Authors

* Justin P. Romanos
