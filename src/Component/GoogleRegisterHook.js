import { Button } from 'antd';
import React from 'react';
import {useGoogleLogin} from 'react-google-login';
import { GoogleLoginButton } from "react-social-login-buttons";
import MainLayout from "./MainLayout.js";
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js";
import WrappedUIregisterMDForm from "./UIRegisterMD.js";
import WrappedDonorEditProfile from './DonorEditProfile.js'
import WrappedNgoEditProfile from './NgoEditProfile.js'
//import {refreshTokenSetup} from '../utils/refreshToken';
import ReactDOM from 'react-dom';
const clientId= '124654413589-6fetlcfplfted7k6hbl8nib9s7qcduso.apps.googleusercontent.com';

function LoginHooks(){
    const onSuccess = (e) => {
        const superagent = require('superagent');
    superagent
    .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerwithgoogle')
    .send({
            "IdToken":e.tokenId,
            "email":e.profileObj.email,
            "name":e.profileObj.name,
            "utype":"DONOR"
          })
          .set('X-API-Key', 'foobar')
          .set('Content-Type','application/json')
          .set('accept', '*/*')
          .set('Access-Control-Request-Headers','content-type,x-api-key')
          .set('Access-Control-Request-Method','POST')
          .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
          .set('Origin','http://localhost:3000')
          .set('Accept-Encoding','gzip, deflate, br')
          .set('Sec-Fetch-Dest','empty')
          .set('Sec-Fetch-Mode', 'cors')
    .end((err, res) => {
      console.log(res)
      let loginRespJson = JSON.parse(res.text);
      console.log(typeof(loginRespJson))
      if (loginRespJson.Status === "SUCCESS" && loginRespJson.updateflag === "N") {
        //this.setState({loginFlag:true})
        setTimeout(() => {
         ReactDOM.render(<WrappedDonorEditProfile  email={e.profileObj.email} loginResponse={loginRespJson.szCognitoUserID} />,document.getElementById('root'))
        }, 5000);
        //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
        console.log(loginRespJson)
      }else if (loginRespJson.user == "D" && loginRespJson.success == true){
        let loginRequest = {
          "email": e.profileObj.email,
        };
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donarfetchdata') // Ajax call
          .send(loginRequest)                                 // sends a JSON post body
          .set('X-API-Key', 'foobar')
          .set('Content-Type','application/json')
          .set('accept', '*/*')
          .set('Access-Control-Request-Headers','content-type,x-api-key')
          .set('Access-Control-Request-Method','POST')
          .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
          .set('Origin','http://localhost:3000')
          .set('Accept-Encoding','gzip, deflate, br')
          .set('Sec-Fetch-Dest','empty')
          .set('Sec-Fetch-Mode', 'cors')
          .end((err, res) => {                               // Calling the end function will send the request
            console.log("service call", res);
            let fatchDetailsRespJson = JSON.parse(res.text);
            ReactDOM.render(<MainLayout  data={loginRespJson} donorfetchdata={fatchDetailsRespJson}/>, document.getElementById('root'));
          })
        //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
      }
    })
    };

const onFailure=(res)=>{
    console.log(res)
};

const {signIn} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn:true,
    accessType:'offline'
});
return (
    <GoogleLoginButton onClick={signIn} style={{ width: '130px', height: '30px' , marginLeft:"130px"}}>
        <span>Google</span>
    </GoogleLoginButton>
)

}
export default LoginHooks;