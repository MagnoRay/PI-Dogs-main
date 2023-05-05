import React from "react";
import styled from "./Pagination.module.css"
import { useSelector } from "react-redux";
import { useState } from "react";
const Pagination = ({paginateFunction, dogsPerPage, currentPage}) =>{

    const allDogs = useSelector((state)=>state.rdogs)

    const [pageDisplayed, /*setPageDisplayed*/] = useState(4);
    const [maxPageDisplayed, setMaxPageDisplayed] = useState(4);
    const [minPageDisplayed, setMinPageDisplayed] = useState(0);

    const pageNumbers = [];
    const max = Math.ceil(allDogs.length / dogsPerPage);
    for (let i = 1; i <= max; i++) {
        pageNumbers.push(i);
      }

    const movePages = (page) => {
      if(page === pageNumbers?.length){
        movePagesPrevius(0);
        setMaxPageDisplayed(4);
        setMinPageDisplayed(0);
      }else{
        if(page === 0) page = pageNumbers?.length;
        let maxi = page + pageDisplayed - 1;
        let mini = maxi - pageDisplayed;
        setMaxPageDisplayed(maxi);
        setMinPageDisplayed(mini);
      }
    }

    const movePagesPrevius = (page) => {
      if(page === 1) movePages(0)
      else if(page <= 2 && page > 0){
        setMaxPageDisplayed(4);
        setMinPageDisplayed(0);
      }else{
        if(page === 0) page = 1;
        let maxi = page + pageDisplayed - 3;
        let mini = maxi - pageDisplayed;
        setMaxPageDisplayed(maxi);
        setMinPageDisplayed(mini);
      }
    }

    const handleClik = (page) => {
      movePages(page);
      paginateFunction(page);
    }

    const firstPage = (e) => {
      e.preventDefault();
      movePages(1);
      paginateFunction(1);
    }

    const lastPage = (e) => {
      e.preventDefault();
      movePages(max - 1);
      paginateFunction(max);
    }

    const previous = (e, page) => {
      e.preventDefault();
      movePagesPrevius(page);
      if(page === 1){
        paginateFunction(pageNumbers?.length);
      }else paginateFunction(page - 1)
    }

    const next = (e, page) => {
      e.preventDefault();
      movePages(page);
      if(page === pageNumbers?.length){
        paginateFunction(1);
      }else{
        paginateFunction(page + 1)
      }
    }
    
    const renderPageNumber = pageNumbers?.map((pages) => {
      if(pages < maxPageDisplayed + 1 && pages > minPageDisplayed - 1){
        return <li key={pages} id={pages} className={currentPage === pages ? styled.active: null} onClick={()=>handleClik(pages)}>
          <ul className={styled.listaPag}>{pages}</ul>
        </li>
      }else{
        return null;
      }
    });

    return (
      <nav className={styled.all}>
        <button className={styled.previous} onClick={(e) => firstPage(e)} disabled={currentPage <= 1}>{'|<'}</button>
        <button className={styled.previous} onClick={(e) => previous(e, currentPage)} disabled={currentPage <= 1}>{'<'}</button>
          <ul className={styled.listaPag}>
            {renderPageNumber}
          </ul>
        <button className={styled.next} onClick={(e) => next(e, currentPage)} disabled={currentPage >= max}>{'>'}</button>
        <button className={styled.next} onClick={(e) => lastPage(e)} disabled={currentPage >= max}>{'>|'}</button>
      </nav>
    )
}

export default Pagination;