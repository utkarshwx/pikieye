import React, { useEffect, useState } from 'react'
import Button from '../../style/Button'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Header = () => {

    const [userPayload, setUserPayload] = useState(false);

    const navigate = useNavigate();

    function decodeAndValidateJWT() {

        const token = sessionStorage.getItem('token');

        if(token == 'undefined') {
            return false;
        }

        if (!token) {
            return false;
        }

        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        const currentTime = Math.floor(Date.now() / 1000);
        const isExpired = payload.exp && currentTime >= payload.exp;

        if (isExpired) {
            sessionStorage.removeItem('token');
            console.log('Token has expired and was removed from session storage.');
            navigate('/auth');
            return false;
        }

        return true;
    }

    function handleLogout() {
        // Remove the token from session storage
        toast.success('Logged out successfully!');
        sessionStorage.removeItem('token');
        navigate('/');

        console.log('Token has been removed from session storage.');
    }

    useEffect(() => {
        setUserPayload(decodeAndValidateJWT());
    })

    // useEffect(() => {
    //     if (!userPayload) {
    //         navigate('/auth');

    //     }
    // }, [userPayload])


    return (
        <div className='m-5 backdrop-blur-xl'>
            <header className="bg-blue-100/50 py-5 border-5 rounded-xl">
                <nav className="mx-5 md:mx-10 flex justify-between items-center">
                    <div className="text-4xl font-bold text-gray-700">PIKIEYE</div>



                    <Button title={userPayload ? 'Logout' : 'Login'} onClick={userPayload ? handleLogout : navigate('/auth')} type='primary' />

                </nav>
            </header>
        </div>
    )
}

export default Header
