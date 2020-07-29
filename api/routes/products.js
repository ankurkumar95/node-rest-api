const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//Route to GET all the products
router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        if(docs.length > 0){
            res.status(200).json(docs);
        }else {
            res.status(404).json({message: 'No entries found!'})
        }
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

//Route to create a product
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            created: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

//Route to get a specific product by ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'No entry found for this ID'});
        }
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err),
        res.status(500).json({error: err})
    });
});


//Updating the product data
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.update({_id: id},{$set: {name: req.body.name, price: req.body.price}}).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//Route to delete a product by ID
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
   Product.remove({_id: id}).exec().then(result => {
       res.status(200).json(result)
   }).catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   });
});

module.exports = router;