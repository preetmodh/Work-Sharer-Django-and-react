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
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import Container from '@material-ui/core/Container';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Home(){
   const classes = useStyles(); 
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showAll, setAll] = useState(true);
  const [showPending, setPending] = useState(false);
  const [showCreate, setCreate] = useState(false);
  const [showIncoming, setIncoming] = useState(false);
  const [showSendtask, setSendtask] = useState(false);
  const [showaccepted, setaccepted] = useState('True');
  const [value, setValue] = useState([])
  const x=localStorage.getItem('token');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
    

    useEffect(() => {
        const interval = setInterval(() => {
            getvalue();
        }, 1000);
        return () => clearInterval(interval);
      }, [getvalue]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    function getvalue() {
        axios.get(`http://127.0.0.1:8000/api/task`, {
            params:{accepted:showaccepted},
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
            
            if(showPending){
                if(value[i][j].task_completed){
                }
                else{
                    values.push(
                        <div key={value[i][j].id} className="data">
                            <h2>Title: {value[i][j].task_title}</h2>
                            <h3>Description: {value[i][j].task_description}</h3> 
                            <hr/>
                        </div>
                    )
                }
            }
            else{
                values.push(
                    <div key={value[i][j].id} className="data">
                        <h2>Title: {value[i][j].task_title}</h2>
                        <h3>Description: {value[i][j].task_description}</h3> 
                        <hr/>
                    </div>
                )

            }
            
        }    
    }
    function logout(){
        window.location.replace('/logout')
    }

    function setdiv(props){
        /* console.log(props) */
        if (props===2){
                setPending(true)
                setaccepted("True")
        }
        else if(props===0){
            setPending(false)
            setaccepted("True")
        }
        else if (props===3){
            setPending(false)
            setaccepted("False")
    }
        
    }


    return(
        <div>
            <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {localStorage.getItem('name')}'s Menu
            <Button style={{position: 'absolute' ,right: '100px',top:'10px'}}
            color="primary" variant="contained"  size="large" onClick={()=>logout()}>Logout</Button>
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['All Task','Create Task', 'Pending', 'Incoming', 'Send Task'].map((text, index) => (
            <ListItem button key={text} component="a" onClick={()=>setdiv(index)} >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div id="data">
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" id ="All" style={{ display: showAll ? 'block' : 'none',backgroundColor: '#FFFFFF', height: '100vh' }} >
                    <h1 style={{fontSize: 50}}>UserName: {localStorage.getItem('name')}</h1>
                    <div className="datas">
                        {values}
                    </div>
                    </Typography>
                </Container>
            </React.Fragment>
        </div>
        
      </main>
    </div>
            
        </div>
        
    )
}

