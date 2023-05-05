//import styled from "./Card.module.css";
import { Link } from "react-router-dom";
import styled1 from "styled-components";

const Card = ({id, image, name, temperament,temperamentb, weight}) => {
    return(
        <CardStyled>
        <div >
            
            <img  src={image} alt={name} />
            
            
                <h2>{name}</h2>           
                {
                    temperament? temperament.map((t)=>
                    <li key={t} >{t}</li>)
                    :
                    temperamentb.map((t)=>
                    <li key={t.name}>{t.name}</li>)
                }     
                <p>{weight[0]}-{weight[1]}</p>  
                <Link to={`/detail/${id}`}><button>Detalle</button></Link>              
        </div>
        </CardStyled>
    )
}

export default Card;

const CardStyled = styled1.div`

    width: 20rem;
    height: 30rem;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    color: white;
    box-shadow: 0 20px 40px 15px rgba(60, 225, 13, 0.2);
    margin: 5px;

    img{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.9;
        transition: opacity .2s ease-out;
    }

    h2{
        position: absolute;
        inset: auto auto 30px 30px;
        margin: 0;
        transition: inset .3s .3s ease-out;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
    }
    li, p, button {
        position: relative;
        opacity: 0;
        max-width: 50%;
        transition: opacity .3s ease-out;
      }
      li {
        inset: 140px auto 30px 30px;
        font-weight: bold;
        font-size: 18px;
        background: rgba(155, 32, 210, 0.42);
        list-style: none;
        border-radius: 6px;

      }

      p {
        inset: 140px auto 40px -20px;
        font-weight: bold;
        text-decoration: underline aqua solid 3px;
      }

      button {
        inset: 130px auto 40px 30px;
        width: 100%;

        background: rgba(0, 128, 0, 0.77);
        border-radius: 0.5em;
        border: none;
        color : white; 
        padding: 10px 20px;
        margin-right: 2px;
        margin-left: 2px;
        margin-top: 2px;
        margin-bottom: 2px;
        cursor: pointer;
      }


      &:hover h2{
        inset: auto auto 350px 30px;
        transition: inset .3s ease-out;
      }

      &:hover li, &:hover p, &:hover button{
        opacity: 1;
        transition: opacity .5s .1s ease-in; 
      }

      &:hover img {
        transition: opacity .3s ease-in;
        opacity: 1;
      }

      }
  
`;

