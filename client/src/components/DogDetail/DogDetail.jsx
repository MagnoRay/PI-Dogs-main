import { getDogDetail, cleanDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "./DogDetail.module.css";

const DogDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const detail = useSelector((state)=>state.detail);

    useEffect(()=>{
        dispatch(getDogDetail(id))
        return ()=>dispatch(cleanDetail())
    }, [dispatch, id])


    return(
        <div className={styled.divbase}>
            <div className={styled.div1}>
                <h2>{detail[0]?.id}</h2>
                <div className={styled.divimage}>
                <img className={styled.imagen} src={detail[0]?.image} alt={detail[0]?.name} />
                </div>
                <h1>{detail[0]?.name}</h1>
            </div>

            <div className={styled.div2}>
                <label className={styled.labeldet}>Height:</label>
                <p className={styled.pdet}>{detail[0]?.height[0]}-{detail[0]?.height[1]}</p>

                <label className={styled.labeldet}>Weight:</label>
                <p>{detail[0]?.weight[0]}-{detail[0]?.weight[1]}</p>

                <label className={styled.labeldet}>Temperaments:</label>
                {
                    detail[0]?.temperament? detail[0]?.temperament.map(t=><li className={styled.templi} key={t}>{t}</li>)
                    :
                    detail[0]?.Temperaments.map((t)=>
                    <li className={styled.templi} key={t.name}>{t.name}</li>)
                }            
                <label className={styled.labeldet}>Life_span:</label>
                <p>{detail[0]?.life_span}</p>
                <Link to="/home">
                        <button className={styled.btn}>Back</button>
                </Link>
            </div>
        </div>
    )
}

export default DogDetail;

