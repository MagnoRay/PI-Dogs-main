import { GET_DOGS,
         DOG_DETAIL,
         CLEAN_DETAIL,
         CLEAN_DOG,
         GET_DOGS_NAME, 
         FILTER_DOGS_ASDE,
         FILTER_DOGS_MAXMIN,
         GET_TEMPERAMENT,
         CREATE_DOGS,
         FILTER_DOGS_TEMPER,
         FILTER_CREATED,
         SET_LOADING} from "./action-types";
import axios from "axios";

export const getDogs = () => {
    return async function(dispatch){
        let response = await axios("/dogs");
        return dispatch({type: GET_DOGS, payload: response.data})
    }
}
/*
export const getDogDetail1 = (id) => {
    return function(dispatch){
        fetch(`/dogs/${id}`)
        .then(response=>response.json())
        .then(data=>dispatch({type: DOG_DETAIL, payload: data}))
    }
}*/

export const getDogDetail = (id) => {
    return async function(dispatch){
        let response = await axios(`/dogs/${id}`);
        return dispatch({type: DOG_DETAIL, payload: response.data})
    }
}


export const cleanDetail = () =>{
    return {type: CLEAN_DETAIL}
}

export const cleanDog = () =>{
    return {type: CLEAN_DOG}
}

export const onSearchName = (name) =>{     
    return async function (dispatch){
        try {
            let response = await axios(`/dogs?name=${name}`);
            return dispatch({type: GET_DOGS_NAME, payload: response.data})
        } catch (error) {
            alert('Dog con ese nombre no existe!')
            console.log(error)
        }
    }
}

export const filterDogsAscDesc = (id) =>{
    return {
        type: FILTER_DOGS_ASDE,
        payload: id
    }
}

export const filterDogsMaxMin = (weight) => {
    return {
        type: FILTER_DOGS_MAXMIN,
        payload: weight
    }
}

export const getTemperament = () => {
    return async function(dispatch){
        let response = await axios("/dogs/temp");
        return dispatch({type: GET_TEMPERAMENT, payload: response.data})
    }
}

export const postDog = (payload) => {
    return async function(dispatch){
        let response = await axios.post("/newdog", payload);
        return dispatch({type: CREATE_DOGS, payload: response})
    }
}

export const filterDogTemper = (filter) => {
    return function (dispatch){
        return dispatch({type: FILTER_DOGS_TEMPER, payload: filter})
    }
}

export const filterCreated = (payload)=>{
    return{
        type: FILTER_CREATED,
        payload,
    }
}

export const setLoading = () =>{
    return{
        type: SET_LOADING,
    }
}


