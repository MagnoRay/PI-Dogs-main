import { createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer"
import thunkMiddleware from "redux-thunk";
//applyMiddleware nos permite hacerlas peticiones al api 
// compose conecta con la extensión del navegador

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;
// La linea precedente nos sirve para conectarnos con la extensión del navegador => REDUX DEVTOOLS

const store = createStore(reducer, 
    composeEnhacer(applyMiddleware(thunkMiddleware)) // Peticiones a la API
    )

export default store;