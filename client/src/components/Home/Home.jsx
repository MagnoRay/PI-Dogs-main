import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDogs } from "../../redux/actions";

import styled from "./Home.module.css";
import Cards from "./Cards";
import Navbar from "../Navbar/Navbar";
import Pagination from '../Pagination/Pagination';
import Loader from "./Loader";
import Footer from "../Footer/Footer";

const Home = ()=>{

    const dogs = useSelector((state)=>state.dogs);
    const rdogs = useSelector((state)=>state.rdogs);
    const loading = useSelector((state)=>state.loading);
    
    const [currentPage, setCurrentPage] = useState(1);    
    const [dogsPerPage /* setDogsPerPage */] = useState(8);
    const dispatch = useDispatch();

    console.log("Vengo desde el Home",setCurrentPage);

    useEffect(()=>{
        if(dogs.length < 1){
            dispatch(getDogs());
        }
    }, [dispatch, dogs])

    // Obtener página actual
    const indexOfLastDog = currentPage * dogsPerPage; // 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0
    // Cambio de página
    const currentDogs = rdogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginate = (page) => {
        setCurrentPage(page);
    }


    if(dogs.length > 0 && !loading){
        if(rdogs.length ===0 ){
            return(
                <>
                    <Navbar setCurrentPage={setCurrentPage} />
                </>
            )
        }
        return (
            <div className={styled.container}>
               <div>
                    <Pagination
                        dogsPerPage={dogsPerPage}
                        currentPage ={currentPage} 
                        paginateFunction={paginate}
                    />
                </div> 
               <Cards data = {currentDogs}/>  
               
                <Footer />
                       
            </div>      
        );
    }else{
        return(
            <>
                <Loader/>
            </>
        )
    }

    
}

export default Home;