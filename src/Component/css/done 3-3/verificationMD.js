import ReactDOM from 'react-dom';
import React from 'react';
import { Layout, Form, Button, Col, Input, Tooltip, Checkbox, Row, Cascader, Select, AutoComplete, Tabs, Radio } from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import WrappedNormalLoginForm from "./Login.js";
import GlobalHelper from '../utils/GlobalHelper.js'
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
class VerificationMD extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: "", flag1: "", mess: "", mess1: "" }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mailVerification = this.mailVerification.bind(this);
    this.phoneVefication = this.phoneVefication.bind(this);
    this.readOnlyMailText = this.props.mailResp;
    this.readOnlyPhoneText = this.props.phoneResp;
    this.handleSubmit1 = this.handleSubmit1.bind(this);
  }


  handleSubmit1() {
    this.setState({ flag1: true })
  }

  mailVerification() {
    let forgotPassRequest = {
      "emailId": this.props.mailResp,
      "templateId": 2
    };
    const superagent = require('superagent');
    superagent
      .post(GlobalHelper.getContextPath()+'/confirmEmail')
      .send(forgotPassRequest) // sends a JSON post body
      .set('X-API-Key', 'foobar')
      .set('accept', 'application/json')
      .end((err, res) => {
        // Calling the end function will send the request
        let respJson = JSON.parse(res.text);
        console.log("respJson11", respJson);
        if (respJson.success === true) {
          this.setState({ mess: "E-mail Verified!" })
        } else if (respJson.success === false) {
          this.setState({ mess: respJson.message })
        }
      })

  }
  phoneVefication() {

    let generateOtpOnPhoneRequest = {
      "phoneNumber": this.props.phoneResp,
      "templateId": 5,
      "username": this.props.mailResp
    };
    const superagent = require('superagent');
    superagent
      .post(GlobalHelper.getContextPath()+'/confirmPhoneNumber')
      .send(generateOtpOnPhoneRequest) // sends a JSON post body
      .set('X-API-Key', 'foobar')
      .set('accept', 'application/json')
      .end((err, res) => {
        // Calling the end function will send the request
        let respJson = JSON.parse(res.text);
        console.log("respJson11", respJson);
        if (respJson.success === true) {
          this.setState({ mess: "OTP sent to your register Mobile Number" })
        } else if (respJson.success === false) {
          this.setState({ mess: respJson.message })
        }
      })


  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let confirmOtpOnPhoneRequest = {
          "phoneOTP": values.otp,
          "username": this.props.mailResp
        };
        const superagent = require('superagent');
        superagent
          .post(GlobalHelper.getContextPath()+'/verifyPhoneOTP')
          .send(confirmOtpOnPhoneRequest) // sends a JSON post body
          .set('X-API-Key', 'foobar')
          .set('accept', 'application/json')
          .end((err, res) => {
            // Calling the end function will send the request
            let respJson = JSON.parse(res.text);
            console.log("respJson11", respJson);
            if (respJson.success === true) {
              this.setState({ mess: "Mobile Number Verified" })
              setTimeout(() => {
                this.setState({ flag: true })
              }, 5000);

            } else if (respJson.success === false) {
              this.setState({ mess: respJson.message })
            }
          })

        //this.setState({mess:respJson.message})
        //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));

      }
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ mess: "" });
  };


  componentDidMount() {
    //setTimeout(()=>{

    document.getElementById("readOnlyMailText").value = this.readOnlyMailText;
    document.getElementById("readOnlyPhoneText").value = this.readOnlyPhoneText;
    //},500)
  }
  componentDidUpdate(prevProps, prevState) {
    try {
      if (document.getElementById("readOnlyMailText").value === "") {
        this.readOnlyMailText = this.props.mailResp;
      } else {
        this.readOnlyMailText = document.getElementById("readOnlyMailText").value;
      }
      document.getElementById("readOnlyMailText").value = this.readOnlyMailText;
    } catch (e) { console.error(e) }
    //document.getElementById("EmailID").value=this.email;
    try {
      if (document.getElementById("readOnlyPhoneText").value === "") {
        this.readOnlyPhoneText = this.props.phoneResp;
      } else {
        this.readOnlyPhoneText = document.getElementById("readOnlyPhoneText").value;
      }
      document.getElementById("readOnlyPhoneText").value = this.readOnlyPhoneText;
    } catch (e) { console.error(e) }

    //document.getElementById("Mobile").value=this.mobile;
  }

  render() {

    if (this.state.flag === true) {
      return (
        <div style={{ display: "inline-block", height: "100%", width: "100%" }}>
          <Switch>
            <Route exact component={WrappedNormalLoginForm} />
          </Switch>

        </div>
      )
    }

    if (this.state.flag1 === true) {
      return (
        <div style={{ display: "inline-block", height: "100%", width: "100%" }}>
          <Router>
            <Route exact component={WrappedNormalLoginForm} />
          </Router>

        </div>
      )
    }
    console.log("dd", this.props.mailResp);
    //const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
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
            <Content style={{ background: 'white', marginTop: '1px', marginLeft: '2px', overflow: 'unset' }}>
              <h1 style={{ display: 'block', position: 'relative', left: '392px', fontWeight: 900, color: '#f8a500', top: '150px', fontSize: 'x-large' }}>VERIFICATION</h1>
              <div style={{ width: '80%', height: '80%', border: '1px solid orange', margin: '47px 0px 0px 110px' }}>
                <Form>
                  <Form.Item
                    label="MAIL"
                    style={{ width: '40%', position: 'relative', top: '113px', left: '200px' }}
                  >
                    {getFieldDecorator('readOnlyMailText', {

                    })(
                      <Input disabled style={{ borderRadius: '25px' }} />)}
                  </Form.Item>
                  <a onClick={this.mailVerification} style={{ textDecoration: 'underline', position: 'relative', top: '109px', color: '#FFFFFF', left: '432px', color: '40a9ff' }}>{(this.state.mess1 == "E-mail Verified") ? <span style={{ color: 'green' }}>E-amil Verified</span> : <span>Verify E-mail</span>}</a>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label="PHONE"
                    style={{ width: '40%', position: 'relative', top: '92px', left: '200px' }}
                  >
                    {getFieldDecorator('readOnlyPhoneText', {

                    })(
                      <Input disabled style={{ borderRadius: '25px', position: 'relative', top: '-6px' }} />)}
                  </Form.Item>
                  <a onClick={this.phoneVefication} style={{ textDecoration: 'underline', position: 'relative', top: '82px', color: '#FFFFFF', left: '382px', color: '40a9ff' }}>Verify Phone Number</a>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label="OTP"
                    style={{ width: '40%', position: 'relative', top: '66px', left: '176px' }}
                  >
                    {getFieldDecorator('otp', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter OTP!',
                        }
                      ],
                    })(
                      <Input style={{ position: 'relative', top: '-8px', marginLeft: '26px' }} />)}
                  </Form.Item>
                  <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '280px', top: '66px' }}>
                    <Button onClick={this.handleSubmit} type="primary" htmlType="submit" style={{ width: '20%', borderRadius: '25px', background: '#f8a500' }}>
                      VERIFY
                     </Button>
                  </Form.Item>
                </Form>
                <a style={{ textDecoration: 'underline', position: 'relative', top: '61px', left: '328px' }}><Router><Link onClick={this.handleSubmit1} style={{ color: 'red' }}>Login</Link></Router></a>
                <h4 style={{ position: 'relative', color: 'red', top: '70px', left: '-36px', textAlign: 'center' }}>{this.state.mess}</h4>
              </div>
            </Content>
          </Layout>
          <Footer style={{ padding: '0px' }}>
            <div style={{ width: (window.innerWidth), background: 'white' }}>
              <img src="img/footerMD.png" style={{ width: window.innerWidth + 24, height: '50px', marginLeft: '-8px' }} />
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}
const WrappedVerificationMDForm = Form.create()(VerificationMD);
export default WrappedVerificationMDForm;
