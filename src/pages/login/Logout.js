import {useEffect} from "react";
import {Link} from "react-router-dom";

function Logout(){
 useEffect(() => {
    localStorage.removeItem('token')
 }, [])
    return(
        <div>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}
export default Logout