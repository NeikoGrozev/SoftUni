const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post(
    '/register',
    isGuest(),
    body('email').isEmail().withMessage('Invalid email!'),
    body('password').isLength({ min: 5 }).withMessage('Password must be a least 5 characters long!').bail()
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
                throw new Error(message)
            }
            await req.auth.register(req.body.username, req.body.email, req.body.password);

            res.redirect('/');

        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    email: req.body.email
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
            errors: err.message,
            userData: {
                username: req.body.username
            }
        }
        console.log(ctx.errors);
        res.render('user/login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

router.get('/profile/:id', isUser(), async (req, res) => {

    try {
        const userData = await req.auth.getProfile(req.user.username);
        
        const bookedHotels = userData.bookedHotels.map(x => x.name);
        const ctx = {
            username: userData.username,
            email: userData.email,
            bookedHotels: bookedHotels.join(', ')
        }

        res.render('user/profile', ctx)
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;