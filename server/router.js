// router.js
const express = require('express');
const { productLists, products } = require('./fakeData');
const router = express.Router();

// Routes for product lists
router.get('/productLists', (req, res) => {
    res.json({
        productLists
    });
});

router.get('/productLists/:id', (req, res) => {
    const product = productLists.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

// Routes for products
router.get('/productType/:type', (req, res) => {
    const { type } = req.params
    if (products[type]) {
        res.json(products[type])
    } else {
        return res.status(404).json({ message: `Product type ${type} not found.` });
    }
});

// Routes for users
router.get('/users', (req, res) => {
    res.json(users);
});

router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

module.exports = router;
