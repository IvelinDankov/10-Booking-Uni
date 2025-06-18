import Hotel from "../models/hotelModel.js";

export default {
  createHotel(hotelData, userId) {
    return Hotel.create({ ...hotelData, owner: userId });
  },
  getAllHotels() {
    return Hotel.find();
  },
};
