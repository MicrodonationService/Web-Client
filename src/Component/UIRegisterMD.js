import ReactDOM from 'react-dom';
import React from 'react';
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row, Cascader, Select, AutoComplete,Tabs, Radio} from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import WrappedUISetNewPasswordForm from "./UISetNewPassword.js";
import WrappedVerificationMDForm from "./verificationMD.js"

var styles=require('../App.module.css');

const { Header, Sider, Content, Footer } = Layout;
const {Group} = Radio;
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
function callback(key)
{
console.log(key);
}

class UIregisterMD extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state =  {flag:false,mailResp:undefined,phoneResp:undefined, mess:""} ;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.isValidPassword = this.isValidPassword.bind(this);
    }
    isValidPassword(value){

          var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          if(strongRegex.test(value)) {
          return true ;
        }
        else
        {
          return false;
        }
    }


    handleSubmit(e)
    {
      e.preventDefault();
       this.props.form.validateFields((err, values) => {
         if(this.isValidPassword(values.password)){
         if (!err){

           let registerRequest  = {
             "address": values.address,
             "age": values.age,
             "agreeToTerms": true,
             "city": values.city,
             "contactNo": values.phNo,
             "email": values.email,
             //"emailOtp": "123456",
             "name": values.username,
             //"ngoCategory": "Children",
             //"ngoContPerson": "Paresh",
             "occupation": values.occupation,
             "pancard": "DXBPP4991N",
             "password": values.password,
             //"phoneOtp": "654321",
             "privacyFlag": "Y",
             "referrerId": 5,
             "registrationId": "1",
             "role": "D",
             "userIdType": "E",
             "username": values.email
           };
             const superagent = require('superagent');
           superagent
           .post('http://13.234.225.242:8880/api/auth/signup')
           .send(registerRequest) // sends a JSON post body
           .set('X-API-Key', 'foobar')
           .set('accept', 'application/json')
           .end((err, res) => {
               // Calling the end function will send the request
               console.log("service call",res);
               let respJson = JSON.parse(res.text);
               console.log("respJson",respJson);
                 if(respJson.success=== true){
                   this.setState({flag:true})
                   this.setState({mailResp:respJson.data.szEmail})
                   this.setState({phoneResp:respJson.data.szMobile})
                 }else if (respJson.success=== false){
                   this.setState({mess:respJson.message})
                 }
           });

      }
    }else{
      this.setState({mess : "Password must have 1 Uppercase, 1 Lower case, 1 digit and 1 special character. And password should be atleast 8 characters long"});
    }
      })
    }
  render(){

    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    if(this.state.flag=== true){
      return(<div style={{display:"inline-block",height:"100%",width:"100%"}}>
      <Router>
          <WrappedVerificationMDForm mailResp={this.state.mailResp} phoneResp={this.state.phoneResp}/>
      </Router>
      </div>)

    }

     return(
       <div>
       <Layout>
        <Header>
        <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white'}}>
            <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>
        </div>
        </Header>
        <Layout style={{marginTop: '6px',height:( window.innerHeight - 107 )}}>
          <Sider style={{background:'white',width: '400px' , flex:'0 0 0px',minWidth: "400px"}}>
            <img src="img/siderMD.png" style={{width: window.innerWidth-966 ,height: '550px',top: '0px',left: '0px'}}/>
          </Sider>
          <Content style={{background:'white',top:'30px',left:'30px',overflow : 'unset'}}>
          <div className="tabCss">
            <Tabs defaultActiveKey="1" onChange={callback} className={styles.tab}>
              <TabPane tab="Register As Doner" key="1">

              <div style={{width:'80%', height: '80%',marginLeft:'38px',marginTop:'-20px'}}>
                 <Form {...layout}>
                 <div>
                   <Form.Item
                   label = "NAME"

                   style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '42px'}}
                   >
                   {getFieldDecorator('username', {
                            rules: [
                               {
                                 //required: true,

                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px'}}/>)}
                   </Form.Item>
                   <br/>
                   <Form.Item
                   label = "AGE"
                   style={{width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '100px', top: '55px'}}
                   >
                   {getFieldDecorator('age', {
                            rules: [
                               {
                                 //required: true,

                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px',width: '24%'}}/>)}
                   </Form.Item>
                   <Form.Item
                   label = "OCCUPATION"
                   style={{width: '84%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '280px', top: '15px'}}
                   >
                   {getFieldDecorator('occupation', {
                            rules: [
                               {
                                 //required: true,

                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px', width: '22%'}}/>)}
                   </Form.Item>
                   <Form.Item
                   label = "CITY"
                   style={{width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '448px', top: '-25px'}}
                   >
                   {getFieldDecorator('city', {
                            rules: [
                               {
                                 //required: true,
                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px', width: '24%'}}/>)}
                   </Form.Item>
                   <br/>
                   <Form.Item
                   label = "ADDRESS"
                   style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '-15px'}}
                   >
                   {getFieldDecorator('address', {
                            rules: [
                               {
                                 //required: true,

                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px'}}/>)}
                   </Form.Item>
                   <Form.Item label = "USER ID" style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '-15px'}}>
                   <div>
                   <Radio.Group
                   style={{margin:'0px 22px 22px 22px'}}>
                       <Radio value="E">E-mail</Radio>
                       <Radio value="P">Phone Number</Radio>
                   </Radio.Group>
                   </div>
                   </Form.Item>
                   <Form.Item
                   label = "E-MAIL ID"
                   style={{width: '80%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '89px', top: '-29px'}}
                   >
                   {getFieldDecorator('email', {
                            rules: [
                               {
                               //  required: true,

                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px', width: '105%'}}/>)}
                   </Form.Item>
                   {/*<Form.Item
                   label = "OTP"
                   style={{width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '448px', top: '-69px'}}
                   >
                   {getFieldDecorator('otp', {
                            rules: [
                               {
                               //  required: true,

                               }
                            ],
                       })(
                     <Input style={{borderRadius: '25px', width: '24%'}}/>)}
                     <a href="" style={{position: 'relative', right: '75px', top: '25px', color:'#000000'}}>Resend OTP</a>
 </Form.Item>*/}
                   <Form.Item
                   label = "PHONE NUMBER"
                   style={{width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '64px', top: '-20px'}}
                   >
                   {getFieldDecorator('phNo', {
                            rules: [
                               {
                               //  required: true,
                               }
                            ],
                       })(
                     <Input maxLength={10}
                     onChange={
                       (e)=>{
                           const {value} = e.target;
                         const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                         if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                         }
                         else{
                           e.target.value = e.target.value.substring(0,e.target.value.length-1);
                           return ;
                         }
                       }
                       }
                      style={{borderRadius: '25px', width: '84%'}}/>)}
                   </Form.Item>
                   <Form.Item
                   label = "Password"
                   style={{width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '101px', top: '-12px'}}
                   >
                   {getFieldDecorator('password', {
                            rules: [
                               {
                               //  required: true,
                               }
                            ],
                       })(
                     <Input.Password style={{borderRadius: '25px', width: '120%'}}/>)}
                   </Form.Item>
                   <Form.Item
                     name="agreement"
                     style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '194px', top: '-20px'}}
                     valuePropName="checked"
                     rules={[
                             {
                               validator: (_, value) =>
                               value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                             },
                           ]}
                   >
                      <Checkbox>
                        I agreed to the <a href="">Term and Conditions</a>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '308px', top: '-22px'}}>
                     <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'50%',borderRadius: '25px',background: '#f8a500'}}>
                       Continue
                     </Button>
                     </Form.Item>
                     </div>
                 </Form>
              </div>

              </TabPane>
              <TabPane tab="Register As NGO" key="2">
              <div style={{width:'80%', height: window.innerHeight,marginTop:'-11px',marginLeft:'100px',overflowY:'auto',overflowX:'hidden'}}>
                 <Form {...layout}>
                   <Form.Item
                   label = " NGO NAME"
                   rules={[
                       {
                         required: true,
                         message: 'Please input your username!'
                       },
                     ]}
                   style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px'}}
                   >
                     <Input style={{borderRadius: '25px'}}/>
                   </Form.Item>
                     <br/>

                   <Form.Item
                   label = " NGO ADDRESS"
                   rules={[
                       {
                         required: true,
                       },
                     ]}
                   style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '81px', top: '-2px'}}
                   >
                     <Input style={{borderRadius: '25px',marginTop:'1Opx'}}/>
                   </Form.Item>


                   <Form.Item label="NGO CATEGORY"  style={{left:'63px',top:'-5px'}}>
                     {getFieldDecorator('NGOCATEGORY')}
                       <Select defaultValue="1"  onChange={this.handleChange} style={{width:'85%'}}>
                         <Option value="1">Health</Option>
                         <Option value="2">NGO2</Option>
                         <Option value="3">NGO3</Option>
                         <Option value="4">NGO4</Option>
                       </Select>
                   </Form.Item>

           <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '91px', top: '0px'}}>
            CONTACT PERSON DETAILS</h4>

             <div style={{width:'85%',height:'265px',marginLeft:'40px',marginTop:'-3px',background:'#e8e8e8'}}>
             <Form  {...layout1}>
                     <Form.Item
                     label = " NAME"
                     rules={[
                         {
                           required: true,
                         },
                       ]}
                     style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '65px', top: '3px'}}
                     >
                       <Input style={{borderRadius: '25px'}}/>
                     </Form.Item>

                 <Form.Item label = "USER ID" style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '65px', top: '0px'}}>
                   <div>
                   <Radio.Group
                   style={{margin:'0px 22px 22px 0px'}}>
                       <Radio value="DR">E-mail</Radio>
                       <Radio value="AU">Phone Number</Radio>
                   </Radio.Group>
                   </div>
                   </Form.Item>
                   <h5 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '130px', top: '-30px'}}>
                    (User ID can be E-mail or Phone Number)</h5>
                   <Form.Item
                   rules={[
                       {
                         required: true,
                       },
                     ]}
                   label = "E-MAIL ID "
                   style={{width: '80%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '75px', top: '-35px'}}
                   >
                     <Input style={{borderRadius: '25px', width: '70%'}}/>
                   </Form.Item>

                     <Form.Item
                   rules={[
                       {
                         required: true,
                       },
                     ]}
                   label = "PHONE NUMBER "
                   style={{width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '45px', top: '-32px'}}
                   >
                     <Input maxLength={10}
                     onChange={
                       (e)=>{
                           const {value1} = e.target;
                         const reg1 = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                         if ((!isNaN(value1) && reg1.test(value1)) || value1 === '' || value1 === '-') {

                         }
                         else{
                           e.target.value = e.target.value.substring(0,e.target.value.length-1);
                           return ;
                         }
                       }
                       }
                      style={{borderRadius: '25px', width: '56%'}}/>
                   </Form.Item>

                   <Form.Item
                 rules={[
                     {
                       required: true,
                     },
                   ]}
                 label = "PASSWORD"
                 style={{width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '45px', top: '-30px'}}
                 >
                   <Input style={{borderRadius: '25px', width: '56%'}}/>
                 </Form.Item>

                 <Form.Item
               rules={[
                   {
                     required: true,
                   },
                 ]}
               label = "CONFIRM PASSWORD"
               style={{width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '45px', top: '-30px'}}
               >
                 <Input style={{borderRadius: '25px', width: '56%'}}/>
               </Form.Item>
               </Form>

                   </div>
             <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '91px', top: '5px'}}>
             You will be able to add photos and details post login</h4>
                     <Form.Item
                     name="agreement"
                     style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '94px', top: '-5px'}}
                     valuePropName="checked"
                     rules={[
                             {
                               validator: (_, value) =>
                               value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                             },
                           ]}
                   >
                      <Checkbox>
                        I agreed to the <a href="">Term and Conditions</a>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '308px', top: '-15px'}}>
                     <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'50%',borderRadius: '25px',background: '#f8a500',color:'#000000'}}>
                       Continue
                     </Button>
                     </Form.Item>
                 </Form>
              </div>

              </TabPane>

            </Tabs>
            <h5 style={{color:"red",position: 'relative', left: '100px'}}>{this.state.mess}</h5>
          </div>

          </Content>
          </Layout>
          <Footer style={{padding:'0px'}}>
            <div style={{width:(window.innerWidth),background:'white'}}>
              <img src="img/footerMD.png" style={{width: window.innerWidth+24 ,height: '50px', marginLeft: '-8px'}} />
            </div>
          </Footer>
       </Layout>
       </div>
     );
  }
}

const WrappedUIregisterMDForm = Form.create()(UIregisterMD);
export default WrappedUIregisterMDForm;
