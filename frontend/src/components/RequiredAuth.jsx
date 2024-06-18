import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const RequireAuth = ({ children }) => {
    let { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/sign-in" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
