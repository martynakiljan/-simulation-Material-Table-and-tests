

const Pagination = ({currentPage, pages, maxPageNumberLimit, minPageNumberLimit, setcurrentPage ,pageNumberLimit, setMaxPageNumberLimit, setMinPageNumberLimit}) => {


    const handlePageNumber = e => {
        setcurrentPage(Number(e.target.id))
      }
      
      
      const handleNextBtn = () => {
        setcurrentPage(currentPage + 1)
        if(currentPage+1 > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
      }
      
      
      const handlePrevBtn = () => {
        setcurrentPage(currentPage - 1)
        if((currentPage-1)  % pageNumberLimit == 0) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
      }
 
    const renderPageNumber = pages.map(number => {
        if(number < maxPageNumberLimit + 1 && number> minPageNumberLimit) {
         return (
               <li 
               className={currentPage === number? "activePage" : null}
               key={number}
               id={number} 
               value={number}
               onClick={handlePageNumber}
               data-testid="paginationLi"
               > 
               {number} 
               </li>
         )
             
        } else {
          return null;
        }
       
     })
    return (
      <>
        <ul className="pagination" data-testid="paginationUl">  
        <li data-testid="paginationLi">
          <button 
          onClick={handlePrevBtn}
          disabled={currentPage == pages[0] ? true: false}
          className="btn">
          PREV
          </button>
        </li>
        {renderPageNumber} 
        <li>
          <button 
          onClick={handleNextBtn} 
          disabled={currentPage == pages[pages.length-1] ? true: false}
          className="btn" >
          NEXT
          </button>
        </li>
      </ul> 
      </>
    )



}

export default Pagination;