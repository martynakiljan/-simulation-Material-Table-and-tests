
const tableSortMethod = (students, sortType, setSelectData, searchTerm) => {

        let sorted = students;
        if(sortType === 'alphabeticallyByFirstName'){
     
        sorted =  [...students].sort((a, b) => a.Firstname !== b.FirstName ? a.FirstName < b.FirstName ? -1 : 1 : 0);
    
      } if(sortType === 'alphabeticallyByLastName') {
        sorted =  [...students].sort((a, b) => a.LastName !== b.LastName ? a.LastName < b.LastName ? -1 : 1 : 0);
     
      } if(sortType === 'fromHighestAverageToLowest') {
        sorted =  [...students].sort((a, b) => b.AverageGrade - a.AverageGrade);
       
   
      } if(sortType === 'ageDescending') {
        sorted =  [...students].sort((a, b) => b.age - a.age);
     
    
      } if(searchTerm) {
        const searchTermLowerCase = searchTerm.toLowerCase();

        const searchedWord = students.filter(student =>  
        student.FirstName.toLowerCase().includes(searchTermLowerCase) ||
        student.LastName.toLowerCase().includes(searchTermLowerCase)  ||
        student.age.toString().includes(searchTermLowerCase)          ||
        student.AverageGrade.toString().includes(searchTermLowerCase)
      );
      setSelectData(searchedWord);
    } else {
      setSelectData(sorted);
    }
  
   
    
    
}

export default tableSortMethod;