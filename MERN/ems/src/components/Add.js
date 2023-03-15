import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';



function Add() {

  const [id, setId] = useState('')
  const [empName, setName] = useState('')
  const [empAge, setAge] = useState('')
  const [empDesg, setDesg] = useState('')
  const [empSalary, setSalary] = useState(0)

  let location = useNavigate()
  //generating unique id
  useEffect(() => {
    setId(uuid().slice(0, 3));
  }, [])



  const handleAddEmployee = async (e) => {
    //prevent to refresh the page
    e.preventDefault()
    //generating unique id
    setId(uuid().slice(0, 3));


    //create body to share with backend
    const body = {
      id,
      empName,
      empAge,
      empDesg,
      empSalary
    }
    console.log(body);
    //api call
    const result = await axios.post('http://localhost:8000/add-employee',body)
    alert(result.data.message);
    //redirect to admin
    location('/')

  }
  return (
    <div>
      <div className='container-fluid mt-5'>
        <h1 className=''><i class="fa-solid fa-user-plus me-2"></i>New Employee Adding Form


        </h1>
        <p style={{ textAlign: 'justify' }}>
          This is dummy data:Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printi and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
        </p>

      </div>

      <div className=' mt-3 mb-3 p-5 border-primary border-rounded'>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Employee Name</Form.Label>

            <Form.Control type="text" placeholder="Enter Employee Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Employee Age</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDesg">
            <Form.Label>Employee Designation</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Designation"
              onChange={(e) => setDesg(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSalary">
            <Form.Label>Employee Salary</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Salary"
              onChange={(e) => setSalary(e.target.value)} />
          </Form.Group>
          <Button onClick={(e) => handleAddEmployee(e)} variant="success" type="submit">
            Add
          </Button>
          <Link to={'/'}>
            <Button className='ms-3' variant="warning" type="submit">
              Close
            </Button>
          </Link>

        </Form>

      </div>
    </div>
  )
}

export default Add