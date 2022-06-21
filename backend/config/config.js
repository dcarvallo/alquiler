// require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4000,
    DB: process.env.MONGODB || 'mongodb://localhost:27017/alquiler-autos'
}