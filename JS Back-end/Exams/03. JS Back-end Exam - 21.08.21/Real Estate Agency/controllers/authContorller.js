const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post(
    '/register',
    isGuest(),
    body('fullName').matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/).withMessage('Full Name should be in the following format -> (Alexandur Petrov)'),
    body('username').isLength({ min: 5 }).withMessage('Username should be at least 5 characters long'),
    body('password').isLength({ min: 4 }).withMessage('Password should be at least 4 characters long'),
    body('rePassword').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Password don\'t match!');
        }

        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }

            await req.auth.register(req.body.fullName, req.body.username, req.body.password);

            res.redirect('/');
        } catch (err) {

            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    fullName: req.body.fullName,
                    username: req.body.username
                }
            }
            res.render('user/register', ctx);
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {

    try {

        await req.auth.login(req.body.username, req.body.password);

        res.redirect('/');

    } catch (err) {
        const ctx = {
            errors: err.message.split('\n'),
            userData: {
                username: req.body.username
            }
        }
        res.render('user/login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;