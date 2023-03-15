import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Admin() {
  const [allEmployees, setAllEmployees] = useState([])

  const fetchData = async () => {
    const result = await axios.get('http://localhost:8000/get-all-employees')
    setAllEmployees(result.data.employees);
  }
  useEffect(() => {
    fetchData()
  }, [])

  //handleDelete
  const handleDelete = async (id)=>{
    const result = axios.delete('http://localhost:8000/delete-employee/'+id)
    alert((await result).data.message);
    fetchData()
  }

  return (
    <div>
      <div className='container-fluid mt-5'>
        <h1 className=''><i class="fa-solid fa-users me-3"></i>Employee Management App
          <Link to={'/add'}>
            <a className='btn btn-success ms-5'><i class="fa-solid fa-user-plus me-2"></i>Add Employee</a>
          </Link>

        </h1>
        <p style={{ textAlign: 'justify' }}>
          This is dummy data:Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printi and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
        </p>

      </div>
      {/* table design*/}
      <div className='container mt-2 mb-2'>
        <h1 className='text-primary mb-5'>Employee details</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              allEmployees?.map((item) => (
                <tr>

                  <td>{item.id}</td>
                  <td>{item.uname}</td>
                  <td>{item.age}</td>
                  <td>{item.desg}</td>
                  <td>{item.salary}</td>
                  <td>
                    <Link to={'edit/'+item.id}>
                    <button className='btn btn-warning me-3'><i class="fa-solid fa-pen"></i>{" "}
                    </button>
                    </Link>
                   
                    <button onClick={()=>handleDelete(item.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i>{" "}
                    </button>
                  </td>
                </tr>

              ))

            }

          </tbody>
        </Table>
      </div>


    </div>


  )
}

export default Admin