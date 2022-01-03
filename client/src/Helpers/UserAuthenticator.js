import React, {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';

Axios.defaults.withCredentials = true;

export const UserAuthenticator = () => {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        role: "",
        status: null
    });


    // let authState = JSON.parse(userState);

    // var savedUser = ""
    const checker = useRef();
    // let navigate = useNavigate();
    // const [pass, setPass] = useState(false);
    // const [newAuthState, setNewAuthState] = useState({ authState });

    const checkActive = () => {

        const checkToken = () => {
            Axios.get('http://localhost:3001/Auth/Login')
                .then((res) => {
                    if (res.data.LoggedIn) {
                        setAuthState({
                            username: res.data.username,
                            id: res.data.id,
                            role: res.data.role,
                            status: res.data.LoggedIn,
                        });
                    } else {
                        setAuthState({ ...authState, status: false });
                    }
                }).catch(error => console.log(error));
        };

        //     const passUser = () =>{
        //         if (authState.status === true){
        //             if(savedUser !== undefined){
        //                 const getUser = window.location.pathname.split('/');
        //                 savedUser = [...getUser][2]
        //             }
        //             if (savedUser === authState.username){
        //                 return setPass(true)
        //             }else{
        //                 return navigate('/404');
        //             }
        //         }else if (authState.username === undefined){
        //             navigate('/');
        //         }else if(authState.status === false){
        //             navigate('/404');
        //         }
        //     }
        checkToken();
        //     passUser()
    };

    checker.current = checkActive;

    const userStatus = JSON.stringify(authState);
    // const passStatus = JSON.stringify(pass)
    useEffect(() => {
        checker.current();
    }, [userStatus]);


    return {authState}
    // (
    //     authState.map(todo => {
    //         return todo
    //     })
    // )
}