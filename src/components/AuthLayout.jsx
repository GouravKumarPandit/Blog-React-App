import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login');
        } else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])
    // authStatus = Whenever login or logout status will change this will run 
    // navigate = Whenever URL will change this will run. 
    // authentication == Whenever authentication value will change this will run. This value will be sent by user.

    return loader ? <h1>Loading...</h1> : <>{children}</>
}