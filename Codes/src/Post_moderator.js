import { useParams } from "react-router-dom";
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Post = (props) => {
  const { id }=useParams();
  let [data , setData] = useState([{}]);
  let [got, setGot] = useState(false);
  let [count , setCount] = useState(0);
  let [cdata , setCdata] = useState([{}]);
  var num = 1;
  // let [temp , setTemp] = useState([{}])
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

        axios.post('http://localhost:5000/getCommentsData', x)
            .then(response => {
                setCdata(response.data);
                // console.log(response.data);
                // setData(response.data);
                // setGot(true);
            })
            .catch(error => {
                console.error(error);
            });

  },[count])


  const addReplay=(comment)=>{
    let replay = prompt('Type here');
    var username = localStorage.getItem("username");
    var id = comment._id;
    let x = { username ,id, replay};
    
    axios.post('http://localhost:5000/addRelplay', x)
        .then(response => {
            console.log(response.data);
            setCount(count+1);
        })
        .catch(error => {
            console.error(error);
        });
}

const upvote_check = (comment) => {
    var b = false;
    var username = localStorage.getItem("username");
    if (comment && comment.upvotes) {
      b = comment.upvotes.some(request => request.username === username);
    }
    // console.log("button_req->", b);
    return b;
  };

  const downvote_check = (comment) => {
    var b = false;
    var username = localStorage.getItem("username");
    if (comment && comment.downvote) {
      b = comment.downvote.some(request => request.username === username);
    }
    // console.log("button_req->", b);
    return b;
  };


const upvote=(comment)=>{
    if(upvote_check(comment)){
        alert("You can't upvote more than once");
        return;
    }
    let id = comment._id;
    var username = localStorage.getItem("username");

    let x = {username , id};
    axios.post('http://localhost:5000/upvote', x)
        .then(response => {
            console.log(response.data);
            setCount(count+1);
        })
        .catch(error => {
            console.error(error);
        });

}

const downvote=(comment)=>{

    if(downvote_check(comment)){
        alert("You can't downvote more than once");
        return;
    }
    let id = comment._id;
    var username = localStorage.getItem("username");

    let x = {username , id};
    axios.post('http://localhost:5000/downvote', x)
        .then(response => {
            console.log(response.data);
            setCount(count+1);
        })
        .catch(error => {
            console.error(error);
        });

}

  // useEffect(()=>{
  //   setTemp(data);
  // },[data])

  const Accept_req=(req)=>{
    //accept_Req
    var username = req.username;
    let x={id , username};
    
    axios.post('http://localhost:5000/Accept_req',x)
        .then(response=>{
            console.log(response.data);
            setCount(count+1);
        })
        .catch(error => {
            console.error(error);
        });
        // window.location.reload(false);
        // 
  }

  const Deny_req=(req)=>{
    //accept_Req
    var username = req.username;
    let x={id , username};
    
    axios.post('http://localhost:5000/Deny_req',x)
        .then(response=>{
            console.log(response.data);
            setCount(count+1);
        })
        .catch(error => {
            console.error(error);
        });
        // window.location.reload(false);
  }
  let [disreq , setDisreq] = useState(false);
  
  const displayReq=()=>{
    setDisreq(true);
  }
  const closeReq=()=>{
    setDisreq(false);
  }

  let [disF, setDisF] = useState(false);

  const displayF=()=>{
    setDisF(true);
  }
  const closeF=()=>{
    setDisF(false);
  }

  let [disB, setDisB] = useState(false);

  const displayB=()=>{
    setDisB(true);
  }
  const closeB=()=>{
    setDisB(false);
  }

  let nav = useNavigate(); 
  const seeReports=(comment)=>{
    const idx = comment._id;
    nav(`/post/${id}/${idx}`);
  }

  return ( 
    <div  className="text-center p-5">
      {console.log(id)}
      
      <h2>{data.title}</h2>
      {!disreq && <button className="btn mt-3" onClick={displayReq}>Requests</button> }
      {disreq && <button className="btn mt-3" onClick={closeReq}>Close</button>}
      {disreq && <  div class="rounded p-4 post_data_for_user" >
          {/* <h3 className="text-left">Content</h3> */}
          <p class="h3">Requests:</p>

          <div class="mt-4">
            {/* <p>{data.requests.length}</p> */}
          { got && data.requests.map((req,index) => (
            <div key={index}>
        
            <div className="row p-3">
              <div className="col col-4 h4">{req.username}</div>
              <div className="col col-4"> <button className="btn ms-5" onClick={() =>Accept_req(req)}>Accept</button></div>
              <div className="col col-4"> <button className="btn ms-5" onClick={() =>Deny_req(req)}>Deny</button></div>
            </div>
            
            </div>
          ))}
                            
          </div>

      </div>}

    
      {!disF && <button className="btn mt-3 ms-3" onClick={displayF}>Followers</button> }
      {disF && <button className="btn mt-3 ms-3" onClick={closeF}>Close</button>}
      {disF && <  div class="rounded p-4 post_data_for_user" >
          {/* <h3 className="text-left">Content</h3> */}
          <p class="h3">Followers:</p>

          <div class="mt-4">
            {/* <p>{data.requests.length}</p> */}
          { got && data.followers.map((req,index) => (
            <div key={index}>
        
            <div className="row p-3">
              <div className="col col-4 h4">{req.username}</div>
              {/* <div className="col col-4"> <button className="btn ms-5" onClick={() =>Accept_req(req)}>Accept</button></div>
              <div className="col col-4"> <button className="btn ms-5" onClick={() =>Deny_req(req)}>Deny</button></div> */}
            </div>
            
            </div>
          ))}
                            
          </div>

      </div>}
      

      {!disB && <button className="btn mt-3 ms-3" onClick={displayB}>Blocked users</button> }
      {disB && <button className="btn mt-3 ms-3" onClick={closeB}>Close</button>}
      {disB && <  div class="rounded p-4 post_data_for_user" >
          {/* <h3 className="text-left">Content</h3> */}
          <p class="h3">Blocked users:</p>

          <div class="mt-4">
            {/* <p>{data.requests.length}</p> */}
          { got && data.banned_people.map((req,index) => (
            <div key={index}>
        
            <div className="row p-3">
              <div className="col col-4 h4">{req.username}</div>
              {/* <div className="col col-4"> <button className="btn ms-5" onClick={() =>Accept_req(req)}>Accept</button></div>
              <div className="col col-4"> <button className="btn ms-5" onClick={() =>Deny_req(req)}>Deny</button></div> */}
            </div>
            
            </div>
          ))}
                            
          </div>

      </div>}


      <h3 className="mt-3 mb-4">Comments</h3>

                    <li  class="list-group-item list-group-item-action list-group-item-warning h5">
                        <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col-sm">
                                            Username
                                            </div>

                                            <div class="col-sm ">
                                            Title
                                            </div>
                                           
                                            <div class="col-sm">
                                            UV / DV
                                            </div>
                                            <div class="col">
                                            Replies
                                            </div>
                                            <div className="col">
                                                Replay
                                            </div>
                                           
                                        </div>
                                    </div>
                        </li>
                    {cdata.map((comment, index) => (
                                
                                <div>
                               {/* <p>{JSON.stringify(post)}</p>  */}
                                <li  key={index} class="list-group-item list-group-item-action list-group-item-warning h5">
                                    <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col-sm">
                                            <p>{num++}</p>  {comment.username}
                                            {/* <button className="btn -2" onClick={() =>deletePost(post)} >Delete</button> */}
                                            </div>

                                            <div class="col-sm">
                                            {comment.title}
                                            </div>
                                    
                                            <div class="col-sm">
                                            {
                                              <p><button className="btn me-2" onClick={()=>{upvote(comment)}}>{comment.upvotes?.length}</button>
                                              <button className="btn" onClick={()=>{downvote(comment)}} >{comment.downvote?.length}</button>
                                              </p>
                                            }       
                                            </div>

                                            <div className="col">

                                            <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Replies
                                                    </button>
                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    
                                                        {comment.replies?.map((rep, index)=>(
                                                            <li className="dropdown-item" >{rep.text}</li>
                                                        ))}
                                                    </ul>

                                                    <button className="btn mt-1" onClick={()=>{seeReports(comment)}}>Report's</button>
                                                    </div>
                                                    
                                                    
                                            </div>
                                            <div className="col">
                                            {/* onChange={(input) => setContent(input.target.value)} */}
                                                <p><button className="btn" onClick={()=>{addReplay(comment)}}>Add Replay</button>
                                                <button className="btn mt-1 ps-4 pe-4" onClick={()=>{alert(JSON.stringify(comment.Content))}}>See Content</button></p>
                                                {/* <button className="btn" onClick={()=>{addReplay(comment)}}>Add Replay</button> */}
                                            </div>
                                              
                                        </div>
                                    </div>
                                    
                                </li>
                                </div>
                            ))}



    </div>
  );
}
export default Post;
