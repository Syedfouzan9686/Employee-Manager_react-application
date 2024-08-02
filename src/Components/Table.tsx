import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import './Table.css'
import ConfirmationModal from './ConfirmationModal';
import UpdateConfirmation from './UpdateConfirmation';

interface EmployeesType {
    id?: string | undefined,
    EmployeeId: string,
    EmployeeName: string,
    EmployeeNumber: string,
    EmployeeDomain: string,
    EmployeeProject: string
}

type propsType = {
    EmployeeData: EmployeesType[],
    LoadData: (id: string | undefined) => void,
    deleteData: (Id: string | undefined) => void,
    Open: () => void,
    Readonly:()=>void
}

export default function Table({ EmployeeData, LoadData, deleteData, Open,Readonly }: propsType) {


    const [isopen, setisopen] = useState<boolean>(false);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const[isconfirm,setisconfirm]  = useState<boolean>(false);

    const[deleteid,setdeleteid] = useState<string | undefined>('')

    const[isupdate,setisupdate]  = useState<boolean>(false);

    


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleClose() {
        setisopen(false);
    }
    function ModalOpen() {
        Open();
    }

    function handle_openConfirm(){
        setisconfirm(true);
    }

    function handle_closeConfirm(){
        setisconfirm(false);
    }

    function handle_openUpdate(){
        setisupdate(true);
    }

    function handle_closeUpdate(){
        setisupdate(false);
    }

   
   
    
     
    return (
        <div>
            <ConfirmationModal  Confirm={isconfirm} Close={handle_closeConfirm} Deleteid={deleteid} DeleteData={deleteData}/>

            <div className='employeeTable'>
                <table>
                    <thead>
                        <tr className='tablerow'>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Number</th>
                            <th>Domain</th>
                            <th>Project</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EmployeeData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((employee, index) =>
                                <tr className='tablerow' key={index}>
                                    <td>{employee.EmployeeId}</td>
                                    <td>{employee.EmployeeName}</td>
                                    <td>{employee.EmployeeNumber}</td>
                                    <td>{employee.EmployeeDomain}</td>
                                    <td>{employee.EmployeeProject}</td>
                                    <td>
                                        <button id='editbutton' className='edit_button' onClick={() => { ModalOpen();LoadData(employee.id) }}>
                                        <i className='fas'>&#xf303;</i>
                                        </button>
                                        <button className='delete_button' onClick={() => {handle_openConfirm();setdeleteid(employee.id)}}>
                                            <i className="fas fa-trash-alt delete-symbol"></i>
                                        </button>
                                        <button className='view_button' onClick={() => {ModalOpen(); LoadData(employee.id);Readonly() }}>
                                        <i  className="fa">&#xf06e;</i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} className='pagination'>
                               {EmployeeData.length!== 0 &&  <div>
                                <TablePagination
                                    component="div"
                                    count={EmployeeData.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                </div>}
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </div>
    )
}
