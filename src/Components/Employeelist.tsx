import React, { ContextType, useContext, useEffect, useState } from 'react'
import './EmployeeList.css'
import '@fortawesome/fontawesome-free/css/all.css';

import Modal from './Modal';

import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import Table from './Table';
import ConfirmationModal from './ConfirmationModal';
import UpdateConfirmation from './UpdateConfirmation';
import CreateConfirmation from './CreateConfirmation';



export default function Employeelist() {

    interface EmployeesType {
        id?: string | undefined,
        EmployeeId: string,
        EmployeeName: string,
        EmployeeNumber: string,
        EmployeeDomain: string,
        EmployeeProject: string
    }

    const employeeBlank: EmployeesType = {
        id: "",
        EmployeeId: '',
        EmployeeName: '',
        EmployeeNumber: '',
        EmployeeDomain: '',
        EmployeeProject: '',
    }

    const [isopen, setisopen] = useState<boolean>(false);

    const [employeesData, setEmployeesData] = useState<EmployeesType[]>([]);

    const [modifyemployeesData, setmodifyEmployeesData] = useState<EmployeesType>(employeeBlank);

    const [istrue, setistrue] = useState<number>(0);

    const [postdata, setpostdata] = useState<boolean>(false);

    const [readonly, setreadonly] = useState<boolean>(false);

    const [UpdateConfirm, setUpdateConfirm] = useState<boolean>(false);

    const [CreateConfirm, setCreateconfirm] = useState<boolean>(false)

    const[pagination,setpagination] =useState<boolean>(false);


    function fetchData() {
        fetch('http://localhost:8000/EmployeeData', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then(response => {
                if (response.ok) {

                    console.log(" get Data handled successfully", response.json()
                        .then(json => setEmployeesData(json)));

                } else {
                    console.error("Failed to handle data:", response.statusText);
                }
            })

            .catch(error => { console.log("error in handling", error) })
    }
    // EmployeesData.forEach((item)=> console.log("foreach",item));

    useEffect(() => fetchData, [istrue]);


    //post method 

    function addingData(EmployeeData: EmployeesType) {
        fetch('http://localhost:8000/EmployeeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(EmployeeData)
        })
            .then(response => {
                if (response.ok) {
                    console.log(" adding Data handled successfully", response.json().then(json => { console.log(json) }));
                    setistrue((istrue) => istrue + 1);
                    setCreateconfirm(true)
                    setisopen(false);
                    setpostdata(false)
                } else {
                    console.error("Failed to handle data:", response.statusText);
                }
            })

            .catch(error => {
                console.log("problem in handling json data", error);
            });
    }

    function loadData(id: string | undefined): void {

        fetch('http://localhost:8000/EmployeeData/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then(response => {
                if (response.ok) {

                    console.log("load Data handled successfully", response.json()
                        .then(json => setmodifyEmployeesData(json)))

                } else {

                    console.error("Failed to handle data:", response.statusText);
                }
            })

            .catch(error => { console.log("error in handling", error) })
    }

    function UpdateData(EmployeeData: EmployeesType, id: string | undefined) {
        fetch('http://localhost:8000/EmployeeData/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(EmployeeData)
        })
            .then(response => {
                if (response.ok) {
                    console.log("data updated sucessfully ", response.json()
                        .then(json => console.log(json)))
                    setUpdateConfirm(true)
                    setistrue((istrue) => istrue + 1);
                    setisopen(false);

                } else {
                    console.log("cannot update data")
                }
            })
            .catch(error => console.log("Error using put for updating data", error))
    }

    function DeleteData(id: string | undefined): void {
        fetch('http://localhost:8000/EmployeeData/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'aplication/json' },

        })
            .then(response => {
                if (response.ok) {
                    console.log("data Deleted sucessfully ", response.json()
                        .then(json => console.log(json)))

                    setistrue((istrue) => istrue + 1);
                } else {
                    console.log("cannot update data")
                }
            })
            .catch(error => console.log("Error using put for updating data", error))
    }

    const handleClose = () => { setisopen(false); setmodifyEmployeesData(employeeBlank); handle_closereadonly(); setpostdata(false) }

    function handleopen() {
        setisopen(true)
    }
    function handle_openreadonly() {
        setreadonly(true);
        setisopen(true);
    }
    function handle_closereadonly() {
        setreadonly(false);
    }
    function handle_openUpdateConfirm() {
        setUpdateConfirm(true)
    }
    function handle_closeUpdateConfirm() {
        setUpdateConfirm(false);
    }
    function handle_closeCreateConfirm() {
        setCreateconfirm(false);
    }
    function handle_openpagination(){
        setpagination(true);
    }

    function handle_closepagination() {
        setpagination(false);
    }

    return (
        <div>


            <div >
                <div className='createbtndiv'>Employee List | {employeesData.length}
                    {(employeesData.length !== 0) &&
                        <button className='createbtn' onClick={() => { handleopen(); setpostdata(true) }} > Create</button>}
                </div>
                <Modal open={isopen} ReadOnly={readonly} postData={postdata} close={handleClose} addData={addingData} modifyData={modifyemployeesData} updateData={UpdateData} />

            </div>
            <div className='Table'>
            <Table Readonly={handle_openreadonly}  Open={handleopen} EmployeeData={employeesData} LoadData={loadData} deleteData={DeleteData} /> 
                {employeesData.length != 0 ? null : <div className='norecord_div'>
                    <button className='createbtn' onClick={() => { handleopen(); setpostdata(true) }} > Create</button><br />
                    <div>{employeesData.length} Records Found</div>
                </div>}

            </div>
            <div>
                <UpdateConfirmation UpdateModal={UpdateConfirm} CloseModal={handle_closeUpdateConfirm} />
            </div>
            <div>
                <CreateConfirmation CreateModal={CreateConfirm} CloseCreate={handle_closeCreateConfirm} />
            </div>



        </div>
    )
}
