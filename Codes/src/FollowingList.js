import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function FollowingList() {

    const [followings, setFollowings] = useState([]);
    const [others , setOthers] = useState([]);
    const [all , setAll] = useState([]);
    const [count , setCount] = useState(0);
    useEffect(()=>{
        var username = localStorage.getItem("username");
        let x = {username};

        axios.post('http://localhost:5000/getfollowing', x)
        .then(response => {
            console.log(response.data);
            setFollowings(JSON.parse(JSON.stringify(response.data))); 
            console.log("1->followigns->"+followings);
            axios.post('http://localhost:5000/getalldata')
            .then(response => {
                setAll(JSON.parse(JSON.stringify(response.data))); 
            })
            .catch(error => {
            console.error(error);
            }); 

        })
        .catch(error => {
          console.error(error);
        }); 
    },[count])

    // const navigate = useNavigate();
    useEffect(()=>{
        console.log("2temp->"+others+"\nfoloowings"+followings);
        let other = all.filter(member => {
            return !followings.some(following => following.username === member.username);
          });
        setOthers(other);
        // navigate("/followings"); 
          
    },[all])

    // useEffect(()=>{
    //     window.location.reload(false)
    // },[others])    
    function handleRemoveFollowings(following) {
        var username = localStorage.getItem("username");
        var remove = following.username;
        let x = {username , remove} ;
        axios.post('http://localhost:5000/removefollowing', x)
        .then(response => {
            console.log("removed");
            setCount(count+1);
            // window.location.reload(false);
        })
        .catch(error => {
          console.error(error);
        }); 
    }

    function handleaAddFollowings(other){
        var username = localStorage.getItem("username");
        var other = other.username;
        let x = {username , other} ;
        
        axios.post('http://localhost:5000/addfollowing', x)
            .then(response => {
                // setFollowings(JSON.parse(JSON.stringify(response.data))); 
                // navigate("/followings");
                console.log("added");
                setCount(count+1);
                // window.location.reload(false)                
            })
            .catch(error => {
            console.error(error);
        }); 
    }


    return (
        <div>
      
        <div class="list-group pt-5">
        <li  class="list-group-item list-group-item-action active h1" >Followings</li>
            { followings.map(following => (//those who I follow.
            <li key = {following.id} class="list-group-item list-group-item-action list-group-item-warning h5" >
                {following.username}
                <button class="btn ms-3 btn-primary" onClick={() => handleRemoveFollowings(following)}>
                Unfollow
                </button>
            </li>
            ))}

        <li  class="list-group-item list-group-item-action active h1" >Others on our database</li>
            { others.map(other => (//those who I can follow.
            <li key={other.id}class="list-group-item list-group-item-action list-group-item-warning h5">
                {other.username}
                <button class="float-right btn ms-3 btn-primary" onClick={() => handleaAddFollowings(other)}>
                Follow
                </button>
            </li>
            ))}
        </div>
        </div>
    );
}

export default FollowingList;
