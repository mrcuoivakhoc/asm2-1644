const express = require("express");
const router = express.Router();
const RobotModel = require('../models/RobotModel');
const OriginModel = require('../models/OriginModel');

router.get('/add', async (req, res) => {
    try {
        const origins = await OriginModel.find();
        res.render('robot/add', { origins: origins });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
        const robotData = req.body;
        const robot = new RobotModel(robotData);
        await robot.save();
        console.log('Add robot succeed !');
        res.redirect('/admin');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await RobotModel.findByIdAndDelete(id);
        console.log('Robot deleted successfully');
        res.redirect('/admin');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const robot = await RobotModel.findById(id);
        const origins = await OriginModel.find();
        res.render('robot/edit', { robot: robot, origins: origins });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const robotData = req.body;
        await RobotModel.findByIdAndUpdate(id, robotData);
        console.log('Update robot succeed !');
        res.redirect('/admin');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/show', async (req, res) => {
    try {
        const robots = await RobotModel.find();
        res.render('robot/show', { robots: robots });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const robot = await RobotModel.findById(id).populate('origin');
        res.render('robot/detail', { robot: robot });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
