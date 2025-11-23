const seriesModel = require('../models/series.model');
const genreModel = require('../models/genres.model'); 

exports.index = (req, res) => {
  const { name, genre } = req.query;

  let series = seriesModel.getAll();
  const genres = genreModel.getAll();

  if (name) {
    series = series.filter(s =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  
  if (genre) {
    series = series.filter(s => s.genre === genre);
  }

  res.render('home/index', {
    series,
    genres,
    searchedName: name || '',
    selectedGenre: genre || ''
  });
};

exports.detail = (req, res) => {
  const serie = seriesModel.getById(req.params.id);
  if (!serie) return res.redirect('/');
  res.render('series/detail', { serie });
};
