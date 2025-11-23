
const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/series.controller');

router.get('/', seriesController.index);
router.get('/create', seriesController.createForm);
router.post('/create', seriesController.create);
router.get('/edit/:id', seriesController.editForm);
router.post('/edit/:id', seriesController.update);
router.get('/delete/:id', seriesController.confirmDelete);
router.post('/delete/:id', seriesController.delete);

module.exports = router;
