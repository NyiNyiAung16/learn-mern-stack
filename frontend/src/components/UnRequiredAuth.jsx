import { useContext,  } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate, useLocation } from 'react-router-dom';

function UnRequiredAuth({children}) {
    let { user } = useContext(AuthContext);
    let location = useLocation();

    if(user) {
       return <Navigate to='/' state={{ from: location }} />
    }

    return children;
}

export default UnRequiredAuth;