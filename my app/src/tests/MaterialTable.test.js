import { render, screen,  fireEvent, userEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Table from '../Components/Table'
import { columns, students } from "../data/data";
import Pagination from "../Components/Pagination";
import MaterialTable from "../Components/MaterialTable";



describe("testing: Material Table", () => {

   test("check the page title", () => {
    render(<Table />);

    const title = screen.getByText(/Material-Table Demo - students in English Language School/i);
    expect(title).toBeInTheDocument();
   });


  test("check if there is a label to search for", () => {
    render(<Table />);
    const searchLabel = screen.getByLabelText('Search by word:');
    expect(searchLabel).toBeInTheDocument();
   })


  test("check if there is a label to sort", () => {
    render(<Table />);
    const searchLabel = screen.getByLabelText('Sort by:');
    expect(searchLabel).toBeInTheDocument();
   })
   

  
  test("check if pagination is in the document", async () => {
    const { container } = render(<Table />);
    const ulPagination = container.querySelector(".pagination");
    expect(ulPagination).toBeDefined()
    
  });


  test("check if there is a PREV button in pagination", async () => {    
    render(<Table />);
    const button = screen.getByRole("button", { name: /PREV/i });
    expect(button).toBeInTheDocument();
  })

  test("check if there is a NEXT button in pagination", async () => {    
    render(<Table />);
    const button = screen.getByRole("button", { name: /NEXT/i });
    expect(button).toBeInTheDocument();
  })


  test("check if there is only one table", async () => {    

    const { container } = render(<Table />)
    const table = container.getElementsByTagName('table')
    expect(table).toHaveLength(1);
  })


  test("check if there is only one thead", async () => {    
    const { container } = render(<Table />)
    const thead= container.getElementsByTagName('thead')
    expect(thead).toHaveLength(1);
  })


  test("check if there is only one tbody", async () => {    
    const { container } = render(<Table />)
    const tbody= container.getElementsByTagName('tbody')
    expect(tbody).toHaveLength(1);
  })


 
  test("check textcontent of th", async () => {  
    const { container } = render(<Table />)
    const rows = container.getElementsByTagName('th')
    expect(rows[0]).toHaveTextContent('first name')
    expect(rows[1]).toHaveTextContent('last name')
    expect(rows[2]).toHaveTextContent('age')
    expect(rows[3]).toHaveTextContent('average grade')

  })


  test("check value in options", async () => {  
   
    const { container } = render(<Table />)
    const element  = container.getElementsByTagName('option')
    expect(element[1]).toHaveAttribute('value', 'alphabeticallyByFirstName')
    expect(element[2]).toHaveAttribute('value', 'alphabeticallyByLastName')
    expect(element[3]).toHaveAttribute('value', 'fromHighestAverageToLowest')
    expect(element[4]).toHaveAttribute('value', 'ageDescending')

  })

                                                                                                    

  test('check if the alphabetical by first name sort is working correct', () => {

    render(<Table />)
    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: 'alphabeticallyByFirstName' } })
    const td = screen.getAllByRole('cell');
    expect(td[0].textContent).toMatch(/Alexander/); 
  
  })
  test('check if  alphabetical by last name sort is working correct', () => {

    render(<Table />)
    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: 'alphabeticallyByLastName' } })
    const td = screen.getAllByRole('cell');
    expect(td[1].textContent).toMatch(/Basen/); 
  })


  test('check if from highest average to lowest sort is working correct', () => {

    render(<Table />)
    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: 'fromHighestAverageToLowest' } })
    const td = screen.getAllByRole('cell');
    expect(td[3].textContent).toMatch(/5.8/); 
  
  })

  test('check if age descending  sort is working correct', () => {

    render(<Table />)
    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: 'ageDescending' } })
    const td = screen.getAllByRole('cell');
    expect(td[2].textContent).toMatch(/45/); 
  
  })


  test('check if the searchInput works fine', () => {

    render(<Table />)
    const input = screen.getByTestId('searchInput')
    fireEvent.change(input, { target: { value: 'Co' } })
    const td = screen.getAllByRole('cell');
    expect(td[1].textContent).toMatch(/Connor/); 
  
  })

  test("is there the correct number of th", async () => {    
    const { container } = render(<Table columns={columns}/>)
    const th = container.getElementsByTagName('th')
    expect(th).toHaveLength(columns.length);
  })


  test("check thead title", async () => {    
     
     const columnsTitles = [
      {
        title: 'first name',
        field: 'first name:',
      }
    ]

     render(<Table columns={columnsTitles}/>)

      columns.forEach(columnText => {
      const headerElement = screen.getAllByText(columnText.title);
      expect(headerElement[0]).toBeDefined()
    });
  })



  test("check how many pages there are - pagination", async () => {  

    const paginationNumber = [1,2,3,4,5,6];
   
    render(<Table pagination={paginationNumber}/>)
    const  liInsideUlPagination = screen.getAllByTestId('paginationLi')
    expect(liInsideUlPagination).toHaveLength(paginationNumber.length)

  })

  test("check if pagination works", async () => {  

    render(<Table />)
    const  liInsideUlPagination = screen.getAllByTestId('paginationLi')
    fireEvent.click(liInsideUlPagination[3])
    await waitFor(() => {
      const cells =  screen.getAllByRole('cell')
      expect(cells[1].textContent).toMatch(/Rhys/)
    })

  })


  const setup = () => {
    const utils = render(<Table />)
    const input = utils.getByLabelText('Search by word:'
    )
    return {
      input,
      ...utils,
    }
  }

  
  test("make sure that input returns the entered value", async () => {      
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'Mary' } })
    await waitFor(() => {
      const cells =  screen.getAllByRole('cell')
         expect(cells[0].textContent).toMatch(/Mary/); 
  
    })
})





})