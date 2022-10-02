
// import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { urlHome } from '../api/Product'; 
import axios from 'axios';
import {ThemeContext} from '../App'; 
// export default Login;
import React,{useEffect,useState,useContext} from 'react' 
import { GoogleLogout } from 'react-google-login';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


const Google = () => {

    const user = useContext(ThemeContext);
    const [ profile, setProfile ] = useState(
        user.user
    );
    const clientId = '1038695984787-1p4udh37usv0poigeh96bh31l3t0uasr.apps.googleusercontent.com';
    
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });
    const navigate = useNavigate();
    const onSuccess = (res) => {
        
        axios.post(urlHome+'/api/v1/users/googlelogin', {
            name: res.profileObj.name,
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            imageUrl: res.profileObj.imageUrl,
            googleId: res.profileObj.googleId,
        })
        .then((response) => {
          console.log(response);
          user.setUser(
            response.data  
          )
          navigate('/');
        }, (error) => {
          console.log(error);
        });
        
        console.log('[Login Success] currentUser:', res.profileObj);
    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    
    const logOut = () => {
        setProfile(null);
    };

    return (
        <>
        
        <div style={{marginTop:70}} >
        <br />
        <br />
        {profile ? (
                <div> 
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
    </div>
    </>

    )
}

export default Google 