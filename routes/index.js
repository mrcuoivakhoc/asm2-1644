var express = require('express');
const UserModel = require('../models/UserModel');
var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home');
})

router.post('/', async (req, res) => {

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
    res.redirect('/index');
})

module.exports = router;
