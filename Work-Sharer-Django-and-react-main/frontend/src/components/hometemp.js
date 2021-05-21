import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Container from '@material-ui/core/Container';
export default function Home(props){

    const [value, setValue] = useState([])
    const x=localStorage.getItem('token');

    useEffect(() => {
        const interval = setInterval(() => {
            getvalue();
        }, 1000);
        return () => clearInterval(interval);
      }, [getvalue]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      function getvalue() {
        axios.get(`http://127.0.0.1:8000/api/task`, {
            params:{accepted:'True'},
            headers: {
              'Authorization': `token ${x}`,
            }
    }).then((res) => {
          setValue([])
          setValue(value => [...value, res.data])
          /* setValue(value.concat(res.data)) */
    }).catch((error) => {
            if (error.response){
  
      alert("You are not logged in")
      
      }else if(error.request){
      
        alert("You are not logged in")
      
      }else if(error.message){
      
        alert("You are not logged in")
      
      }
      window.location.replace('/login')
  })

    
    }
    const values=[]
    for (var i=0;i<value.length;i++){
        for (var j=0;j<value[i].length;j++){
            values.push(
                <div key={value[i][j].id} className="data">
                    <h2>Title: {value[i][j].task_title}</h2>
                    <h3>Description: {value[i][j].task_description}</h3> 
                    <hr/>
                </div>
            ) 
        }    
    }


    /* const values = value.map(station =>
        <div key={value.id} className="station">
           des: {value.task_description}
        </div>
    );
    console.log(values,"Values") */

    return(
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ backgroundColor: '#FFFFFF', height: '100vh' }} >
                    <h1 style={{fontSize: 50}}>UserName: {localStorage.getItem('name')}</h1>
                    <div className="datas">
                        {values}
                    </div>
                    </Typography>
                </Container>
            </React.Fragment>
        </div>
        
    )
}

