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



function start() {
	inquirer
		.prompt([
			{
				type: 'list',
				message: 'Please select from the following:',
				choices: ['view products', 'view low inventory', 'add to stock', 'add new product'],
				name: 'choice'
			}
		])
		.then(function(answer) {
          
            
            if(answer.choice === "view products"){
                viewProducts();
            }
            if(answer.choice === "view low inventory"){
                lowInventory();
            }
            if(answer.choice === "add to stock"){
                addStock();
            }
            if(answer.choice === "add new product"){
                addNewProduct();
            }

		});
}

function progress() {
	inquirer
		.prompt([
			{
				type: 'confirm',
				message: 'Would you like to continue?',
				name: 'name',
				default: true
			}
		])
		.then(function(answer) { 
			if (answer.name) {
				start();
			} else {
				connection.end();
			}
		});
}

function viewProducts(database, output, sqlRow) {

	database = [['ITEM ID', 'ITEM NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']];

	connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        
	    for (var i = 0; i < res.length; i++) {

	      sqlRow = [res[i].item_id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity];
          database.push(sqlRow);
          
        }
        
	    output = table(database);

	    console.log(output);
	    
	    progress();
	});
}


function lowInventory(database, output, sqlRow) {

    database = [['ITEM ID', 'ITEM NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']];
    

	connection.query('SELECT * FROM products WHERE stock_quantity < ?', [10],function(err, res) {
		if (err) throw err;
	    for (var i = 0; i < res.length; i++) {

            sqlRow = [res[i].item_id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity];
            
    		database.push(sqlRow);
	    }
        output = table(database);
        

	    if (res.length < 1) {
	    		console.log('No Products to Display');
	    } else {
	    	console.log(output);
	    }
	    
	    progress();
	});
}

function addStock() {
	inquirer
		.prompt([
			{
				type: 'input',
				message: 'Which Item Would You Like To Add?',
				name: 'id'
			},
			{
				type: 'input',
				message: 'How Many Would You Like You Want To Add?',
				name: 'quantity'
			}
		])
		.then(function(answer) {

            var quantity; 
            
			connection.query('SELECT * FROM products WHERE item_id=?', [answer.id], function(err, res) {

				if (err) throw err;
				for (var i = 0; i < res.length; i++) {
					quantity = res[i].stock_quantity;
                }
                
				var updatedQty = parseInt(answer.quantity) + parseInt(quantity);

				connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [updatedQty, answer.id], function(err, res) {
                    if (err) throw err;
                    
					console.log('Thank you the new stock has been updated');
					
	    			progress();
				});
			});
		});
}

function addNewProduct() {
	inquirer
		.prompt([
			{
				type: 'input',
				message: 'What item would you like to add',
				name: 'name'
			},
			{
				type: 'list',
				message: 'Choose a department:',
				choices: ['Technology', 'Music', 'Entertainment', 'Kitchen-Ware', 'Clothing'],
				name: 'choice'
			},
			{
				type: 'input',
				message: 'Please enter the price:',
				name: 'price'
			},
			{
				type: 'input',
				message: 'Please enter QTY:',
				name: 'quantity'
			}
		])
		.then(function(answer) { 

            connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity)' +  'VALUES (?, ?, ?, ?)', 
            [answer.name, answer.choice, answer.price, answer.quantity], function(err, res) {
                if (err) throw err;
                
				console.log('Thank you');
				
	    		progress();
			});
		});
}

