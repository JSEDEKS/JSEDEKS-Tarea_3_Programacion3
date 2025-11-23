
const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres.controller');

router.get('/', genresController.index);
router.get('/create', genresController.createForm);
router.post('/create', genresController.create);
router.get('/edit/:id', genresController.editForm);
router.post('/edit/:id', genresController.update);
router.get('/delete/:id', genresController.confirmDelete);
router.post('/delete/:id', genresController.delete);

module.exports = router;
