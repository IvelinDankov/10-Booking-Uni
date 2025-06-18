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
  book(hotelId, userId) {
    return Hotel.findByIdAndUpdate(
      hotelId,
      {
        $inc: { freeRooms: -1 },
        $push: { usersBooked: userId },
      },
      { new: true }
    );
  },
  update(id, data) {
    return Hotel.findByIdAndUpdate(id, data);
  },
  remove(id) {
    return Hotel.findByIdAndDelete(id);
  },
};
