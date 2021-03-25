import React from "react";
import { Tr, Td } from 'react-super-responsive-table';
import "../Style/App.css"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import uuid from 'react-uuid'


const Row = ({FirstName, LastName, age, AverageGrade}) => {
return (
    <>
        <Tr key={uuid()} >
            <Td>{FirstName}</Td>
            <Td>{LastName}</Td>
            <Td>{age}</Td>
            <Td>{AverageGrade}</Td>
        </Tr>
    </>
)
}

export default Row;