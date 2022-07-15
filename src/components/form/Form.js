import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper,  } from '@material-ui/core'; 
import FileBase64  from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';

import useStyles from "./styles";
import { createPost, updatedPost } from '../../action/posts';

export const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  const classes = useStyles();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
  const dispatch = useDispatch();

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])
  const handelSubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatedPost(currentId, postData))
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null)
  setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handelSubmit}>
        <Typography variant='h6' >{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField name='creator'
         variant='outlined'
         label="Creator" 
         fullWidth 
         value={postData.creator} 
         onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
         <TextField name='title'
         variant='outlined'
         label="Title" 
         fullWidth 
         value={postData.title} 
         onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
         <TextField name='message'
         variant='outlined'
         label="Message" 
         fullWidth 
         value={postData.message} 
         onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
         <TextField name='tags'
         variant='outlined'
         label="Tags" 
         fullWidth 
         value={postData.tags} 
         onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
         <div className={classes.fileInput}>
          <FileBase64 type="file" multiple={false} onDone={({name, type, size, base64}) => setPostData({...postData, selectedFile: {name: name, type: type, size: size, base64: base64} })}/>
          <Button className={classes.buttonSubmit} variant="contained" color='primary' type="submit" size="large" fullWidth>Submit</Button>
          <Button variant="contained" color='primary' size="small" onClick={clear} fullWidth>Clear</Button>
         </div>
      </form>
    </Paper>
  )
}
