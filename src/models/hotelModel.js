import { Schema, Types, model } from "mongoose";

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  freeRooms: {
    type: Number,
    required: true,
    min: [1, "Min is one"],
    max: [100, "Max is hundred"],
  },
  usersBooked: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Hotel = model("Hotel", hotelSchema);

export default Hotel;
