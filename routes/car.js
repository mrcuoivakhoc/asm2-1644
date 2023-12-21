const express = require("express");
const router = express.Router();
const CarModel = require('../models/CarModel');
const OriginModel = require('../models/OriginModel');

router.get('/', async (req, res) => {
    var cars = await CarModel.find().populate('origin'); // Sử dụng populate để lấy thông tin về origin
    var robots = await RobotModel.find().populate('origin'); // Sử dụng populate để lấy thông tin về origin
    res.render('car/edit', { cars: cars , robots: robots });
  });

router.get('/add', async (req, res) => {
    try {
        // Truy vấn dữ liệu nguồn gốc từ cơ sở dữ liệu
        const origins = await OriginModel.find();

        // Render trang thêm xe và chuyển dữ liệu nguồn gốc vào template
        res.render('car/add', { origins: origins });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
        var car = req.body;
        await CarModel.create(car);
        console.log('Add car succeed !');
        res.redirect('/admin');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await CarModel.findByIdAndDelete(id);
    console.log('Car deleted successfully');
    res.redirect('/admin');
});

router.get('/edit/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var car = await CarModel.findById(id);
        var origins = await OriginModel.find(); // Fetch origin data
        res.render('car/edit', { car: car, origins: origins }); // Pass origins data to the template
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var car = req.body;
    await CarModel.findByIdAndUpdate(id, car);
    console.log('Update car succeed !');
    res.redirect('/admin');
});

router.get('/show', async (req, res) => {
    var cars = await CarModel.find();
    res.render('car/show', { cars: cars });
});

router.get('/detail/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const car = await CarModel.findById(id).populate('origin');
        res.render('car/detail', { car: car });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;



































// router.get('/sort/asc', async (req, res) => {
//     //SQL: SELECT * FROM mobiles ORDER BY model
//     var cars = await CarModel.find().populate('origin').sort({ model: 1 });
//     res.render('admin/index', { cars })
//   })