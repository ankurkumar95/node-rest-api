const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST request to /products',
        created: product
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'Handling GET request for '+id+ ' product'
    });
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Product changed'
    });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Product Deleted'
    });
});

module.exports = router;