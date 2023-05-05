import styled from './SearchBar.module.css';
import { onSearchName } from "../../redux/actions";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cards from '../Home/Cards'

const SearchBar = () => {

const dispatch = useDispatch();

const [rdogs, setRdogs] = useState("");

const handleChange = (e) =>{
    setRdogs(e.target.value)
}

const handleSubmit = (e) =>{
    if(!rdogs.length){
        alert('Ingresa una Raza');        
    }
    else{
        e.preventDefault();
        dispatch(onSearchName(rdogs));
        setRdogs("");
    }
}

    return(
        <div>
        <div>
            <input type='search' placeholder='Buscar por nombre..!' onChange={handleChange} className={styled.input} />
            <button type='submit' onClick={(e)=>handleSubmit(e)} className={styled.button} >Buscar</button>
        </div>
        <Cards rdogs={rdogs} />
        </div>
    )
}

export default SearchBar;