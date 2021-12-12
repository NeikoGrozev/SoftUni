const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const houses = await req.storage.getLastThreeHouse();

    res.render('home/home', { houses });
});

router.get('/search', isUser(), async (req, res) => {

    res.render('home/search');
});

router.post('/search', isUser(), async (req, res) => {
    const houses = await req.storage.searchHouse((req.body.search).toLowerCase());
    const search = req.body.search;
    res.render('home/search', { houses, search });
});


module.exports = router;