import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteDepartment, listDepartments } from '../service/DepartmentService';

const ListDepartmentComponent = () => {

    const [departments,setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllDepartments();
    },[departments])

    const getAllDepartments = () =>{
        listDepartments()
        .then((resp) => {
            setDepartments(resp.data);
        })
        .catch(err => console.log(err));
    }

    const addDepartment = () => navigate("/add-department")
    const updateDepartment = (id) => navigate(`/edit-department/${id}`);
    const removeDepartment = (id) => deleteDepartment(id)
                                        .then((resp) => {
                                            console.log(resp);
                                            getAllDepartments();
                                            navigate("/departments")
                                        })
                                        .catch(err => console.log(err))
  return (
    <>
    <div className="container mt-5">
        <div className="card">
            <div className="card-header">
                <h2 className='text-center'>List Departments</h2>
            </div>
            <button className='btn btn-primary' onClick={addDepartment}>Add Department</button>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(e =>(
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.code}</td>
                                <td>{e.name}</td>
                                <td>{e.country}</td>
                                <th>
                                    <button onClick={() => updateDepartment(e.id)} className='btn btn-info'>Update</button>
                                    <button onClick={() => removeDepartment(e.id)} className='btn btn-outline-danger ms-5'>Delete</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default ListDepartmentComponent