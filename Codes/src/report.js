import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useTransition } from "react";
const Report = (prop) => {
    const {id} = useParams();
    const {idx } = useParams();
    let [count , setCount] = useState(0);
    let [data , setData] = useState([{}]);

    useEffect(()=>{
        let x = {idx};
        axios.post('http://localhost:5000/getCommentData', x)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    } , [count])

    const ignore=(rep)=>{
        //ignore warning.
        let report_id =  rep._id;
        let x = {idx , report_id};
        axios.post('http://localhost:5000/ignore', x)
            .then(response => {
                // setData(response.data);
                setCount(count+1);
            })
            .catch(error => {
                console.error(error);
            });

    }
    const block=(rep)=>{
        //block user.
        alert("Ho jayegaa mujhe nahi karnaa");
    }

    let nav2 = useNavigate();

    const delete_post=(rep)=>{

        let x = {idx};
        axios.post('http://localhost:5000/delete_post', x)
            .then(response => {
                // setData(response.data);
                let to = idx;
                nav2(-1);
            //    console.log("by bye");
            })
            .catch(error => {
                console.error(error);
            });
        
    }
    return ( 
        <div className="text-center">
            <h1>Report's: </h1>
            {/* {console.log("hihi->"+idx)} */}
            <li  class="list-group-item list-group-item-action list-group-item-warning h5">
                        <div class="container ">
                                        <div class="row text-center">
                                            
                                            <div class="col">
                                            Reported by
                                            </div>

                                            <div class="col ">
                                            Reason
                                            </div>
                                            <div class="col">
                                            Ignore
                                            </div>
                                            <div class="col">
                                            Block User
                                            </div>
                                            <div class="col">
                                            Delete Post
                                            </div>
                                        </div>
                                    </div>
                        </li>


            {data && data.reportedBy?.map((req , index) =>(
                <li  class="list-group-item list-group-item-action list-group-item-warning h5">
                        <div class="container ">
                                        <div class="row text-center">
                                            <div className="col">
                                                {req.username}
                                            </div>
                                            <div className="col">
                                                {req.reason}
                                            </div>
                                            <div className="col">
                                                <button className="btn" onClick={()=>ignore(req)}>Ignore</button>
                                            </div>
                                            <div className="col">
                                                <button className="btn" onClick={()=>block(req)}>Block User</button>
                                            </div>
                                            <div className="col"><button className="btn" onClick={()=>delete_post(req)}>Delete Post</button></div>
                                        </div>
                        </div>
                </li>
            ))}
        </div>
     );
}
 
export default Report;