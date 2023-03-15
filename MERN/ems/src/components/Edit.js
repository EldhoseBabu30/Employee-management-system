
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Edit() {

  const [id, setId] = useState('')
  const [empName, setName] = useState('')
  const [empAge, setAge] = useState('')
  const [empDesg, setDesg] = useState('')
  const [empSalary, setSalary] = useState(0)

  //get path parameter from url
  const params = useParams()

  const location = useNavigate()
  

  //api call to get details of a particular employee from server - get-an-employee

  const fetchEmployee= async ()=>{
    const result = await axios.get('http://localhost:8000/get-an-employee/' + params.id)
    setId(result.data.employee.id);
    setName(result.data.employee.uname);
    setAge(result.data.employee.age);
    setDesg(result.data.employee.desg);
    setSalary(result.data.employee.salary);
  }
  const handleUpdate = async(e)=>{
    e.preventDefault()
    //create body to share with backend
    const body = {
      id,
      empName,
      empAge,
      empDesg,
      empSalary
    }
    //api call - post-update employee
    const result = await axios.post('http://localhost:8000/update-employee',body)
    alert(result.data.message)
    location('/')
  }

  useEffect(()=> {
    fetchEmployee()
  }, [])
  return (
    <div>
      <div className='container-fluid mt-5'>
        <h1>{" "}
          <i class="fa-solid fa-user-pen me-2"></i>Update Employee Form


        </h1>
        <p style={{ textAlign: 'justify' }}>
          This is dummy data:Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printi and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
        </p>

      </div>
      {/*form design */}
      <div className=' mt-3 mb-3 p-5 border-primary border-rounded'>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Employee Name</Form.Label>

            <Form.Control type="text" placeholder="Enter Employee Name" value={empName}
            onChange={(e)=>setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Employee Age</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Age" value={empAge}
             onChange={(e)=>setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDesg">
            <Form.Label>Employee Designation</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Designation" value={empDesg}
             onChange={(e)=>setDesg(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSalary">
            <Form.Label>Employee Salary</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Salary" value={empSalary}
             onChange={(e)=>setSalary(e.target.value)} 
             />
          </Form.Group>
          <Button onClick={(e)=>handleUpdate(e)} variant="success" type="submit">
            Update
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

export default Edit