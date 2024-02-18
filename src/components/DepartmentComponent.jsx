import React, { useEffect, useState } from 'react'
import { createDepartment,getDepartment,updateDepartment } from '../service/DepartmentService'
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {

    const [code,setCode] = useState("");
    const [name,setName] = useState("");
    const [country,setCountry] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    const [errors,setErrors] = useState({
        code: "",
        name: "",
        country: "",
    });

    useEffect(() => {
        if(id){
            getDepartment(id).then(resp => {
                setCode(resp.data.code);
                setName(resp.data.name);
                setCountry(resp.data.country);
            })
            .catch(err => console.log(err))
        }
    },[id])

    function handleCode(e) {
        setCode(e.target.value);
    }
    function handleName(e) {
        setName(e.target.value);
    }
    function handleCountry(e) {
        setCountry(e.target.value);
    }

    const saveDepartment = (e) => {
        e.preventDefault();
        if(validateForm()){
            const department = {
                code: code,
                name: name,
                country: country,
            }
            if(id){
                updateDepartment(id,department)
                .then((resp) =>{
                    console.log(resp.data);
                    navigate('/departments')
                })
                .catch(err => console.log(err))
            }
            else{
                createDepartment(department)
                .then((resp) =>{
                    console.log(resp.data);
                    navigate("/departments")
                })
                .catch(err => console.log(err)) 
            }
        }
    };

    function validateForm(){
        let valid = true;
        const errorCopy = { ...errors };
        if(code.trim()){
            errorCopy.code = "";
        }
        else{
            errorCopy.code = "Code is required!"
            valid = false;
        }
        if(name.trim()){
            errorCopy.name = "";
        }
        else{
            errorCopy.name = "Name is required!"
            valid = false;
        }
        if(country.trim()){
            errorCopy.country = "";
        }
        else{
            errorCopy.country = "Country is required!"
            valid = false;
        }
        setErrors(errorCopy);
        return valid;
    }
    const pageTitle = () => {
        if(id){
            return <h2 className="text-center">Update Department</h2>
        }else{
            return <h2 className="text-center">Create Department</h2>
        }
      }
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="card col-md-6 offset-md-3">
                <div className="card-header">
                    {pageTitle()}
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className='form-label'>Code</label>
                            <input type="text"
                                    placeholder='Enter Department Code'
                                    name='code'
                                    value={code}
                                    className={`form-control ${errors.code ? "is-invalid" : ""}`} 
                                    onChange={handleCode}/>
                                {errors.code && (
                                    <div className="invalid-feedback">{errors.code}</div>
                                )}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Name</label>
                            <input type="text"
                                    placeholder='Enter Department Name'
                                    name='name'
                                    value={name}
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`} 
                                    onChange={handleName}/>
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Country</label>
                            <input type="text"
                                    placeholder='Enter Country'
                                    name='country'
                                    value={country}
                                    className={`form-control ${errors.country ? "is-invalid" : ""}`} 
                                    onChange={handleCountry}/>
                                {errors.country && (
                                    <div className="invalid-feedback">{errors.country}</div>
                                )}
                        </div>
                        <button onClick={saveDepartment} className="btn btn-success w-100 py-2">
                            {id ? "Update" : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent