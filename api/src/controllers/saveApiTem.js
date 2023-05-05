const axios = require('axios');

require('dotenv').config();


const urlDogApi = `https://api.thedogapi.com/v1/breeds`;
const { Temperament } = require('../db');



const getAllDogApi = async ()=>{
    const dogApi = await axios(urlDogApi);
    const allDogApi = dogApi.data.map((dog)=>{
        let tempArray = [];
        if(dog.temperament){
            tempArray = dog.temperament.split(", ");
        }
        return {
            temperament: tempArray
        }
    })
    return allDogApi;
}


const getDogTem = async ()=>{
    // asignando el api de los perros a dogApiTem
    const dogApiTem = await getAllDogApi();
    const allDogApiTem = dogApiTem.map(temp=>temp.temperament)
    
    // Concatenando todos los arreglos de temperatura
    let allDogTem = [];
    allDogApiTem.map(dog=>{allDogTem=allDogTem.concat(dog)})
    // Eliminando los temperaturas repitentes
    let allDogRep = allDogTem.filter((ele, ind, arr)=>{
        return arr.indexOf(ele)===ind
    })
    
    return allDogRep;

}

const saveApiTemp = async () =>{
    const allTemp = await getDogTem();
    const allTempMap = allTemp.map((t)=>{
        Temperament.create({name:t})
    })
    return allTempMap;
}

module.exports = {
    saveApiTemp
}
