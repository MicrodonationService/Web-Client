import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import WrappedUIregisterMDForm from "./UIRegisterMD.js";
import WrappedVerificationMDForm from "./verificationMD.js"
import MainLayout from "./MainLayout.js"
import {GoogleLogin} from 'react-google-login';
import GlobalHelper from '../utils/GlobalHelper.js'
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js"
import WrappedNormalEditProfileForm from "./EditProfile.js"
import WrappedNormalCreateProfileForm from "./DonorEditProfile.js"
import { Layout, Tabs, Button, Form, Input, Modal } from 'antd';
import WrappedNormalForPassForm from './ForgotPassword.js'
import WrappedDonorEditProfile from './DonorEditProfile.js'
import WrappedNgoEditProfile from './NgoEditProfile.js'

import { Spin } from 'antd';
var styles = require('../App.module.css');
const clientId= '124654413589-6fetlcfplfted7k6hbl8nib9s7qcduso.apps.googleusercontent.com';
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
/*const onGoogleFail=(e)=>{
  console.log(e);
}
const onGoogleLogin=(e)=>{
  console.log(e);
  if (e.profileObj.email=="pdpatil@mitaoe.ac.in"){
    ReactDOM.render(<WrappedDonorEditProfile data={e.profileObj.email}/>, document.getElementById('root'));
  }
  else{
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
  .set('Access-Control-Request-Headers','content-type,x-api-key')
  .set('Access-Control-Request-Method','POST')
  .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
  .set('Origin','http://localhost')
  .end((err, res) => {
    console.log(res)
    let loginRespJson = JSON.parse(JSON.parse(res.text));
    console.log(typeof(loginRespJson))
    if (loginRespJson.success === true){
      console.log("ok")
    }
    if (loginRespJson.success === true && loginRespJson.user === "D") {
      //this.setState({loginFlag:true})
      ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
    }
  })
}
}*/

class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false,visible1: false,tabFlag:"D", verifyFlag: false, mailResp: "", phoneResp: "", value: "", flag: false, regFlag: false, loginFlag: false, mess: "" };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }; // End Constructor

  handleUpload(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values",values);
      if (!err) {
        let loginRequest = {
          "ngoname": "smileFoundation",
          "filename": "people"

        };
        const superagent = require('superagent');
        superagent
          .put('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/presignedurl') // Ajax call
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
            }else if (loginRespJson.Status === "FAILED") { // "I" stand for Inactive user
              this.setState({ mess: "Something went wrong please try again later!" })
            }

          });
      }//ENDIF

    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mess: "" });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  callback=(key) => {
    console.log("Tab key",key);
    this.setState({tabFlag:key})

  }
  handleClick() {
    console.log("flag1", this.state.flag);
    this.setState({ flag: true })
  }

  handleSubmit() {
    ReactDOM.render(<WrappedUIregisterMDForm tabFlag={this.state.tabFlag} />, document.getElementById('root'));
    this.setState({ regFlag: true })
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
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/signin') // Ajax call
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

              this.setState({ mess: "Please update profile" })
              setTimeout(() => {

               ReactDOM.render(<WrappedDonorEditProfile email={values.email} loginResponse={loginRespJson.Body.SZ_COGNITO_USER_ID}/>,document.getElementById('root'))
              }, 5000);
            }
            else if(loginRespJson.Status == "SUCCESS" && loginRespJson.Body.B_IS_PROFILE_UPDATED === "N" &&loginRespJson.Body.SZ_USER_TYPE === "N" ){

              this.setState({ mess: "Please update profile" })
              setTimeout(() => {

               ReactDOM.render(<WrappedNgoEditProfile email={values.email} loginResponse={loginRespJson.Body.SZ_COGNITO_USER_ID}/>,document.getElementById('root'))
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
                  ReactDOM.render(<MainLayout  data={loginRespJson} donorfetchdata={fatchDetailsRespJson}/>, document.getElementById('root'));
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
              ReactDOM.render(<WrappedNormalMainLayoutNGO ngoupdateprofile={fatchDetailsRespJson} />, document.getElementById('root'));
            })
            }else if (loginRespJson.Status === "FAILED") { // "I" stand for Inactive user
              this.setState({ mess: "Something went wrong please try again later!" })
            }

          });
      }//ENDIF

    })
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

  render() {               // Start Render
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (this.state.flag === true) {
      console.log("flag", this.state.flag);
      return (
        <div style={{ display: "inline-block", height: "100%", width: "100%" }}>
          <Switch>
            <Route exact component={WrappedNormalForPassForm} />
          </Switch>
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
              <TabPane tab="LOGIN AS DONOR" key="D" >
              </TabPane>
              <TabPane tab="LOGIN AS NGO" key="N" >
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
                      message: ('Please enter password'),
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
            <h4 style={{ position: 'relative', top: '25px', color:(this.state.mess === "Something went wrong please try again later!")? 'red': 'blue', textAlign: 'center' }}>{this.state.mess}</h4>
            <Button type="submit" onClick={this.handleUpload}
              style={{ background: '#f8a500', color: 'Black', height: '', margin: '-40px 0px 5px 75px', borderRadius: '20px', width: '50%', height: '40px' }} >LOGIN</Button><br></br>

            {/*<div style={{textAlign: 'center',position: 'relative',top: '11px', left: '-3px'}}>
              <a style={{ color: '#000', textDecoration: 'underline'}} onClick={this.showModal}>
                 One Time Donation
              </a>
                 <Modal
                   title="One Time Donation"
                   visible={this.state.visible1}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
                   width={500}
                   footer={null}
                   centered={true}
                 >
                   <p>Some contents...</p>
                   <p>Some contents...</p>
                   <p>Some contents...</p>
                 </Modal>
</div>*/}
              {/*<GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onGoogleLogin}
              onFailure={onGoogleFail}
              isSignedIn={true}
/>*/}
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
