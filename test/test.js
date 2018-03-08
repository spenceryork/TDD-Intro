
const { createTables } = require('../js/makeTable');
const { getCustomers, addCustomers, getACustomer, deleteCustomer } = require('../js/customersModule');
const { assert: { equal, isFunction, isObject, isArray } } = require('chai');

describe('just a test', () => {
    it('should be equal', () => {
        equal(3, 1+2);
    });
});

describe('customers module', () => {

    describe('fetching customers', () => {
        it('should be a function', () => {
            isFunction(getCustomers);
        });
        it('should return an array', () => {
            isArray(getCustomers());
            isObject(getCustomers()[0]);
        });
    });

    describe('adding customer', () => {

        let newCust = {
            firstName: "Pat",
            lastName: "Smith",
            city: "Nowhere",
            state: "Alabama",
            zip: "22288",
            phone: "555-444-7777",
            id: 9
        }

        beforeEach( (done) => {
            createTables()
            .then( () => {
                done();
            }) 
        })

        it('should return an object', () => {
            return addCustomers(newCust)
            .then( (data) => {
                isObject(data);
            });
        });

        it('should add a new item to the db', () => {
            return addCustomers(newCust)
            .then( (obj) => {
                equal(9, obj.id);
            })
        });

        
    });


    // GET A SINGLE CUSTOMER

    describe('Getting a customer', () => {
        it('should get a single customers from the db', () => {
            let id = 3;
            return getACustomer(id)
            .then( (customers) => {
                isFunction(getACustomer)
                isObject(customers);
                equal(id, customers.customer_id); 
            });
        });
    });

    // DELETE

    describe('Deleting a customer', () => {
        let id = 3;
        it('should be a function', () => {
            return deleteCustomer(id)
            .then( (data) => {
                isFunction(deleteCustomer);
                // This.changes returns 1 when a row has been deleted from a table
                equal(1, data);
            });
        });
    });



});