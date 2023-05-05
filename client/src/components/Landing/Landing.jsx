import React from "react";
import { Link } from "react-router-dom";
import styled from "./Landing.module.css";

const Landing = () => {
    return(
        <div className={styled.divb}>
            <div className={styled.divtittle}>
                <h1 className={styled.h1land}>Bienvenido al API de Perros</h1>
            </div>
            <p className={styled.pland}>Aquí encontrarás una variedad de Perros. No existen los malos días si en casa te espera un PERRO</p>
            <Link to="/home">
            <button className={styled.buttonlan1}>Explorar Dogs</button>
            </Link>
        </div>
    )

}

export default Landing;