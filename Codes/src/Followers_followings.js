import { useNavigate } from "react-router-dom";

const Followers_followings = () => {
    let followers = 10;
        let followings = 10;

        const navigate = useNavigate();

        const gotofollowers = (event) => {
            event.preventDefault();
            navigate("/followers");    
          };

          const gotofollowings = (event) => {
            event.preventDefault();
            navigate("/followings");    
          };

    return ( 
        
        <div className="Followers_followings">
            <div className="Followers_followings text-md-center pt-3 pb-3">
                <button className="btn btn-primary ms-3" onClick={gotofollowers}>Followers: {followers}</button>
                <button className="btn btn-primary ms-3" onClick={gotofollowings}>Following: {followings}</button>
            </div>    
        </div>        
    );
}
 
export default Followers_followings;