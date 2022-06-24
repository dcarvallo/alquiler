const Reserve = require('../models/Reservations');
const Auto = require('../models/Autos');

async function reserve(req, res){
    if(req.body.error) return res.status(500).send({error});
    console.log('this is it?')
    // const rese = await Reverve.find(req.body.id)
    const auto = await Auto.findById(req.body.id)
    let reserve = new Reserve(req.body);
    reserve.save()
    console.log(auto)
    // console.log(rese)
    return res.status(200).send({reserve});
}


async function listall(req, res) {
    // console.log(req.query)
    const {page, perPage, filter} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 9) || 9,
    }
    let autos
    let temp = JSON.parse(filter)
    if(temp.buscar === ""){
        
        autos = await Auto.paginate({ category: temp.category }, options)    
    }
    else
      autos = await Auto.paginate({make: { $regex: new RegExp(temp.buscar, 'i') }, category: temp.category}, options)
    
    return res.json(autos)
}

function create(req, res) {
    let auto = new Auto(req.body);
    auto.save()
    .then(auto => {
        console.log(auto)
        return res.status(201).send(auto)
    }
        ).catch(err => res.status(500).send({err:'error en la creacion'}))
        
        // const arr = ['Small', 'Medium', 'Large', "Minivan"]
        // for (i = 0; i < 50; i++) {
        //     let rando = Math.floor(Math.random()*4)
        //     let auto = new Auto({
        //         name: faker.vehicle.vehicle(),
        //         type: faker.vehicle.type(),
        //         model: faker.vehicle.model(),
        //         make: faker.vehicle.manufacturer(),
        //         img_url: faker.image.transport(700,700,true),
        //         category: arr[rando],
        //         color: faker.vehicle.color(),
        //     });
        //     auto.save()
        // }

}

async function show(req, res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.autos) return res.status(404).send({message: 'Not Found'});
    // let autos = req.body.autos;


    const auto = await Auto.findById(req.params.id)
    console.log(auto)
    return res.status(200).send({auto});
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
    reserve,
    listall,
    show,
    create,
    update,
    deleted,
    find,
}