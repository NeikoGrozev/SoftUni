const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post(
    '/register',
    isGuest(),
    body('username').isLength({ min: 3 }).withMessage('Username must be a least 3 characters long!').bail()
        .matches(/[a-zA-Z0-9]/).withMessage('Username may content only english letters and numbers!'),
    body('password').isLength({ min: 3 }).withMessage('Password must be a least 3 characters long!').bail()
        .matches(/[a-zA-Z0-9]/).withMessage('Password may content only english letters and numbers!'),
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

            await req.auth.register(req.body.username, req.body.password);

            res.redirect('/');
        } catch (err) {

            const ctx = {
                errors: err.message.split('\n'),
                userData: {
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
        console.log(ctx);
        res.render('user/login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;