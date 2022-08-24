import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { API } from "../api/fetchData";

const SendPasswordResetEmail = () => {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
        }
        if (actualData.email) {
            try {
                const res = await API.post("/user/send-reset-password-email", { email: actualData.email });
                if (res.data.status === "success") {
                    document.getElementById('password-reset-email-form').reset()
                    setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' })
                    toast.success("Password Reset Email Sent. Check Your Email !!")
                }
                if (res.data.status === "failed") {
                    setError({ status: true, msg: res.data.msg, type: 'error' })
                }
            } catch (error) {
                setError({
                    status: true,
                    msg: error.response.data.msg,
                    type: "error"
                })
            }
        } else {
            setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
        }
    }
    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item sm={6} xs={12}>
                    <h1>Reset Password</h1>
                    <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
                        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
                        <Box textAlign='center'>
                            <Button type='submit' variant='contained' color="primary" sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
                        </Box>
                        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default SendPasswordResetEmail