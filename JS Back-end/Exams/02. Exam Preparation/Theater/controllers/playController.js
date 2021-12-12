const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.get('/create', isUser(), async (req, res) => {

    res.render('play/create');
});

router.post(
    '/create',
    isUser(),
    body('title').not().trim().isEmpty().withMessage('Title should not be empty!'),
    body('description').not().trim().isEmpty().withMessage('Description should not be empty!').bail()
        .isLength({ max: 50 }).withMessage('Description must be 50 characters long!'),
    body('imageUrl').not().trim().isEmpty().withMessage('Image Url should not be empty!'),
    async (req, res) => {

        const playData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic: Boolean(req.body.isPublic),
            author: req.user._id
        }
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            await req.storage.createPlay(playData);

            res.redirect('/');
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                playData: {
                    title: req.body.title,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl,
                    isPublic: req.body.isPublic
                }
            }

            res.render('play/create', ctx);
        }
    });

router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const playData = await req.storage.getPlayById(req.params.id);
        const isAuthor = req.user && req.user._id == playData.author._id;
        const isLiked = Boolean(req.user && playData.userLaked.find(x => x == req.user._id));

        res.render('play/details', { playData, isAuthor, isLiked })
    } catch (err) {
        console.log(err.message);
        res.redirect('/')
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {

    try {
        const playData = await req.storage.getPlayById(req.params.id);

        if (req.user._id != playData.author) {
            throw new Error('Cannot edit play you haven\'t created!');
        }

        res.render('play/edit', { playData });
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.post(
    '/edit/:id',
    isUser(),
    body('title').not().trim().isEmpty().withMessage('Title should not be empty!'),
    body('description').not().trim().isEmpty().withMessage('Description should not be empty!').bail()
        .isLength({ max: 50 }).withMessage('Description must be 50 characters long!'),
    body('imageUrl').not().trim().isEmpty().withMessage('Image Url should not be empty!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            const play = await req.storage.getPlayById(req.params.id);
            console.log(play);
            if (req.user._id != play.author) {
                throw new Error('Cannot edit play you haven\'t created!');
            }

            await req.storage.editPlay(req.params.id, req.body);

            res.redirect('/play/details/' + req.params.id);
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                playData: {
                    _id: req.params.id,
                    title: req.body.title,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl,
                    isPublic: req.body.isPublic
                }
            }

            res.render('play/edit', ctx);
        }
    });

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const playData = await req.storage.getPlayById(req.params.id);

        if (req.user._id != playData.author) {
            throw new Error('Cannot delete hotel you haven\'t created!');
        }

        await req.storage.deletePlay(playData._id);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.get('/like/:id', isUser(), async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id);

        if (req.user._id == play.author) {
            throw new Error('Cannot like you author play!');
        }

        await req.storage.likePlay(req.user._id, req.params.id);

        res.redirect('/play/details/' + req.params.id);
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
})

module.exports = router;