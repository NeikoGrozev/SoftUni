const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const publications = await req.storage.getAllPublication();

    res.render('home/home', { publications });
});

router.get('/gallery', async (req, res) => {
    const publications = await req.storage.getAllPublication();

    res.render('home/gallery', { publications });
});

module.exports = router;