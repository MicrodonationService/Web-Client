import ReactDOM from 'react-dom';
import React from 'react';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import { Layout, Form, Button, Input, Checkbox, Select, AutoComplete, Tabs, Radio } from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import GlobalHelper from '../utils/GlobalHelper.js'
import WrappedUISetNewPasswordForm from "./UISetNewPassword.js";
import WrappedVerificationMDForm from "./verificationMD.js"

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

class UIregisterMD extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false, mailResp: undefined, phoneResp: undefined, mess: "", roll: "D", userId: undefined };
    this.handleSubmit = this.handleSubmit.bind(this);
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


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (this.isValidPassword(values.password)) {
        if (!err) {

          let registerRequest = {
            "address": values.address,
            "age": values.age,
            "agreeToTerms": true,
            "city": values.city,
            "contactNo": (this.state.roll === "D" ? values.phNo : values.phNo1),
            "email": values.email,
            "name": values.username,
            "occupation": values.occupation,
            "pancard": values.pan,
            "password": values.password,
            "ngoCategory": values.NGOCATEGORY,
            "ngoContPerson": values.ngoContactPerson,
            "privacyFlag": "Y",
            "referrerId": 5,
            "registrationId": "1",
            "role": this.state.roll,
            "userIdType": "E",
            "username": values.email
          };                                                    // End Post Request
          const superagent = require('superagent');
          superagent
            .post(GlobalHelper.getContextPath()+'/signup') // Ajax Call
            .send(registerRequest)                              // Sends a JSON post body
            .set('X-API-Key', 'foobar')
            .set('accept', 'application/json')
            .end((err, res) => {                                // Calling the end function will send the request
              console.log("service call", res);
              let respJson = JSON.parse(res.text);              // Getting response in respJson veriable
              console.log("respJson", respJson);
              if (respJson.success === true) {
                this.setState({ flag: true })
                this.setState({ mailResp: respJson.data.szEmail })
                this.setState({ phoneResp: respJson.data.szMobile })
                this.setState({ userId: respJson.data.szUsername })
              } else if (respJson.success === false) {
                this.setState({ mess: "Please fill all the field" })
              }
            });

        } //ENDIF
      } else {
        this.setState({ mess: "Password should be a minimum of 8 characters long" });
      }
    })
  }
  render() {            // Start Render();

    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (this.state.flag === true) {
      return (<div style={{ display: "inline-block", height: "100%", width: "100%" }}>
        <Router>
          <WrappedVerificationMDForm mailResp={this.state.mailResp} phoneResp={this.state.phoneResp} userId={this.state.userId} />
        </Router>
      </div>)

    }
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
            <Content style={{ background: 'white', top: '30px', left: '30px', overflow: 'unset' }}>
              <div className="tabCss">
                <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.tab}>
                  <TabPane tab="Register As Doner" key="D">

                    <div style={{ width: '80%', height: '80%', marginLeft: '38px', marginTop: '-20px' }}>
                      <Form {...layout}>
                        <div>
                          <Form.Item
                            label="NAME"

                            style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '42px' }}
                          >
                            {getFieldDecorator('username', {
                              rules: [
                                {
                                  //required: true,

                                }
                              ],
                            })(
                              <Input autoComplete="off" style={{ borderRadius: '25px' }} />)}
                          </Form.Item>
                          <br />
                          <Form.Item
                            label="AGE"
                            style={{ width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '100px', top: '55px' }}
                          >
                            {getFieldDecorator('age', {
                              rules: [
                                {
                                  //required: true,

                                }
                              ],
                            })(
                              <Input autoComplete="off" style={{ borderRadius: '25px', width: '24%' }} />)}
                          </Form.Item>
                          <Form.Item
                            label="OCCUPATION"
                            style={{ width: '76%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '280px', top: '15px' }}
                          >
                            {getFieldDecorator('occupation', {
                              rules: [
                                {
                                  //required: true,

                                }
                              ],
                            })(
                              <Select
                                showSearch
                                style={{ width: 112 }}
                                placeholder="Occupation"
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                <Option value="Service">Service</Option>
                                <Option value="Teacher">Teacher</Option>
                                <Option value="Doctor">Doctor</Option>
                                <Option value="Bussinessman">Bussinessman</Option>
                                <Option value="Engineer">Engineer</Option>
                                <Option value="Other">Other</Option>
                              </Select>)}
                          </Form.Item>
                          <Form.Item
                            label="CITY"
                            style={{ width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '448px', top: '-25px' }}
                          >
                            {getFieldDecorator('city', {
                              rules: [
                                {
                                  //required: true,
                                }
                              ],
                            })(
                              <Input autoComplete="off" style={{ borderRadius: '25px', width: '24%' }} />)}
                          </Form.Item>
                          <br />
                          <Form.Item
                            label="ADDRESS"
                            style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '-15px' }}
                          >
                            {getFieldDecorator('address', {
                              rules: [
                                {
                                  //required: true,

                                }
                              ],
                            })(
                              <Input autoComplete="off" style={{ borderRadius: '25px' }} />)}
                          </Form.Item>
                          <Form.Item label="USER ID" style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '-15px' }}>
                            <div>
                              <Radio.Group
                                style={{ margin: '0px 22px 22px 22px' }}>
                                <Radio value="E">E-mail</Radio>
                                <Radio value="P">Phone Number</Radio>
                              </Radio.Group>
                            </div>
                          </Form.Item>
                          <Form.Item
                            label="E-MAIL ID"
                            style={{ width: '80%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '89px', top: '-29px' }}
                          >
                            {getFieldDecorator('email', {
                              rules: [
                                {
                                  //  required: true,

                                }
                              ],
                            })(
                              <Input autoComplete="off" style={{ borderRadius: '25px', width: '105%' }} />)}
                          </Form.Item>

                          <Form.Item
                            label="PHONE NUMBER"
                            style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '64px', top: '-20px' }}
                          >
                            {getFieldDecorator('phNo', {
                              rules: [
                                {
                                  //  required: true,
                                }
                              ],
                            })(
                              <Input autoComplete="off" maxLength={10}
                                onChange={
                                  (e) => {
                                    const { value } = e.target;
                                    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;    // Regex Expression
                                    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                                    }
                                    else {
                                      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                                      return;
                                    }
                                  }
                                }
                                style={{ borderRadius: '25px', width: '84%' }} />)}
                          </Form.Item>
                          <Form.Item
                            label="PASSWORD"
                            style={{ width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '101px', top: '-12px' }}
                          >
                            {getFieldDecorator('password', {
                              rules: [
                                {
                                  //  required: true,
                                }
                              ],
                            })(
                              <Input.Password autoComplete="off" style={{ borderRadius: '25px', width: '120%' }} />)}
                          </Form.Item>
                          <Form.Item
                            label="PAN CARD"
                            style={{ width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '101px', top: '-6px' }}
                          >
                            {getFieldDecorator('pan', {
                              rules: [
                                {
                                  //  required: true,
                                }
                              ],
                            })(
                              <Input autoComplete="off" style={{ borderRadius: '25px', width: '120%' }} />)}
                          </Form.Item>
                          <Form.Item
                            name="agreement"
                            style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '194px', top: '-11px' }}
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
                          <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '308px', top: '-12px' }}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ width: '50%', borderRadius: '25px', background: '#f8a500' }}>
                              Continue
                     </Button>
                          </Form.Item>
                        </div>
                      </Form>
                    </div>
                  </TabPane>
                  <TabPane tab="Register As NGO" key="N">
                    <div style={{ width: '80%', marginTop: '-11px', marginLeft: '100px', overflowY: 'auto', overflowX: 'hidden' }}>
                      <Form {...layout}>
                        <Form.Item
                          label=" NGO NAME"

                          style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px' }}
                        >
                          {getFieldDecorator('username', {
                            rules: [
                              {
                                //required: true,

                              }
                            ],
                          })(
                            <Input autoComplete="off" style={{ borderRadius: '25px' }} />)}
                        </Form.Item>
                        <br />

                        <Form.Item
                          label=" NGO ADDRESS"
                          style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '-2px' }}
                        >
                          {getFieldDecorator('address', {
                            rules: [
                              {
                                //required: true,

                              }
                            ],
                          })(
                            <Input autoComplete="off" style={{ borderRadius: '25px', marginTop: '1Opx' }} />)}
                        </Form.Item>


                        <Form.Item label="NGO CATEGORY" style={{ left: '63px', top: '-5px' }}>
                          {getFieldDecorator('NGOCATEGORY')}
                          <Select defaultValue="1" onChange={this.handleChange} style={{ width: '85%' }}>
                            <Option value="Health">Health</Option>
                            <Option value="NGO2">NGO2</Option>
                            <Option value="NGO3">NGO3</Option>
                            <Option value="NGO4">NGO4</Option>
                          </Select>
                        </Form.Item>

                        <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '91px', top: '0px' }}>
                          CONTACT PERSON DETAILS</h4>

                        <div style={{ width: '85%', height: '230px', marginLeft: '40px', marginTop: '-3px', background: '#e8e8e8' }}>
                          <Form  {...layout1}>
                            <Form.Item
                              label=" NAME"

                              style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '65px', top: '3px' }}
                            >
                              {getFieldDecorator('ngoContactPerson', {
                                rules: [
                                  {
                                    //required: true,
                                  }
                                ],
                              })(
                                <Input autoComplete="off" style={{ borderRadius: '25px' }} />)}
                            </Form.Item>

                            <Form.Item label="USER ID" style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '65px', top: '0px' }}>
                              <div>
                                <Radio.Group
                                  style={{ margin: '0px 22px 22px 0px' }}>
                                  <Radio value="E">E-mail</Radio>
                                  <Radio value="P">Phone Number</Radio>
                                </Radio.Group>
                              </div>
                            </Form.Item>
                            <h5 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '130px', top: '-30px' }}>
                              (User ID can be E-mail or Phone Number)</h5>
                            <Form.Item
                              label="E-MAIL ID "
                              style={{ width: '80%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '75px', top: '-35px' }}
                            >
                              {getFieldDecorator('email', {
                                rules: [
                                  {
                                    //required: true,
                                  }
                                ],
                              })(
                                <Input autoComplete="off" style={{ borderRadius: '25px', width: '70%' }} />)}
                            </Form.Item>

                            <Form.Item
                              label="PHONE NUMBER"
                              style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '45px', top: '-32px' }}
                            >
                              {getFieldDecorator('phNo1', {
                                rules: [
                                  {
                                    //required: true,
                                  }
                                ],
                              })(
                                <Input autoComplete="off" maxLength={10}
                                  onChange={
                                    (e) => {
                                      const { value } = e.target;
                                      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                                      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                                      }
                                      else {
                                        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                                        return;
                                      }
                                    }
                                  }
                                  style={{ borderRadius: '25px', width: '56%' }} />)}
                            </Form.Item>

                            <Form.Item
                              label="PASSWORD"
                              style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '45px', top: '-30px' }}
                            >
                              {getFieldDecorator('password', {
                                rules: [
                                  {
                                    //required: true,

                                  }
                                ],
                              })(
                                <Input.Password autoComplete="off" style={{ borderRadius: '25px', width: '56%' }} />)}
                            </Form.Item>
                          </Form>

                        </div>
                        <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '91px', top: '5px' }}>
                          You will be able to add photos and details post login</h4>
                        <Form.Item
                          name="agreement"
                          style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '94px', top: '-5px' }}
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
                        <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '308px', top: '-15px' }}>
                          <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ width: '50%', borderRadius: '25px', background: '#f8a500', color: '#000000', marginLeft: '-34px' }}>
                            Continue
                     </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </TabPane>

                </Tabs>
              </div>
              <h4 style={{ color: "red", position: 'relative', left: '-22px', top: "-10px", textAlign: 'center' }}>{this.state.mess}</h4>
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
  }      // End Render();
}

const WrappedUIregisterMDForm = Form.create()(UIregisterMD);
export default WrappedUIregisterMDForm;
