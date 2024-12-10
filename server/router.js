// router.js
const express = require('express');
const { productLists, products } = require('./fakeData');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('./userData')
const { v4: uuid } = require('uuid')

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
router.post('/newUser', async (req, res) => {
    const { firstName, lastName, email, gender, countryCode, mobileNumber, password } = req.body
    const id = uuid()
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = { id, firstName, lastName, email, gender, countryCode, mobileNumber, password: hashedPassword };
    users.push(newUser)
    if (!firstName | !lastName | !email | !gender | !countryCode | !mobileNumber || !password) {
        res.status(400).json({
            message: 'All fields are required'
        })
    }
    res.status(201).json(
        {
            message: 'new user created',
            user: { id, firstName, lastName, email, gender, countryCode, mobileNumber }
        }
    )
    console.log(`user list ${JSON.stringify(users)}`)
    //console.log(req.body)
})

module.exports = router;
