const express = require('express');
const router = express.Router();
const Car = require('../models/car');

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// SHOW ALL
router.get('/car', isLoggedIn, async (req, res) => {
  const cars = await Car.find();
  res.render('cars/index', { cars, user: req.user });
});

// CREATE FORM
router.get('/car/new', (req, res) => {
  res.render('cars/new');
});

// CREATE
router.post('/car', async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.redirect('/car');
});

// EDIT FORM
router.get('/car/edit/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.render('cars/edit', { car });
});

// UPDATE (carName cannot change)
router.put('/car/:id', async (req, res) => {
  const { price, seater } = req.body;
  await Car.findByIdAndUpdate(req.params.id, { price, seater });
  res.redirect('/car');
});

// DELETE
router.delete('/car/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/car');
});

module.exports = router;