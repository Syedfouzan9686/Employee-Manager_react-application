import { FormControl, InputLabel } from '@mui/material'
import React, { HtmlHTMLAttributes, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './CreateEmployee.css'

export default function CreateEmployee() {

    interface EmployeeType {
        Empid:string,
        Empname:string,
        Empnumber:number,
        Empdomain:string,
        Empproject:string
    }

    const initialEmployeeState:EmployeeType = { 
        Empid:'',
        Empname:'',
        Empnumber:0,
        Empdomain:'',
        Empproject:''
    };
    
    const[Empid,setEmpid]=useState(initialEmployeeState.Empid);
    const[Empname,setEmpname]=useState(initialEmployeeState.Empname);
    const[Empnumber,setEmpnumber]=useState(initialEmployeeState.Empnumber);
    const[Empdomain,setEmpdomain]=useState(initialEmployeeState.Empdomain);
    const[Empproject,setEmpproject]=useState(initialEmployeeState.Empproject);

    const[EmpidError,setEmpidError]=useState(' ');
    const[EmpnameError,setEmpnameError] = useState(' ');
    const[EmpnumberError,setEmpnumberError]= useState(' ');
    const[EmpdomainError,setEmpdomainError] = useState(' ');
    const[EmpprojectError,setEmpprojectError] = useState(' ');

     function onchangeId(event :React.ChangeEvent<HTMLInputElement>) {
        setEmpid(event.target.value)
     }
     function onChangeName(event :React.ChangeEvent<HTMLInputElement>) {
        setEmpname(event.target.value)
     }

     function onChangeNumber(event :React.ChangeEvent<HTMLInputElement>) {
        const tempnumber = parseInt(event.target.value)
        setEmpnumber(tempnumber);
     }

     function onChangeDomain(event :React.ChangeEvent<HTMLInputElement>) {
        setEmpdomain(event.target.value)
     }
     function onChangeProject(event :React.ChangeEvent<HTMLSelectElement>) {
        setEmpproject(event.target.value)
     }

     

    
    function handleEmployee(event:React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if(Empid.trim() == '' ){

            setEmpidError("Enter valid Id")
        }
        else {
            setEmpidError('');
        }
        if(Empname.trim() == ''  ){
            
            setEmpnameError("Enter valid name")
        }
        else {
            setEmpnameError('');
        }
        if(Empnumber.toString().length == 10){
            
            setEmpnumberError('')
        }
        else {
            setEmpnumber(0);
            setEmpnumberError("Enter valid number")
        }
        if(Empdomain == ''){
            setEmpdomainError("Select domain")
        }
        else {
            setEmpdomainError('')
        }
        if(Empproject == ''){
            setEmpprojectError("Enter Project Error")
        }
        else {
            setEmpprojectError('')
        }

        const ErrorHandler = [EmpidError,EmpnameError,EmpnumberError,EmpdomainError,EmpprojectError];

        const ErrorResult = ErrorHandler.every((Errors)=>{ return Errors == ''});

        console.log(ErrorResult);

        if(ErrorResult){
            EmployeeHandler();
        }

        // console.log(Empid,Empname,Empnumber,Empdomain,Empproject);
    }

    function EmployeeHandler() {

        const Employeedata = [{
            EmployeeId: Empid,
            EmployeeName:Empname,
            EmployeeNumber:Empnumber,
            EmployeeDomain:Empdomain,
            EmployeeProject:Empproject
        }]

        fetch('http://localhost:8000/EmployeeData/eab3' ,{
            method: 'PUT',
            headers: { 
                
                'Content-Type':'application/json',
                       
                    },

                        
            body:JSON.stringify(Employeedata)
        })
        .then(response=>{  if (response.ok) {
            console.log("Data handled successfully", response.json().then(json=>{console.log(json)}));

        } else {
            console.error("Failed to handle data:", response.statusText);
        }})

        .catch(error=>{
            console.log("problem in handling json data",error);
    });

    // Employeedata.forEach((data)=> {  console.log(Employeedata) })
    }

    const domainList = ["Development", "Testing", " Cloud", " Iot"];

    const projectList = ["hermes", "simtracking", "MTN"]
    return (
        <div>

            <div className='modal'>
                <button className='Buttoncreate' > Buton </button>
               
                <div className='modalcontent'>
                    <form onSubmit={handleEmployee} className='createempform'>

                        <div className='empiddiv'>
                            <label className="labels" htmlFor='empid'>Employee Id</label><br />
                            <input className="inputField" id='empid' value={Empid} onChange={onchangeId}  type="text" /><br/>

                            <span className='Error'>{EmpidError}</span>
                        </div>
                                
                        <div className='empnamediv'>
                            <label className="labels" htmlFor='empname' >Employee Name </label><br />
                            <input className="inputField" id='empname' value={Empname} onChange={onChangeName} type='text' /><br/>
                            <span className='Error'>{EmpnameError}</span>
                        </div>

                        <div className='empnumberdiv'>
                            <label className="labels" htmlFor='empnumber'>Employee Number</label><br />
                            <input className="inputField" id='empnumber' value={Empnumber}  onChange={onChangeNumber} type='number' /><br/>
                            <span className='Error'>{EmpnumberError}</span>
                        </div>

                        <div className='empdomaindiv'>
                            <label className="labels"> Domain</label><br />
                            <div className='empdomaininnerdiv'>
                                {domainList.map((domain) =>
                                    <div >
                                        <input className="inputField" value={domain} onChange={onChangeDomain} name="domainradio" type='radio' />
                                        <label className="labels">{domain}</label><br/>
                                        
                                    </div>
                                )
                                } 
                                 
                            </div>
                            <span className='Error'>{EmpdomainError}</span>
                        </div>

                        <div className='empprojectdiv'>
                            <label className="labels" htmlFor='empproject'>project </label><br />
                            {/* <input className="inputField" id='empproject' type='text' /> */}
                            <select name='project' value={Empproject} onChange={onChangeProject}>
                                {projectList.map((project) =>
                                 
                                    <option value={project}  > {project}</option>
                                )}
                            </select><br/>
                            <span className='Error'>{EmpprojectError}</span>
                        </div>
                        
                        <div>
                            <button className='Buttoncreate' type='submit' > submit </button>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    )
}