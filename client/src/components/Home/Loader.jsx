import React from "react";
import styled from "./Home.module.css";
import loading from "../../image/loading.gif";

const Loader = () => {
    return(
        <div className={styled.divload}>
            <img src={loading} alt={loading}/>
            <span className={styled.spanload}>Cargando...</span>
        </div>
    )
}

export default Loader;