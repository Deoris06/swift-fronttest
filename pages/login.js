import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../helpers/alerts';
import { API } from '../config';
import { authenticate, isAuth } from '../helpers/auth';

const Login = () => {
    const [state, setState] = useState({
        email: 'adekschris@gmail.com',
        password: '1234567890',
        error: '',
        success: '',
        buttonText: 'Login'
    });

    useEffect(() => {
        isAuth() && Router.push('/');
    }, []);

    const { email, password, error, success, buttonText } = state;

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Login' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Logging in' });
        try {
            const response = await axios.post(`${API}/login`, {
                email,
                password
            });
            // console.log(response); // data > token / user
            authenticate(response, () =>
                isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user')
            );
        } catch (error) {
            console.log(error);
            setState({ ...state, buttonText: 'Login', error: error.response.data.error });
        }
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <input
                    value={email}
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control p-3"
                    placeholder="Type your email"
                    required
                />
            </div>
            <div className="form-group mb-3">
                <input
                    value={password}
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control p-3"
                    placeholder="Type your password"
                    required
                />
            </div>
            <div className="form-group mb-3 d-flex justify-content-between">
                <button className="btn btn-primary px-4 rounded-pill">{buttonText}</button>
                <Link href="/auth/password/forgot" legacyBehavior>
                    <a className="text-primary align-self-end  text-decoration-none">Forgot Password?</a>
                </Link>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className='row'>
                <div className='col-md-6 cover d-none d-lg-block'>
                    <div className="card text-bg-dark border-0 shadow-none rounded-0">
                        <img src="/static/images/log-1.jpg" className="card-img" alt="Login Image" style={{ objectFit: 'cover', height:'100vh', filter: 'brightness(0.3)'}}/>
                        <div className="card-img-overlay pt-5">
                            <h1 className="card-title pt-5">Sign In to Swift</h1>
                            <p className="card-text fs-5">Learn, Read and Discover</p>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-6 p-5">
                <h1>Login</h1>
                <p>Welcome back! Start creating links.</p>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {loginForm()}
                
            </div>
            </div>
            
        </Layout>
    );
};

export default Login;
