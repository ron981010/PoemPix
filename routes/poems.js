const express = require('express');
const router = express.Router();
const poemsController = require('../controllers/poems');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all poems
router.get('/', poemsController.getAllpoems);

// GET a single poem
router.get('/:id', poemsController.getpoemById);

// POST a new poem
router.post(
  '/',
  requiresAuth(),
  isAuthenticated,
  validation.savepoems,
  poemsController.createpoem
);

// PUT update data in an existing poem
router.put(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  validation.savepoems,
  poemsController.updatepoem
);

// DELETE a poem
router.delete(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  poemsController.deletepoem
);


module.exports = router;