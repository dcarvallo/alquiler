const Auto = require('../models/Autos');
const Reserve = require('../models/Reservations');
const {faker} = require("@faker-js/faker");

async function listall(req, res) {
    
    const {page, perPage, filter} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 9) || 9,
    }
    let autos
    let temp = JSON.parse(filter)
    console.log(temp)
    const ranges = [ [200,300], [300,500], [550,600] ]
    console.log(ranges[temp.rangePrice])


    if(temp.buscar === ""){
        autos = await Auto.paginate({ category: temp.category,rentPrice:{ $gte: ranges[temp.rangePrice][0],$lte: ranges[temp.rangePrice][1] } }, options)    
    }
    // if(temp.rentPrice !== undefined){ 
    //     autos = await Auto.paginate({ category: temp.category, rentPrice:{ $gte: temp.rentPrice[0] }, rentPrice: { $lte: temp.rentPrice[1]} }, options)
    //     console.log(temp.rentPrice)
    // }
    else
      autos = await Auto.paginate({make: { $regex: new RegExp(temp.buscar, 'i') }, category: temp.category, rentPrice:{ $gte: ranges[temp.rangePrice][0], $lte: ranges[temp.rangePrice][1] } }, options)
    

    //   console.log(autos)
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
    const reserved = await Reserve.find({carId:req.params.id ,reserved: true})

    const auto = await Auto.findById(req.params.id)
    console.log(auto)
    return res.status(200).send({auto,reserved});
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