const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authorization');
const PerformaInvoice = require('../models/performaInvoice');
const PerformaInvoiceStatus = require('../models/invoiceStatus');
const User = require('../../users/models/user');

router.post('/save', authenticateToken, async(req, res) => {
    const { piNo, url, kamId} = req.body;
    const userId = req.user.id;
    try {
        const newPi = new PerformaInvoice({ piNo, url, status: 'GENERATED', salesPersonId: userId, kamId });
        await newPi.save();

        const piId = newPi.id;
        
        const piStatus = new PerformaInvoiceStatus({
            performaInvoiceId: piId, status: 'GENERATED', date: new Date()
        })
        await piStatus.save();
        res.json({ p: newPi, status: piStatus})
    } catch (error) {
        res.send(error.message)
    }
});

router.get('/find', authenticateToken, async(req, res) => {
    let status = req.query.status;
    
    let where = {};
    if(status != '' && status != 'undefined'){
        where = { status: status}
    }
    try {
        const pi = await PerformaInvoice.findAll({
            where: where,
            order: ['id'],
            include: [
                {model: PerformaInvoiceStatus},
                {model: User, as: 'salesPerson', attributes: ['name']},
                {model: User, as: 'kam', attributes: ['name']},
                {model: User, as: 'am', attributes: ['name']},
                // {model: User, as: 'accountant', attributes: ['name']},
            ]
        })
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/findbyid/:id', authenticateToken, async(req, res) => {
    try {
        const pi = await PerformaInvoice.findByPk(req.params.id, {include: [
            PerformaInvoiceStatus,
            {model: User, as: 'salesPerson', attributes: ['name']},
            {model: User, as: 'kam', attributes: ['name']},
            // {model: User, as: 'am', attributes: ['name']},
            // {model: User, as: 'accountant', attributes: ['name']},
        ]})
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/findbysp', authenticateToken, async(req, res) => {
    let status = req.query.status;
    let user = req.user.id;
    console.log(status, user, "______________________");
    
    let where = { salesPersonId: user };
    if(status != '' && status != 'undefined'){
        where = { status: status, salesPersonId: user}
    }
    try {
        const pi = await PerformaInvoice.findAll({
            where: where,
            order: ['id'],
            include: [
                {model: PerformaInvoiceStatus},
                {model: User, as: 'salesPerson', attributes: ['name']},
                {model: User, as: 'kam', attributes: ['name']},

            ]
        })
        console.log(pi);
        
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/findbkam', authenticateToken, async(req, res) => {
    let status = req.query.status;
    let user = req.user.id;
    
    let where = { kamId: user };
    if(status != '' && status != 'undefined'){
        where = { status: status, kamId: user}
    }
    try {
        const pi = await PerformaInvoice.findAll({
            where: where,
            order: ['id'],
            include: [
                {model: PerformaInvoiceStatus},
                {model: User, as: 'salesPerson', attributes: ['name']},
                {model: User, as: 'kam', attributes: ['name']},
                {model: User, as: 'am', attributes: ['name']},
                // {model: User, as: 'accountant', attributes: ['name']},
            ]
        })
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/findbyam', authenticateToken, async(req, res) => {
    let status = req.query.status;
    let user = req.user.id;
    
    let where = { amId: user };
    if(status != '' && status != 'undefined'){
        where = { status: status, amId: user }
    }
    try {
        const pi = await PerformaInvoice.findAll({
            where: where,
            order: ['id'],
            include: [
                {model: PerformaInvoiceStatus},
                {model: User, as: 'salesPerson', attributes: ['name']},
                {model: User, as: 'kam', attributes: ['name']},
                {model: User, as: 'am', attributes: ['name']},
                {model: User, as: 'accountant', attributes: ['name']},

            ]
        })
        console.log(pi);
        
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/findbyma', authenticateToken, async(req, res) => {
    let status = req.query.status;
    let user = req.user.id;
    
    let where = { accountantId: user };
    if(status != '' && status != 'undefined'){
        where = { status: status, accountantId: user}
    }
    try {
        const pi = await PerformaInvoice.findAll({
            where: where,
            order: ['id'],
            include: [
                {model: PerformaInvoiceStatus},
                {model: User, as: 'salesPerson', attributes: ['name']},
                {model: User, as: 'kam', attributes: ['name']},
                {model: User, as: 'am', attributes: ['name']},
                {model: User, as: 'accountant', attributes: ['name']},

            ]
        })
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.patch('/bankslip/:id', authenticateToken, async(req, res) => {
    const { bankSlip} = req.body;
    try {
        const pi = await PerformaInvoice.findByPk(req.params.id)
        pi.bankSlip = bankSlip;
        pi.status = 'BANK SLIP ISSUED';
        await pi.save();

        const piId = pi.id;
        const piStatus = new PerformaInvoiceStatus({
            performaInvoiceId: piId, status: 'BANK SLIP ISSUED', date: new Date()
        })
        await piStatus.save();
        res.json({ p: pi, status: piStatus})
    } catch (error) {
        res.send(error.message)
    }
});
module.exports = router;