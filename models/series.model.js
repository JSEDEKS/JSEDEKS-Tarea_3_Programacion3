const fs = require('fs');
const path = require('path');

const seriesFile = path.join(__dirname, '../data/series.json');

function readSeries() {
  if (!fs.existsSync(seriesFile)) return [];
  const data = fs.readFileSync(seriesFile, 'utf-8');
  return JSON.parse(data);
}

function writeSeries(series) {
  fs.writeFileSync(seriesFile, JSON.stringify(series, null, 2));
}

// Convertir una URL de YouTube a formato embed
function convertirAEmbed(url) {
  const regexNormal = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const regexShort = /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/;
  const regexEmbed = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;

  let videoId = null;

  if (regexEmbed.test(url)) {
    return url;
  } else if (regexNormal.test(url)) {
    videoId = url.match(regexNormal)[1];
  } else if (regexShort.test(url)) {
    videoId = url.match(regexShort)[1];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

module.exports = {
  getAll: () => readSeries(),

  getById: (id) => readSeries().find(s => s.id === id),

  create: (serie) => {
    const series = readSeries();
    serie.video = convertirAEmbed(serie.video);
    series.push(serie);
    writeSeries(series);
  },

  update: (id, updatedSerie) => {
    updatedSerie.video = convertirAEmbed(updatedSerie.video);
    const series = readSeries().map(s => s.id === id ? updatedSerie : s);
    writeSeries(series);
  },

  delete: (id) => {
    const series = readSeries().filter(s => s.id !== id);
    writeSeries(series);
  }
};
