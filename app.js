const express = require('express');
const morgan = require('morgan');

const app = express();

const main = require('./views/main');
const path = require('path');

const Sequelize = require('sequelize');
const models = require('./models');


const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/stylesheets"));
app.use(express.urlencoded({ extended: false })); // for body-parse
app.use(express.json());

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

models.db.authenticate().
then(() => {
    console.log('connected to the database');
})

app.get('/', async (req, res, next) => {
    try {
    res.redirect('/wiki/');
    } catch (error) {
    res.send(error);
    }
})

const init = async () => {
    // await models.db.sync({force: true});
    await models.User.sync({force: true});
    await models.Page.sync({force: true});

    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
      });
}

init();