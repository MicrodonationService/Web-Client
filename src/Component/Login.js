import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import WrappedUIregisterMDForm from "./UIRegisterMD.js";
import WrappedVerificationMDForm from "./verificationMD.js"
import MainLayout from "./MainLayout.js"
import {Layout, Modal,Menu,Checkbox, Breadcrumb, Icon,Tabs,Button ,Carousel,Form,Input,Avatar, Badge,Card,Row,Col,Divider} from 'antd';
import WrappedNormalForPassForm from './ForgotPassword.js'
import { Spin} from 'antd';
var styles=require('../App.module.css');

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class Loginpage extends React.Component
  {
  constructor(props)
          {
            super(props);
            this.state = {visible: false,verifyFlag: false,mailResp:"",value: "", flag: false ,regFlag:false, loginFlag: false, mess:""};
            this.handleClick = this.handleClick.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            };

         componentWillReceiveProps(nextProps)
         {
              this.setState({mess : ""});
         };

          handleCancel = () => {
            this.setState({
              visible: false,
            });
          };

          handleClick(){
            console.log("flag1",this.state.flag);
            this.setState({flag: true})
          }

          handleSubmit(){
            ReactDOM.render(<WrappedUIregisterMDForm/>,document.getElementById('root'));
            this.setState({regFlag:true})
          }

          handleLogin(e){
            e.preventDefault();
             this.props.form.validateFields((err, values) => {
               if (!err){
               let loginRequest  = {
                 "usernameOrEmail":values.username,
                 "password":values.password
               };
                 const superagent = require('superagent');
               superagent
               .post('http://13.234.225.242:8880/api/auth/signin')
               .send(loginRequest) // sends a JSON post body
               .set('X-API-Key', 'foobar')
               .set('accept', 'application/json')
               .end((err, res) => {
                   // Calling the end function will send the request
                   console.log("service call",res);
                   let loginRespJson = JSON.parse(res.text);
                   console.log("respJson",loginRespJson);
                   if(loginRespJson.success=== false && loginRespJson.message==="User is not Active, Cannot Process Request"){
                     this.setState({verifyFlag: true})
                     this.setState({mailResp:values.username})
                   }
                     else if(loginRespJson.success=== true){
                          this.setState({loginFlag:true})
                          ReactDOM.render(<MainLayout data={loginRespJson}/>,document.getElementById('root'));
                     }else if (loginRespJson.success=== false){
                       this.setState({mess:loginRespJson.message})
                     }
               });
             }//ENDIF

         })
       }

  render()
      {
        const { visible, confirmLoading } = this.state;
        const { getFieldDecorator } = this.props.form;

        if(this.state.flag=== true){
          console.log("flag",this.state.flag);
          return(<div style={{display:"inline-block",height:"100%",width:"100%"}}>
          <Switch>
              <Route exact component={WrappedNormalForPassForm}/>
          </Switch>

          </div>)

        }

        if(this.state.verifyFlag=== true){
          console.log("flag",this.state.flag);
          return(<div style={{display:"inline-block",height:"100%",width:"100%"}}>
          <Router>
              <WrappedVerificationMDForm mailResp={this.state.mailResp} />
          </Router>

          </div>)

        }

        /*if(this.state.regFlag=== true){
          console.log("flag",this.state.flag);
          return(<div style={{display:"inline-block",height:"100%",width:"100%"}}>
          <Switch>
              <Route exact component={WrappedUIregisterMDForm}/>
          </Switch>

          </div>)

}*/

        /*if(this.state.loginFlag=== true){

          return(<div style={{display:"inline-block",height:"100%",width:"100%"}}>
          <Switch>
              <Route exact component={MainLayout}/>
          </Switch>

          </div>)

}*/
      return(
        <Layout>
        <div style={{width:(window.innerWidth),background:'white'}}>
            <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>
        </div>
          <Content >
            <div style={{display:'inlineFlex'}} className={styles.second2}>
            <img src="img/siderMD.png" style={{width: '316px', height: '478px',position:'absolute',borderRadius:'5px',left:'0px',top:'0px'}} />
            </div>
                  <div className={styles.second} >

                 <h2 style={{color:'#f8a500',margin:'-15px 0px 10px -244px',fontWeight:'Bold',textAlign:'center'}}>LOGIN</h2>

                 <Tabs defaultActiveKey="1" onChange={callback} className={styles.tab}>
                       <TabPane tab="Login AS Donar" key="1" >
                       </TabPane>
                       <TabPane tab="Login AS NGO" key="2" >
                       </TabPane>
    </Tabs>

                 <Form >
                 <h4 style={{marginTop:'20px',marginBottom:'7px'}}>User ID(E-MAIL/MOBILE) </h4>
                      <Form.Item >
                                       {getFieldDecorator('username', {
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
                                         style={{textAlign:'left',borderRadius:'20px',height:'40px',marginBottom:'4px'}}
                                         />,)}
                                    </Form.Item>
                            <div style={{marginBottom:'7px'}}>
                                    <h4 style={{marginTop:'7px',marginBottom:'-1px',display:'contents'}}>PASSWORD</h4>
                                    <a style={{color:'#000000',marginLeft:'145px',textDecoration:'underline'}} onClick={this.handleClick}><Link to={"ForgotPassword"} style={{color:'#000'}}>Forgot Password?</Link></a>

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
                                              <Input
                                               type='password'
                                               style={{borderRadius:'20px',height:'40px',marginBottom:'4px'}}
                                               autoComplete="off"

                                            ></Input>,)}
                                    </Form.Item>

                      </Form>

                      <a href="" style={{color:'#AB1B5C',textDecoration:'underline', position: 'relative', top: '55px', left: '134px'}} onClick={this.handleSubmit}><Link  style={{color:'#000'}}> REGISTER</Link></a>
                      <Spin spinning={this.state.loading ? true : false} >
                            <Button type="submit" onClick={this.handleLogin}
                              style={{background:'#f8a500', color: 'Black' ,height:'',margin:'-40px 0px 5px 75px',borderRadius:'20px',width:'50%',height:'40px'}} >LOGIN</Button><br></br>
                      </Spin>
                        <h4 style={{position: 'relative',top: '25px', left: '114px', color: 'red'}}>{this.state.mess}</h4>
                      <div style={{width:'105%',height:'185px',maxHeight:'150px'}} className={styles.pass}>

                          </div>

                      </div>

            </Content>

        </Layout>

      );// END_return_Desktop
  } // END_render();
}

const WrappedNormalLoginForm = Form.create()(Loginpage);
export default WrappedNormalLoginForm;
