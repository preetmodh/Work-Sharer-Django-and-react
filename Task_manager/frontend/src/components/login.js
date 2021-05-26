import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));





export default function Login() {
  const token =localStorage.getItem('token');
  const [condition, setCondition] = useState();
  var l =0
  if(token===null){
    l=0
  }
  else{
    l=token.length
  }
  
  useEffect(() =>{
    
   if (l===0){
    setCondition(false)
   }
  else{
    setCondition(true)
  }
  if (condition){
      window.location.replace('/home')  
  } }, [token, condition, l]); 
  



  const classes = useStyles();
  const [username, setUname] = useState('');
  const [password, setPass] = useState('');

  

  function signIn() {
    

    axios.post('http://127.0.0.1:8000/api/token', {
        username: username,
        password:password,
        headers: { 
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
        }
      })
      .then((response) => {
        if (response.data){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', username);
          
             window.location.replace('/home') 
        }
        else{
            alert("Invalid username or password")
        }
      },(error) => {
        if (error.response){

          alert("Invalid username or password")
          
          }else if(error.request){
          
            alert("Invalid username or password")
          
          }else if(error.message){
          
            alert("Invalid username or password")
          
          }
      });

}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={event => setUname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPass(event.target.value)}
          />
        
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>signIn()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}