const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authorization');
const PerformaInvoice = require('../models/performaInvoice');
const PerformaInvoiceStatus = require('../models/invoiceStatus');

router.post('/save', authenticateToken, async(req, res) => {
    console.log(req.body);
    
    const { piNo, url} = req.body;
    try {
        const newPi = new PerformaInvoice({ piNo, url, status: 'GENERATED' });
        await newPi.save();

        const piId = newPi.id;
        console.log(piId);
        
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
    console.log(req.query);
    
    let where = {};
    if(status != '' && status != 'undefined'){
        where = { status: status}
    }
    try {
        const pi = await PerformaInvoice.findAll({
            where: where
        })
        res.send(pi)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/findbyid/:id', authenticateToken, async(req, res) => {
    try {
        const pi = await PerformaInvoice.findByPk(req.params.id)
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
        pi.status = 'BANK SLIP ADDED';
        await pi.save();

        const piId = pi.id;
        const piStatus = new PerformaInvoiceStatus({
            performaInvoiceId: piId, status: 'BANK SLIP ADDED', date: new Date()
        })
        await piStatus.save();
        res.json({ p: pi, status: piStatus})
    } catch (error) {
        res.send(error.message)
    }
});
module.exports = router;