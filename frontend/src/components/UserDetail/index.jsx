import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams(); // Extract userId from route params
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const userData = await fetchModel(`user/${userId}`);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (user)
    return (
      <div>
        <Typography variant="h4" className="heading">
          User Detail
        </Typography>
        <div className="user-detail-container">
          <Typography variant="h5" className="user-name">
          {user.last_name}
          </Typography>
          <Typography className="user-info">
            Location: {user.location}
          </Typography>
          <Typography className="user-info">
            Description: {user.description}
          </Typography>
          <Typography className="user-info">
            Occupation: {user.occupation}
          </Typography>
          <button>
            <Link to={`/photos/${userId}`} className="view-photos-link">
              View Photos
            </Link>
          </button>
        </div>
      </div>
    );
}

export default UserDetail;
