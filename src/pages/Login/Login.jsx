import React, { useState } from 'react';
import Button from '../../style/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {

    const [input, setInputs] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.loading('Logging you in...');

        axios.post('/auth/login', input)
            .then((response) => {
                console.log(response.data);
                toast.dismiss();
                toast.success('Logged in successfully!');
                sessionStorage.setItem('token', response.data.access_token);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
                toast.dismiss();
                if(error.response.status === 401) toast.error(error.response.data.message);
                else toast.error(error.message);
            })

    }

    return (
        <>
            <div className='flex items-center justify-center min-h-screen text-center'>

                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />

                <div className='container space-y-5 bg-white/70 p-10 rounded-3xl shadow-slate-300 shadow-lg drop-shadow-lg'>
                    <h1 className='md:text-5xl text-4xl font-bold md:my-16'>Login</h1>
                    <div className='items-center space-y-5'>
                        <form >
                            <div>
                                <input className='w-full md:w-1/3 my-3 p-3 rounded-2xl border-b-4 border-blue-600 bg-slate-300 text-center text-semibold md:text-xl focus:bg-slate-200 focus:outline-none transition-all duration-250 hover:border-2 focus:border-2 hover:bg-slate-200'
                                    placeholder='Email'
                                    type="email"
                                    name='email'
                                    id='email'
                                    value={input.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input className='w-full md:w-1/3 my-3 p-3 rounded-2xl border-b-4 border-blue-600 bg-slate-300 text-center text-semibold md:text-xl focus:bg-slate-200 focus:outline-none transition-all duration-250 hover:border-2 focus:border-2 hover:bg-slate-200'
                                    placeholder='Password'
                                    type="password"
                                    name='password'
                                    id='password'
                                    onChange={handleChange}
                                    value={input.password} 
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className='items-center gap-5'>
                        <Button title='Login' size='large' onClick={handleSubmit} type={'primary'} />
                        <Button title='SignUp' size='large' navi={'/signup'} type={'invert'} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login;
