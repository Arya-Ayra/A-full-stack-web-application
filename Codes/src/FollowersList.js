import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function FollowersList() {

    const [followers, setFollowers] = useState([]);
    let [count , setCount] = useState(0);
    useEffect(()=>{
        var username = localStorage.getItem("username");
        let x = {username};

        axios.post('http://localhost:5000/getfollowers', x)
        .then(response => {
            // console.log(response.data);
            setFollowers(JSON.parse(JSON.stringify(response.data))); 
        })
        .catch(error => {
          console.error(error);
        }); 
    },[count])


    function handleRemoveFollower(follower) {
        var username = localStorage.getItem("username");
        var remove = follower.username;
        let x = {username , remove} ;
        axios.post('http://localhost:5000/removefollower', x)
        .then(response => {
            console.log("removed");
            setCount(count+1);
            // window.location.reload(false);
        })
        .catch(error => {
          console.error(error);
        }); 
    }

    return (
        <div>
        {/* <h2>Followers</h2> */}
        <div class="list-group pt-5">
        <li  class="list-group-item list-group-item-action active h1 " >Followers</li>
            {followers.map(follower => (
                <li  class="list-group-item list-group-item-action list-group-item-warning h5"  key={follower.id}>
                    {follower.username}
                    <button class="btn ms-3 btn-primary" onClick={() => handleRemoveFollower(follower)}>
                    Remove
                    </button>
                </li>
            ))}
        </div>
        </div>
    );
}

export default FollowersList;
