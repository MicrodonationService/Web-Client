import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row, Cascader, Select, AutoComplete,Tabs, Radio} from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import UIregisterMD from "./UIRegisterMD.js";
import MainLayout from "./MainLayout.js"
import GlobalHelper from '../utils/GlobalHelper.js'
// import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js"
import WrappedNormalPasswordSetSeccessInnerForm from "./PasswordSetSeccessInner.js"
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
const {Group} = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const AutoCompleteOption = AutoComplete.Option

class ChangePassword extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state ={
        mess: ""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.reDirectLoginPage = this.reDirectLoginPage.bind(this);
      this.isValidPassword = this.isValidPassword.bind(this);
    }
    isValidPassword(value){

          var strongRegex = new RegExp("[a-zA-Z0-9!@#%*]{8,}$");
          if(strongRegex.test(value)) {
          return true ;
        }
        else
        {
          return false;
        }
    }

      reDirectLoginPage(){
        if(this.props.data.Body.SZ_USER_TYPE==="D"){
          ReactDOM.render(<MainLayout />, document.getElementById('root'));
        }else if(this.props.data.Body.SZ_USER_TYPE==="N"){
          // ReactDOM.render(<WrappedNormalMainLayoutNGO />, document.getElementById('root'));
        }
      }

       handleSubmit(e){
         e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if(this.isValidPassword(values.newPassword)){
            if (!err){
              let changePassRequest  = {
                "oldPassword" : values.currentPassword,
                "confirmPassword": values.confirmPassword,
                "password": values.newPassword,
                "username": this.props.data.data.user.userName
              };
                const superagent = require('superagent');
              superagent
              .post(GlobalHelper.getContextPath()+'/changePassword')
              .send(changePassRequest) // sends a JSON post body
              .set('X-API-Key', 'foobar')
              .set('accept', 'application/json')
              .end((err, res) => {
                  // Calling the end function will send the request
                  let respJson = JSON.parse(res.text);
                    if(respJson.success=== true){
                         //this.setState({flag:true})
                         this.setState({mess:respJson.message})
                         ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));
                    }else if (respJson.success=== false){
                      this.setState({mess:respJson.message})
                    }
              });
            }
          }else{
              this.setState({mess : "Password should be a minimum of 8 characters long"});
          }
          })

       }

  render(){

    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    /*if(this.state.flag === true){
      return(
        <div style={{display:"inline-block",height:"100%",width:"100%"}}>
        <Switch>
            <Route exact component={PasswordSetSuccess}/>
        </Switch>
        </div>
      )
}*/
     return(
       <div>
       <Layout>
        <Header>
        <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white'}}>
            <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>
        </div>
        </Header>
        <Layout style={{marginTop: '6px',height:( window.innerHeight - 107 )}}>
            <img src="img/subHeaderImg.png" style={{width: window.innerWidth+1 ,height: '100px',top: '0px',left: '0px'}}/>

          <Content style={{background:'white',marginTop:'1px',marginLeft:'2px',overflow : 'unset'}}>
          <h1 style={{display: 'block', position: 'relative', left: '550px',fontWeight: 900, color:'#f8a500', top:'45px', fontSize: 'x-large'}}>NEW PASSWORD</h1>
             <div class="inputPassClass" style={{width:'80%', height: '80%', margin: '47px 0px 0px 356px'}}>
                <Form >
                  <Form.Item
                  label = "ENTER CURRENT PASSWORD"
                  style={{width: '30%',position: 'relative', left: '113px'}}
                  >
                  {getFieldDecorator('currentPassword', {
                           rules: [
                              {
                                required: true,
                                message: 'Please enter Current Password!',
                              }
                           ],
                      })(
                    <Input.Password style={{borderRadius: '25px'}}/>,)}
                  </Form.Item>
                  <Form.Item
                  label = "NEW PASSWORD"
                  style={{width: '30%', position: 'relative', left: '113px'}}
                  >
                  {getFieldDecorator('newPassword', {
                           rules: [
                              {
                                required: true,
                                message: 'Please enter New Password!',
                              }
                           ],
                      })(
                    <Input.Password style={{borderRadius: '25px'}} />,)}
                  </Form.Item>

                    <Form.Item
                    label = "CONFIRM PASSWORD"
                    style={{width: '30%', position: 'relative', left: '113px'}}
                    >
                    {getFieldDecorator('confirmPassword', {
                             rules: [
                                {
                                  required: true,
                                  message: 'Please enter Confirm Password!',
                                }
                             ],
                        })(
                      <Input.Password style={{borderRadius: '25px'}} />,)}
                    </Form.Item>
                     <Form.Item style={{width: '30%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '143px', top: '15px'}}>
                      <Button type="primary" onClick={this.handleSubmit} htmlType="submit" style={{width:'40%',borderRadius: '25px',background: '#f8a500'}}>
                        SUBMIT
                      </Button>
                      </Form.Item>
                </Form>
                <a  style={{textDecoration:'underline',position: 'relative', top: '12px', left: '266px'}} onClick={this.reDirectLoginPage}><Router><Link style={{color: 'red'}}>Home</Link></Router></a>

                <h4 style={{position: 'relative',top: '25px', left: '114px', color: 'red'}}>{this.state.mess}</h4>
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
const WrappedNormalChangePasswordForm = Form.create()(ChangePassword);
export default WrappedNormalChangePasswordForm;
