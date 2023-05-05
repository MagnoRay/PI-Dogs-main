import styled from './FiltroDogs.module.css';
import { useEffect } from 'react';
import { filterCreated, filterDogTemper, filterDogsAscDesc, filterDogsMaxMin, getTemperament } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux'
const FiltroDogs = () => {
    const dispatch = useDispatch();

    const temperament = useSelector((state)=>state.temp);

    useEffect(()=>{
        dispatch(getTemperament());
    },[dispatch])

    const handleCreated = (e) =>{
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }


    return(
        <div className={styled.container}>
            <select onChange={(e)=>dispatch(filterDogsAscDesc(e.target.value))} className={styled.selected}>
                <option defaultValue="">Ordenar por ABC</option>
                <option value="ascendente">A-Z</option>
                <option value="descendente">Z-A</option>
            </select>

            <select onChange={(e)=>dispatch(filterDogsMaxMin(e.target.value))} className={styled.selected}>
                <option defaultValue="">Ordenar por Peso </option>
                <option value="min-weight">Mínimo Asc</option>                
                <option value="mimimo-weight">Mínimo Desc</option>
                <option value="max-weight">Máximo Asc</option>
                <option value="maximo-weight">Máximo Dsc</option>
            </select>

            <select onChange={(e)=>dispatch(filterDogTemper(e.target.value))} className={styled.selected}>
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

            <select onChange={(e)=>handleCreated(e)} className={styled.selected}>
                <option defaultValue="">Ordenar por Origen</option>
                <option value="All">Api</option>
                <option value="Created">Db</option>
            </select>
            
        </div>
    )
}

export default FiltroDogs;