import './App.css';
// import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import LogIn from './LogIn';
import Profile from './Profile'
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js';
import AddPublicPost from './AddPublicPost';
import AllPosts from './AllPosts';
import Post from './Post_moderator';
import Post_review from './Post_review';
import Post_follower from './Post_follower';
import Report from './report';

function App() {

  return (
    // <div className="App">
    //   <LogIn></LogIn>
    // </div>
    <Router>
      <div className="App">
        <Routes >
            <Route exact path="/" element={ <LogIn/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/followers" element={<FollowersList/>}></Route>
            <Route path="/followings" element={<FollowingList/>}></Route>
            <Route path="/publicPost" element={<AddPublicPost/>}></Route>
            <Route path="/AllPosts" element={<AllPosts/>}></Route>
            <Route path="/post/:id" element={<Post/>}></Route>
            <Route path="/review_post/:id" element={<Post_review/>}></Route>
            <Route path="/follower_post/:id" element={<Post_follower/>}></Route>
            <Route path="/post/:id/:idx" element={<Report/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
