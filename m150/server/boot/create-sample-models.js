'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs;
  var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    customers: async.apply(createCustomers),
  }, function(err, results) {
    if (err) throw err;
    
  });
  //create customers
  function createCustomers(cb) {
    mongoDs.automigrate('Customer', function(err) {
      if (err) return cb(err);
      var Customer = app.models.Customer;
      Customer.create([{
        email: 'login@test.com',
        password: 'test',
      }], cb);
    });
  }
};

