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

// POST a new poem with validation middleware
router.post(
  '/',
  requiresAuth(),
  isAuthenticated,
  validation.validateCreatePoem, // Add validation middleware for creating a new poem
  poemsController.createPoem
);

// PUT update data in an existing poem with validation middleware
router.put(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  validation.validateUpdatePoem, // Add validation middleware for updating a poem
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
