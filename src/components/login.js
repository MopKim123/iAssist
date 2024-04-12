import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { variables } from '../variables';

function LoginPage() {
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    });
    const navigate = useNavigate(); 

    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        navigate('/dashboard');
        // try {
        //     const response = await fetch(`${variables.API_URL}UserAccount/login`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
    
        //     if (!response.ok) {
        //         throw new Error('Login Failed');
        //     }
    
        //     const data = await response.json();
    
        //     if (data.UserId) { // Assuming UserId is always present in the response
        //         console.log("Logged in user:", data);
        //         // Store user's name in session storage
        //         sessionStorage.setItem('firstName', data.FirstName);
        //         sessionStorage.setItem('lastName', data.LastName);
        //         // Redirect user to the dashboard
        //        // history.push("/dashboard");
        //         navigate('/dashboard');
        //     } else {
        //         throw new Error('Invalid response data');
        //     }
        // } catch (error) {
        //     console.error('Login Failed', error.message);
        //     setErrorMessage('Login Failed.');
        // }
    };

    return (
        <div className="bg-gradient-primary d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card o-hidden border-0 shadow-lg">
                            <div className="card-body p-5">
                                <div className="text-center">
                                    <img src="./img/hris-2.png" alt="Logo" className="logo" style={{ width: '200px', height: 'auto' }} />
                                </div>
                                <hr />
                                <div className="text-center" style={{ margin: '20px' }}>
                                    <img src="./img/login.png" alt="Login" className="login-image" style={{ width: '100px', height: '90px' }} />
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" id="Email" aria-describedby="emailHelp" placeholder="Enter Email Address..." onChange={handleChange} value={formData.Email} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user" id="Password" placeholder="Password" onChange={handleChange} value={formData.Password} />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">Login</button>
                                </form>
                                <hr />
                                {/* <div className="text-center">
                                    <Link className="small" to="/forgotpassword">Forgot Password?</Link>
                                </div> */}
                                <div className="text-center">
                                    <Link className="small" to="/register">No account yet? Create an Account!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;