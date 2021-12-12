const User = require('../models/User');

async function createUser(username, email, hashedPassword) {
    const user = new User({
        username,
        email,
        hashedPassword
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: pattern }).populate('bookedHotels').lean();

    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: pattern });

    return user;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
}