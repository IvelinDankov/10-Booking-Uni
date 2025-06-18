import { Router } from "express";
import hotelService from "../services/hotelService.js";
import errorMsg from "../utils/errorMsg.js";

const hotelController = Router();

hotelController.get("/add", (req, res) => {
  res.render("hotel/create");
});

hotelController.post("/add", async (req, res) => {
  const hotelData = req.body;
  const userId = req.user.id;

  try {
    const newHotel = await hotelService.createHotel(hotelData, userId);

    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("hotel/create", { error, data: hotelData });
  }
});

export default hotelController;
