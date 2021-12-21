const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.get('/create', isUser(), (req, res) => {

    res.render('publication/create');
});

router.post(
    '/create',
    isUser(),
    body('title').isLength({ min: 6 }).withMessage('Title must be a least 6 characters long!'),
    body('paintTechnique').not().trim().isEmpty().withMessage('Painting technique should not be empty!').bail()
        .isLength({ max: 15 }).withMessage('Painting technique  must be 15 characters long!'),
    body('certificate').isIn(['Yes', 'No']).withMessage('Certificate of authenticity there must be value "Yes" or "No"!'),
    body('artPicture').matches(/^https?:\/\//).withMessage('Art picture should start with http:// or https://!'),
    async (req, res) => {

        const publicationData = {
            title: req.body.title,
            paintTechnique: req.body.paintTechnique,
            certificate: req.body.certificate,
            artPicture: req.body.artPicture,
            author: req.user._id
        }
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            await req.storage.createPublication(req.user._id, publicationData);

            res.redirect('/gallery');
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                publicationData: {
                    title: req.body.title,
                    paintTechnique: req.body.paintTechnique,
                    certificate: req.body.certificate,
                    artPicture: req.body.artPicture,
                }
            }

            res.render('publication/create', ctx);
        }
    });

router.get('/details/:id', async (req, res) => {
    try {
        const publicationData = await req.storage.getPublicationById(req.params.id);
        const isAuthor = req.user && req.user._id == publicationData.author._id;
        const isShered = Boolean(req.user && publicationData.usersShared.find(x => x == req.user._id));

        res.render('publication/details', { publicationData, isAuthor, isShered });
    } catch (err) {
        console.log(err.message);
        res.redirect('/')
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {

    try {
        const publicationData = await req.storage.getPublicationById(req.params.id);

        if (req.user._id != publicationData.author._id) {
            throw new Error('Cannot edit publication you haven\'t created!');
        }

        res.render('publication/edit', { publicationData });
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.post(
    '/edit/:id',
    isUser(),
    body('title').isLength({ min: 6 }).withMessage('Title must be a least 6 characters long!'),
    body('paintTechnique').not().trim().isEmpty().withMessage('Painting technique should not be empty!').bail()
        .isLength({ max: 15 }).withMessage('Painting technique  must be 15 characters long!'),
    body('certificate').isIn(['Yes', 'No']).withMessage('Certificate of authenticity there must be value "Yes" or "No"!'),
    body('artPicture').matches(/^https?:\/\//).withMessage('Art picture should start with http:// or https://!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            const publication = await req.storage.getPublicationById(req.params.id);

            if (req.user._id != publication.author._id) {
                throw new Error('Cannot edit publication you haven\'t created!');
            }

            await req.storage.editPublication(req.params.id, req.body);

            res.redirect('/publication/details/' + req.params.id);
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                publicationData: {
                    _id: req.params.id,
                    title: req.body.title,
                    paintTechnique: req.body.paintTechnique,
                    certificate: req.body.certificate,
                    artPicture: req.body.artPicture,
                }
            }

            res.render('publication/edit', ctx);
        }
    });

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const publicationData = await req.storage.getPublicationById(req.params.id);

        if (req.user._id != publicationData.author._id) {
            throw new Error('Cannot delete publication you haven\'t created!');
        }

        await req.storage.deletePublication(publicationData._id);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.get('/shere/:id', isUser(), async (req, res) => {
    try {
        const publication = await req.storage.getPublicationById(req.params.id);

        if (req.user._id == publication.author) {
            throw new Error('Cannot shere you author publication!');
        }

        await req.storage.sherePublication(req.user._id, req.params.id);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});



module.exports = router;