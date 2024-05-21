import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./styles.css";

function TopBar(props) {
  const handleLogoutButtonClicked = async () => {
    props.changeUser(null);
    props.changeStatus(false);
  };

  return (
    <AppBar className="cs142-topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          PhotoSharing
        </Typography>
        <Typography
          className="version"
          variant="body1"
          color="inherit"
        ></Typography>
        {props.userIsLoggedIn ? (
          <>
            <Typography className="login" variant="h5" color="inherit">
              {`Hello ${props.user.first_name}`}
            </Typography>
            <div className="logoutButton">
              <Button
                variant="contained"
                color="secondary"
                className="logout-button"
                onClick={handleLogoutButtonClicked}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Typography className="login" variant="h5" color="inherit">
            Please Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
