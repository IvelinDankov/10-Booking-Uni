import { Router } from "express";

const hotelController = Router();

hotelController.get("/add", (req, res) => {
  res.render("hotel/create");
});

hotelController.post("/add", async (req, res) => {
  const hotelData = req.body;

  const newHotel = await hotesService.createHotel(hotelData);
});

export default hotelController;
