import { useParams } from "react-router-dom";
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Post_follower = () => {

    const { id } = useParams();

    let [data, setData] = useState([{}]);
    let [vis, setVis] = useState(false);
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [count, setCount] = useState(0);
    let [cdata , setCdata] = useState([{}]);
    var num = 1;
    useEffect(() => {
        let x = { id };
        axios.post('http://localhost:5000/getPostData', x)
            .then(response => {
                setData(response.data);
                // console.log(response.data);
                // setGot(true);
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

    }, [count])

    const addComment = () => {
        setVis(true);
    }
    const handleHideForm=()=>{
        var username = localStorage.getItem("username");
        let x = {content , title , id, username};
        
        axios.post('http://localhost:5000/postComment', x)
            .then(response => {
                console.log(response.data);
                setCount(count+1);
            })
            .catch(error => {
                console.error(error);
            });
            setContent("");
            setTitle("");
        setVis(false);
        
    }

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

    const reportPost=(comment)=>{
        let issue = prompt('Can you describe your issue:');
        let username = localStorage.getItem("username");
        let idx = comment._id;
        let x = {username , issue , idx };

        axios.post('http://localhost:5000/reportPost', x)
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


    const button_reported = (comment) => {

        var username = localStorage.getItem("username");
        var b = false;
        if (comment && comment.reportedBy) {
            // console.log("here");
          b = comment.reportedBy.some(foll => foll.username === username);
        }

        return b;
      };



    return (
        <div>
            {vis ? (
                <div className="form">

                    <section className="vh-100" styles="background-color: #eee;">

                        <div className="container h-100">

                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-12 col-xl-11">
                                    <div className="card text-black" styles="border-radius: 25px;">
                                        <div className="card-body p-md-5">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Your Post</p>

                                                    <form className="mx-1 mx-md-4">

                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label className="form-label fw-bold" >Title</label>
                                                                <input type="text" className="form-control" value={title} onChange={(input) => setTitle(input.target.value)} />

                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label className="form-label fw-bold">Content</label>
                                                                <textarea type="text" className="form-control" value={content} onChange={(input) => setContent(input.target.value)} />

                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <button type="button" className="btn btn-secoundary btn-lg" onClick={handleHideForm}>Post</button>
                                                            {/* <button type="button" className="btn btn-primary">Primary</button> */}
                                                            {/* <button className="btn btn-md" onClick={handleHideForm}>Done</button> */}
                                                        </div>

                                                    </form>

                                                </div>
                                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                        className="img-fluid" alt="Your animatiomn" />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            ) : (
                <div>
                <div className="pt-5 pb-5 Post_review text-center">
                    <h1>{data.title}</h1>

                    <div className="p-5 rounded reviewdata"  ><h3>{data.Content}</h3> <br />
                        <h5>No. Of Followers: {"  " + data.followers?.length} </h5> <br />
                        <h5>Tags: {data.tags}</h5><br />
                        <h5>Banned words: {data.banned_keywords}</h5></div>
                    <button className="btn mb-3 pt-4 pb-4" onClick={addComment}><h1>Add Comment</h1></button>
                    {/* <p>{JSON.stringify(cdata)}</p> */}
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
                                                    </div>

                                            </div>
                                            <div className="col">
                                            {/* onChange={(input) => setContent(input.target.value)} */}
                                                <p><button className="btn" onClick={()=>{addReplay(comment)}}>Add Replay</button>
                                                <button className="btn mt-1 ps-4 pe-4" onClick={()=>{alert(JSON.stringify(comment.Content))}}>See Content</button></p>
                                                {/* <button className="btn" onClick={()=>{addReplay(comment)}}>Add Replay</button> */}
                                            </div>
                                            <div className="col">
                                                { !button_reported(comment) && <button className="btn" onClick={()=>{reportPost(comment)}}>Report</button>}
                                                { button_reported(comment) && <button className="btn disabled" onClick={()=>{reportPost(comment)}}>Report</button>}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </li>
                                </div>
                            ))}
                </div>      
                </div>
            )}

        </div>
    );
}

export default Post_follower;