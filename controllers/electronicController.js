const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtil');

const electronicService = require('../services/electronicService');
const { isAuth, isGuest } = require('../middlewares/authMiddlewares');
const { isElectronicOwner } = require('../middlewares/electronicMiddleware');


router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
});

router.post('/create', isAuth, async (req, res) => {
    const electronicsData = req.body;
    const userId = req.user._id;

    try {
        await electronicService.create(userId, electronicsData);
        res.redirect('/electronics/catalog');
    } catch (err) {
        res.render('electronics/create', { ...electronicsData, error: getErrorMessage(err) });
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const electronics = await electronicService.getAll().lean();
        res.render('electronics/catalog', { electronics });
    } catch (err) {
        res.render('electronics/catalog', { error: getErrorMessage(err) });
    };
});

router.get('/:electronicId/details', async (req, res) => {
    const electronicPartId = req.params.electronicId;
    const electronicPart = await electronicService.getOneDetailed(electronicPartId).lean();
    const user = req.user;
    const isOwner = electronicPart.owner && electronicPart.owner._id == user?._id;
    const isBought = electronicPart.buyingList.some(user => user._id == req.user?._id);


    res.render('electronics/details', { ...electronicPart, user, isOwner, isBought });
});

router.get('/:electronicId/buy', async (req, res) => {
    const electronicId = req.params.electronicId;
    const userId = req.user._id;

    await electronicService.buy(electronicId, userId);

    res.redirect(`/electronics/${electronicId}/details`);
});

router.get('/:electronicId/edit', isElectronicOwner, (req, res) => {
    res.render('electronics/edit', { ...req.electronic });
});

router.post('/:electronicId/edit', isElectronicOwner, async (req, res) => {
    const electronicData = req.body;
    const electronicId = req.params.electronicId;

    try {
        await electronicService.edit(electronicId, electronicData);

        res.redirect(`/electronics/${electronicId}/details`);
    } catch (err) {
        res.render('electronics/edit', { ...electronicData, error: getErrorMessage(err) });
    }
});

router.get('/:electronicId/delete', async (req, res) => {
    const electronicId = req.params.electronicId;

    await electronicService.delete(electronicId);

    res.redirect('/electronics/catalog');

});

module.exports = router;