import Hotel from "../models/hotelModel.js";

export default {
  createHotel(hotelData, userId) {
    return Hotel.create({ ...hotelData, owner: userId });
  },
  getAllHotels() {
    return Hotel.find();
  },
  getOne(id) {
    return Hotel.findById(id);
  },
};
