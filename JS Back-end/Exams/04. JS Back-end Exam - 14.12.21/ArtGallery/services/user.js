const User = require('../models/User');

async function createUser(username, hashedPassword, address) {
  
    const user = new User({
        username,
        hashedPassword,
        address
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: pattern }).populate('myPublications').populate('sharedPublication').lean();

    return user;
}

module.exports = {
    createUser,
    getUserByUsername
}