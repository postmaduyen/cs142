import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Chip,
} from "@mui/material";
import "./styles.css";
import axios from "axios";

function CommentCustom(props) {
  console.log("comentDiaLog user : " + props.user);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async () => {
    try {
      const commentText = comment;
      setComment(""); // clear output before UI disappears
      setOpen(false); // close the comment dialog UI panel

      // Send POST request with comment text
      await axios.post(`http://localhost:8081/api/comment/${props.photo_id}`, {
        comment: commentText,
        user: props.user,
      });
      // notify upper level component to re-render UI
      props.addComment();
    } catch (error) {
      console.log("Comment Sent Failure: ", error);
    }
  };

  return (
    <div className="comment-dialog">
      <Chip label="Reply" onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClickClose}>
        <DialogContent>
          <DialogContentText>Add a comment...</DialogContentText>
          <TextField
            value={comment}
            onChange={handleCommentChange}
            autoFocus
            multiline
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleCommentSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommentCustom;
