const express = require('express');
const router = express.Router();
const {Op, fn, col, where} = require('sequelize');
const authenticateToken = require('../../middleware/authorization');
const PerformaInvoiceStatus = require('../models/invoiceStatus');
const PerformaInvoice = require('../models/performaInvoice');

router.post('/updatestatus', authenticateToken, async (req, res) => {
    const { performaInvoiceId, status, remarks, amId, accountantId} = req.body;
    console.log(accountantId);
    
    try {
        const status = new PerformaInvoiceStatus({ performaInvoiceId, status: req.body.status, date: Date.now(), remarks });

        let pi = await PerformaInvoice.findByPk(performaInvoiceId)
        pi.status = req.body.status;
        if (amId != null) pi.amId = amId;
        if (accountantId != null) pi.accountantId = accountantId
        await pi.save();

        await status.save();

        res.send(status);
    } catch (error) {
        res.send(error.message)
    }
})

router.post('/updatestatustobankslip', authenticateToken, async (req, res) => {
    const { performaInvoiceId } = req.body;
    try {
        const status = new PerformaInvoiceStatus({ performaInvoiceId, status: 'BANK SLIP ISSUED', date: Date.now() });

        let pi = await PerformaInvoice.findByPk(performaInvoiceId)
        pi.status = 'BANK SLIP ISSUED';
        await pi.save();

        await status.save();

        res.send(status);
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router