
import MaterialTable from "./MaterialTable";
import {columns, students} from '../data/data'


const Table = () => {

  return (
    <>
      <MaterialTable columns={columns} students={students} />
    </>
  );
}

export default Table;