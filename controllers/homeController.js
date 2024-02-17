const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlewares');
const electronicService = require('../services/electronicService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/search', async (req, res) => {
    const { name, type } = req.query;

    const electronics = await electronicService.search(name, type).lean();
    console.log(electronics);

    res.render('search', { electronics });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;