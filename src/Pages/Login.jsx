import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://dnsmanager-backend-olzn.onrender.com/login', { email, password },  { headers: {'Content-Type': 'application/json'} })
            .then(result => {
                console.log(result);
                if (result.data.message === "Success") {
                    alert('Login successful!');
                    navigate('/home');
                } else {
                    alert(result.data.message);
                }
            })
            .catch(err => {
                
                console.error('Error during login:', err);
                alert('An error occurred. Please try again.');
            });
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-red-500 btn btn-primary">Login</button>
                    </form>
                    <p className='container my-2'>Don't have an account?</p>
                    <Link to='/signup' className="btn btn-secondary">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
