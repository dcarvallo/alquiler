const Filter = require('../models/filters')

async function list(req, res) {
    // filtros
    const filtros = await Filter.findOne({});
    // console.log(filtros.category[0].tamanio);
    return res.json(filtros)
}

module.exports = {
    list,
}