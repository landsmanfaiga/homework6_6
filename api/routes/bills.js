const router = require('express').Router();
const db = require('../db');

router.post('/add', async (req, res) => {
    await db.addBill(req.body);
    res.json({status: 'ok'});
});

router.post('/addpb', async (req, res) => {
    await db.addParticipantsBills(req.body);
    res.json({status: 'ok'});
});

router.get('/getall', async (req, res) => {
    res.json(await db.getBills());
})

router.get('/get/:id', async (req, res) => {
    const bill = await db.getBill(req.params.id);
    res.json(bill);
})

router.get('/getpamount/:id', async (req, res) => {
    const amount = await db.getPAmount(req.params.id);
    res.json(amount);
})

module.exports = router;