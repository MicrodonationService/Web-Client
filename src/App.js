import 'babel-polyfill';
import React from 'react';
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import WrappedUIregisterMDForm from "./Component/UIRegisterMD.js";
import ChangePassword from  "./Component/ChangePassword.js"
import MainLayout from  "./Component/MainLayout.js"
import WrappedNormalLoginForm from "./Component/Login.js";
import WrappedVerificationMDForm from "./Component/verificationMD.js";
import UISetNewPassword from "./Component/UISetNewPassword.js";
class App extends React.Component {

  constructor(props)
        {
          super(props);
		}

 render(){

 return(
  <div style={{display:"inline-block",height:"100%",width:"100%"}}>

  <Switch>
      <Route exact component={WrappedNormalLoginForm}/>
  </Switch>
  </div>
 );
}
}
export default App;
