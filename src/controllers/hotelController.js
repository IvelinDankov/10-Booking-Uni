import { Router } from "express";
import hotelService from "../services/hotelService.js";
import errorMsg from "../utils/errorMsg.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";

const hotelController = Router();

hotelController.get("/add", authMiddleware.isAuth, (req, res) => {
  res.render("hotel/create");
});

hotelController.post("/add", authMiddleware.isAuth, async (req, res) => {
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

hotelController.get(
  "/:hotelId/book",
  authMiddleware.isAuth,
  async (req, res) => {
    const hotelId = req.params.hotelId;

    const userId = req.user.id;

    const hotel = await hotelService.getOne(hotelId);

    await userService.bookedHotels(userId, hotelId);

    await hotelService.book(hotelId, userId);

    res.redirect(`/hotels/${hotelId}/details`);
  }
);

hotelController.get("/:hotelId/details", async (req, res) => {
  const hotelId = req.params.hotelId;
  const userId = req.user?.id;

  try {
    const hotel = await hotelService.getOne(hotelId);

    const isOwner = String(hotel.owner) === userId;
    const booked = hotel.usersBooked.includes(userId);

    res.render("hotel/details", { hotel, isOwner, booked });
  } catch (err) {
    const error = errorMsg(err);
    res.render("/", { error });
  }
});

hotelController.get(
  "/:hotelId/edit",
  authMiddleware.isAuth,
  async (req, res) => {
    const hotelId = req.params.hotelId;
    const userId = req.user?.id;

    try {
      const hotel = await hotelService.getOne(hotelId);

      const isOwner = String(hotel.owner) === userId;

      if (!isOwner) {
        throw new Error("Access denied!");
      }
      const booked = hotel.usersBooked.includes(userId);

      res.render("hotel/edit", { hotel, isOwner, booked });
    } catch (err) {
      const error = errorMsg(err);
      res.render("404", { error });
    }
  }
);

hotelController.post(
  "/:hotelId/edit",
  authMiddleware.isAuth,
  async (req, res) => {
    const hotelId = req.params.hotelId;
    const hotelData = req.body;

    const updatedHotel = await hotelService.update(hotelId, hotelData);

    res.redirect(`/hotels/${hotelId}/details`);
  }
);
hotelController.get(
  "/:hotelId/delete",
  authMiddleware.isAuth,
  async (req, res) => {
    const id = req.params.hotelId;

    await hotelService.remove(id);

    res.redirect("/");
  }
);

export default hotelController;
