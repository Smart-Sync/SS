import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../asset/drdoofficial-seeklogo.com.png";

export const LoginExpert = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/loginexpert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    console.log(json)
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("expertId", json.expertId);
      localStorage.setItem("name", json.userdata.name);
      localStorage.setItem("email", json.userdata.email);
      localStorage.setItem("qualifications", json.userdata.qualifications);
      localStorage.setItem("skills", json.userdata.skills);
      localStorage.setItem("years_of_expirience", json.userdata.years_of_experience);
      localStorage.setItem("date_of_availability", json.userdata.date_of_availability);

    // console.log(localStorage.getItem("date_of_availability"))
      
      // console.log(localStorage.getItem("authToken"));
      navigate(`/expert/homepage/${json.expertId}`);
    }
  };
  const handleInptChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto max-h-40 max-w-xs"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account as Expert
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={handleInptChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={handleInptChange}
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </form>
        
        </div>
      </div>
    </>
  );
};
