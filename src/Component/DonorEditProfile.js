import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import GlobalHelper from '../utils/GlobalHelper.js'
import '../index.css';
import WrappedOtpVerifyForm from './OtpVerify.js'
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import { Layout, Menu,Row,Modal, Col,Collapse, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge} from 'antd';
import { Spin} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
const { Header, Content, Sider ,Footer} = Layout;
var styles=require('../App.module.css');
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

   class DonorEditProfile extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",visible: false,value:1,mobileReadOnlyField:"",handleFlag : true, mess : "", verifyFlag1 : false, verifyFlag2 : true, updateFlag : false} ;
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.state={ mess : "", loading:false}
          this.onChange=this.onChange.bind(this);
          this.showModal = this.showModal.bind(this);


          this.email = this.props.email;


        }

        componentWillReceiveProps(nextProps)
        {
             this.setState({mess : ""});
        };

            onChange = e =>
            {
            console.log('radio checked', e.target.value);
            this.setState({
              value: e.target.value,
            });
          };
           handleChange(event)
        {
             this.setState({ value: event.target.value });
               window.location.reload();
        }
        showModal = (e) => {
          console.log("In showModal");

          e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if (!err) {

              let confirmOtpOnPhoneRequest = {

                  "SZ_USER_TYPE": "D",
                  "I_USER_ID": values.mobile,
                  "SZ_Purpose": "Mobile OTP",
                  "SZ_OTP_MODE": "M",
                  "I_OTP_COUNT": "1",
                  "I_OTP_ERROR_COUNT": "0"
              };
              const superagent = require('superagent');
              superagent
                .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/otpgenration')
                .send(confirmOtpOnPhoneRequest) // sends a JSON post body
                .set('X-API-Key', 'foobar')
                .set('accept', 'application/json')
                .end((err, res) => {
                  // Calling the end function will send the request
                  let respJson = JSON.parse(res.text);
                  console.log("respJson11", respJson);
                  if (respJson.Status === "SUCCESS") {
                    this.setState({ mess: respJson.Message,visible: true, mobileReadOnlyField : respJson.Body })


                  } else if (respJson.success === false) {
                    this.setState({ mess: respJson.message })
                  }
                })

              //this.setState({mess:respJson.message})
              //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));

            }
          })
        };

        handleOk = () => {
          this.setState({
            confirmLoading: true,
          });
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }, 2000);
        };


        handleCancel = () => {
          this.setState({
            visible: false,
          });
        };

        handleSubmit(e)
        {
          e.preventDefault();
          console.log("Data");
             this.props.form.validateFields((err, values) => {
              this.setState({handleFlag:true})
              // var mobilen
              // console.log("Mobile",mobilenumber);

              if (!err){

                let updateProfileRequest = {
                 "CognitoID": this.props.loginResponse,
                 "name": values.name,
                 "age": ""+values.age,
                 "address":values.address,
                 "city":values.city,
                 "State":"Maharashtra",
                 "Country":"India",
                 "PostalCode":"121211",
                 "email":this.props.email,
                 "contactNo":values.mobile,
                 "Occupation":values.occupation,
                 "pancard": ""+values.pancard//this.props.donorfetchdata.body.SZ_PANCARD
               };
                  const superagent = require('superagent');
             superagent
               .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/microdonar-donar-update')
                .send(updateProfileRequest) // sends a JSON post body
               .set('X-API-Key', 'foobar')
                .set('accept', 'application/json')
                .set('accept', '*/*')
                .set('Access-Control-Request-Headers','content-type,x-api-key')
                .set('Access-Control-Request-Method','POST')
                .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
                .set('Origin','http://localhost:3000')
                .set('Accept-Encoding','gzip, deflate, br')
                .set('Sec-Fetch-Dest','empty')
                .set('Sec-Fetch-Mode', 'cors')
                .end((err, res) => {
                   // Calling the end function will send the request
                   console.log("service call",res);
                    let respJson = JSON.parse(res.text);
                  console.log("respJson",respJson);
                     if(respJson.Status=== "SUCCESS"){
                        console.log("hi",respJson);
                        this.setState({mess:respJson.Messege})
                      }else if (respJson.success=== false){
                        this.setState({mess:respJson.message})
                      }
               });
             }

         })
      }

               componentDidMount() {
                 //setTimeout(()=>{


                   document.getElementById("email").value=this.email;

                 //},500)
               }
               componentDidUpdate(prevProps, prevState)
               {

                 try{
                   if( document.getElementById("email").value === ""){
                     this.email = this.email;
                   }else {
                     this.email = document.getElementById("email").value;
                   }
                   document.getElementById("email").value=this.email;
                 }catch(e){console.error(e)}

                 //document.getElementById("Mobile").value=this.mobile;
               }

    render(){
      console.log("Donor Details", this.props.donorfetchdata)
        const { visible, confirmLoading } = this.state;
              //var bgimg = "url('"+ window.origin+"/background.png')";

              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;

        return(
        <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
          <Header>
        <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white'}}>
            <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>

        </div>


        </Header>
        <Layout>
              <Content style={{background:'white',overflow : 'unset'}}>
              <h1 style={{display: 'block', position: 'relative', left: '680px', top:'44px',fontWeight: 900, color:'#f8a500', fontSize: 'x-large'}}>MY PROFILE</h1>
                 <div style={{width:(window.innerWidth -400), height:(window.innerHeight-300), margin: '0px 0px 0px 160px', position:'relative',bottom:'40px', border: '1px solid #ffffff'}}>

                    <Form {...layout}>


                    <div style={{width:(window.innerWidth -450), height:(window.innerHeight-300), margin: '100px 0px 0px 100px', border: '1px solid #ffffff'}}>
                    <div style={{background:'#FFFFFF'}}>
                    <h4 style={{marginBottom:'-18px',marginLeft:'72px'}}>NAME </h4>
                      <Form.Item

                      style={{width: '55%', alignContent: 'center', position: 'relative',  top: '21px',left:'70px'}}
                      >
                      {getFieldDecorator('name', {

                          })(
                        <Input style={{borderRadius: '25px'}} />)}
                      </Form.Item>
                      <h4 style={{marginTop:'-41px',marginLeft:'427px'}}>AGE</h4>
                      <Form.Item

                      style={{width: '53%', alignContent: 'center', position: 'relative', left: '422px', top: '-19px'}}
                      >
                      {getFieldDecorator('age', {

                          })(
                        <Input style={{borderRadius: '25px',width: '24%'}}/>)}
                      </Form.Item>
                    <h4 style={{marginTop:'-80px',marginLeft:'521px'}}>OCCUPATION</h4>
                      <Form.Item

                      style={{width: '100%', alignContent: 'center', position: 'relative', left: '518px', top: '-58px'}}
                      >
                      {getFieldDecorator('occupation', {

                          })(
                        <Input style={{borderRadius: '25px', width: '22%'}}/>)}
                      </Form.Item>
                           <h4 style={{ position: 'relative', top: '-118px', left: '669px'}}>CITY</h4>

                      <Form.Item

                      style={{width: '68%', alignContent: 'center', position: 'relative', left: '668px', top: '-126px'}}
                      >
                      {getFieldDecorator('city', {

                          })(
                        <Input style={{borderRadius: '25px', width: '36%'}}/>)}
                      </Form.Item>
                    </div>
                      <Form.Item style={{display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px',top:'-55px'}}>
                      <h4 style={{marginTop:'-74px',marginLeft:'72px'}}>ADDRESS</h4>
                       </Form.Item>
                      <Form.Item
                      style={{width: '123%',left: '69px',top:'-115px'}}
                      >{getFieldDecorator('address', {

                          })(
                        <Input style={{borderRadius: '25px'}}/>)}
                      </Form.Item>
                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px',top:'-45px'}}>
                      <h4 style={{marginTop:'-46px',marginLeft:'72px'}}>E-MAIL ID</h4>
                       </Form.Item>
                      <Form.Item

                      style={{width: '84%', display: 'inline-block', alignContent: 'center', position: 'relative',top:'-60px',left:'70px'}}
                      >
                      {getFieldDecorator('email', {

                          })(
                        <Input style={{borderRadius: '25px', width: '70%'}}
                          onChange={
                            (e)=>{
                              this.setState({verifyFlag1 : true})
                            }
                          }
                        />)}
                      </Form.Item>

                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px',top:'-38px'}}>
                      <h4 style={{marginTop:'-127px',position: 'relative', left: '452px', top: '35px'}}>PHONE NUMBER</h4>
                       </Form.Item>
                  <Form.Item

                      style={{width: '60%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '450px', top: '-99px'}}
                      > {getFieldDecorator('mobile', {

                      })(
                        <Input style={{ borderRadius: '25px', width: '100%' }}
                        /*onChange={(e) =>{
                          this.setState({reqFlag1 : true})
                          }}*/
                        />)}

                      </Form.Item>
                      <a onClick={this.showModal} style={{ position: 'relative', color: '#000000',top: '-64px', left: '-95px', textDecoration: 'underline' }}>Verify Mobile Number</a>
                      <div>
                        <Modal
                          title="Verify Mobile"
                          visible={visible}
                          okText={"Submit"}
                          closable={false}
                          onCancel={this.handleCancel}
                          width={400}
                          footer={null}
                          centered={true}
                          style={{position: 'relative', left: '0px', top: '0px' }}
                        >
                        <WrappedOtpVerifyForm mobileReadOnlyField={this.state.mobileReadOnlyField} onCancel={this.handleCancel} />
                        </Modal>
                      </div>
                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px',top:'-38px'}}>
                      <h4 style={{marginTop:'-127px',position: 'relative', left: '72px', top: '54px',width:'50%'}}>PAN CARD</h4>
                       </Form.Item>
                      <Form.Item

                          style={{width: '58.6%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '70px', top: '-81px'}}
                          >{getFieldDecorator('pancard', {

                              })(
                            <Input
                            // onChange={
                            //   (e)=>{
                            //     this.setState({verifyFlag2 : true})
                            //   }
                            // }
                            />)}
                          </Form.Item>
                     <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '649px', top: '-80px'}}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'32%',borderRadius: '25px',background: '#f8a500',color:'Black',borderColor:'white'}}>
                          Update
                        </Button>
                        </Form.Item>

                        </div>
                                <h4 style={{position: 'relative',top: '30px', color: 'blue', textAlign:'center',right:'-86px'}}>{this.state.mess}</h4>


                    </Form>

                 </div>
                </Content>
          </Layout>

          </div>
           );
           }
           }
   const WrappedDonorEditProfile = Form.create()(DonorEditProfile);
   export default WrappedDonorEditProfile;
