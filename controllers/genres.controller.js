
const genresModel = require('../models/genres.model');
const { v4: uuidv4 } = require('uuid');

exports.index = (req, res) => {
  const genres = genresModel.getAll();
  res.render('genres/index', { genres });
};

exports.createForm = (req, res) => {
  res.render('genres/create');
};

exports.create = (req, res) => {
  const { name } = req.body;
  if (!name) return res.redirect('/genres/create');

  const newGenre = {
    id: uuidv4(),
    name
  };

  genresModel.create(newGenre);
  res.redirect('/genres');
};

exports.editForm = (req, res) => {
  const genre = genresModel.getById(req.params.id);
  if (!genre) return res.redirect('/genres');
  res.render('genres/edit', { genre });
};

exports.update = (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  if (!name) return res.redirect(`/genres/edit/${id}`);

  const updatedGenre = { id, name };
  genresModel.update(id, updatedGenre);
  res.redirect('/genres');
};

exports.confirmDelete = (req, res) => {
  const genre = genresModel.getById(req.params.id);
  if (!genre) return res.redirect('/genres');
  res.render('genres/delete', { genre });
};

exports.delete = (req, res) => {
  genresModel.delete(req.params.id);
  res.redirect('/genres');
};
