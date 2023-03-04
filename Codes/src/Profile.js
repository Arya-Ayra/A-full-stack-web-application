import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Followers_followings from './Followers_followings'
import axios from 'axios';
import React, { useState } from 'react';

const Profile = () => {
    
    const navigate = useNavigate();
    const navigate2 = useNavigate();
    let [fn,sfn] = useState('');
    let [ln,sln] = useState('');
    let [un,sun] = useState('');
    let [number,snumber] = useState('');
    let [age,sage] = useState('');
    let [mail,smail] = useState('');
    let [org,sorg] = useState('');
    let [loc,sloc] = useState('');
    let [isDataLoaded, setIsDataLoaded] = useState(false);

    const [getUserData,setUserData] = useState('');
    // var getUserData="";
    useEffect(() => {
        let username = localStorage.getItem("username");
        let x = {username};
        if(localStorage.getItem("isLogedIn") === "true"){
            
            axios.post('http://localhost:5000/yourdata', x)
                .then(response => {
                    
                var getUserData = JSON.parse(JSON.stringify(response.data));
                // setUserData(response.data);
                setUserData(getUserData);
                // console.log(getUserData);
                setIsDataLoaded(true);

                })
                .catch(error => {
                console.error(error);
                });
        }
        else{
            navigate2("/");
        }
    },[])

    
    useEffect(()=>{
        if(isDataLoaded === true){
            console.log("hi I m here\n"+ getUserData.firstname);
            sfn(getUserData.firstname);
            sln(getUserData.lastname);
            sun(getUserData.username);
            smail(getUserData.email);
            sage(getUserData.age);
            snumber(getUserData.contactnumber);
            sorg(getUserData.organistaion);
            sloc(getUserData.location);
            console.log(getUserData.firstname);
        }
    },[isDataLoaded])

    const handleLogOut = (event) => {
        event.preventDefault();
        localStorage.setItem("username", null);
        localStorage.setItem("isLogedIn", "false");
        navigate("/");
      };
    
    const navigate3 = useNavigate();

    const gotoPublicPost=()=>{
        navigate3("/publicPost");
    }
    const navigate4 = useNavigate();

    const gotoAllPublicPost=()=>{
        navigate4("/AllPosts");
    }

    const changeUserData=(event)=>{
        //send new updated data to 5000/change-data and then to mongoDB
        //this is working.
        var username = localStorage.getItem("username");
        let x = {un,fn,ln,mail,number,age,org,loc,username};
        console.log(x);
        
        axios.post('http://localhost:5000/change-data', x)
        .then(response => {
            localStorage.setItem("username",un);
            window.location.reload(false);
        })
        .catch(error => {
          console.error(error);
        });
    }
    

    return ( 
        <div className="Profile">
            
                <div className="container-xl px-4 pt-5 pb-5">
        {/* <!-- Account page navigation--> */}
        
        <hr className="mt-0 mb-4"/>
        <div className="row">
            <div className="col-xl-4">
                {/* <!-- Profile picture card--> */}
                <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Profile Picture</div>
                    <div className="card-body text-center">
                        {/* <!-- Profile picture image--> */}
                        <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                        {/* <!-- Profile picture help block--> */}
                        <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                        {/* <!-- Profile picture upload button--> */}
                        <button className="btn btn-primary" type="button">Upload new image</button>
                    </div>
                </div>
                <div>
                    <div className=" mt-2 card mb-4 mb-xl-0">
                    {<Followers_followings/>}
                    </div>
                </div>
            </div>

            <div className="col-xl-8">
                {/* <!-- Account details card--> */}
                <div className="card mb-4">
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                        <form>
                            {/* <!-- Form Group (username)--> */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={un} onChange={(input)=>sun(input.target.value)}/>
                            </div>
                            {/* <!-- Form Row--> */}
                            <div className="row gx-3 mb-3">
                                {/* <!-- Form Group (first name)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                    <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={fn} onChange={(input)=>sfn(input.target.value)}/>
                                </div>
                                {/* <!-- Form Group (last name)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                    <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={ln} onChange={(input)=>sln(input.target.value)}/>
                                </div>
                            </div>
                            {/* <!-- Form Row        -> */}
                            <div className="row gx-3 mb-3">
                                {/* <!-- Form Group (organization name)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
                                    <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value={org} onChange={(input)=>sorg(input.target.value)}/>
                                </div>
                                {/* <!-- Form Group (location)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                    <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value={loc} onChange={(input)=>sloc(input.target.value)}/>
                                </div>
                            </div>
                            {/* <!-- Form Group (email address)--> */}
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={mail} onChange={(input)=>smail(input.target.value)}/>
                            </div>
                            {/* <!-- Form Row--> */}
                            <div className="row gx-3 mb-3">
                                {/* <!-- Form Group (phone number)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                    <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={number} onChange={(input)=>snumber(input.target.value)}/>
                                </div>
                                {/* <!-- Form Group (birthday)--> */}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inpuptAge">Age</label>
                                    <input className="form-control" id="inputAge" type="text" name="age" placeholder="Enter your age" value={age} onChange={(e)=>{
                                        sage(e.target.value);
                                    }}/>
                                </div>
                            </div>
                            {/* <!-- Save changes button--> */}
                            <button className="btn btn-primary" type="button" onClick={changeUserData}>Edit</button>                            
                            <button className="btn btn-primary ms-3" onClick={handleLogOut}>LogOut</button>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className='text-center'>
            <button className="btn mt-1 mb-2 pt-4 pb-4" onClick={gotoPublicPost}><h3>Your Public Post's</h3></button>
            <br />
            <button className="btn mt-1 mb-5 pt-4 pb-4" onClick={gotoAllPublicPost}><h3>All Public Post's</h3></button>
        </div>
        
            {/* <FollowersList />
            <FollowingList/> */}
            {/* <button className="btn btn-primary ms-3" onClick={addFollowersFollowings}>ADDFollowersandings</button> */}
        </div>
     );
}
 
export default Profile;