const Play = require('../models/Play');
const User = require('../models/User');

async function createPlay(playData) {
    const play = new Play(playData);
    await play.save();

    return play;
}

async function getAllPlays() {
    const plays = await Play.find({}).lean().sort({createdData: 'desc'});

    return plays;
}

async function getPlaysForGuest(){
    const plays = await Play.find({}).lean().sort({userLaked: 'desc'}).limit(3);

    return plays;
}

async function getPlaysSortByDate(){
    const plays = await Play.find({}).lean().sort({createdData: 'asc'});

    return plays;
}

async function getPlaysSortByLikes(){
    const plays = await Play.find({}).lean().sort({userLaked: 'desc'});

    return plays;
}

async function getPlayById(id) {
    const play = await Play.findById(id).lean();

    return play;
}

async function editPlay(id, playData) {
    const play = await Play.findById(id);

    play.title = playData.title;
    play.description = playData.description;
    play.imageUrl = playData.imageUrl;
    play.isPublic = Boolean(playData.isPublic);

    await play.save();

    return play;
}

async function deletePlay(playId) {
    await Play.findByIdAndDelete(playId);
}

async function likePlay(userId, playId) {
    const user = await User.findById(userId);
    const play = await Play.findById(playId);
   
    user.lakedPlays.push(playId);
    play.userLaked.push(userId);

    return new Promise.all([user.save(), play.save()]);
}

module.exports = {
    createPlay,
    getAllPlays,
    getPlaysForGuest,
    getPlaysSortByDate,
    getPlaysSortByLikes,
    getPlayById,
    editPlay,
    deletePlay,
    likePlay
}