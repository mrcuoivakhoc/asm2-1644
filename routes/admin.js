const express = require("express");
const router = express.Router();
const CarModel = require('../models/CarModel');
const RobotModel = require('../models/RobotModel');
const UserModel = require('../models/UserModel'); 
const OriginModel = require('../models/OriginModel');

router.get('/', async (req, res) => {
  var cars = await CarModel.find().populate('origin'); // Sử dụng populate để lấy thông tin về origin
  var robots = await RobotModel.find().populate('origin'); // Sử dụng populate để lấy thông tin về origin
  res.render('admin/index', { cars: cars , robots: robots });
});

router.get('/login', async (req, res) => {
    res.render('admin/login')});
    router.post('/login', async (req, res) => {

        var login = await UserModel.findOne(
          {
            username: req.body.username,
            password: req.body.password
          }
        )
        //điều hướng web khi login succeed (vào trang admin) hoặc login fail (về lại trang login)
        if (login)  //login == true
          res.redirect('/admin')
        else
          res.redirect('/admin/login');
      })

module.exports = router;