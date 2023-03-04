import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {

    let [data , setData] = useState([{}]);
    let [search , setSearch] = useState("");
    const [objects, setObjects] = useState([{}]); 
    const [count,setCount]=useState(0);
    // let [got , setGot] = useState(false); 
    const localUsername = localStorage.getItem("username");
    
    var num = 1;
    useEffect(()=>{
            console.log("ran again")
            axios.post('http://localhost:5000/getAllPostData','')
            .then(response=>{
                setData(response.data);
                setObjects(response.data);
                // console.log(response.data);
                
            })
            .catch(error => {
                console.error(error);
            });            
    },[count])
    
    // useEffect(()=>{
    //   console.log("fififif");
    //   // setObjects(data);

    //   setObjects([...data]);
    // },[data]);
    const sort_func = (idx) => {
        //sort data
        let field;
        if (idx === 1) {
          field = 'username';
        } else if (idx === 2) {
          field = 'username';
        } else if (idx === 3) {
          field = 'title';
        } else if (idx === 4) {
          field = 'title';
        }
      
        setObjects(
            [...data].sort((a, b)  => {
            if (idx === 1 || idx === 2) {
              if (a[field] < b[field]) {
                return idx === 1 ? -1 : 1;
              }
              if (a[field] > b[field]) {
                return idx === 1 ? 1 : -1;
              }
              return 0;
            } else if (idx === 3 || idx === 4) {
              if (a[field] < b[field]) {
                return idx === 3 ? 1 : -1;
              }
              if (a[field] > b[field]) {
                return idx === 3 ? -1 : 1;
              }
              return 0;
            }
          })
        );
        // setObjects(objects);
        // console.log("hi->",objects);

    };
    const handleSearch = ()=>{
        const result = data.reduce((acc, curr) => {
            if (curr.username.includes(search)) {
              acc.push(curr);
            }
            return acc;
          }, []);
          
          // console.log(result);
          setObjects(result);

    };

    const followRequest=(post)=>{
      // e.preventDefault();
      var username = localStorage.getItem("username");
      var content = post.Content;
      var x = { content , username};
      axios.post('http://localhost:5000/followRequest',x)
      .then(response=>{
        setCount(count+1);
    })
        .catch(error => {
        console.error(error);
    });
    // window.location.reload(false);
    
    }

    const leavepost=(post)=>{
      console.log("leave post");
      var username = localStorage.getItem("username");
      var idx = post._id;
      var x = { idx , username};
      axios.post('http://localhost:5000/leavepost',x)
      .then(response=>{
        console.log(response.data);
        // window.location.reload(false);
        setCount(count+1);

    })
        .catch(error => {
        console.error(error);
    });
    }

    const button_requests = (post) => {
      var b = false;
      if (post && post.requests) {
        b = post.requests.some(request => request.username === localUsername);
      }
      // console.log("button_req->", b);
      return b;
    };

    const button_leave = (post) => {
      var b = false;
      if (post && post.requests) {
        b = post.followers.some(foll => foll.username === localUsername);
      }
      // console.log("button_req->", b);
      return b;
    };

    const button_block = (post) => {
      var b = false;
      if (post && post.banned_people) {
        b = post.banned_people.some(foll => foll.username === localUsername);
      }
      // console.log("button_req->", b);
      return b;
    };
    let navigate  = useNavigate();
    const open_post=(post)=>{
      const idx = post._id;
      if(button_leave(post) ) //followers
        navigate(`/follower_post/${idx}`);
      else
      navigate(`/review_post/${idx}`);
        
    }

    // const button_leave= (post) => {
    //   // Your logic here
    //   // return true;
    //   console.log(post);
    //   var b = post.blocked.some(request => request.username === localUsername);
    //   console.log("button_req->",b);
    //   if(b)return true;
    //   return false;
    // };
    // const followers=(post)=>{
    //   return post.followers.length;
    // }

    return ( 
        <div className="AllPosts">
             <div className="posts">
                        <div class="list-group pt-5">
                        <li  class="list-group-item list-group-item-action active h1 " >All Public Posts:</li>
                        
                        <div>
                           <div class="dropdown">
                                <button class="btn btn-secondary m-3 dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                    <li><a class="dropdown-item" onClick={() =>sort_func(1)}>Username(A to Z)</a></li>
                                    <li><a class="dropdown-item" onClick={() =>sort_func(2)}>Username(Z to A)</a></li>
                                    <li><a class="dropdown-item" onClick={() =>sort_func(3)}>Title(A to Z)</a></li>
                                    <li><a class="dropdown-item" onClick={() =>sort_func(4)}>Title(Z to A)</a></li>
                                </ul>

                                <input type="text" placeholder='Search Word' class="ms-4" value={search} onChange={(input) => setSearch(input.target.value)}/> 
                                <button className="btn ms-3 " type="submit" onClick={handleSearch}>Submit</button>
                            </div>

                        </div>
                        <li  class="list-group-item list-group-item-action list-group-item-warning h5">
                        <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col-sm">
                                            SR.no.
                                            </div>

                                            <div class="col-sm ">
                                            Title
                                            </div>
                                            <div class="col-4">
                                            Followers
                                            </div>
                                            <div class="col">
                                            Follow
                                            </div>
                                            <div class="col">
                                            Open
                                            </div>
                                        </div>
                                    </div>
                        </li>
                            {objects.map((post, index) => (
                                
                                <div>
                               {/* <p>{JSON.stringify(post)}</p>  */}
                                <li  key={index} class="list-group-item list-group-item-action list-group-item-warning h5">
                                    <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col-sm">
                                            <p>{num++}</p>  {post.username}
                                            {/* <button className="btn -2" onClick={() =>deletePost(post)} >Delete</button> */}
                                            </div>

                                            <div class="col-sm">
                                            {post.title}
                                            </div>
                                            <div class="col-4">
                                            <div>{post.followers?.length}</div>
                                            </div>
                                            <div class="col">
                                            {
                                              <div>
                                              <div>{button_requests(post) && <button className="btn disabled">Requested</button> }</div>
                                              <div>{button_leave(post) && <button className="btn" onClick={()=>leavepost(post)} >Leave</button> }</div>
                                              <div >{button_block(post) && <button className="btn disabled">Blocked</button> }</div>
                                              <div>{!button_requests(post)  && !button_leave(post) && !button_block(post)  && <button className="btn" onClick={()=>followRequest(post)}>Follow</button>}</div>
                                              </div>
                                            }
                                            
                                            </div>
                                            <div className="col">
                                            <div >{button_block(post) && <button className="btn disabled">Open</button> }</div>
                                            <div>{!button_block(post) && <button className="btn" onClick={()=>open_post(post)}>Open</button>} </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </li>
                                </div>
                            ))}
                        </div>
                    </div>
        </div>
     );
}
 
export default AllPosts;