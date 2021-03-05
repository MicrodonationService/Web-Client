import ReactDOM from 'react-dom';
import React from 'react';
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import { Layout, Form, Button, Input, Checkbox, Select, AutoComplete, Tabs, Radio, Row, Col } from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import WrappedNormalCreateProfileForm from "./DonorEditProfile.js"
import GlobalHelper from '../utils/GlobalHelper.js'
import WrappedUISetNewPasswordForm from "./UISetNewPassword.js";
// import WrappedVerificationMDForm from "./verificationMD.js"
import WrappedNormalLoginForm from "./Login.js";
import { QuestionCircleOutlined } from '@ant-design/icons';
// import LoginHooks from './GoogleRegisterHook';
// import MainLayout from "./MainLayout.js";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import WrappedDonorEditProfile from './DonorEditProfile.js'
var styles = require('../App.module.css');
var usertypedisplay = ""
const { Header, Sider, Content, Footer } = Layout;
const { Group } = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const AutoCompleteOption = AutoComplete.Option
const clientId = '124654413589-6fetlcfplfted7k6hbl8nib9s7qcduso.apps.googleusercontent.com';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const layout1 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class UIregisterMD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false, mailResp: undefined, phoneResp: undefined, mess: "", mess1: "", mess2: "", roll: this.props.tabFlag, userId: undefined, userType: this.props.tabFlag, isprofileupdatedflag: 0, email: "", checkedcheckbox: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.HandleSubmit = this.HandleSubmit.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.callback = this.callback.bind(this);
    this.checkboxchange = this.checkboxchange.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this)
  }


  isValidPassword(value) {

    var strongRegex = new RegExp("[a-zA-Z0-9!@#%*]{8,}$"); // Regex Expression
    if (strongRegex.test(value)) {
      return true;
    }
    else {
      return false;
    }
  }
  callback(key) {
    this.setState({ roll: key })
    console.log(key);
  }

  checkboxchange(e) {
    console.log(e.target.checked)
    this.setState({ checkedcheckbox: e.target.checked })
  }
  responseFacebook = response => {
    const superagent = require('superagent');
    superagent
      .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerwithfacebook')
      .send({
        "IdToken": response.accessToken,
        "email": response.email,
        "name": response.name,
        "utype": "DONOR"
      })
      .set('X-API-Key', 'foobar')
      .set('Content-Type', 'application/json')
      .set('accept', '*/*')
      .set('Access-Control-Request-Headers', 'content-type,x-api-key')
      .set('Access-Control-Request-Method', 'POST')
      .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
      .set('Origin', 'http://localhost:3000')
      .set('Accept-Encoding', 'gzip, deflate, br')
      .set('Sec-Fetch-Dest', 'empty')
      .set('Sec-Fetch-Mode', 'cors')
      .end((err, res) => {
        console.log(res)
        let loginRespJson = JSON.parse(res.text);
        console.log(typeof (loginRespJson))
        if (loginRespJson.Status === "SUCCESS" && loginRespJson.updateflag === "N") {
          //this.setState({loginFlag:true})
          setTimeout(() => {
            ReactDOM.render(<WrappedDonorEditProfile username={response.name} profilepic={response.picture.data.url}  email={response.email} loginResponse={loginRespJson.szCognitoUserID} />, document.getElementById('root'))
          }, 5000);
          //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
          console.log(loginRespJson)
        } else if (loginRespJson.Status === "FAILED" && loginRespJson.Body === "Error :User already exists") {
          this.setState({ mess1: response.email + " User is already registered " })
        }

        else if (loginRespJson.user == "D" && loginRespJson.success == true) {
          let loginRequest = {
            "email": response.email,
          };
          const superagent = require('superagent');
          superagent
            .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donarfetchdata') // Ajax call
            .send(loginRequest)                                 // sends a JSON post body
            .set('X-API-Key', 'foobar')
            .set('Content-Type', 'application/json')
            .set('accept', '*/*')
            .set('Access-Control-Request-Headers', 'content-type,x-api-key')
            .set('Access-Control-Request-Method', 'POST')
            .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
            .set('Origin', 'http://localhost:3000')
            .set('Accept-Encoding', 'gzip, deflate, br')
            .set('Sec-Fetch-Dest', 'empty')
            .set('Sec-Fetch-Mode', 'cors')
            .end((err, res) => {                               // Calling the end function will send the request
              console.log("service call", res);
              let fatchDetailsRespJson = JSON.parse(res.text);
              // ReactDOM.render(<MainLayout data={loginRespJson} donorfetchdata={fatchDetailsRespJson} />, document.getElementById('root'));
            })
          //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
        }
      })
  };

  onFailure = (res) => {
    console.log(res)
  }
  onGoogleLogin = (e) => {
    const superagent = require('superagent');
    superagent
      .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerwithgoogle')
      .send({
        "IdToken": e.tokenId,
        "email": e.profileObj.email,
        "name": e.profileObj.name,
        "utype": "DONOR"
      })
      .set('X-API-Key', 'foobar')
      .set('Content-Type', 'application/json')
      .set('accept', '*/*')
      .set('Access-Control-Request-Headers', 'content-type,x-api-key')
      .set('Access-Control-Request-Method', 'POST')
      .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
      .set('Origin', 'http://localhost:3000')
      .set('Accept-Encoding', 'gzip, deflate, br')
      .set('Sec-Fetch-Dest', 'empty')
      .set('Sec-Fetch-Mode', 'cors')
      .end((err, res) => {
        console.log(res)
        let loginRespJson = JSON.parse(res.text);
        console.log(typeof (loginRespJson))
        if (loginRespJson.Status === "SUCCESS" && loginRespJson.updateflag === "N") {
          //this.setState({loginFlag:true})
          setTimeout(() => {
            ReactDOM.render(<WrappedDonorEditProfile username={e.profileObj.name} profilepic={e.profileObj.imageUrl}  email={e.profileObj.email} loginResponse={loginRespJson.szCognitoUserID} />, document.getElementById('root'))
          }, 5000);
          //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
          console.log(loginRespJson)
        } else if (loginRespJson.Status === "FAILED" && loginRespJson.Body === "Error :User already exists") {
          console.log("USer exists")
          this.setState({ mess1: e.profileObj.email + " User is already registered " })
        }
        else if (loginRespJson.user == "D" && loginRespJson.success == true) {
          let loginRequest = {
            "email": e.profileObj.email,
          };
          const superagent = require('superagent');
          superagent
            .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donarfetchdata') // Ajax call
            .send(loginRequest)                                 // sends a JSON post body
            .set('X-API-Key', 'foobar')
            .set('Content-Type', 'application/json')
            .set('accept', '*/*')
            .set('Access-Control-Request-Headers', 'content-type,x-api-key')
            .set('Access-Control-Request-Method', 'POST')
            .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
            .set('Origin', 'http://localhost:3000')
            .set('Accept-Encoding', 'gzip, deflate, br')
            .set('Sec-Fetch-Dest', 'empty')
            .set('Sec-Fetch-Mode', 'cors')
            .end((err, res) => {                               // Calling the end function will send the request
              console.log("service call", res);
              let fatchDetailsRespJson = JSON.parse(res.text);
              // ReactDOM.render(<MainLayout data={loginRespJson} donorfetchdata={fatchDetailsRespJson} />, document.getElementById('root'));
            })
          //ReactDOM.render(<MainLayout data={loginRespJson} />, document.getElementById('root'));
        }
      })
  };

  // HandleSubmit(e) {
  //   e.preventDefault();

  //   this.props.form.validateFields((err, values) => {
  //     if (this.isValidPassword(values.password)) {
  //       if (!err) {

  //         let registerRequest = {

  //           "email": values.email,
  //           "password": values.Password,
  //           "userType": "N"
  //         };                                                    // End Post Request
  //         const superagent = require('superagent');
  //         superagent
  //           .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerngo') // Ajax Call
  //           .send(registerRequest)                              // Sends a JSON post body
  //           .set('X-API-Key', 'foobar')
  //           .set('Content-Type', 'application/json')
  //           .set('accept', '*/*')
  //           .set('Access-Control-Request-Headers', 'content-type,x-api-key')
  //           .set('Access-Control-Request-Method', 'POST')
  //           .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
  //           .set('Origin', 'http://localhost:3000')
  //           .set('Accept-Encoding', 'gzip, deflate, br')
  //           .set('Sec-Fetch-Dest', 'empty')
  //           .set('Sec-Fetch-Mode', 'cors')
  //           .end((err, res) => {                                // Calling the end function will send the request
  //             console.log("service call", res);
  //             if (res != null) {
  //               let respJson = JSON.parse(res.text);              // Getting response in respJson veriable
  //               console.log("respJson", respJson);
  //               if (respJson.Status === "SUCCESS") {

  //                 this.setState({ mess: respJson.Message })
  //                 setTimeout(() => {
  //                   this.setState({ flag: true })
  //                 }, 5000);
  //               } else if (respJson.Status === false) {
  //                 this.setState({ mess: "Please fill all the field" })
  //               }
  //             }


  //           });

  //       } //ENDIF
  //     }
  //   })
  // }

  handleSubmit(e) {

    e.preventDefault();
    console.log("Handle");
    this.props.form.validateFields((err, values) => {
      console.log("Invalid", values, err)
      if (this.isValidPassword(values.password)) {
        if (!err) {

          let registerRequest = {

            "email": values.email,
            "password": values.Password,
            "userType": this.props.tabFlag

          };
          var url = "";
          if (this.props.tabFlag == "N") {
            url = 'https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerngo';
          } else {
            url = "https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerdonor";
          }                                            // End Post Request
          const superagent = require('superagent');
          superagent
            .post(url)// Ajax Call
            .send(registerRequest)                              // Sends a JSON post body
            .set('X-API-Key', 'foobar')
            .set('Content-Type', 'application/json')
            .set('accept', '*/*')
            .set('Access-Control-Request-Headers', 'content-type,x-api-key')
            .set('Access-Control-Request-Method', 'POST')
            .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
            .set('Origin', 'http://localhost:3000')
            .set('Accept-Encoding', 'gzip, deflate, br')
            .set('Sec-Fetch-Dest', 'empty')
            .set('Sec-Fetch-Mode', 'cors')
            .end((err, res) => {                                // Calling the end function will send the request
              console.log("service call", res);
              if (res != null) {
                let respJson = JSON.parse(res.text);              // Getting response in respJson veriable
                console.log("respJson", respJson);
                if (respJson.Status === "SUCCESS") {

                  this.setState({ mess: respJson.Message })
                  setTimeout(() => {
                    this.setState({ flag: true })
                  }, 5000);
                } else if (respJson.Status === "FAILED") {
                  this.setState({ mess1: respJson.Message })
                }
              }


            });

        } //ENDIF
      }
    })
  }

  render() {            // Start Render();

    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log("Tabflag", this.props.tabFlag);
    if (this.state.userType == "D") {
      usertypedisplay = "DONOR"
    }
    else if (this.state.userType == "N") {
      usertypedisplay = "NGO"
    }
    if (this.state.flag === true) {
      return (
        <div style={{ display: "inline-block", height: "100%", width: "100%" }}>
          <Router>
            <Route exact component={WrappedNormalLoginForm} />
          </Router>
        </div>
      )
    }






    // if (this.state.flag === true) {
    //   return (<div style={{ display: "inline-block", height: "100%", width: "100%" }}>
    //     <Router>
    //       <WrappedVerificationMDForm mailResp={this.state.mailResp} phoneResp={this.state.phoneResp} userId={this.state.userId} />
    //     </Router>
    //   </div>)

    // }
    return (     // Returning HTML on screen
      <div className={styles.maindiv}>
        <Layout className={styles.mainlayout}>
        
          <div className={styles.mobileviewheaderdiv}   >
          <img className={styles.mobileviewiheaderimg}  src="img/mdHeader.png"  />
        </div>
        
          <Layout style={{ marginTop: '0px', height: (window.innerHeight - 107) }}>
            <Sider  style={{ background: 'white', width: '400px', flex: '0 0 0px', minWidth: "400px" }}>
              <img className={styles.mobileviewregistersider} src="img/siderMD.png"  />
            </Sider>
            <Content style={{ background: 'white', top: '30px', overflow: 'unset' }}>


              <div className="tabCss">
                <h2 className={styles.mobileviewregistertitle} >
                  REGISTER AS {usertypedisplay}
                </h2>

                <div className={styles.mobileviewform} >

                  <div style={{ marginTop: '40px' }}>

                    <Form {...layout}>

                      <div>
                        <Form.Item
                          name="email"

                        >

                          {getFieldDecorator('email', {
                            rules: [
                              {
                                required: true,
                                message: 'Please Enter Email Address',
                              }
                            ]

                          })(
                            <Input className={styles.mobileviewform} placeholder="EMAIL ID" autoComplete="off" />)}
                        </Form.Item>

                        <Form.Item>

                          {getFieldDecorator('Password', {
                            rules: [
                              {
                                required: true,
                                message: "Please Enter Password",
                              },
                              {
                                validator: this.validateToNextPassword,
                              },

                            ]
                            // rules: [
                            //   {
                            //     required: false,
                            //   },
                            //   {
                            //     validator: this.validateToNextPassword,
                            //   },
                            // ],
                          })(
                            <Input.Password
                              //style={{ borderRadius: '15px' }}
                              className={styles.mobileviewform}
                              placeholder='PASSWORD'
                              autoComplete="off"
                            />)}

                        </Form.Item>

                        <Form.Item>

                          {getFieldDecorator('confirmPin', {
                            rules: [
                              {
                                required: true,
                                message: "Please Re-Enter Password",
                              },
                              {
                                validator: this.compareToFirstPassword,
                              },
                            ]
                            // rules: [
                            //   {
                            //     required: false,
                            //   },
                            //   {
                            //     validator: this.compareToFirstPassword,
                            //   },
                            // ],
                          })(<Input.Password
                            //style={{ borderRadius: '15px' }}
                            //className={styless.inputBoxCss}
                            className={styles.mobileviewform}
                            autoComplete="off"
                            placeholder='CONFIRM PASSWORD'
                          />)}
                        </Form.Item>




                        {/* <Form.Item
                          name="agreement"
                          style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '150px', top: '-11px' }}
                          valuePropName="checked"
                          rules={[
                            {
                              validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                            },
                          ]}
                        >

                          <Checkbox className={styles.termsandcondition} onChange={this.checkboxchange}>
                            I agreed to the <a href="https://ngouploads.s3.ap-south-1.amazonaws.com/public/termsandconditions.txt">Term and Conditions</a>
                          </Checkbox>


                        </Form.Item> */}


                        <Form.Item style={{ width: '85%', display: 'inline-block', position: 'relative', top: '-12px' }}>
                          <Button type="primary" htmlType="submit" onClick={this.handleSubmit} className={styles.continuebutton}>
                            Continue
                        </Button>
                          <br />
                          <a href="" className={styles.backtologin}>BACK TO LOGIN</a>

                          <h4 className={styles.signupwithtext}>Or Sign Up With</h4>


                          {/* <Row >
                            <Col span={8} >
                            <FacebookLogin
                              appId="622990185060497"
                              autoLoad={true}
                              isDisabled={!this.state.checkedcheckbox}
                              fields="name,email,picture"
                              onClick={this.fbClicked}
                              callback={this.responseFacebook}
                            
                            />
                            </Col>
                            <Col span={8} >
                            <GoogleLogin
                              clientId={clientId}
                              buttonText="Login with Google"
                              onSuccess={this.onSuccess}
                              onFailure={this.onFailure}
                              isSignedIn={false}
                              disabled={!this.state.checkedcheckbox}
                              className={styles.googleButtonCss}
                            />
                            </Col>
                          </Row> */}
                          <FacebookLogin
                            appId="622990185060497"
                            fields="name,email,picture"
                            onClick={this.fbClicked}
                            callback={this.responseFacebook}
                            cssClass={styles.fbbuttonregisetercss}
                            icon="fa-facebook"
                            textButton="Register with Facebook"
                          />

                          <GoogleLogin
                            clientId={clientId}
                            buttonText="Register with Google"
                            onSuccess={this.onGoogleLogin}
                            onFailure={this.onGoogleFail}
                            isSignedIn={false}
                            className={styles.googleButtonRegisterCss}
                          />
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>

              </div>
              <h4 style={{ color: "blue", position: 'relative', left: '-22px', top: "16px", textAlign: 'center' }}>{this.state.mess}</h4>
              <h4 style={{ color: "red", position: 'relative', left: '-22px', top: "4px", textAlign: 'center' }}>{this.state.mess1}</h4>
            </Content>
          </Layout>
          <Footer style={{ padding: '0px' }}>
            <div className={styles.registerpagefooterdiv}>
              <img src="img/footerMD.png" className={styles.registerpagefooterimg} />
            </div>
          </Footer>
        </Layout>
      </div>
    );   // End Render Return
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPin'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('Password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };


  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };// End Render();
}

const WrappedUIregisterMDForm = Form.create()(UIregisterMD);
export default WrappedUIregisterMDForm;