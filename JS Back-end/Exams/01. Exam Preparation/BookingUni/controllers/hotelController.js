const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.get('/create', isUser(), (req, res) => {


    res.render('hotel/create');
});

router.post('/create',
    isUser(),
    body('hotelName').isLength({ min: 4 }).withMessage('Hotel name must be a least 4 characters long!'),
    body('city').isLength({ min: 3 }).withMessage('City must be a least 3 characters long!'),
    body('freeRooms').isNumeric({ min: 1, max: 100 }).withMessage('Free rooms should be between 1 and 100'),
    body('imgUrl').matches(/^https?/).withMessage('Image Url should starts with http or https'),
    async (req, res) => {

        const hotelData = {
            name: req.body.hotelName,
            city: req.body.city,
            imageUrl: req.body.imgUrl,
            rooms: req.body.freeRooms,
            bookedBy: [],
            owner: req.user._id
        }
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            await req.storage.createHotel(hotelData);

            res.redirect('/');
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                hotelData: {
                    name: req.body.hotelName,
                    city: req.body.city,
                    imageUrl: req.body.imgUrl,
                    rooms: req.body.freeRooms
                }
            }

            res.render('hotel/create', ctx);
        }
    });

router.get('/details/:id', async (req, res) => {
    try {
        const hotelData = await req.storage.getHotelById(req.params.id);
        const hasUser = Boolean(req.user);
        const isOwner = req.user && req.user._id == hotelData.owner._id;
        const isBooked = Boolean(req.user && hotelData.bookedBy.find(x => x == req.user._id));

        res.render('hotel/details', { hasUser, hotelData, isOwner, isBooked });
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const hotelData = await req.storage.getHotelById(req.params.id);

        if (req.user._id != hotelData.owner) {
            throw new Error('Cannot edit hotel you haven\'t created!');
        }

        res.render('hotel/edit', { hotelData });
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
})

router.post('/edit/:id',
    isUser(),
    body('name').isLength({ min: 4 }).withMessage('Hotel name must be a least 4 characters long!'),
    body('city').isLength({ min: 3 }).withMessage('City must be a least 3 characters long!'),
    body('rooms').isNumeric({ min: 1, max: 100 }).withMessage('Free rooms should be between 1 and 100'),
    body('imageUrl').matches(/^https?/).withMessage('Image Url should starts with http or https'),
    async (req, res) => {

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message)
            }

            const hotel = await req.storage.getHotelById(req.params.id);

            if (req.user._id != hotel.owner) {
                throw new Error('Cannot edit hotel you haven\'t created!');
            }

            await req.storage.editHotel(req.params.id, req.body);

            res.redirect('/hotels/details/' + req.params.id);
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                hotelData: {
                    _id: req.params.id,
                    name: req.body.name,
                    city: req.body.city,
                    imageUrl: req.body.imageUrl,
                    rooms: req.body.rooms
                }
            }
            console.log(ctx);
            res.render('hotel/edit', ctx);
        }
    });

router.get('/book/:id', isUser(), async (req, res) => {

    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        if (req.user._id == hotel.owner) {
            throw new Error('Cannot book hotel you own hotel!');
        }

        if(hotel.rooms > 0){
            await req.storage.bookHotel(req.user._id, req.params.id);
        }


        res.redirect('/hotels/details/' + req.params.id);
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const hotelData = await req.storage.getHotelById(req.params.id);

        if (req.user._id != hotelData.owner) {
            throw new Error('Cannot delete hotel you haven\'t created!');
        }

        req.storage.deleteHotel(hotelData._id);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;