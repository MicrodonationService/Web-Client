import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row, Cascader, Select, AutoComplete,Tabs, Radio} from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import UIregisterMD from "./UIRegisterMD.js";
import GlobalHelper from '../utils/GlobalHelper.js'
import PasswordSetSuccess from "./PasswordSetSuccess.js"
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
const {Group} = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const AutoCompleteOption = AutoComplete.Option
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};
class UISetNewPassword extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state ={
        flag: false,
        mess: ""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
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

    componentWillReceiveProps(nextProps)
    {
         this.setState({mess : ""});
    };


       handleSubmit(e){
         e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if(this.isValidPassword(values.newPassword)){
            if (!err){
              let changePassRequest  = {
                "confirmPassword": values.ConfirmPassword,
                "password": values.newPassword,
                "username": this.props.data
              };
                const superagent = require('superagent');
              superagent
              .post(GlobalHelper.getContextPath()+'/updatePassword')
              .send(changePassRequest) // sends a JSON post body
              .set('X-API-Key', 'foobar')
              .set('accept', 'application/json')
              .end((err, res) => {
                  // Calling the end function will send the request
                  let respJson = JSON.parse(res.text);
                    if(respJson.success=== true){
                         //this.setState({flag:true})
                         this.setState({mess:respJson.message})
                         ReactDOM.render(<PasswordSetSuccess />,document.getElementById('root'));
                    }else if (respJson.success=== false){
                      this.setState({mess:respJson.message})
                    }
              });
              this.setState({flag:true})
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
          <Sider style={{background:'white',width: '400px' , flex:'0 0 0px',minWidth: "400px"}}>
            <img src="img/siderMD.png" style={{width: window.innerWidth-966 ,height: '550px',top: '0px',left: '0px'}}/>
          </Sider>
          <Content style={{background:'white',marginTop:'1px',marginLeft:'2px',overflow : 'unset'}}>
          <h1 style={{display: 'block', position: 'relative', left: '396px',fontWeight: 900, color:'#f8a500', top:'119px', fontSize: 'x-large'}}>NEW PASSWORD</h1>
             <div style={{width:'82%', height: '80%', margin: '47px 0px 0px 110px'}}>
                <Form>
                  <Form.Item
                  label = "NEW PASSWORD"
                    style={{width: '40%',position: 'relative', top: '113px', left: '200px'}}
                  >
                  {getFieldDecorator('newPassword', {
                           rules: [
                              {
                                required: true,
                                message: 'Please enter New Password!',
                              }
                           ],
                      })(
                    <Input.Password style={{borderRadius: '25px',marginLeft: '26px'}}/>,)}
                  </Form.Item>
                  <Form.Item
                  rules={[
                      {
                        required: true,
                      },
                    ]}
                  label = "CONFIRM PASSWORD"
                  style={{width: '40%', position: 'relative', top: '124px', left: '200px'}}
                  >
                  {getFieldDecorator('ConfirmPassword', {
                           rules: [
                              {
                                required: true,
                                message: 'Please enter Comfirm Password!',
                              }
                           ],
                      })(
                    <Input.Password style={{borderRadius: '25px',marginLeft: '26px'}} />,)}
                  </Form.Item>
                   <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '314px', top: '142px'}}>
                    <Button type="primary" onClick={this.handleSubmit} htmlType="submit" style={{width:'20%',borderRadius: '25px',background: '#f8a500'}}>
                      SUBMIT
                    </Button>
                    </Form.Item>
                </Form>
                <h4 style={{position: 'relative', color: 'red', top:'150px', textAlign: 'center'}}>{this.state.mess}</h4>
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

const WrappedUISetNewPasswordForm = Form.create()(UISetNewPassword);
export default WrappedUISetNewPasswordForm;
