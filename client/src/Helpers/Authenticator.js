import {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import {Mode} from '../Stage/Mode';
Axios.defaults.withCredentials = true;

const mode = Mode();

export const UserAuthenticator = () => {

    var savedUser = "";
    let navigate = useNavigate();
    const user = useRef();

    const [renderPage, setRenderPage] = useState(false);
    const [info, setInfo] = useState({
        username: "",
        id: 0,
        role: "",
        status: null
    });

    const checkActive = () => {

        const checkToken = () => {
            Axios.get(`${mode}/Auth/Login`)
            .then((res) => {
                if (res.data.LoggedIn) {
                    setInfo({
                        username: res.data.username,
                        id: res.data.id,
                        role: res.data.role,
                        status: res.data.LoggedIn,
                    });
                } else {
                    setInfo({ ...info, status: false });
                }
            }).catch(error => console.log(error));
        };

        const passUser = () =>{
            if (info.status === true){
                if(savedUser !== undefined){
                    const getUser = window.location.pathname.split('/');
                    savedUser = [...getUser][2]
                }
                if (savedUser === info.username){
                    return setRenderPage(true)
                }else{
                    return navigate('/404');
                }
            }else if (info.username === undefined){
                navigate('/login');
            }else if(info.status === false){
                navigate('/404');
            }
        }
        checkToken();
        passUser();
    };

    user.current = checkActive;

    const userStatus = JSON.stringify(info);

    useEffect(() => {
        user.current();
    }, [userStatus]);

    return {info, renderPage}
}

