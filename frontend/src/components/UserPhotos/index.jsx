import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
import "./styles.css";

function UserPhotos(props) {
  const user = props.user;
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPhotoId, setCurrentPhotoId] = useState(null);
  const uploadInputRef = useRef(null);

  const fetchUserPhotos = async () => {
    try {
      const data = await fetchModel(`photo/${userId}`);
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching user photos:", error);
    }
  };

  const handleAddPhoto = async () => {
    if (uploadInputRef.current && uploadInputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append("uploadedphoto", uploadInputRef.current.files[0]);
      try {
        await axios.post(
          `http://localhost:8081/api/photo/new/${user._id}`,
          formData
        );
        // Wait for the photo to be successfully uploaded, then fetch the user photos again.
        fetchUserPhotos();
      } catch (err) {
        console.error("POST ERR:", err);
      }
    }
  };
  console.log(photos)

  const handleAddComment = async (photoId) => {
    if (newComment.trim() !== "") {
      try {
        await axios.post(`http://localhost:8081/api/comment/${photoId}`, {
          comment: newComment,
          user: props.user,
        });
        setNewComment("");
        fetchUserPhotos();
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };
  useEffect(() => {
    fetchUserPhotos();
  }, [userId]);

  return (
    <div className="user-photos-container">
      <Typography variant="body1">User Photos for User ID: {userId}</Typography>
      {props.user._id === userId && (
        <div>
          <input type="file" accept="image/*" ref={uploadInputRef} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPhoto}
            style={{ marginBottom: "20px" }}
          >
            Add Photo
          </Button>
        </div>
      )}
      {photos.length === 0 ? (
        <div>No photos found for this user.</div>
      ) : (
        photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <img
              src={`http://localhost:8081/api/photo/images/${photo.file_name}`}
              alt={`Photo by user ${userId}`}
            />
            <div className="photo-details">
              <Typography variant="body2">Time: {photo.date_time}</Typography>
              <Typography variant="h6">Comments</Typography>
              <div className="comments-section">
                {photo.comments.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <Typography variant="body2">
                      {comment.user_name}: {comment.comment}
                    </Typography>
                    <Typography variant="body2">
                      Time: {comment.date_time}
                    </Typography>
                  </div>
                ))}
              </div>
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                  setCurrentPhotoId(photo._id);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddComment(photo._id)}
                style={{ marginTop: "10px" }}
              >
                Add Comment
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPhotos;
