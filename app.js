
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layout'),
  helpers: {
    eq: (a, b) => a === b
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const homeRoutes = require('./routes/home.routes');
const seriesRoutes = require('./routes/series.routes');
const genresRoutes = require('./routes/genres.routes');

app.use('/', homeRoutes);
app.use('/series', seriesRoutes);
app.use('/genres', genresRoutes);

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
