const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post(
    '/register',
    isGuest(),
    body('username').isLength({ min: 4 }).withMessage('Username must be a least 4 characters long!'),
    body('password').isLength({ min: 3 }).withMessage('Password must be a least 3 characters long!'),
    body('address').isLength({ max: 20 }).withMessage('Address must be a maximum 20 characters long!'),
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

            await req.auth.register(req.body.username, req.body.password, req.body.address);

            res.redirect('/');
        } catch (err) {

            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    address: req.body.address
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

router.get('/profile/:id', isUser(), async (req, res) => {

    try {
        const userData = await req.auth.getProfile(req.user.username);
        const publicationData = await req.storage.getAllPublication();

        const myTitlePublications = userData.myPublications.map(x => x.title);
        const shereTitles = userData.sharedPublication.map(x => x.title);
        console.log(shereTitles);
        const ctx = {
            username: userData.username,
            address: userData.address,
            myTitlePublications: myTitlePublications.join(', '),
            shereTitles: shereTitles.join(', ')
        }

        res.render('user/profile', ctx)
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;