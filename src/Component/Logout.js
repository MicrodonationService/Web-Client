import React from 'react';
import {GoogleLogout, useGoogleLogout} from 'react-google-login';
import { Redirect } from "react-router-dom";
const clientId= '124654413589-6fetlcfplfted7k6hbl8nib9s7qcduso.apps.googleusercontent.com';

function Logout(){
const onLogoutSuccess =(res) => {
    window.location.reload();

  };
  const onFailure = ()=>{
    console.log('handle failure cases');
    window.location.reload();
  };

  const {signOut} = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  return(

        <GoogleLogout
            clientId={clientId}
            render={renderProps=>(
                <a style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#1890ff',right:'-1003px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    LOGOUT
                </a>
            )}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
            onFailure={onFailure}>
        </GoogleLogout>

  );
}
export default Logout;
