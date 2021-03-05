import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import UISetNewPassword from "./UISetNewPassword.js";
import PasswordSetSuccess from "./PasswordSetSuccess.js"
import GlobalHelper from '../utils/GlobalHelper.js'
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import { Layout, Menu,Collapse, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge} from 'antd';

import { Spin} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import moment from 'moment';
const { Header, Content, Sider ,Footer} = Layout;
var styles=require('../App.module.css');

var styless=require('../App.module.css');
var reg=require('../App.module.css');
var image=require('../App.module.css');
var regis=require('../App.module.css');

const {Panel} = Collapse;

   class ForgotPass extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",value:"E", flag:false, radioDisabled:true} ;
          this.handleChange = this.handleChange.bind(this);
          this.state={ mess : "",data:"", loading:false}
          this.onChange=this.onChange.bind(this);
          this.state = { time: {}, seconds: 59 };
          this.timer = 0;
          this.startTimer = this.startTimer.bind(this);
          this.countDown = this.countDown.bind(this);
          var usType=this.props.tabFlag;

        }

        secondsToTime(secs){
             let hours = Math.floor(secs / (60 * 60));

             let divisor_for_minutes = secs % (60 * 60);
             let minutes = Math.floor(divisor_for_minutes / 60);

             let divisor_for_seconds = divisor_for_minutes % 60;
             let seconds = Math.ceil(divisor_for_seconds);

             let obj = {
               "h": hours,
               "m": minutes,
               "s": seconds
             };
             return obj;
           }
           toggleDisabled = () => {
            this.setState({
              disabled: !this.state.radioDisabled,
            });
          }
     componentDidMount() {
           let timeLeftVar = this.secondsToTime(this.state.seconds);
           this.setState({ time: timeLeftVar });
     }

     startTimer() {
           if (this.timer == 0 && this.state.seconds > 0) {
             this.timer = setInterval(this.countDown, 1000);
           }
         }

     countDown() {
           // Remove one second, set state so a re-render happens.
           let seconds = this.state.seconds - 1;
           this.setState({
             time: this.secondsToTime(seconds),
             seconds: seconds,
           });

           // Check if we're at zero.
           if (seconds == 0) {
             clearInterval(this.timer);
           }
     }

        componentWillReceiveProps(nextProps)
        {
             this.setState({mess : ""});
        };


            onChange = e =>
            {
            console.log('radio checked', e.target.value);
            this.setState({value: e.target.value});
            console.log("value",this.state.value);
            e.preventDefault();
             this.props.form.validateFields((err, values) => {
               if (!err){
            let forgotPassRequest  = {
                      "username": values.email
                    }
              const superagent = require('superagent');
              var link=(this.props.tabFlag=='D')?"https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donorforgotpassword":"https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoforgotpassword";
            superagent
            .post(link)
            .send(forgotPassRequest) // sends a JSON post body
            .set('X-API-Key', 'foobar')
            .set('accept', 'application/json')
            .set('accept', '*/*')
            .set('Access-Control-Request-Headers','content-type,x-api-key')
            .set('Access-Control-Request-Method','POST')
            .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
            .set('Origin','http://localhost')
            .set('Accept-Encoding','gzip, deflate, br')
            .set('Sec-Fetch-Dest','empty')
            .set('Sec-Fetch-Mode', 'cors')
            .end((err, res) => {
                // Calling the end function will send the request
                let respJson = JSON.parse(res.text);
                //console.log("respJson11",respJson);
                  if(respJson.Status=== "SUCCESS"){
                        this.setState({mess:"Reset Password link sent to your register Email"})

                       this.startTimer();
                       console.log("done");
                       //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));
                  }else if (respJson.success=== false){
                    this.setState({mess:respJson.message})
                  }
            });
          }
        })
          };

           handleChange(event)
        {
             this.setState({ value: event.target.value});
               window.location.reload();
        }

    disabledDate(current) {
      // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    render(){
              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;

            /*  if(this.state.flag===true){
                return(
                  <div style={{display:"inline-block",height:"100%",width:"100%"}}>
                  <Switch>
                      <Route exact component={UISetNewPassword}/>
                  </Switch>
                  </div>
                )
              }*/

        return(
        <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
        <Layout>
            <Header>
                <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white',marginTop:'-10px'}}>
                <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>
                    {/*<img src="img/Group1580.png" style={{width: '200px', height: '41px', marginTop: '-165px', marginLeft: '36px'}} />*/}
                </div>
            </Header>
            <Content>
            <div style={{display:'inlineFlex'}}>
              <img src="img/siderMD.png" style={{width: '400px', height: '546px',position:'absolute',left:'0px',top:'61px'}} />
              </div>
                <div  className={styles.second3}>

                  <h2 style={{color:'#f8a500',margin:'-15px 0px 10px -282px',fontWeight:'Bold',textAlign:'center'}}>FORGET PASSWORD</h2>

                  <Form >
                  <h4 style={{marginTop:'20px',marginBottom:'7px',marginLeft:'28px'}}>User ID (E-MAIL) </h4>
                  <Form.Item style={{ marginLeft: '25px'}} >
                             {getFieldDecorator('email', {
                                      rules: [
                                         {
                                           required: true,
                                           message: 'Please enter Email Id!',
                                         }
                                      ],
                                 })(
                              <Input
                               autoComplete="off"
                               maxLength={30}
                               placeholder="Enter Email-Id"
                               onChange={this.toggleDisabled}
                               style={{textAlign:'left',borderRadius:'25px',height:'32px',width:'330px'}}
                               //console.log(e.target.value)

                               />,)}
                          </Form.Item>
                          <Spin spinning={this.state.loading ? true : false} >
                            <Button type="submit" onClick={this.onChange}
                              style={{ background: '#f8a500', color: 'Black', height: '36px', margin: '3% 0% 0% 19%',borderRadius: '25px', width: '32%'}} >SUBMIT</Button><br></br>
                          </Spin>
          { /* <h4 style={{marginLeft:'28px',marginTop:'20px'}}>Please enter the id where you would like to receive an OTP</h4>

              <div style={{display:'flex'}}>
              <h4 style={{marginLeft:'28px',marginTop:'5px'}}>Send OTP</h4>
                    <Radio.Group onChange={this.onChange} value={this.state.value} >
                          <Radio value="E" style={{marginLeft:'17px',marginTop:'5px'}}> E-mail</Radio>
                          <Radio value="P">SMS</Radio>
                    </Radio.Group>
              </div>
             <div style={{display:'flex',marginBottom:'-10px'}}>
              <h4 style={{marginLeft:'28px',marginTop:'14px'}}> </h4>
              <h4 style={{marginLeft:'230px',marginTop:'-28px'}}>OTP time out : {this.state.time.m} : {this.state.time.s}</h4>
              </div>*/}

              </Form>

                    <h4 style={{position: 'relative', color:(this.state.mess==="Reset Password link sent to your register Email")? 'blue':'red',top:'10px',left:'-90px', textAlign: 'center'}}>{this.state.mess}</h4>

                </div>
                </Content>
                <Footer style={{padding:'0px'}}>
                  <div style={{width:(window.innerWidth),background:'white'}}>
                    <img src="img/footerMD.png" style={{width: window.innerWidth+24 ,height: '50px', marginLeft: '-8px', top: '543px', position: 'relative'}} />
                  </div>
                </Footer>
          </Layout>

          </div>
           );
           }
           }
   const WrappedNormalForPassForm = Form.create()(ForgotPass);
   export default WrappedNormalForPassForm;
