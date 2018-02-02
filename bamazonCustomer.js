const inquirer = require('inquirer');
const {table} = require('table');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port:'3306',
  user     : 'root',
  password : "",
  database : 'bamazon'
});
 
connection.connect(function(err){
    if (err) throw err;
    start();
});

function start(database, output, sqlRow){
    database = [['ITEM ID', 'ITEM NAME', 'PRICE']];

    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err

        for (var i=0; i < res.length; i++){
            sqlRow = [res[i].item_id, res[i].product_name, '$'+ res[i].price]
            database.push(sqlRow);
        }
        output = table(database);
        console.log(output)
        search();
    })
}

function search() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the item ID you want to purchase.',
                name: 'id'
            },
            {
                type: 'input',
                message: 'how much do you want to purchase?',
                name: 'unit'
            }
        ])
        .then(function(answer){
            selectProduct(answer.id, answer.unit);
        })
}



function selectProduct (id, unit, price, quantity){


    connection.query("SELECT * FROM products WHERE item_id=?", [id], function(err, res){
        if (err) throw err;
        for (var i=0; i< res.length; i++){

            price = res[i].price;
            quantity = res[i].stock_quantity;

            if(unit > quantity) {
                console.log("sorry we only have " + quantity + "left")

                proress();

            } else {
                updateProducts(id,unit,price,quantity);
            }
        }
    })
}

function updateProducts (id, unit, price, qty, updatedQTY) {

    updatedQTY = qty - unit;

    connection.query("UPDATE products SET stock_quantity=? WHERE item_id = ?", [updatedQTY, id], function(err,res){
        if (err) throw err;
        console.log('Your total: $' + (unit * price))

        progress();
    })
}

function progress() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'Do you want to continue?',
                name: 'name',
                default: true
            }

        ])
        .then(function(answer){
            if (answer.name) {
                search();

            }else{
                connection.end();
            }
        })
}
