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

const initialState = {
    dogs: [],
    rdogs:[],
    detail: {},
    temp: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                rdogs: action.payload
            }
        case DOG_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                detail: {}
            }
        case CLEAN_DOG: 
            return{
                ...state,
                dogs: []
            }
        case GET_DOGS_NAME:
            return{
                ...state,
                rdogs: action.payload
            }
        case FILTER_DOGS_ASDE:
            const orderAscDesc=  
            action.payload === "ascendente"
            ? state.dogs.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return 1;
                }     
                if(b.name.toLowerCase()>a.name.toLowerCase()){
                    return -1;
                }
                return 0;    
            })
            :state.dogs.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return -1;
                }     
                if(b.name.toLowerCase()>a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                rdogs: [...orderAscDesc]
            }
            
        case FILTER_DOGS_MAXMIN:
            const ordenWeight=
            action.payload === "min-weight"
            ? state.dogs.sort((a,b)=>{
                return a.weight[0]-b.weight[0];
            }): action.payload === "mimimo-weight"? 
            state.dogs.sort((a,b)=>{
                return b.weight[0]-a.weight[0];
            }): action.payload === "max-weight"? 
             state.dogs.sort((a,b)=>{
                return a.weight[1]-b.weight[1];
             })
            : state.dogs.sort((a,b)=>{
                return b.weight[1]-a.weight[1];
            })                      
                
            return {
                ...state,
                rdogs: [...ordenWeight]
            }

        case GET_TEMPERAMENT: 
            return {
                ...state,
                temp: action.payload
            }
        case CREATE_DOGS: 
        return{
            ...state
        }
        case FILTER_DOGS_TEMPER:
            const allDogs = state.dogs;
            let filterDogs = [];
            if(action.payload === "Todos"){
                filterDogs = allDogs;
            }else{
                for (let i = 0; i < allDogs.length; i++){
                    if(allDogs[i].id.length===36){
                        let filterb = allDogs[i].Temperaments.find((t) => t.name===action.payload);
                        if(filterb){
                            filterDogs.push(allDogs[i])
                        }
                    }else{
                        let filtera = allDogs[i].temperament.find((t) => t===action.payload);                    
                        if(filtera){
                            filterDogs.push(allDogs[i])
                        } 
                    }                                                
                                
                }
            }
            return {
                ...state,
                rdogs: filterDogs
            }
        case FILTER_CREATED:
            let filterCode;
            if(action.payload === "Created"){
                filterCode = state.dogs.filter((el)=>el.id.length > 6);
            }
            if(action.payload === "All"){
                filterCode = state.dogs;
            }                       
            return{
                ...state,
                rdogs: filterCode,
            }
        case SET_LOADING:
            return{
                ...state,
                loading: false,
            }

        default:
            return {...state}
    }
}

export default reducer;