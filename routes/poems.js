const express = require('express');
const router = express.Router();
const poemsController = require('../controllers/poems');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all poems
router.get('/', poemsController.getAllPoems);

// GET a single poem
router.get('/:id', poemsController.getPoemById);

// POST a new poem
router.post(
  '/',
  requiresAuth(),
  isAuthenticated,
  validation.savePoems,
  poemsController.createPoem
);

// PUT update data in an existing poem
router.put(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  validation.savePoems,
  poemsController.updatePoem
);

// DELETE a poem
router.delete(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  poemsController.deletePoem
);

module.exports = router;

