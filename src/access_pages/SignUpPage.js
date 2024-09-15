import React , {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const SignUpPage = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"", geolocation:""})
   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser',
           { method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation,})

        }
        )
        const json = await response.json()
        console.log(json);
        if(!json.success){
          alert("Enter valid credentials")
        }

    }
    const handleInptChange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="Your Company"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create an Account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
    
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="exampleInputName" name = "name" value = {credentials.name} onChange = {handleInptChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name = "email" value = {credentials.email} onChange = {handleInptChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name = "password" value = {credentials.password} onChange = {handleInptChange}/>
    </div>
 
   <Link to = "/login"> <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         >Submit</button></Link>
    
  </form> <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?{' '}
        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign In
        </Link>
      </p>
    </div>
  </div></>
  )
}
