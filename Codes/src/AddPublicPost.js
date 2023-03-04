import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AddPublicPost = () => {

    let [vis, setVis] = useState(false);
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [tags, setTags] = useState('');
    let [bann, setbann] = useState('');
    let [data , setData] = useState([{}]);
    var num = 1;
    let[count, setCount] = useState(0);
    const handleShowForm = () => {
        setVis(true);
    };

    useEffect(()=>{
        if(vis === false){
            var username = localStorage.getItem("username");
            let x = {username};
            axios.post('http://localhost:5000/getPublicPostData',x)
            .then(response=>{
                setData(response.data);
                
            })
            .catch(error => {
                console.error(error);
            });
            }
    },[count])

    const deletePost = (post) =>{
        console.log("delete->",post);
        
        axios.post('http://localhost:5000/deletePost', post)
            .then(response => {
                console.log(response.data);
                setCount(count+1);
                // window.location.reload(false);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const navigate = useNavigate();


    const openPost=(post)=>{
        const idx = post._id;
        navigate(`/post/${idx}`);
      }


    const handleHideForm = () => {
        let username = localStorage.getItem("username");
        let x = { username, title, content, bann,tags };

        axios.post('http://localhost:5000/addPublicPost', x)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                 console.error(error);
            });
        setVis(false);
        setTitle("");
        setContent("");
        setbann("");
        setTags("");
        window.location.reload(false);
    };

    return (

        <div className="AddPublicPost">
                {vis ? (<div className="form">
                    
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

                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label className="form-label fw-bold" htmlFor="form3Example4cd">Banned Words (comma seperated)</label>
                                                                <input type="text" className="form-control" value={bann} onChange={(input) => setbann(input.target.value)} />

                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label className="form-label fw-bold" htmlFor="form3Example4cd">Tags (comma seperated)</label>
                                                                <input type="text" className="form-control" value={tags} onChange={(input) => setTags(input.target.value)} />

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
                    
                </div>):(
                    <div className="posts">
                        <div className='text-center'>
                            <button className="btn mt-5 pt-4 pb-4" onClick={handleShowForm}><h1>Add Post</h1></button>
                        </div>
                        <div class="list-group pt-5">
                        <li  class="list-group-item list-group-item-action active h1 " >Your Public Posts:</li>
                        
                        <li  class="list-group-item list-group-item-action list-group-item-warning h5">
                        <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col">
                                            SR.no.
                                            </div>

                                            <div class="col">
                                            Title
                                            </div>
                                            <div class="col">
                                            Followers
                                            </div>
                                            <div class="col">
                                            Banned Keywords
                                            </div>
                                            <div class="col">
                                            Tags
                                            </div>
                                        </div>
                                    </div>
                        </li>
                            {data.map(post => (
                                
                                <li key = {post.id} class="list-group-item list-group-item-action list-group-item-warning h5">
                                    <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col">
                                            <p>{num++}.<button className="btn ms-3" onClick={() =>openPost(post)}>Open</button></p>
                                          
                                            <button className="btn -2 ms-3" onClick={() =>deletePost(post)} >Delete</button>
                                            </div>

                                            <div class="col">
                                            {post.title}
                                            </div>
                                            <div class="col">
                                            {post.followers?.length}
                                            </div>
                                            <div class="col">
                                            {post.banned_keywords}
                                            </div>
                                            <div className="col">
                                                {post.tags}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </li>
                                
                            ))}
                        </div>
                    </div>
                    
                )}
        </div>
    );
}

export default AddPublicPost;