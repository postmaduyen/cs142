import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const changeStatus = (status) => setUserIsLoggedIn(status);

  const changeUser = (user) => setUser(user);
  return (
    <Router>
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TopBar
              userIsLoggedIn={userIsLoggedIn}
              changeStatus={changeStatus}
              changeUser={changeUser}
              user={user}
            />
          </Grid>
          <div className="cs142-main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="cs142-main-grid-item">
              {userIsLoggedIn && <UserList />}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="cs142-main-grid-item">
              <Routes>
                {userIsLoggedIn ? (
                  <>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route
                      path="/photos/:userId"
                      element={<UserPhotos user={user} />}
                    />
                    <Route path="/users" element={<UserList />} />
                    <Route
                      path="/login-register"
                      element={<Navigate to={"/users/" + user._id} />}
                    />
                    <Route
                      path="/"
                      element={<Navigate to={"/users/" + user._id} />}
                    />
                  </>
                ) : (
                  <>
                    <Route
                      path="/users/*"
                      element={<Navigate to="/login-register" />}
                    />
                    <Route
                      path="/photos/*"
                      element={<Navigate to="/login-register" />}
                    />
                    <Route
                      path="/login-register"
                      element={
                        <LoginRegister
                          changeUser={changeUser}
                          changeStatus={changeStatus}
                        />
                      }
                    />
                    <Route
                      path="/"
                      element={<Navigate to="/login-register" />}
                    />
                  </>
                )}
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
