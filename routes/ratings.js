const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratings');

// GET all ratings
router.get('/', ratingsController.getAllRatings);

// GET a user ratings 
router.get('/:id', ratingsController.getSingleRating);

// PUT a user ratings 
router.post('/', ratingsController.addRating);

// UPDATE ratings 
router.put('/:id', ratingsController.updateRating);

// DELETE ratings 
router.delete('/:id', ratingsController.deleteRating);

module.exports = router;