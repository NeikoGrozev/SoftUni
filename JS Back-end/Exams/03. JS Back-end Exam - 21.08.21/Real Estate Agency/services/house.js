const House = require('../models/House');

async function createHouse(houseData) {
    const house = new House(houseData);
    await house.save();

    return house;
}

async function getAllHouses() {
    const houses = await House.find({}).lean();

    return houses;
}

async function getLastThreeHouse() {
    let houses = await House.find({}).lean();
    houses = houses.slice(houses.length - 3);

    return houses;
}

async function getHouseById(id) {
    const house = await House.findById(id).populate('rentedUsers').lean();

    return house;
}
async function editHouse(id, houseData) {
    const house = await House.findById(id);

    house.name = houseData.name;
    house.type = houseData.type;
    house.year = houseData.year;
    house.city = houseData.city;
    house.imageUrl = houseData.imageUrl;
    house.description = houseData.description;
    house.availablePieces = Number(houseData.availablePieces);
    
    await house.save();

    return house;
}

async function deleteHouse(houseId) {
    await House.findByIdAndDelete(houseId);
}

async function rentHouse(userId, houseId) {
    const house = await House.findById(houseId);
   
    house.rentedUsers.push(userId);
    house.availablePieces = house.availablePieces - 1;

   await house.save();

   return house;
}

async function searchHouse(search){
    const houses = await House.find({type: { $regex : new RegExp(search, "i") }}).lean();

    return houses;
}

module.exports = {
    createHouse,
    getAllHouses,
    getLastThreeHouse,
    getHouseById,
    editHouse,
    deleteHouse,
    rentHouse,
    searchHouse
}