const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function createHotel(hotelData) {
    const hotel = new Hotel(hotelData);
    await hotel.save();

    return hotel;
}

async function getAllHotels() {
    const hotels = await Hotel.find({}).lean();

    return hotels;
}

async function getHotelById(id) {
    const hotel = await Hotel.findById(id).lean();

    return hotel;
}

async function editHotel(id, hotelData) {
    const hotel = await Hotel.findById(id);

    hotel.name = hotelData.name;
    hotel.city = hotelData.city;
    hotel.rooms = Number(hotelData.rooms);
    hotel.imageUrl = hotelData.imageUrl;

    await hotel.save();

    return hotel;
}

async function bookHotel(userId, hotelId) { 
    const user = await User.findById(userId);
    const hotel = await Hotel.findById(hotelId);

    if (user._id == hotel.owner) {
        throw new Error('Cannot book hotel you own hotel!');
    }

    user.bookedHotels.push(hotelId);
    hotel.bookedBy.push(userId);
    hotel.rooms = hotel.rooms - 1;

    return new Promise.all([user.save(), hotel.save()]);
}

async function deleteHotel(hotelId){
    await Hotel.findByIdAndDelete(hotelId);
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    editHotel,
    bookHotel,
    deleteHotel
}