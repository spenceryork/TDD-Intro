
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('acme.sqlite', (err) => {
    if (err) return console.log("db don't work");
    console.log("Connection to db successful");
})

module.exports.getCustomers = () => {
    return [{}];
}

module.exports.addCustomers = ({firstName, lastName, city, street, state, zip, phone}) => {
    return new Promise( (resolve, reject) => {
        db.run(`INSERT INTO customers VALUES(null,
        "${firstName}",
        "${lastName}",
        "${city}",
        "${street}",
        "${state}",
        "${zip}",
        "${phone}"
        )`, function(){
            resolve({id: this.lastID});
        });
    });
}

module.exports.deleteCustomer = (id) => {
    return new Promise( (resolve, reject) => {
        db.run(`DELETE FROM customers WHERE customer_id = ${id}`, function(err, data) {
            console.log("this.changes", this.changes);
            // Don't use fat arrow when using 'this'. this.changes results in 1 when a row has been deleted from the table.
            resolve(this.changes);
        })
    })
} 

module.exports.getACustomer = (id) => {
    return new Promise( (resolve, reject) => {
        db.get(`SELECT * FROM customers WHERE customer_id = ${id}`, (err, data) => {
            console.log("what are you?", data);
            resolve(data)
        });
    });
}