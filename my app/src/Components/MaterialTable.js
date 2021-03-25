import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../Style/App.css"
import Row from '../Components/Row'
import tableSortMethod from './tableSortMethod'
import Pagination from './Pagination'
import uuid from 'react-uuid'


const MaterialTable = ({students, columns}) => {

  const [currentPage, setcurrentPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(5)
  const [pageNumberLimit, setNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const [selectData, setSelectData] = useState(students);
  const [sortType, setSortType] = useState();
  const [searchTerm, setSearchTerm] =  useState("");



  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

    const pages = []
    for (let i=1; i<= Math.ceil(selectData.length / itemsPerPage); i++) {
      pages.push(i)
    }

 


    const renderHeader = () => {	
        return columns.map((column, index) => {	
          return <th key={index} id={column} >{column.title}</th>	
        })	
    }




      const renderBody = (students) => {

     if(selectData.length === 0) {
        return students.slice(startIndex, endIndex).map((item) => {
        const {FirstName, LastName, age, AverageGrade} = item
            if(item) {
              return (
                <Row 
                FirstName={FirstName}
                LastName={LastName}
                age = {age}
                AverageGrade={AverageGrade}
                />
              )
            } else {
              return null;
            }
                    
      });
     } else {
      return selectData.slice(startIndex, endIndex).map((item) => {
        const {FirstName, LastName, age, AverageGrade} = item
            if(item) {
              return (
                <Row 
                FirstName={FirstName}
                LastName={LastName}
                age = {age}
                AverageGrade={AverageGrade}
                />
              )
            } else {
              return null;
            }
                    
      });
     }
      
    }
       
       
      
  

    const renderTable = (students) => {	
        return (	
          <Table id='tableItem' data-testid="tableItem" >	
                <Thead>	
                    <Tr>{renderHeader()}</Tr>	
                </Thead>	
                <Tbody key={uuid()}>	
                        {renderBody(students)}	
               </Tbody>            
          </Table>	
        );	
    };



      useEffect(() => {
      
          tableSortMethod(students, sortType, setSelectData, searchTerm)
       
      },[sortType, searchTerm, students]); 



      const handleChangeSearchWord = e => {
        setSearchTerm(e.target.value);
        setcurrentPage(1)

      }
      

    return(
        <>
        <h1 className="title">Material-Table Demo - students in English Language School </h1>
        <form className="form"> 
        <label className="label">Sort by:
            <select data-testid="select" onChange={(e) => setSortType(e.target.value)} className="select"> 
              <option data-testid="select-option" defaultValue>--choose here--</option>
              <option data-testid="select-option" value="alphabeticallyByFirstName">alphabetically by first name</option>
              <option data-testid="select-option" value="alphabeticallyByLastName">alphabetically by last name</option>
              <option data-testid="select-option" value="fromHighestAverageToLowest">from highest average to lowest</option>
              <option data-testid="select-option" value="ageDescending">age descending</option>
            </select>
          </label>

          <label className="label">Search by word:
          <input
            data-testid="searchInput"
            className ="searchByWord"
            type="text"
            value={searchTerm}
            placeholder="Search student"
            onChange={handleChangeSearchWord}
            />
          </label>
   
     </form>
     
    
        {renderTable(students)}
        
        <Pagination
        currentPage={currentPage}
        pages={pages}
        maxPageNumberLimit={maxPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
        setcurrentPage={setcurrentPage}
        pageNumberLimit={pageNumberLimit}
        setMaxPageNumberLimit={setMaxPageNumberLimit}
        setMinPageNumberLimit={setMinPageNumberLimit}
        />


       </>

    ) 
}

export default MaterialTable;