import { Schema, Types, model } from "mongoose";

const hotelSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    unique: [true, "Name already exist!"],
    minLenght: [4, "Should be at least 4 characters!"],
  },
  city: {
    type: String,
    required: [true, "Name is required!"],
    unique: [true, "City already exist!"],
    minLenght: [3, "Should be at least 3 characters!"],
  },
  imageUrl: {
    type: String,
    required: [true, "Name is required!"],
    validate: [/^https?/, "Image should starts with http or https!"],
  },
  freeRooms: {
    type: Number,
    required: [true, "Name is required!"],
    min: [1, "Min is one!"],
    max: [100, "Max is hundred!"],
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
