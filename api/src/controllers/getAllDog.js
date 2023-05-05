const axios = require('axios');

require('dotenv').config();

const { Router } = require('express');
const urlDogApi = `https://api.thedogapi.com/v1/breeds`;
const { Dog, Temperament } = require('../db');

const router = Router();

const getAllDogApi = async ()=>{
    const dogApi = await axios(urlDogApi);
    const allDogApi = dogApi.data.map((dog)=>{
        let tempArray = [];
        if(dog.temperament){
            tempArray = dog.temperament.split(", ");
        }

        let heightArray = [];
        if(dog.height.metric){
            heightArray = dog.height.metric.split(" - ");
        }

        let weightArray = [];
        if(dog.weight.metric){
            weightArray = dog.weight.metric.split(" - ");
        }
        return {
            id: dog.id,
            image: dog.image.url,
            name: dog.name,
            height: heightArray,
            weight: weightArray,
            temperament: tempArray,
            life_span: dog.life_span
        }
    })
    return allDogApi;
}

const getAllDogDb = async ()=>{
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            throuth: {
                attributes: []
            }
        }
    });
}

const getAllTemp = async () =>{
    return await Temperament.findAll();
}


const getAllApiDb = async ()=>{
    const getAllDogApi2 = await getAllDogApi();
    const getAllDogDb2 = await getAllDogDb();
    const getAll = [...getAllDogApi2, ...getAllDogDb2]
    return getAll;
}

router.get("/temp", async (req, res)=>{
    try {
        const allTem = await getAllTemp();
        return res.status(200).send(allTem)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})

router.get("/", async (req, res)=>{
    try {
        const { name } = req.query;
    const getAllDog = await getAllApiDb(name);     
        if(name){
            const dogName = getAllDog.filter((dog)=>dog.name.toLowerCase().includes(name.toLowerCase()));
            
            if(dogName.length){            
                return res.status(200).send(dogName);
            }else{
                return res.status(400).send('No existe el perro con ese nombre')
            }
        }else{
            return res.status(200).send(getAllDog);
            }
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})
/* Filtrar por minimo de peso
router.get("/:weight", async (req, res)=>{
    try {
        const { weight } = req.params;
    const allDog = await getAllApiDb();
    const dogWeight = allDog.filter((dog)=>dog.weight[0]===weight);
    if(dogWeight.length){
        return res.status(200).send(dogWeight)
    }else{
        return res.status(400).send('El peso minimo ingresado no existe');
    }
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})
*/

router.get("/:idRace", async (req, res)=>{
    try {
        const { idRace } = req.params;
        const allDog = await getAllApiDb();
        const dogRace = allDog.filter((dog)=>dog.id==idRace);
        if(dogRace.length){
            return res.status(200).send(dogRace);
        }else{
            return res.status(400).send('el Id de perro de raza no existe');
        }
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})





  module.exports = router;