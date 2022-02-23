const Auto = require('../models/Autos');
const axios = require('axios');

async function listall(req, res) {
    const {page, perPage, filter} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 9) || 9,
    }
    let autos
    let temp = JSON.parse(filter)
    console.log('filter', filter)
    if(temp.buscar === "")
      autos = await Auto.paginate({ category: temp.categoria }, options)
    else
      autos = await Auto.paginate({make: { $regex: temp.buscar }, category: temp.categoria}, options)
    // filtros
    
    return res.json(autos)
}

function create(req, res) {
    let auto = new Auto(req.body);
    auto.save()
        .then(auto => 
            res.status(201).send({auto})
        ).catch(err => res.status(500).send({err}))
    
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.autos) return res.status(404).send({message: 'Not Found'});
    let autos = req.body.autos;
    return res.status(200).send({autos});
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.autos) return res.status(404).send({message: 'Not Found'});
    let auto = req.body.autos[0];
    auto = Object.assign(auto, req.body);
    auto.save()
        .then(auto => res.status(200).send({message: 'Auto Updated', auto})
    ).catch(err => res.status(500).send({err}))
}

function deleted(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.autos) return res.status(404).send({message: 'Not Found'});
    req.body.autos[0].remove()
        .then(auto => {
            res.status(200).send({message:'Auto removed', auto})
        }
        ).catch(err => res.status(500).send({err}));
}

function find(req, res, next){
    let query = {};
    query[req.params.key] = req.params.value
    Auto.find(query).then(autos => {
        if(!autos.length) return next();
        req.body.autos = autos;
        return next();
    }).catch(err =>{
        req.body.error = err;
        next();
    })
}

module.exports = {
    listall,
    show,
    create,
    update,
    deleted,
    find,
}