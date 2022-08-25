import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import success from "../assets/success.png";

const VerifyUser = () => {
    const [validUrl, setValidUrl] = useState(true);
    const { id, token } = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://backend-emedicine-platform.herokuapp.com/user/verify-user/${id}/${token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [id, token]);
    return (
        <>
            {validUrl ? (
                <div className="verifyContainer">
                    <img src={success} alt="success_img" />
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <Button className="verifyBtn" variant='contained'>Login</Button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    )
}

export default VerifyUser