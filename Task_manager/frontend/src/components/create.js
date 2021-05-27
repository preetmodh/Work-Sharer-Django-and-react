import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Maketask(){

    const [task_title, setTit] = useState('');
    const [task_description, setdes] = useState('');
    const [task_duedate, setdue] = useState(new Date());
    const x=localStorage.getItem('token');

    function newtask(){
        console.log(task_duedate,x)
        const body = {
          task_title: task_title,
          task_description:task_description,
          task_duedate:task_duedate,
          
    };
        axios.post('http://127.0.0.1:8000/api/task', body,{
      headers: { 
        'Authorization': `token ${x}`,
      }
    }).then((response) => {
        if (response.status===201){
          alert("task created")
          window.location.replace('/home')
        }
        else{
          alert("Invalid entry")
        }
        console.log(response);
      }, (error) => {
        
        if (error.response){
          console.log(error.response)

          alert("Invalid entry")
          
          }else if(error.request){
            console.log(error.request)
            alert("Invalid entry")
          
          }else if(error.message){
            console.log(error.message)
            alert("Invalid entry")
          
          }
      });
    }

    return(
        <div>
            <h2>Create Task:</h2>
            <TextField required id="standard-required" label="Title" defaultValue=""
            onChange={event => setTit(event.target.value)}
             />
            <br/>
            <br/>
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                onChange={event => setdes(event.target.value)}
            />
            <br/>
            <br/>
            <TextField
                id="date"
                label=""
                type="date"
                defaultValue=""
                onChange={event => setdue(event.target.value)}
            />
            
            <br/>
            <br/>
            <Button
            variant="contained"
            color="primary"
            onClick={()=>newtask()}
          >
            Submit
          </Button>
        </div>
        

    )
}

