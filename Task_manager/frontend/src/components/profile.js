import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile(props){

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const x=localStorage.getItem('token');
      useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/profile`, {
          params:{bool:'True'},
          headers: {
            'Authorization': `token ${x}`,
          }
}).then((res) => {
        console.log(res.data)
        setName(res.data[0].username);
        setAvatar(res.data[0].avatar_url)
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
      });

    return(
        <div>
            <h1>hello</h1>
            <h1>NAME: {name}</h1>
           <h1>PROFILE PICTURE: </h1> <img 
      src={avatar}
      alt="new"
      width="193" height="130"
      />
        </div>
            
    )
}

