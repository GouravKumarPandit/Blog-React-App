import React from 'react';
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth'; // From the appwrite
import {logout} from '../../store/authSlice'; // From the Store

function LogoutBtn() {
    const dispatch = useDispatch();
    function logoutHandler(){
        authService.logout().then(() => dispatch(logout))
    }

    return <div className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</div>;
}

export default LogoutBtn