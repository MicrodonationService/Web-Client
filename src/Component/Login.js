import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import WrappedUIregisterMDForm from "./UIRegisterMD.js";
import WrappedVerificationMDForm from "./verificationMD.js";
import MainLayout from "./MainLayout.js";
import GlobalHelper from '../utils/GlobalHelper.js';
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js";
import WrappedNormalEditProfileForm from "./EditProfile.js"
import WrappedNormalCreateProfileForm from "./DonorEditProfile.js"
import { Layout, Tabs, Button, Form, Input, Modal } from 'antd';
import WrappedNormalForPassForm from './ForgotPassword.js'
import WrappedDonorEditProfile from './DonorEditProfile.js'
import WrappedNgoEditProfile from './NgoEditProfile.js'
import { Spin } from 'antd';
import {GoogleLogin} from 'react-google-login';
//import {DonorEditProfile} from './DonorEditProfile';
//import {WrappedNormalEditProfileForm} from './EditProfile'
// import WrappedDonorEditProfile from './DonorEditProfile.js'
var styles = require('../App.module.css');
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const clientId= '124654413589-6fetlcfplfted7k6hbl8nib9s7qcduso.apps.googleusercontent.com';
function callback(key) {
  console.log(key);
}
// const onGoogleFail=(e)=>{
//   console.log(e);
// }
// const onGoogleLogin=(e)=>{
//   console.log(e);
//   console.log({
//     "IdToken":e.tokenId,
//     "email":e.profileObj.email,
//     "name":e.profileObj.name
//   });
//   if (e.profileObj.email=="pdpatil@mitaoe.ac.in"){
//     ReactDOM.render(<WrappedDonorEditProfile data={e.profileObj.email}/>, document.getElementById('root'));
//   }
//   else{
//   const superagent = require('superagent');
//   superagent
//   .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/loginwithgoogle')
//   .send({
//           "IdToken":e.tokenId,
//           "email":e.profileObj.email,
//           "name":e.profileObj.name
//         })
//   .set('X-API-Key', 'foobar')
//   .set('accept', 'application/json')
//   .end((err, res) => {
//     console.log(res)
//     let loginRespJson = JSON.parse(res.text);
//     console.log(typeof(loginRespJson))

//     if (loginRespJson.Status === "SUCCESS" && loginRespJson.updateflag === "N") {
//       //this.setState({loginFlag:true})
//       setTimeout(() => {
//        ReactDOM.render(<WrappedDonorEditProfile  email={e.profileObj.email} loginResponse={loginRespJson.szCognitoUserID} />,document.getElementById('root'))
//       }, 5000);
//       //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
//       console.log(loginRespJson)
//     }else if (loginRespJson.user == "D" && loginRespJson.success == true){
//       let loginRequest = {
//         "email": e.profileObj.email,
//       };
//       const superagent = require('superagent');
//       superagent
//         .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donarfetchdata') // Ajax call
//         .send(loginRequest)                                 // sends a JSON post body
//         .set('X-API-Key', 'foobar')
//         .set('Content-Type','application/json')
//         .set('accept', '*/*')
//         .set('Access-Control-Request-Headers','content-type,x-api-key')
//         .set('Access-Control-Request-Method','POST')
//         .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
//         .set('Origin','http://localhost:3000')
//         .set('Accept-Encoding','gzip, deflate, br')
//         .set('Sec-Fetch-Dest','empty')
//         .set('Sec-Fetch-Mode', 'cors')
//         .end((err, res) => {                               // Calling the end function will send the request
//           console.log("service call", res);
//           let fatchDetailsRespJson = JSON.parse(res.text);
//           ReactDOM.render(<MainLayout  data={loginRespJson} donorfetchdata={fatchDetailsRespJson}/>, document.getElementById('root'));
//         })
//       //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
//     }
//     else if (loginRespJson.Status === "FAILED" && loginRespJson.Message === "User not registered") { // "I" stand for Inactive user

//               this.setState({ mess: e.profileObj.email+"User is not registered." })

//             }
//   })
// }
// }
class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false,visible1: false,tabFlag:"D", verifyFlag: false, mailResp: "", phoneResp: "", value: "", flag: false, regFlag: false, loginFlag: false, mess: "",donorcategorys:"" };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.successModal = this.successModal.bind(this);
    this.errorModal = this.errorModal.bind(this);
  }; // End Constructor
   onGoogleFail=(e)=>{
    console.log(e);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ mess: "" });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleClick() {
    console.log("flag1", this.state.flag);
    this.setState({ flag: true })
  }

  handleSubmit() {
    ReactDOM.render(<WrappedUIregisterMDForm tabFlag={this.state.tabFlag} />, document.getElementById('root'));
    this.setState({ regFlag: true })
  }
  callback=(key) => {
    console.log("Tab key",key);
    this.setState({tabFlag:key})

  }

  showModal = () => {
    this.setState({
      visible1: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  successModal() {
    Modal.success({
      content: 'Account Verified ! Please Update Profile To Continue',
    });
  }

  errorModal() {
    Modal.error({
      title: 'Error',
      content: 'Something Went Wrong Try Again Later...',
    });
  }
  onGoogleLogin=(e)=>{
    console.log(e);
    console.log({
      "IdToken":e.tokenId,
      "email":e.profileObj.email,
      "name":e.profileObj.name
    });
    const superagent = require('superagent');
    superagent
    .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/loginwithgoogle')
    .send({
            "IdToken":e.tokenId,
            "email":e.profileObj.email,
            "name":e.profileObj.name
          })
    .set('X-API-Key', 'foobar')
    .set('accept', 'application/json')
    .end((err, res) => {
      console.log(res)
      let loginRespJson = JSON.parse(res.text);
      console.log(typeof(loginRespJson))
      if (loginRespJson.success === true && loginRespJson.updateflag === "N") {
        //this.setState({loginFlag:true})
        console.log("In the edit profile")
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
            ReactDOM.render(<MainLayout email={e.profileObj.email}  data={loginRespJson} donorfetchdata={fatchDetailsRespJson}/>, document.getElementById('root'));
          })
        //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
      }
      else if (loginRespJson.Status === "FAILED" && loginRespJson.Message === "User not registered") { // "I" stand for Inactive user

                this.setState({ mess: e.profileObj.email+" User is not registered Please Register" })

              }
    })

  }

  handleLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values",values);
      if (!err) {
        let loginRequest = {
          "email": values.email,
          "password": values.password,
        };
        var url = "";
        if(this.state.tabFlag === "D"){
          url = "https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donorlogin"
        }else{
          url = "https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngologin"
        }
        const superagent = require('superagent');
        superagent
          .post(url) // Ajax call
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
            let loginRespJson = JSON.parse(res.text);
            console.log("respJson", loginRespJson);
            if (loginRespJson.Status === "FAILED" && loginRespJson.Body.message === "Incorrect username or password.") {
              this.setState({ mess: "Invalid User Id or Password!" })
            }
            else if(loginRespJson.Status == "SUCCESS" && loginRespJson.Body.B_IS_PROFILE_UPDATED === "N" &&loginRespJson.Body.SZ_USER_TYPE === "D" ){

              //this.setState({ mess: "Please update profile" })
              this.successModal();
              setTimeout(() => {

               ReactDOM.render(<WrappedDonorEditProfile donordropdown={this.state.donorcategorys} email={values.email} loginResponse={loginRespJson.Body.SZ_COGNITO_USER_ID}/>,document.getElementById('root'))
              }, 5000);
            }
            else if(loginRespJson.Status == "SUCCESS" && loginRespJson.Body.B_IS_PROFILE_UPDATED === "N" &&loginRespJson.Body.SZ_USER_TYPE === "N" ){

              //this.setState({ mess: "Please update profile" })
              this.successModal();
              setTimeout(() => {

               ReactDOM.render(<WrappedNgoEditProfile  email={values.email} loginResponse={loginRespJson.Body.SZ_COGNITO_USER_ID}/>,document.getElementById('root'))
              }, 5000);
            }

            else if (loginRespJson.Status === "SUCCESS" && loginRespJson.Body.SZ_USER_TYPE === "D") {
              let loginRequest = {
                "email": values.email
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
                  ReactDOM.render(<MainLayout email={values.email}  data={loginRespJson} donorfetchdata={fatchDetailsRespJson}/>, document.getElementById('root'));
                })

              //this.setState({loginFlag:true})

            } else if (loginRespJson.Status === "SUCCESS" && loginRespJson.Body.SZ_USER_TYPE === "N") {
              let loginRequest = {
                "email": values.email
              };
              const superagent = require('superagent');
              superagent
                .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoupdateprofile') // Ajax call
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
              ReactDOM.render(<WrappedNormalMainLayoutNGO email={values.email} ngoupdateprofile={fatchDetailsRespJson} />, document.getElementById('root'));
            })
          }else if (loginRespJson.Status === "FAILED" && loginRespJson.Message === "User is not Confirmed.") { // "I" stand for Inactive user

              this.setState({ mess: "User is not Confirmed." })

            }else{
              this.errorModal();
              //this.setState({ mess: "Something went wrong please try again later!" })
            }

          });
      }//ENDIF

    })
  }
  render() {               // Start Render
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    if (this.state.flag === true) {
      console.log("flag", this.state.flag);
      return (
        <div style={{ display: "inline-block", height: "100%", width: "100%" }}>
        <Router>
          <WrappedNormalForPassForm tabFlag={this.state.tabFlag}/>
        </Router>
        </div>)
    }
    if (this.state.verifyFlag === true) {
      console.log("flag", this.state.flag);
      return (
        <div style={{ display: "inline-block", height: "100%", width: "100%" }}>
          <Router>
            <WrappedVerificationMDForm mailResp={this.state.mailResp} phoneResp={this.state.phoneResp} />
          </Router>
        </div>)
    }

    return (            // Returning HTML on screen
      <Layout>
        <div style={{ width: (window.innerWidth), background: 'white' }}>
          <img src="img/mdHeader.png" style={{ width: window.innerWidth, height: '70px', top: '0px', left: '0px' }} />
        </div>
        <Content >
          <div style={{ display: 'inlineFlex' }} className={styles.second2}>
            <img src="img/siderMD.png" style={{ width: '316px', height: '478px', position: 'absolute', borderRadius: '5px', left: '0px', top: '0px' }} />
          </div>
          <div className={styles.second} >

            <h2 style={{ color: '#f8a500', margin: '-15px 0px 10px -244px', fontWeight: 'Bold', textAlign: 'center' }}>LOGIN</h2>

            <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.tab}>
              <TabPane tab="Login As Donar" key="D" >
              </TabPane>
              <TabPane tab="Login As NGO" key="N" >
              </TabPane>
            </Tabs>

            <Form >
              <h4 style={{ marginTop: '20px', marginBottom: '7px' }}>User ID(E-MAIL/MOBILE) </h4>
              <Form.Item >
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter User Id!',
                    }
                  ],
                })(
                  <Input
                    autoComplete="off"
                    maxLength={30}
                    style={{ textAlign: 'left', borderRadius: '20px', height: '40px', marginBottom: '4px' }}
                  />)}
              </Form.Item>
              <div style={{ marginBottom: '7px' }}>
                <h4 style={{ marginTop: '7px', marginBottom: '-1px', display: 'contents' }}>PASSWORD</h4>
                <a style={{ color: '#000000', marginLeft: '145px', textDecoration: 'underline' }} onClick={this.handleClick}><Link to={"ForgotPassword"} style={{ color: '#000' }}>Forgot Password?</Link></a>
              </div>

              <Form.Item >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: (!this.state.checked ? 'Please enter password' : 'Please enter OTP'),
                    }
                  ],
                })(
                  <Input.Password
                    type='password'
                    style={{ borderRadius: '20px', height: '40px', marginBottom: '4px' }}
                    autoComplete="off"
                  ></Input.Password>)}
              </Form.Item>
            </Form>

            <a href="" style={{ color: '#AB1B5C', textDecoration: 'underline', position: 'relative', top: '55px', left: '134px' }} onClick={this.handleSubmit}><Link style={{ color: '#000' }}> REGISTER</Link></a>
            <Spin spinning={this.state.loading ? true : false} >
              <Button type="submit" onClick={this.handleLogin}
                style={{ background: '#f8a500', color: 'Black', height: '', margin: '-40px 0px 5px 75px', borderRadius: '20px', width: '50%', height: '40px' }} >LOGIN</Button><br></br>
            </Spin>
            <h4 style={{ position: 'relative', top: '25px', color:(this.state.mess === "Please update profile")? 'blue': 'red', textAlign: 'center' }}>{this.state.mess}</h4>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={this.onGoogleLogin}
              onFailure={this.onGoogleFail}
              isSignedIn={true}
              className="googleButtonCss"
            />
            <div style={{ width: '105%', height: '185px', maxHeight: '150px' }} className={styles.pass}>

            </div>
          </div>
        </Content>
      </Layout>
    );// END_return_Desktop
  } // END_render();
}

const WrappedNormalLoginForm = Form.create()(Loginpage);
export default WrappedNormalLoginForm;
