
import React, { useEffect, useState } from 'react'
import './Modal.css'
import ReactDOM from 'react-dom';
import Employeelist from './Employeelist';
import Table from './Table';





interface EmployeType {
    id?: string | undefined,
    EmployeeId: string,
    EmployeeName: string,
    EmployeeNumber: string,
    EmployeeDomain: string,
    EmployeeProject: string
}

interface EmployeeType {
    Empid: string,
    Empname: string,
    Empnumber: string,
    Empdomain: string,
    Empproject: string
}
const initialEmployeeState: EmployeeType = {
    Empid: '',
    Empname: '',
    Empnumber: '',
    Empdomain: '',
    Empproject: ''
};

type propsType = {
    open: boolean,
    close: () => void,
    addData: (a: EmployeType) => void,
    modifyData: EmployeType,
    updateData: (c: EmployeType, d: string | undefined) => void,
    postData: boolean,
    ReadOnly: boolean
}

export default function Modal({ open, close, addData, modifyData, updateData, postData, ReadOnly }: propsType) {

    const [Empid, setEmpid] = useState(initialEmployeeState.Empid);
    const [Empname, setEmpname] = useState(initialEmployeeState.Empname);
    const [Empnumber, setEmpnumber] = useState(initialEmployeeState.Empnumber);
    const [Empdomain, setEmpdomain] = useState(initialEmployeeState.Empdomain);
    const [Empproject, setEmpproject] = useState(initialEmployeeState.Empproject);


    const [EmpidError, setEmpidError] = useState(' ');
    const [EmpnameError, setEmpnameError] = useState(' ');
    const [EmpnumberError, setEmpnumberError] = useState(' ');
    const [EmpdomainError, setEmpdomainError] = useState(' ');
    const [EmpprojectError, setEmpprojectError] = useState(' ');


    const [id, setid] = useState<string | undefined>('')

    const [Clear, setClear] = useState<number>(0)

    const [ErrorResult, setErrorResult] = useState<boolean>(false)



    useEffect(() => {
        setid(modifyData.id)
        setEmpid(modifyData.EmployeeId)
        setEmpname(modifyData.EmployeeName)
        setEmpnumber(modifyData.EmployeeNumber)
        setEmpdomain(modifyData.EmployeeDomain)
        setEmpproject(modifyData.EmployeeProject)
    }, [modifyData])


    useEffect(() => {
        setEmpidError('');
        setEmpnameError('');
        setEmpnumberError('');
        setEmpdomainError('');
        setEmpprojectError('');
    }, [close])

    useEffect(() => {
        setid('')
        setEmpid('')
        setEmpname('')
        setEmpnumber('')
        setEmpdomain('')
        setEmpproject('')
    }, [Clear])


    useEffect(() => {
        const ErrorHandler = [EmpidError, EmpnameError, EmpnumberError, EmpdomainError, EmpprojectError];
        setErrorResult(ErrorHandler.every((Errors) => { return Errors === '' }));
    }, [EmpidError, EmpnameError, EmpnumberError, EmpdomainError, EmpprojectError]);


    if (!open) {
        return null;
    }


    function onchangeId(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        setEmpid(event.target.value)
    }

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        setEmpname(event.target.value)
    }

    function onChangeNumber(event: React.ChangeEvent<HTMLInputElement>) {
        const tempnumber = event.target.value
        setEmpnumber(tempnumber);
    }

    function onChangeDomain(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        setEmpdomain(event.target.value)
    }
    function onChangeProject(event: React.ChangeEvent<HTMLSelectElement>) {
        console.log(event.target.value);
        setEmpproject(event.target.value)
    }


    console.log("modal rendered")
    function handleEmployee(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(" inside the handleEmployee function")

        let hasErrors: boolean = false;

        if (!Empid || Empid.trim() === '') {

            setEmpidError("Enter valid Id")
            setEmpid('')
            hasErrors = true;
        }
        else {
            console.log("i am in else part", Empid)
            setEmpidError('');
        }

        if (!Empname || Empname.trim() === '') {

            setEmpnameError("Enter valid name")
            setEmpname('');
            hasErrors = true;
        }
        else {

            setEmpnameError('');
        }

        if (!Empnumber || Empnumber.length > 10 || Empnumber.length < 10) {

            setEmpnumberError("Enter valid number")
            setEmpnumber('');
            hasErrors = true;

        }
        else {
            setEmpnumberError('')

        }
        if (!Empdomain || Empdomain === '') {
            setEmpdomainError("Select domain")
            setEmpdomain('')
            hasErrors = true;
        }
        else {
            setEmpdomainError('')
        }
        if (!Empproject || Empproject === '') {
            setEmpprojectError("Select Project")
            setEmpproject('')
            hasErrors = true;
        }
        else {
            setEmpprojectError('')
        }

        const ErrorHandler = [EmpidError, EmpnameError, EmpnumberError, EmpdomainError, EmpprojectError];
        const Errors = ErrorHandler.every(error => error == '');


        console.log("this is error result", Errors);

        if (Errors && !hasErrors) {
            setErrorResult(true)
            add_Update();
        }
        else {
            setErrorResult(false)
        }
    }

    function add_Update() {

        if (postData) {
            console.log("this is postData", postData);
            EmployeeHandler();

        }
        else {
            handleUpdate();

        }
    }

    function EmployeeHandler() {

        const Employeedata: EmployeType[] = [{

            EmployeeId: Empid,
            EmployeeName: Empname,
            EmployeeNumber: Empnumber,
            EmployeeDomain: Empdomain,
            EmployeeProject: Empproject
        }]

        addData({

            EmployeeId: Empid,
            EmployeeName: Empname,
            EmployeeNumber: Empnumber,
            EmployeeDomain: Empdomain,
            EmployeeProject: Empproject
        })

    }

    function handleUpdate() {
        updateData({

            EmployeeId: Empid,
            EmployeeName: Empname,
            EmployeeNumber: Empnumber,
            EmployeeDomain: Empdomain,
            EmployeeProject: Empproject
        }, id)
        setClear((Clear) => Clear + 1);


    }

    const domainList = ["Development", "Testing", " Cloud", " Iot"];

    const projectList = ["MTN", "Network Optimization Project",
        "5G Deployment Initiative",
        "Fiber Optic Expansion Project",
        "VoIP Integration Project",
        "Mobile Tower Infrastructure Upgrade"]


    const mydropdown = document.getElementById("dropdown");
    if (ReadOnly == true && mydropdown !== null) {
        mydropdown.addEventListener("mousedown", function (event) {
            event.preventDefault();
        });
    }


    return (
        <div className='div_start'>
            <div className='overlay' />
            <div className='modal'>

                <div className='modalcontent'>

                    <form onSubmit={handleEmployee} className='createempform'>

                        <div className="creatediv">
                            <span>{ReadOnly == true ? <p className='createhd' >View</p> : postData ? <p className='createhd'>Create</p> : <p className='createhd'>Edit</p>}</span>
                        </div>
                        <hr />
                        <div className='field_Div'>
                            <div className='empiddiv'>
                                <label className="labels" htmlFor='empid'>EMPLOYEE ID</label>
                                <div className='inputdiv'>
                                    <input className="inputField" id='empid' value={Empid} readOnly={ReadOnly} disabled={ReadOnly} onChange={onchangeId} type="number" /><br />
                                </div>
                                <span className='Error'>{EmpidError}</span>
                            </div>

                            <div className='empnamediv'>
                                <label className="labels" htmlFor='empname' >EMPLOYEE NAME </label><br />
                                <div className='inputdiv'>
                                    <input className="inputField" id='empname' readOnly={ReadOnly} disabled={ReadOnly} value={Empname} onChange={onChangeName} type='text' /><br />
                                </div>
                                <span className='Error'>{EmpnameError}</span>
                            </div>

                            <div className='empnumberdiv'>
                                <label className="labels" htmlFor='empnumber'>EMPLOYEE NUMBER</label><br />
                                <div className='inputdiv'>
                                    <input className="inputField" id='empnumber' readOnly={ReadOnly} disabled={ReadOnly} value={Empnumber} onChange={onChangeNumber} type='number' /><br />
                                </div>
                                <span className='Error'>{EmpnumberError}</span>
                            </div>

                            <div className='empdomaindiv'>
                                <label className="labels"> DOMAIN</label><br />
                                <div className='empdomaininnerdiv'>
                                    {domainList.map((domain) =>
                                        <div key={Math.random()} className='empdomain_inner'>
                                            <input className="inputField" readOnly={ReadOnly} disabled={ReadOnly} checked={domain == Empdomain ? true : false} value={domain} onChange={onChangeDomain} name="domainradio" type='radio' />
                                            <label className="labels">{domain}</label>

                                        </div>
                                    )
                                    }

                                </div>
                                <span className='Error'>{EmpdomainError}</span>
                            </div>

                            <div className='empprojectdiv'>
                                <label key={Math.random()} className="labels" htmlFor='empproject'>PROJECT </label><br />
                                <div className='dropdownouter'>
                                    <select id='dropdown' className='dropdown' name='Project' value={Empproject} onChange={onChangeProject}>
                                        {projectList.map((project) =>

                                            <option className='dropdownoption' value={project}  > {project}</option>
                                        )}
                                    </select><br />
                                </div>
                                <span className='Error'>{EmpprojectError}</span>
                            </div>
                            <br />
                        </div>
                        <hr />
                        <div className='buttons'>
                            <button className='cancel_button' onClick={close}> Cancel </button>
                            <span>{ReadOnly !== true ? (<button className='save_button' id='submitbtn' type='submit' > Save </button>) : null}</span>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )

}
