import styled from "./Navbar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs, filterDogsAscDesc, getTemperament, filterCreated, filterDogsMaxMin, filterDogTemper } from "../../redux/actions";
import logo from "./logo.png";  
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = (props) => {

    const dispatch = useDispatch();
    /*Estado de icono de menu*/
    const [clicked, setClicked] = useState(false);
    /*Estado para limpiar select y option*/
    const [filter, setFilter]=useState('')

    const temperament = useSelector((state)=>state.temp);
    

    useEffect(()=>{
        dispatch(getTemperament());
    },[dispatch])

    const handleOrderAZ = (e) => {
        e.preventDefault();
        dispatch(filterDogsAscDesc(e.target.value)); 
        
    }

    const handleMaxMin = (e) => {
        e.preventDefault();
        dispatch(filterDogsMaxMin(e.target.value));
        
    }

    const handleTemper = (e) => {
        e.preventDefault();
        dispatch(filterDogTemper(e.target.value));
        
    }

    const handleCreated = (e) =>{
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
               
    }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(getDogs());
        setFilter('');

    }


    return(
        <header className={styled.header}>
        <div className={styled.nav}>

            <Link to='/'><img src={logo} alt={logo} className={styled.logo}/></Link>

            <SearchBar onSearch = {props.onSearchName} />

            <button className={styled.menudesp}
            onClick={()=>setClicked(!clicked)}
            >
                {
                    clicked ? (<i><FaTimes/></i>)
                    :
                    (<i><FaBars/></i>)
                }
            </button>
           
            <ul className={clicked? styled.navluvisible : styled.navlu} onClick={()=>setClicked(false)}>
                        
            <li className={styled.navli}>
            <button className={styled.button}><Link to='/newdog' className={styled.linknewdog} >Agregar Perro</Link></button>
            </li>
            <button className={styled.button}  onClick={(e)=>handleReset(e)}>Reset</button>

            <li className={styled.navli}>
            <select onChange={(e)=>handleOrderAZ(e)} value={filter} className={styled.selected}>
                <option defaultValue="">Ordenar por ABC</option>
                <option value="ascendente">A-Z</option>
                <option value="descendente">Z-A</option>
            </select>
            </li>

            <li className={styled.navli}>
            <select onChange={(e)=>handleMaxMin(e)} value={filter} className={styled.selected}>
                <option defaultValue="">Ordenar por Peso </option>
                <option value="min-weight">Mínimo Asc</option>                
                <option value="mimimo-weight">Mínimo Desc</option>
                <option value="max-weight">Máximo Asc</option>
                <option value="maximo-weight">Máximo Dsc</option>
            </select>
            </li>

            <li className={styled.navli}>
            <select onChange={(e)=>handleTemper(e)} value={filter} className={styled.selected}>
                <option defaultValue="">Ordenar por Temperamento</option>
                <option value="Todos">Todos</option>
                {temperament.map((t)=>{
                    return(
                        <option value={t.name} key={t.id}>
                            {t.name}
                        </option>
                    )
                })}
            </select>
            </li>

            <li className={styled.navli}>
            <select onChange={(e)=>handleCreated(e)} value={filter} className={styled.selected}>
                <option defaultValue="">Ordenar por Origen</option>
                <option value="All">Api</option>
                <option value="Created">Db</option>
            </select>
            </li>

            </ul>             
        </div>
        </header>
    )
} 

export default Navbar;
