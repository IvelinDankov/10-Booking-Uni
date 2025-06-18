import { Router } from "express";
import hotelService from "../services/hotelService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const hotels = await hotelService.getAllHotels();
  res.render("home", { hotels });
});

export default homeController;
