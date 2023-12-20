var express = require('express');
var router = express.Router();
const OriginModel = require('../models/OriginModel');
const CarModel = require('../models/CarModel');
const RobotModel = require('../models/RobotModel'); // Import Car and Robot models if needed

// Display a list of origins
router.get('/', async (req, res) => {
   try {
      var origins = await OriginModel.find({});
      res.render('origin/index', { origins });
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Display the form to add a new origin
router.get('/add', (req, res) => {
   res.render('origin/add');
});
router.get('/index', (req, res) => {
   res.redirect('/origin');
});


// Handle the submission of the new origin form
router.post('/add', async (req, res) => {
   try {
      var originData = req.body;
      await OriginModel.create(originData);
      console.log('Add origin succeed !');
      res.redirect('/origin');
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Display details of a specific origin
router.get('/detail/:id', async (req, res) => {
   try {
      var id = req.params.id;
      var cars = await CarModel.find({ origin: id }).populate('origin');
      var robots = await RobotModel.find({ origin: id }).populate('origin');
      res.render('origin/detail', { cars, robots });
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Handle the deletion of an origin
router.get('/delete/:id', async (req, res) => {
   try {
      var id = req.params.id;
      await OriginModel.findByIdAndDelete(id);
      console.log('Delete origin succeed !');
      res.redirect('/origin');
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Display the edit form for an origin
router.get('/edit/:id', async (req, res) => {
   try {
      var id = req.params.id;
      var origin = await OriginModel.findById(id);
      res.render('origin/edit', { origin });
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

// Handle the submission of the edit form for an origin
router.post('/edit/:id', async (req, res) => {
   try {
      var id = req.params.id;
      var updatedOrigin = req.body;
      await OriginModel.findByIdAndUpdate(id, updatedOrigin);
      console.log('Update origin succeed !');
      res.redirect('/origin');
   } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
   }
});

module.exports = router;
