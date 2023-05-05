require('dotenv').config();

const { Router } = require('express');
const { Dog, Temperament } = require('../db');

const router = Router();

router.post("/", async (req, res)=>{
    try {
    const { name, heightmin, heightmax, weightmin, weightmax, life_span, image, temperament } = req.body;
    if(!name || !heightmin || !heightmax || !weightmin || !weightmax || !life_span || !image){
        return res.status(400).send('Completar todos los campos');
    }
    
    const allHeight = [];
    allHeight.push(heightmin, heightmax);
    
    const allWeight = [];
    allWeight.push(weightmin, weightmax);

    const dog = await Dog.create({

        name,
        height: allHeight,
        weight: allWeight,
        life_span,
        image
    });
    //console.log(dog.__proto__);
   const asociateTemperament = await Temperament.findAll({
        where: {
            name: temperament
        },
    });
    dog.addTemperaments(asociateTemperament);    
    
    return res.status(200).send(dog);
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})

module.exports = router;