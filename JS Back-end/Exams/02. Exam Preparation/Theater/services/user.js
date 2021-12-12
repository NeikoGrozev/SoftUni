const User = require('../models/User');

async function createUser(username, hashedPassword) {
    //TODO adapt property to project requirement

    const user = new User({
        username,
        hashedPassword
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: pattern });

    return user;
}

module.exports = {
    createUser,
    getUserByUsername
}