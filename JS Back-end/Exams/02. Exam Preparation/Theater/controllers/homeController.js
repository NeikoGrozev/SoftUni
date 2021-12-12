const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let plays = {};
    if (req.user) {
        plays = await req.storage.getAllPlays();
    } else {
        plays = await req.storage.getPlaysForGuest();
    }

    res.render('home/home', { plays });
});

router.get('/sortByDate', isUser(), async (req, res) => {
    const plays = await req.storage.getPlaysSortByDate();

    res.render('home/home', { plays });
});

router.get('/sortByLikes', isUser(), async (req, res) => {
    const plays = await req.storage.getPlaysSortByLikes();

    res.render('home/home', { plays });
});

module.exports = router;