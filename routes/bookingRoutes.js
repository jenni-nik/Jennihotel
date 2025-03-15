const express = require("express");
const fs = require("fs");
const router = express.Router();

const bookingsFile = "./models/bookings.json"; 

const readBookings = () => {
  if (!fs.existsSync(bookingsFile)) {
    fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
  }
  return JSON.parse(fs.readFileSync(bookingsFile));
};

const writeBookings = (bookings) => {
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
};


router.get("/", (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});


router.post("/", (req, res) => {
  const bookings = readBookings();
  const newBooking = { id: bookings.length + 1, ...req.body };
  bookings.push(newBooking);
  writeBookings(bookings);
  res.status(201).json(newBooking);
});


router.put("/:id", (req, res) => {
  let bookings = readBookings();
  const index = bookings.findIndex((b) => b.id === parseInt(req.params.id));
  
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...req.body };
    writeBookings(bookings);
    res.json(bookings[index]);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});


router.delete("/:id", (req, res) => {
  let bookings = readBookings();
  const newBookings = bookings.filter((b) => b.id !== parseInt(req.params.id));
  
  if (bookings.length !== newBookings.length) {
    writeBookings(newBookings);
    res.json({ message: "Booking deleted" });
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

module.exports = router;