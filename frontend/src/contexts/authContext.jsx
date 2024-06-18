import axios from '../helpers/axios';
import { createContext, useEffect, useReducer } from 'react'

const AuthContext = createContext();

//action --> [type,payload]
let AuthReducer = (state,action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload};
        case "LOGOUT":
            return { user: null };    
        default:
            return state;
    }
}

let initialState = {
    user: null
};

const AuthContextProvider = ({children}) => {

    let [state,dispatch] = useReducer(AuthReducer,initialState); //dispatch() // {type,payload}

    useEffect(() => {
        try{
            axios.get('/api/users/me')
            .then((res) => {
                let user = res.data;
                if(user){
                    dispatch({type:'LOGIN',payload:user});
                }else{
                    dispatch({type:'LOGOUT'});
                }
            });
        }catch(e) {
            dispatch({type:'LOGOUT'});
        }
    },[]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };