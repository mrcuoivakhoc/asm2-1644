var express = require('express');
const CarModel = require('../models/CarModel');
const RobotModel = require('../models/RobotModel');
const OriginModel = require('../models/OriginModel');

var router = express.Router();

router.get('/', async (req, res) => {
  var cars = await CarModel.find();
  var robots = await RobotModel.find();
  res.render('home/index', { cars: cars, robots: robots});
});
router.get('/show', async (req, res) => {
  var cars = await CarModel.find();
  var robots = await RobotModel.find();
  res.render('home/listproduct', { cars: cars , robots: robots });
});
router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  // Relative search
  var cars = await CarModel.find({ name: new RegExp(keyword, "i") });
  var robots = await RobotModel.find({ name: new RegExp(keyword, "i") });
  res.render('home/listproduct', { cars: cars , robots: robots });
});

module.exports = router;