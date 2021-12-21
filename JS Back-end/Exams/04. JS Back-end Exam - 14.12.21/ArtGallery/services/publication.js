const Publication = require('../models/Publication');
const User = require('../models/User');

async function createPublication(userId,publicationData) {
    const publication = new Publication(publicationData);
    const user = await User.findById(userId);

    user.myPublications.push(publication);

    await publication.save();
    await user.save();

    return true;
}

async function getAllPublication() {
    const publication = await Publication.find({}).lean();

    return publication;
}

async function getPublicationById(id) {
    const publication = await Publication.findById(id).populate('author').lean();

    return publication;
}

async function editPublication(id, publicationData) {
    const publication = await Publication.findById(id);

    publication.title = publicationData.title;
    publication.paintTechnique = publicationData.paintTechnique;
    publication.certificate = publicationData.certificate;
    publication.artPicture = publicationData.artPicture;

    await publication.save();

    return publication;
}

async function deletePublication(publicationId) {
    await Publication.findByIdAndDelete(publicationId);
}

async function sherePublication(userId, publicationId) {
    const user = await User.findById(userId);
    const publication = await Publication.findById(publicationId);

    user.sharedPublication.push(publicationId);
    publication.usersShared.push(userId);

    await user.save();
    await publication.save();

    return true;
}


module.exports = {
    createPublication,
    getAllPublication,
    getPublicationById,
    sherePublication,
    editPublication,
    deletePublication
}
