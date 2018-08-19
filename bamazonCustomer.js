var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        console.log("<------------------------------------------------------------->\n");
        for (i = 0; i < res.length; i++) {

            console.log(res[i].item_id + " " + res[i].product_name + " " + res[i].department_name + " " + res[i].price)
        }
        console.log("\n<------------------------------------------------------------->")
        placeOrder(res);
    })
}

function placeOrder(res) {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the product you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nYou did not enter a valid product ID. Please try again.");
                    return false;
                }

            },
            {
                name: "quantity",
                type: "input",
                message: "What is the number of units you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nYou did not enter a valid quantity. Please try again.");
                    return false;
                }
            }], function (err, res) {
                if (err) throw err;
            }
        )
        .then(function (answer) {
            var orderQuantity = answer.quantity;
            var orderID = parseInt(answer.id) - 1;
            var totalPrice = (parseFloat(res[orderID].price * orderQuantity).toFixed(2));
            var stockQuantity = res[orderID].stock_quantity;
            if (orderQuantity < stockQuantity) {
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockQuantity - orderQuantity
                        },
                        {
                            item_id: answer.id
                        }
                    ]);
                console.log("\nThank you for your purchase. Your order has gone through!");
                console.log("\nThe total charge to you today is: $" + totalPrice);
            }

            else {
                console.log("\nSorry your order could not be fulfilled, there is insufficient quantity.");
            }

            connection.end();
        });
}

