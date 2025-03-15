const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();


const HOTELS_FILE = path.join(__dirname, "../models/hotels.json");


const getHotels = () => {
    const data = fs.readFileSync(HOTELS_FILE);
    return JSON.parse(data);
};


const saveHotels = (hotels) => {
    fs.writeFileSync(HOTELS_FILE, JSON.stringify(hotels, null, 2));
};


router.get("/", (req, res) => {
    const hotels = getHotels();
    res.json(hotels);
});


router.get("/:id", (req, res) => {
    const hotels = getHotels();
    const hotel = hotels.find((h) => h.id === parseInt(req.params.id));
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
});


router.post("/", (req, res) => {
    const hotels = getHotels();
    const newHotel = {
        id: hotels.length ? hotels[hotels.length - 1].id + 1 : 1,
        name: req.body.name,
        location: req.body.location,
        price: req.body.price
    };
    hotels.push(newHotel);
    saveHotels(hotels);
    res.status(201).json(newHotel);
});


router.put("/:id", (req, res) => {
    let hotels = getHotels();
    const hotelIndex = hotels.findIndex((h) => h.id === parseInt(req.params.id));
    if (hotelIndex === -1) return res.status(404).json({ message: "Hotel not found" });

    hotels[hotelIndex] = { ...hotels[hotelIndex], ...req.body };
    saveHotels(hotels);
    res.json(hotels[hotelIndex]);
});


router.delete("/:id", (req, res) => {
    let hotels = getHotels();
    const filteredHotels = hotels.filter((h) => h.id !== parseInt(req.params.id));

    if (hotels.length === filteredHotels.length) return res.status(404).json({ message: "Hotel not found" });

    saveHotels(filteredHotels);
    res.json({ message: "Hotel deleted successfully" });
});

module.exports = router;
