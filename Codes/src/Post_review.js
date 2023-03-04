import { useParams } from "react-router-dom";
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const Post_review = () => {

  const { id }=useParams();
  let [data , setData] = useState([{}]);
  let [got, setGot] = useState(false);
  let [count , setCount] = useState(0);

  useEffect(()=>{
        let x = {id};
        axios.post('http://localhost:5000/getPostData',x)
        .then(response=>{
            setData(response.data);
            setGot(true);
        })
        .catch(error => {
            console.error(error);
        });
    },[count])
    

    // const reportPost=()=>{
        
    // }
    return ( 
        <div className="pt-5 pb-5 Post_review text-center">
            <h1>{data.title}</h1>

            <div className="p-5 rounded reviewdata"  ><h3>{data.Content}</h3> <br />
            <h5>No. Of Followers: {"  "+data.followers?.length} </h5> <br />
            <h5>Tags: {data.tags}</h5><br />
            <h5>Banned words: {data.banned_keywords}</h5></div>
            

            {/* <button className="btn mt-1 pt-4 pb-4" onClick={reportPost}><h1>Report Post</h1></button> */}
        </div>
     );
}
 
export default Post_review;