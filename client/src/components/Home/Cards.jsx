import React from "react";

import styled from "./Home.module.css";
import Card from "../Card/Card";
const Cards = ({data})=>{
    return (
        <div className={styled.container}>
        {
        data?.map((dog)=>{
                return(
                    <div key={dog?.id}>
                        <Card           
                            id={dog?.id}
                            image={dog?.image}
                            name={dog?.name}
                            temperament={dog?.temperament}
                            temperamentb={dog?.Temperaments}
                            weight={dog?.weight}
                        />
                    </div>
                )
            })
        }
        </div> 
    );
}

export default Cards;