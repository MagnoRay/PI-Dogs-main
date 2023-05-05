import { Link } from "react-router-dom";
import { getTemperament, postDog, getDogs} from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { validate } from "./validate";
import styled from "./FormDogs.module.css";

const FormDogs = () => {

    const dispatch = useDispatch();
   
    const temperament = useSelector((state)=>state.temp)

    const [input, setInput] = useState({
        name: "",
        heightmin: "",
        heightmax: "",
        weightmin: "",
        weightmax: "",
        life_span: "",
        image:"",
        temperament: []
    });

    const [errors, setErrors] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        const {name, heightmin, heightmax, weightmin, weightmax, life_span, image, temperament} = input
        if(name && heightmin && heightmax && weightmin && weightmax && life_span && image && temperament !==0){
            dispatch(postDog(input))
            alert('Dogs Created successfully')
        }else{
            alert('Some field is missing information.');
        }
        setInput({
            name: "",
            heightmin: "",
            heightmax: "",
            weightmin: "",
            weightmax: "",
            life_span: "",
            image:"",
            temperament: []
        })
        dispatch(getDogs());
    }

    useEffect(()=>{
        dispatch(getTemperament())
    },[dispatch])

    useEffect(()=>{
        setErrors(
            validate({
                ...input,
            })
        );
    }, [input]);

    function handleSelect(e){
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value],
            });
        }
        
    }

    let btnDisabled = Object.values(validate(input)).length > 0;

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
              ...input,
              [e.target.name]: [e.target.value],
            })
          );
    }  

    const handleDeleteType = (e) =>{
        setInput({
            ...input,
            temperament: input.temperament.filter((t)=>t !==e)
        });
    }

    return(
        <div className={styled.divdet}>
            <Link to="/home">
                    <button className={styled.btn}>Back</button>
                </Link>
            <form className={styled.formdog} onSubmit={(e)=>handleSubmit(e)}>
                <ul className={styled.ul1}>
                    <li>
                        <input className={styled.inputn} type="text" name="name" value={input.name} placeholder="Nombre Dog" onChange={(e)=>handleChange(e)} />
                        {errors.name && <p className={styled.perror}>{errors.name}</p>}
                    </li>
                    <li>
                        <input className={styled.inputn} type="text" name="heightmin" value={input.heightmin} placeholder="Altura Mínima" onChange={(e)=>handleChange(e)} />
                        {errors.heightmin && <p className={styled.perror}>{errors.heightmin}</p>}
                    </li>
                    <li>
                        <input className={styled.inputn} type="text" name="heightmax" value={input.heightmax} placeholder="Altura Máxima" onChange={(e)=>handleChange(e)} />
                        {errors.heightmax && <p className={styled.perror}>{errors.heightmax}</p>}
                    </li>
                    <li>
                        <input className={styled.inputn} type="text" name="weightmin" value={input.weightmin} placeholder="Peso Mínima" onChange={(e)=>handleChange(e)} />
                        {errors.weightmin && <p className={styled.perror}>{errors.weightmin}</p>}
                    </li>    
                    <li>
                        <input className={styled.inputn} type="text" name="weightmax" value={input.weightmax} placeholder="Peso Máximo" onChange={(e)=>handleChange(e)} />
                        {errors.weightmax && <p className={styled.perror}>{errors.weightmax}</p>}
                    </li>
                    <li>
                        <input className={styled.inputn} type="text" name="life_span" value={input.life_span} placeholder="Años de Vida" onChange={(e)=>handleChange(e)} />
                        {errors.life_span && <p className={styled.perror}>{errors.life_span}</p>}
                    </li>
                    <li>
                        <input className={styled.inputn} type="text" name="image" value={input.image} placeholder="Url del Dog" onChange={(e)=>handleChange(e)} />
                        {errors.image && <p className={styled.perror}>{errors.image}</p>}
                    </li>
                    <li>
                        <select className={styled.selectedt} onChange={(e)=>handleSelect(e)} defaultValue="title" disabled={input.temperament>=2}>
                            <option name="temperament" disabled value="title">Temperamentos</option>
                            {temperament.map((t)=>{
                                return(
                                    <option value={t.name} key={t.name} >
                                        {t.name[0].toUpperCase()+t.name.slice(1)}
                                    </option>
                                )
                            })                                
                            }
                        </select>
                        <ul>
                            {input.temperament.map((t)=>{
                                return(
                                    <li key={t} className={styled.litemp}>
                                        {t[0].toUpperCase() + t.slice(1)}
                                        <button onClick={()=>handleDeleteType(t)}>
                                            x
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                        {errors.temperament && <p className={styled.perror}>{errors.temperament}</p>}
                    </li>
                    <button type="submit" disabled={btnDisabled} className={styled.btnc}>Crear</button>
                </ul>
            </form>            
        </div>
    )
}

export default FormDogs;
