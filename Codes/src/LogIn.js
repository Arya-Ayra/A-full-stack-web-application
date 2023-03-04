import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
var bcrypt = require('bcryptjs');

// import {export}
const LogIn = () => {

    const navigate2 = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("isLogedIn") === "true"){
          navigate("/profile");
        }
    })

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const handleLogIn = (event) => {
      event.preventDefault();
      let x = {username , password};
      // console.log(x);
      axios.post('http://localhost:5000/yourlogin', x)
        .then(response => {
          var getUserData = response.data;
          console.log(response.data);
          var pass_got = getUserData.password;

          if(bcrypt.compareSync(x.password , pass_got)){
            localStorage.setItem("username",getUserData.username); 
            localStorage.setItem("isLogedIn","true");
            navigate("/profile");
          }
          else{
            window.location.reload(false); 
          }
          
        })
        .catch(error => {
          console.error(error);
        });
    };

    
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }


    const handleSignUp = (event) => {
      event.preventDefault();
      console.log(formData);

      axios.post('http://localhost:5000/yoursingup', formData)
        .then(response => {
          console.log(response.formData);
        })
        .catch(error => {
          console.error(error);
        });

      window.location.reload(false);
    }
    return ( 
        <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span className="h4">Log In</span><span className="h4">Sign Up</span></h6>
                      <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                      <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h3 className="mb-4 pb-3">Log In</h3>
                          <form  onSubmit={handleLogIn}>
                                <div className="form-group">
                                  <input type="text" name="logemailin" value={username} className="form-style" placeholder="Your Username" id="usernamein" onChange={(event) => setUsername(event.target.value)} autoComplete="off" />
                                  <i className="input-icon uil uil-at"></i>
                                </div>	
                                <div className="form-group mt-2">
                                  <input type="password" name="logpassin" value={password} className="form-style" placeholder="Your Password" id="logpassin" autoComplete="off" onChange={(event) => setPassword(event.target.value)}/>
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <button type="submit" className="btn btn-lg mt-4" >Submit</button>
                                <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                          </form>
                            </div>
                          </div>
                          
                        </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h3 className="mb-4 pb-3 pt-3">Sign Up</h3>

                    <form onSubmit={handleSignUp}>

                          <div className="d-flex flex-row bd-highlight">
                            <div className="form-group me-1">
                              <input onChange={handleChange} type="text" name="logfirstname" className="form-style" placeholder="First Name" id="logfirstname" autoComplete="off"/>
                              <i className="input-icon uil uil-user"></i>
                            </div>	

                            <div className="form-group ms-1">
                              <input onChange={handleChange}  type="text" name="loglastname" className="form-style" placeholder="Last Name" id="loglastname" autoComplete="off"/>
                              <i className="input-icon uil uil-user"></i>
                            </div>	
                          </div>

                          <div className="form-group mt-2">
                            <input onChange={handleChange}  type="text" name="logusername" className="form-style" placeholder="UserName" id="logusername" autoComplete="off"/>
                            <i className="input-icon uil uil-user"></i>
                          </div>	

                          <div className="form-group mt-2">
                            <input onChange={handleChange}  type="text" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off"/>
                            <i className="input-icon uil uil-at"></i>
                          </div>	

                          <div className="d-flex flex-row bd-highlight mt-2">
                            <div className="form-group me-1">
                              <input onChange={handleChange} type="text" name="lognumber" className="form-style" placeholder="Contact Number" id="lognumber" autoComplete="off"/>
                              <i className="input-icon uil uil-user"></i>
                            </div>	

                            <div className="form-group ms-1">
                              <input onChange={handleChange} type="number" name="logage" className="form-style" placeholder="Age" id="logage" autoComplete="off"/>
                              <i className="input-icon uil uil-user"></i>
                            </div>	
                          </div>

                          <div className="form-group mt-2">
                            <input onChange={handleChange} type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off"/>
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn btn-lg mt-4" >SignUp</button>
                        </form>
                          {/* <a href="#" className="btn btn-lg mt-4" onClick={handleSignUp}>SignUp</a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>

                </div>
              </div>
          </div>
          {/* <Outlet /> */}
      </div>
     );
}
 
export default LogIn;