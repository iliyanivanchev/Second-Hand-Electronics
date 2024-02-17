const Electronics = require('../models/Electronics');
const User = require('../models/User');

exports.getAll = () => Electronics.find();

exports.getOne = (electronicPartId) => Electronics.findById(electronicPartId);

exports.getOneDetailed = (electronicPartId) => this.getOne(electronicPartId).populate('buyingList');

exports.create = async (userId, electronicsData) => {
    const createdElectronics = await Electronics.create({
        owner: userId,
        ...electronicsData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdElectronics: createdElectronics._id } });

    return createdElectronics;
};

exports.buy = async (electronicId, userId) => {

    const electronics = await Electronics.findById(electronicId);
    const user = await User.findById(userId);

    electronics.buyingList.push(userId);
    user.boughtElectronics.push(electronicId);

    await electronics.save();
    await user.save();
};

exports.edit = (electronicId, electronicsData) => Electronics.findByIdAndUpdate(electronicId, electronicsData, { runValidators: true });

exports.delete = (electronicId) => Electronics.findByIdAndDelete(electronicId);

exports.search = (name, type) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    };
    if (type) {
        query.type = new RegExp(type, 'i');
    };

    return Electronics.find(query);
};