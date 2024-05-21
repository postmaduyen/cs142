import React, { useState } from "react";
import { Typography, Divider, TextField, Button } from "@material-ui/core";
import axios from "axios";
import bcrypt from "bcryptjs-react";
import { useNavigate } from "react-router-dom";
const salt = bcrypt.genSaltSync(10);

const LoginRegister = (props) => {
  const navigate  = useNavigate()
  const [state, setState] = useState({
    login_name: "",
    password: "",
    login_error: "",
    register_error: "",
    register_login_name: "",
    register_password: "",
    register_password2: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/credential/login",
        {
          login_name: state.login_name,
          password: state.password,
        }
      );
      console.log(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data))
      
      props.changeUser(response.data);
      props.changeStatus(true);
    } catch (error) {
      console.log(error);
      setState((prevState) => ({
        ...prevState,
        login_error: "Incorrect username or password.",
      }));
    }
  };

  const handleRegist = async (event) => {
    event.preventDefault();
    if (
      state.register_login_name &&
      state.register_password &&
      state.register_password2 &&
      state.first_name &&
      state.last_name &&
      state.location &&
      state.description &&
      state.occupation
    ) {
      if (state.register_password !== state.register_password2) {
        setState((prevState) => ({
          ...prevState,
          register_error: "Passwords do not match",
        }));
      } else {
        try {
          var hashPassword = bcrypt.hashSync(state.register_password, salt);
          const response = await axios.post(
            "http://localhost:8081/api/credential/register",
            {
              first_name: state.first_name,
              last_name: state.last_name,
              location: state.location,
              description: state.description,
              occupation: state.occupation,
              login_name: state.register_login_name,
              password: hashPassword,
            }
          );
          console.log(response);
          setState((prevState) => ({
            ...prevState,
            register_login_name: "",
            register_password: "",
            register_password2: "",
            first_name: "",
            last_name: "",
            location: "",
            description: "",
            occupation: "",
            register_error: "User Created Successfully",
          }));
        } catch (error) {
          setState((prevState) => ({
            ...prevState,
            register_error: error.response.data,
          }));
        }
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        register_error: "Please fill in all information",
      }));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              type="text"
              label="User Name"
              name="login_name"
              value={state.login_name}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Typography variant="subtitle2">{state.login_error}</Typography>
        </form>
      </div>

      <Divider orientation="vertical" flexItem style={{ margin: "0 20px" }} />

      <div style={{ flex: 1, marginLeft: "20px" }}>
        <Typography variant="h5">Registration</Typography>
        <form onSubmit={handleRegist}>
          <div>
            <TextField
              type="text"
              label="User Name"
              name="register_login_name"
              value={state.register_login_name}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Password"
              name="register_password"
              value={state.register_password}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Confirm Password"
              name="register_password2"
              value={state.register_password2}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="text"
              label="First Name"
              name="first_name"
              value={state.first_name}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Last Name"
              name="last_name"
              value={state.last_name}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Location"
              name="location"
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Description"
              name="description"
              value={state.description}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Occupation"
              name="occupation"
              value={state.occupation}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Register Me
          </Button>
          <Typography variant="subtitle2">{state.register_error}</Typography>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
