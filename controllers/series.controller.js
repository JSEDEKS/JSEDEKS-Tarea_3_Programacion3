
const seriesModel = require('../models/series.model');
const genresModel = require('../models/genres.model');
const { v4: uuidv4 } = require('uuid');


exports.index = (req, res) => {
  const series = seriesModel.getAll();
  const genres = genresModel.getAll();
  res.render('series/index', { series, genres });
};

exports.createForm = (req, res) => {
  const genres = genresModel.getAll();
  res.render('series/create', { genres });
};

exports.create = (req, res) => {
  const { name, image, video, genre } = req.body;
  if (!name || !image || !video || !genre) {
    return res.redirect('/series/create');
  }

  const newSerie = {
    id: uuidv4(),
    name,
    image,
    video,
    genre
  };

  seriesModel.create(newSerie);
  res.redirect('/series');
};

exports.editForm = (req, res) => {
  const serie = seriesModel.getById(req.params.id);
  const genres = genresModel.getAll();
  if (!serie) return res.redirect('/series');
  res.render('series/edit', { serie, genres });
};

exports.update = (req, res) => {
  const { name, image, video, genre } = req.body;
  const id = req.params.id;
  if (!name || !image || !video || !genre) {
    return res.redirect(`/series/edit/${id}`);
  }

  const updatedSerie = { id, name, image, video, genre };
  seriesModel.update(id, updatedSerie);
  res.redirect('/series');
};

exports.confirmDelete = (req, res) => {
  const serie = seriesModel.getById(req.params.id);
  if (!serie) return res.redirect('/series');
  res.render('series/delete', { serie });
};

exports.delete = (req, res) => {
  seriesModel.delete(req.params.id);
  res.redirect('/series');
};
