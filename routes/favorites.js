const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorites');

//GET all favorite poems
router.get('/', favoriteController.getAllFavoritePoems);

// GET a user favorite poem
router.get('/:id', favoriteController.getFavoritePoem);

// PUT a user favorite poem
router.post('/', favoriteController.addFavoritePoem);

// UPDATE favorite poem
router.put('/:id', favoriteController.updateFavorite);

// DELETE favorite poem
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;