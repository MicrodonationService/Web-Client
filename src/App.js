import 'babel-polyfill';
import React from 'react';
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import WrappedUIregisterMDForm from "./Component/UIRegisterMD.js";
import ChangePassword from  "./Component/ChangePassword.js"
import MainLayout from  "./Component/MainLayout.js"
import WrappedNormalLoginForm from "./Component/Login.js";
import FilesUploader from "./Component/UploadPhoto.js"
import Onetimedonation from "./Component/onetimedonation_after.js";
import WrappedVerificationMDForm from "./Component/verificationMD.js";
import WrappedNormalForPassFormField from "./Component/ForgotPasswordPage.js";
import UISetNewPassword from "./Component/UISetNewPassword.js";
class App extends React.Component {

  constructor(props)
        {
          super(props);
		}

 render(){
   let visit;
   if(window.location.pathname.localeCompare("/ForgotPass")==0)
   {
     visit=<Route exact component={WrappedNormalForPassFormField}/>;
   }
   else{
     visit=<Route exact component={WrappedNormalLoginForm}/>;
   }
    return(
     <div style={{display:"inline-block",height:"100%",width:"100%"}}>

     <Switch>
     {visit}

     </Switch>
     </div>
    );
}
}
export default App;
