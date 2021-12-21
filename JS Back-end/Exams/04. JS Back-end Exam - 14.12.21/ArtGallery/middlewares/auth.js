const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../services/user');

const indexConfig = require('../config/index');

module.exports = () => function (req, res, next) {

    if (parseToken(req, res)) {
        req.auth = {
            async register(username, password, address) {
                const token = await register(username, password, address);
                res.cookie(indexConfig.COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(indexConfig.COOKIE_NAME, token);
            },
            logout() {
                res.clearCookie(indexConfig.COOKIE_NAME);
            },
            async getProfile(username) {
                return await getProfile(username);
            }
        }

        next();
    }
}

async function register(username, password, address) {

    const existing = await userService.getUserByUsername(username);

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser(username, hasedPassword, address);

    return generateToken(user);
}

async function login(username, password) {

    const user = await userService.getUserByUsername(username);

    if (!user) {
        throw new Error('No such user!');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect password!');
    }

    return generateToken(user);
}

async function getProfile(username) {
    const userData = await userService.getUserByUsername(username);

    if (!userData) {
        throw new Error('No such user!');
    }

    return userData;
}

function generateToken(userData) {
    return jwt.sign({
        _id: userData._id,
        username: userData.username
    }, indexConfig.TOKEN_SECRET);
}

function parseToken(req, res) {
    const token = req.cookies[indexConfig.COOKIE_NAME];

    if (token) {
        try {
            const userData = jwt.verify(token, indexConfig.TOKEN_SECRET);
            req.user = userData;
			res.locals.user = userData;
            
            return true;
        } catch (err) {
            res.clearCookie(indexConfig.COOKIE_NAME);
            res.redirect('/auth/login');

            return false;
        }
    }

    return true;
}