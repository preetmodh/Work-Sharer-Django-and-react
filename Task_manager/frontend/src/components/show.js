import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import "../assets/styles.css";

export default function Showtask(param){

    
    const [value, setValue] = useState([])
    const x=localStorage.getItem('token');


    useEffect(() => {
        const interval = setInterval(() => {
            getvalue();
        }, 750);
        return () => clearInterval(interval);
      }, [getvalue]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    function getvalue() {
        axios.get(`http://127.0.0.1:8000/api/task`, {
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
        if (param.children===2){
            
            if(value[i][j].task_completed){
            }
            else{

                values.push(
                    <div className="card text-left" key={value[i][j].id}>
                        <div className="row">
                            <div className="col-10">
    
                            <h4>{value[i][j].task_title}</h4>
    
                            <div className="task-meta">
                                <img
                                src="https://icongr.am/feather/calendar.svg?size=12&color=b5b5b5"
                                alt="calendar"
                                />
                                {value[i][j].task_duedate}
                            </div>
                            </div>
    
                            <div className="col-2 is-center">
                            <button className="button icon-only clear">
                                <img
                                src="https://icongr.am/feather/check-circle.svg?size=24&color=11d054"
                                alt="Open"
                                />
                            </button>
                            </div>
                            <div className="col-12">
                            <p>{value[i][j].task_description}</p>
                            </div>
                        </div>
                        <hr/>
                        </div>
        
                )

            }

        }


        else if (param.children===3){
            if(value[i][j].task_completed){
                values.push(
                    <div className="card text-left" key={value[i][j].id}>
                        <div className="row">
                            <div className="col-10">
    
                            <h4>{value[i][j].task_title}</h4>
    
                            <div className="task-meta">
                                <img
                                src="https://icongr.am/feather/calendar.svg?size=12&color=b5b5b5"
                                alt="calendar"
                                />
                                {value[i][j].task_duedate}
                            </div>
                            </div>
    
                            <div className="col-2 is-center">
                            <button className="button icon-only clear">
                                <img
                                src="https://icongr.am/feather/check-circle.svg?size=24&color=11d054"
                                alt="Open"
                                />
                            </button>
                            </div>
                            <div className="col-12">
                            <p>{value[i][j].task_description}</p>
                            </div>
                        </div>
                        <hr/>
                        </div>
        
                )
            }

        }
        
        
        else{
            
            values.push(
                <div className="card text-left" key={value[i][j].id} onclick={event => console.log(event)}>
                    <div className="row">
                        <div className="col-10">

                        <h4>{value[i][j].task_title}</h4>

                        <div className="task-meta">
                            <img
                            src="https://icongr.am/feather/calendar.svg?size=12&color=b5b5b5"
                            alt="calendar"
                            />
                            {value[i][j].task_duedate}
                        </div>
                        </div>

                        <div className="col-2 is-center">
                        <button className="button icon-only clear">
                            <img
                            src="https://icongr.am/feather/check-circle.svg?size=24&color=11d054"
                            alt="Open"
                            />
                        </button>
                        </div>
                        <div className="col-12">
                        <p>{value[i][j].task_description}</p>
                        </div>
                    </div>
                    <hr/>
                    </div>
    
            )
        }
        }
    }



    return (
        values
      )
}

