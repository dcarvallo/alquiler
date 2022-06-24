require('dotenv').config();

const express = require('express')
const Database = require('./config/database');
const CONFIG = require('./config/config')
const bodyParser = require('body-parser');

const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints

var cors = require('cors');
const app = express()
const port = 4000

app.use(cors())

Database.connect();

const Auto = require('./routes/auto');
const Reserve = require('./routes/reserve');
const Filter = require('./routes/filtro');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auto', Auto);
app.use('/reserve', Reserve);
app.use('/filters', Filter);

console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`app en puerto:  ${port}`)
})