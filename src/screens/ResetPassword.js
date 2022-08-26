import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import axios from "axios";
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { API } from "../utils/fetchData";



const ResetPassword = () => {
  const history = useHistory()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const { id, token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    }
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await API.post(`/user/reset-password/${id}/${token}`, { password:actualData.password,password_confirmation:actualData.password_confirmation});
        console.log(res,"res");
        if (res.data.status === "success") {
          document.getElementById('password-reset-form').reset()
          setError({ status: true, msg: "Password Reset Successfully. Redirecting to Login Page...", type: 'success' })
          toast.success("Password Reset Successfully. Redirecting to Login Page...",{
            position: "top-right",
            autoClose: 3000,
          })
          setTimeout(() => {
            history.push("/login")
          }, 3000)
        }
        if (res.data.status === "failed") {
          setError({ status: true, msg: res.data.message, type: 'error' })
        }
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
          <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm New Password' type='password' />
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export default ResetPassword;