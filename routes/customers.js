const {Customer, validateCustomer} = require('../models/customer.model');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name')
    res.send(customer);
});

router.post('/', auth , async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    await customer.save();

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name,
         phone: req.body.phone, isGold: req.body.isGold}, { new: true }).lean();

    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
    res.send(customer);
});

router.delete('/:id', [auth, admin], async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id).lean();
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id).lean();
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
    res.send(customer);
});

module.exports = router;