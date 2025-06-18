import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minLength: [2, "Min Length is 2 characters"],
    maxlength: [20, "Max allowed character are 20"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    minLength: [10, "Must be at least 10 characters long"],
    validate: [
      /^[A-Za-z0-9]$/,
      "should consist only english letters and digits",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [5, "Password must be at least 5 charachers."],
    validate: [
      /^[A-Za-z0-9]*$/,
      "should consist only english letters and digits",
    ],
  },
  bookedHotels: [
    {
      type: Types.ObjectId,
      ref: "Hotel",
    },
  ],
  offeredHotels: [
    {
      type: Types.ObjectId,
      ref: "Hotel",
    },
  ],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
