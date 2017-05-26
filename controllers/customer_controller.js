const mongoose = require('mongoose');
const ObjectID = require("mongodb").ObjectID;
mongoose.connect('mongodb://localhost/library');
let Customer = require('../models/customers');


const listCustomer = (req,res) => {
  Customer.find((err,customers)=>{
    res.send(err? err : customers);
  })
}

const findOneCustomer = (req,res) => {
  Customer.findOne(
    {_id: ObjectID(req.params.id)},
    (err,customer)=>{
      res.send(err? err : customer);
    }
  )
}

const updateCustomer = (req,res) => {
  Customer.findOne(
    {_id: ObjectID(req.params.id)},
    (err,customer)=>{
      if (!err) {
        if (typeof req.body.name !== 'undefined' && req.body.name !=='') customer.name = req.body.name;
        if (typeof req.body.memberid !== 'undefined' && req.body.memberid !=='') customer.memberid = req.body.memberid;
        if (typeof req.body.address !== 'undefined' && req.body.address !=='') customer.address  = req.body.address;
        if (typeof req.body.zipcode !== 'undefined' && req.body.zipcode !=='') customer.zipcode = req.body.zipcode;
        if (typeof req.body.phone !== 'undefined' && req.body.phone !=='') customer.phone = req.body.phone;
        customer.save();
      }
    }
  )
}

const destroyCustomer = (req,res) => {
  Customer.remove({_id:ObjectID(req.params.id)}, (err,result) => {
    res.send(err? err : `Customer sudah dihapus` );
  })
}

const insertCustomer = (req,res) => {
  let customer = {}
  if (typeof req.body.title !== 'undefined' && req.body.title !=='') customer.title = req.body.title;
  if (typeof req.body.author !== 'undefined' && req.body.author !=='') customer.author = req.body.author;
  if (typeof req.body.address !== 'undefined' && req.body.address !=='') customer.address  = req.body.address;
  if (typeof req.body.zipcode !== 'undefined' && req.body.zipcode !=='') customer.zipcode = req.body.zipcode;
  if (typeof req.body.phone !== 'undefined' && req.body.phone !=='') customer.phone = req.body.phone;
  let newCustomer = new Customer(customer);
  newCustomer.save((err,newcustomer)=>{
    res.send(err? err : `${newcustomer.title} sudah dimasukan` );
  });
}

module.exports = {
  listCustomer,
  findOneCustomer,
  updateCustomer,
  destroyCustomer,
  insertCustomer
}