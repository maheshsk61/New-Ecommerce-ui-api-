const express = require('express');
const { productLists, products } = require('./fakeData');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('./userData');
const { v4: uuid } = require('uuid');

// Routes for product lists
router.get('/productLists', (req, res) => {
    res.json({ productLists });
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
    const { type } = req.params;
    if (products[type]) {
        res.json(products[type]);
    } else {
        return res.status(404).json({ message: `Product type ${type} not found.` });
    }
});

// Routes for users
router.post('/newUser', async (req, res) => {
    const { firstName, lastName, email, gender, countryCode, mobileNumber, password } = req.body;
    const id = uuid();
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { id, firstName, lastName, email, gender, countryCode, mobileNumber, password: hashedPassword };
    users.push(newUser);

    if (!firstName || !lastName || !email || !gender || !countryCode || !mobileNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    res.status(201).json({
        message: 'Registration has been successful',
        user: { id, firstName, lastName, email, gender, countryCode, mobileNumber }
    });

    console.log(`User list: ${JSON.stringify(users)}`);
});

router.post('/validateUser', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = users.find(user => user.email === email);
    //console.log(user, "user")
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //console.log(isPasswordValid)
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    return res.status(200).json({
        message: 'User validated successfully',
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            countryCode: user.countryCode,
            mobileNumber: user.mobileNumber
        }
    });
});

module.exports = router;
