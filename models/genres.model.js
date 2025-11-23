
const fs = require('fs');
const path = require('path');

const genresFile = path.join(__dirname, '../data/genres.json');

function readGenres() {
  if (!fs.existsSync(genresFile)) return [];
  const data = fs.readFileSync(genresFile);
  return JSON.parse(data);
}

function writeGenres(genres) {
  fs.writeFileSync(genresFile, JSON.stringify(genres, null, 2));
}

module.exports = {
  getAll: () => readGenres(),

  getById: (id) => readGenres().find(g => g.id === id),

  create: (genre) => {
    const genres = readGenres();
    genres.push(genre);
    writeGenres(genres);
  },

  update: (id, updatedGenre) => {
    const genres = readGenres().map(g => g.id === id ? updatedGenre : g);
    writeGenres(genres);
  },

  delete: (id) => {
    const genres = readGenres().filter(g => g.id !== id);
    writeGenres(genres);
  }
};
