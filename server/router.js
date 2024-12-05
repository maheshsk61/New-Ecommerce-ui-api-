// router.js
const express = require('express');
const { productLists, } = require('./fakeData');
const router = express.Router();

// Routes for products
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

// Routes for categories
router.get('/categories', (req, res) => {
    res.json(categories);
});

router.get('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        return res.status(404).send('Category not found');
    }
    res.json(category);
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
