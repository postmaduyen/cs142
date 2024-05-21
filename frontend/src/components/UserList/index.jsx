import React, { useState, useEffect } from "react";
import { Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await fetchModel("user/list");
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);
  if (users)
    return (
      <div>
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item.id}>
              <ListItemButton component={Link} to={`/users/${item._id}`}>
                <ListItemText
                  primary={item.first_name + " " + item.last_name}
                />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;
