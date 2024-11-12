import React, { useEffect } from 'react';
import Button from '../style/Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

const Signup = () => {

    const [input, setInputs] = React.useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (input.password.length < 8) {

            if (!pattern.test(input.password.value)) {

                toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one special character", {
                    duration: 3000,
                    style: {
                        backgroundColor: 'red',
                        color: 'white',
                    }
                })
            }

            else{
                toast.error("Password must be at least 8 characters", {
                    duration: 3000,
                    style: {
                        backgroundColor: 'red',
                        color: 'white',
                    }
                })
            }


            
        }

        else {

            toast.loading('Creating your account...')

            axios.post('/auth/signup', input)
                .then((response) => {
                    console.log(response);
                    toast.dismiss();
                    toast.success('Account created successfully!')
                    setTimeout(() => {
                        navigate('/auth');
                    }, 2000, []);

                })
                .catch((error) => {
                    toast.dismiss();
                    toast.error(error.response.data.message)
                })
        }



    }

    return (
        <>
            <div className='flex items-center justify-center min-h-screen text-center'>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />

                <div className='container space-y-5 bg-white/50 p-10 rounded-3xl shadow-slate-300 shadow-lg drop-shadow-lg'>
                    <h1 className='md:text-5xl text-4xl font-bold md:my-16'>Signup</h1>
                    <div className='items-center space-y-5'>
                        <form >
                            <div>
                                <input className='w-full md:w-1/3 my-3 p-3 rounded-2xl border-b-4 border-blue-600 bg-slate-300/70 text-center text-semibold md:text-xl focus:bg-slate-200/60 focus:outline-none transition-all duration-250 hover:border-2 focus:border-2 hover:bg-slate-200/60'
                                    placeholder='Email'
                                    type="email"
                                    name='email'
                                    id='email'
                                    onChange={handleChange}
                                    value={input.email}
                                    required
                                />
                            </div>
                            <div>
                                <input className='w-full md:w-1/3 my-3 p-3 rounded-2xl border-b-4 border-blue-600 bg-slate-300/70 text-center text-semibold md:text-xl focus:bg-slate-200/60 focus:outline-none transition-all duration-250 hover:border-2 focus:border-2 hover:bg-slate-200/60'
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
                        <Button title='Signup' size='large' onClick={handleSubmit} type={'invert'} />
                        <Button title='Login' size='large' navi={'/auth'} type={'primary'} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup;
