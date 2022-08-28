import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../utils/fetchData";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  paper: {
    maxWidth: "400px",
    margin: "60px auto",
    textAlign: "center",
    justifyContent: "center",
    padding: "20px",
  },
  heading: {
    fontWeight: "600",
    padding: "25px 0",
    paddingBottom: "60px",
  },
  inputFeild: {
    width: "100%",
    marginBottom: "13px",
  },
  button: {
    width: "100%",
    marginBottom: "13px",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    padding: "10px 0",
  },
  info: {
    padding: "50px 0",
    fontSize: "18px",
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend-emedicine-platform.herokuapp.com/user/login", {
        email,
        password,
      });

      localStorage.setItem('firstLogin', true)
      localStorage.setItem('token', res.data.accessToken)
      if (res.data.user.status === false) {
        toast.success(res.data.msg);
        setSuccess({ status: true, msg: res.data.msg, type: 'success' })
      }

      if (res.data.user.status === true) {
        toast.success(res.data.msg,{
          position: "top-right",
          autoClose: 3000,
        })
        setTimeout(() => {
          window.location.href = "/";
        }
          , 3000)
      
      }
      //  // toast.success("Welcome! "+ res.data.newUser.userName);
      //  // window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={0} direction="column" justifyContent="center">
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className={classes.inputFeild}
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                className={classes.inputFeild}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button type="submit" className={classes.button}>
                sign in
              </Button>
            </form>
            <Typography variant="h7" style={{
              textAlign: "right",
            }}>
              <Link to="/send-reset-password-email" className="forgetPsd">Forget Password?</Link>
            </Typography>
            {
              success.status ?
                <Alert severity={success.type}>{success.msg}</Alert> : ""
            }
            <Typography variant="h6" className={classes.info}>
              Don't have an account? <Link to="/register" className="signUpLink"

              >Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
