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
import WrappedVerificationMDForm from "./verificationMD.js"
import WrappedNormalLoginForm from "./Login.js";
import { QuestionCircleOutlined } from '@ant-design/icons';


var styles = require('../App.module.css');

const { Header, Sider, Content, Footer } = Layout;
const { Group } = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const AutoCompleteOption = AutoComplete.Option
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
      flag: false, mailResp: undefined, phoneResp: undefined, mess: "",mess1:"", roll: "D", userId: undefined, userType: "D", isprofileupdatedflag: 0, email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.HandleSubmit = this.HandleSubmit.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.callback = this.callback.bind(this);

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
          if(this.props.tabFlag == "N"){
            url = 'https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registerngo';
          }else{
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
      <div>
        <Layout>
          <Header>
            <div style={{ marginLeft: '-50px', width: (window.innerWidth), background: 'white' }}>
              <img src="img/mdHeader.png" style={{ width: window.innerWidth, height: '70px', top: '0px', left: '0px' }} />
            </div>
          </Header>
          <Layout style={{ marginTop: '6px', height: (window.innerHeight - 107) }}>
            <Sider style={{ background: 'white', width: '400px', flex: '0 0 0px', minWidth: "400px" }}>
              <img src="img/siderMD.png" style={{ width: window.innerWidth - 966, height: '550px', top: '0px', left: '0px' }} />
            </Sider>
            <Content style={{ background: 'white', top: '30px', overflow: 'unset' }}>


              <div className="tabCss">
              <h2 style={{ color: '#f8a500', marginTop:'10px', fontWeight: 'Bold',marginLeft:'350px' }}>REGISTER</h2>
                <div style={{ marginLeft: '180px' }}>

                  <div style={{ marginTop: '40px' }}>

                    <Form {...layout}>

                      <div>
                        <Form.Item
                          name="email"

                        >

                          {getFieldDecorator('email', {
                            rules:[
                              {
                                required: true,
                                message: 'Please Enter Email Address',
                              }
                            ]

                          })(
                            <Input placeholder="EMAIL ID" autoComplete="off" />)}
                        </Form.Item>

                        <Form.Item>

                          {getFieldDecorator('Password', {
                            rules:[
                              {
                                required:true,
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
                              //className={styless.inputBoxCss}
                              placeholder='PASSWORD'
                              autoComplete="off"
                            />)}

                        </Form.Item>

                        <Form.Item>

                          {getFieldDecorator('confirmPin', {
                            rules:[
                              {
                                required:true,
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
                            autoComplete="off"
                            placeholder='CONFIRM PASSWORD'
                          />)}
                        </Form.Item>




                        <Form.Item
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

                          <Checkbox>
                            I agreed to the <a >Term and Conditions</a>
                          </Checkbox>


                        </Form.Item>


                        <Form.Item style={{ width: '85%', display: 'inline-block', position: 'relative', top: '-12px' }}>
                          <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ width: '50%',left:"150px", borderRadius: '25px', background: '#f8a500' }}>
                            Continue
                        </Button>
                          <br />

                          <h4 style={{marginLeft:'200px'}}>Or Sign Up With</h4>


                          <Row >
                            <Col span={8} >
                              <FacebookLoginButton onClick={() => alert("Hello")} style={{ width: '130px', height: '30px' ,marginLeft:"80px" }}>
                                <span>Facebook</span>
                              </FacebookLoginButton>
                            </Col>
                            <Col span={8} >
                              <GoogleLoginButton onClick={() => alert("Hello")} style={{ width: '130px', height: '30px' , marginLeft:"130px"}}>
                                <span>Google</span>
                              </GoogleLoginButton>
                            </Col>
                          </Row>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>

              </div>
              <h4 style={{ color: "blue", position: 'relative', left: '-22px', top: "-10px", textAlign: 'center' }}>{this.state.mess}</h4>
              <h4 style={{ color: "red", position: 'relative', left: '-22px', top: "-10px", textAlign: 'center' }}>{this.state.mess1}</h4>
            </Content>
          </Layout>
          <Footer style={{ padding: '0px' }}>
            <div style={{ width: (window.innerWidth), background: 'white' }}>
              <img src="img/footerMD.png" style={{ width: window.innerWidth + 24, height: '50px', marginLeft: '-8px' }} />
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
