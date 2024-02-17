const electronicService = require('../services/electronicService');;

async function isElectronicOwner(req, res, next) {
    const electronicId = req.params.electronicId;
    const electronic = await electronicService.getOne(electronicId).lean();

    if (electronic.owner != req.user?._id) {
        return res.redirect(`/courses/${electronicId}/details`)
    };
    req.electronic = electronic;
    next();
};

exports.isElectronicOwner = isElectronicOwner;