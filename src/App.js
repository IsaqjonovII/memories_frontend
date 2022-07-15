import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./assets/memories.jpg";
import { Posts } from "./components/posts/Posts";
import { Form } from "./components/form/Form";
import { getPosts } from "./action/posts"
import useStyles from "./styles";
import {useDispatch} from "react-redux";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return (
    <Container maxWidth="lg" >
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
