const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.get('/create', isUser(), async (req, res) => {

    res.render('house/create');
});

router.post(
    '/create',
    isUser(),
    body('name').isLength(6).withMessage('Name should be at least 6 characters!'),
    body('type').isIn(['Apartment', 'Villa', 'House']).withMessage('Type should be “Apartment”, “Villa”, “House”'),
    body('year').isInt({ min: 1850, max: 2021 }).withMessage('Year should be between 1850 and 2021!'),
    body('city').isLength(4).withMessage('City should be at least 4 characters long!'),
    body('imageUrl').matches(/^https?/).withMessage('Image Url should starts with http or https'),
    body('description').isLength({ max: 60 }).withMessage('Property Description should be a maximum of 60 characters long.!'),
    body('availablePieces').isInt({ min: 0, max: 10 }).withMessage('Available Pieces should be positive number (from 0 to 10)!'),
    async (req, res) => {

        const houseData = {
            name: req.body.name,
            type: (req.body.type).toLowerCase(),
            year: Number(req.body.year),
            city: req.body.city,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            availablePieces: req.body.availablePieces,
            owner: req.user._id
        }
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            await req.storage.createHouse(houseData);

            res.redirect('/');
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                houseData: {
                    name: req.body.name,
                    type: req.body.type,
                    year: req.body.year,
                    city: req.body.city,
                    imageUrl: req.body.imageUrl,
                    description: req.body.description,
                    availablePieces: req.body.availablePieces
                }
            }

            res.render('house/create', ctx);
        }
    });

router.get('/details/:id', async (req, res) => {
    try {
        const houseData = await req.storage.getHouseById(req.params.id);
        const isOwner = req.user && req.user._id == houseData.owner._id;
        const isRented = Boolean(req.user && houseData.rentedUsers.find(x => x._id == req.user._id));
        const isAvailable = Boolean(req.user && houseData.availablePieces > 0);
        const rentedUsers = houseData.rentedUsers.map(x => x.fullName).join(', ');

        res.render('house/details', { houseData, isOwner, isRented, isAvailable, rentedUsers })
    } catch (err) {
        console.log(err.message);
        res.redirect('/')
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {

    try {
        const houseData = await req.storage.getHouseById(req.params.id);

        if (req.user._id != houseData.owner) {
            throw new Error('Cannot edit house you haven\'t created!');
        }

        res.render('house/edit', { houseData });
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.post(
    '/edit/:id',
    isUser(),
    body('name').isLength(6).withMessage('Name should be at least 6 characters!'),
    body('type').isIn(['Apartment', 'Villa', 'House']).withMessage('Type should be “Apartment”, “Villa”, “House”'),
    body('year').isInt({ min: 1850, max: 2021 }).withMessage('Year should be between 1850 and 2021!'),
    body('city').isLength(4).withMessage('City should be at least 4 characters long!'),
    body('imageUrl').matches(/^https?/).withMessage('Image Url should starts with http or https'),
    body('description').isLength({ max: 60 }).withMessage('Property Description should be a maximum of 60 characters long.!'),
    body('availablePieces').isInt({ min: 0, max: 10 }).withMessage('Available Pieces should be positive number (from 0 to 10)!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            const house = await req.storage.getHouseById(req.params.id);

            if (req.user._id != house.owner) {
                throw new Error('Cannot edit house you haven\'t created!');
            }

            await req.storage.editHouse(req.params.id, req.body);

            res.redirect('/house/details/' + req.params.id);
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                houseData: {
                    _id: req.params.id,
                    name: req.body.name,
                    type: req.body.type,
                    year: req.body.year,
                    city: req.body.city,
                    imageUrl: req.body.imageUrl,
                    description: req.body.description,
                    availablePieces: req.body.availablePieces
                }
            }

            res.render('house/edit', ctx);
        }
    });

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const houseData = await req.storage.getHouseById(req.params.id);

        if (req.user._id != houseData.owner) {
            throw new Error('Cannot delete house you haven\'t created!');
        }

        await req.storage.deleteHouse(houseData._id);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.get('/allRecent', async (req, res) => {
    try {
        const houses = await req.storage.getAllHouses();

        res.render('house/allRecent', { houses });
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.get('/rent/:id', isUser(), async (req, res) => {
    try {
        const house = await req.storage.getHouseById(req.params.id);

        if (req.user._id == house.owner) {
            throw new Error('Cannot rent you author house!');
        }

        await req.storage.rentHouse(req.user._id, req.params.id);

        res.redirect('/house/details/' + req.params.id);
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
})


module.exports = router;