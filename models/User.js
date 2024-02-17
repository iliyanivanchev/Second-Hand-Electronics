const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minLength: [3, 'username should be atleast 3 character long']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        minLength: [10, 'email should be atleast 10 character long']
        // unique: true, //check if project require it
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [4, 'password should be atleast 4 character long']
    },
    boughtElectronics: [{
        type: mongoose.Types.ObjectId,
        ref: 'Electronics',
    }],
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10) ;
});

const User = mongoose.model('User', userSchema);

module.exports = User;