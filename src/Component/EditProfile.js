import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import { Layout, Menu,Row, Col,Collapse, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge} from 'antd';

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

   class EditProfile extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",value:1} ;
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.state={ mess : "", loading:false}
          this.onChange=this.onChange.bind(this);
          this.name= this.props.data.data.user.name;
          this.age = this.props.data.data.user.age;
          this.occupation = this.props.data.data.user.occupation;
          this.city = this.props.data.data.user.city;
          this.address = this.props.data.data.user.addressLine1;
          this.email = this.props.data.data.user.email;
          this.mobile = this.props.data.data.user.mobile;

        }

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
        handleSubmit(e)
        {
               }

               componentDidMount() {
                 //setTimeout(()=>{

                   document.getElementById("name").value=this.name;
                   document.getElementById("age").value=this.age;
                   document.getElementById("occupation").value=this.occupation;
                   document.getElementById("city").value=this.city;
                   document.getElementById("address").value=this.address;
                   document.getElementById("email").value=this.email;
                   document.getElementById("mobile").value=this.mobile;
                 //},500)
               }
               componentDidUpdate(prevProps, prevState)
               {
                 try{
                   if( document.getElementById("name").value === ""){
                     this.name = this.name;
                   }else {
                     this.name = document.getElementById("name").value;
                   }
                   document.getElementById("name").value=this.name;
                 }catch(e){console.error(e)}
                   //document.getElementById("EmailID").value=this.email;
                 try{
                   if( document.getElementById("age").value === ""){
                     this.age = this.age;
                   }else {
                     this.age = document.getElementById("age").value;
                   }
                   document.getElementById("age").value=this.age;
                 }catch(e){console.error(e)}
                 try{
                   if( document.getElementById("occupation").value === ""){
                     this.occupation = this.occupation;
                   }else {
                     this.occupation = document.getElementById("occupation").value;
                   }
                   document.getElementById("occupation").value=this.occupation;
                 }catch(e){console.error(e)}
                 try{
                   if( document.getElementById("city").value === ""){
                     this.city = this.city;
                   }else {
                     this.city = document.getElementById("city").value;
                   }
                   document.getElementById("city").value=this.city;
                 }catch(e){console.error(e)}
                 try{
                   if( document.getElementById("address").value === ""){
                     this.address = this.address;
                   }else {
                     this.address = document.getElementById("address").value;
                   }
                   document.getElementById("address").value=this.address;
                 }catch(e){console.error(e)}
                 try{
                   if( document.getElementById("email").value === ""){
                     this.email = this.email;
                   }else {
                     this.email = document.getElementById("email").value;
                   }
                   document.getElementById("email").value=this.email;
                 }catch(e){console.error(e)}
                 try{
                   if( document.getElementById("mobile").value === ""){
                     this.mobile = this.mobile;
                   }else {
                     this.mobile = document.getElementById("readOnlyPhoneText").value;
                   }
                   document.getElementById("mobile").value=this.mobile;
                 }catch(e){console.error(e)}
                 //document.getElementById("Mobile").value=this.mobile;
               }


    render(){



              //var bgimg = "url('"+ window.origin+"/background.png')";

              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;

        return(
        <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
        <Layout>
              <Content style={{background:'white',marginLeft:'2px',overflow : 'unset'}}>
              <h1 style={{display: 'block', position: 'relative', left: '680px',fontWeight: 900, color:'#f8a500', top:'135px', fontSize: 'x-large'}}>MY PROFILE</h1>
                 <div style={{width:(window.innerWidth -400), height:(window.innerHeight-300), margin: '38px 0px 0px 160px', border: '1px solid #ffffff'}}>

                    <Form {...layout}>


                    <div style={{width:(window.innerWidth -450), height:(window.innerHeight-300), margin: '100px 0px 0px 100px', border: '1px solid #ffffff'}}>
                    <div style={{background:'#FFFFFF'}}>
                    <h4 style={{marginBottom:'-18px',marginLeft:'72px'}}>NAME </h4>
                      <Form.Item

                      style={{width: '55%', alignContent: 'center', position: 'relative',  top: '21px',left:'70px'}}
                      >
                      {getFieldDecorator('name', {

                          })(
                        <Input style={{borderRadius: '25px'}}/>)}
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
                           <h4 style={{marginTop:'-119px',marginLeft:'670px'}}>CITY</h4>

                      <Form.Item

                      style={{width: '68%', alignContent: 'center', position: 'relative', left: '668px', top: '-98px'}}
                      >
                      {getFieldDecorator('city', {

                          })(
                        <Input style={{borderRadius: '25px', width: '36%'}}/>)}
                      </Form.Item>
                    </div>
                      <Form.Item style={{display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px',top:'-55px'}}>
                      <h4 style={{marginTop:'-46px',marginLeft:'72px'}}>ADDRESS</h4>
                       </Form.Item>
                      <Form.Item
                      style={{width: '123%',left: '69px',top:'-90px'}}
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
                        <Input style={{borderRadius: '25px', width: '70%'}}/>)}
                        <a href="" style={{textDecoration:'underline',position: 'relative', right: '358px', top: '30px', color:'#000000'}}>Verify E-mail </a>
                      </Form.Item>

                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px',top:'-38px'}}>
                      <h4 style={{marginTop:'-127px',position: 'relative', left: '452px', top: '35px'}}>PHONE NUMBER</h4>
                       </Form.Item>
                  <Form.Item

                      style={{width: '60%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '450px', top: '-99px'}}
                      >{getFieldDecorator('mobile', {

                          })(
                        <Input />)}
                        <a href="" style={{textDecoration:'underline',position: 'relative', right: '0px', top: '-10px', color:'#000000'}}>Verify Phone Number</a>
                      </Form.Item>
                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '62px',top:'-62px'}}>
                      <a href="" style={{textDecoration:'underline',position: 'relative', right: '-8px', top: '-34px', color:'#000000',fontSize:'17px'}}>Change Password</a>
                       </Form.Item>
                     <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '649px', top: '-134px'}}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'32%',borderRadius: '25px',background: '#f8a500',color:'Black',borderColor:'white'}}>
                          Update
                        </Button>
                        </Form.Item>

                        </div>


            <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', top: '-100px',left: '170px'}}>
                                    <h4>Have you tried our mobile app yet? </h4>
                                    <a href="" style={{textDecoration:'underline',position: 'relative', top: '-30px', color:'#000000', fontWeight:"bold"}}>Dowmload Now</a>
            </Form.Item>
                    </Form>


                 </div>
                </Content>
          </Layout>

          </div>
           );
           }
           }
   const WrappedNormalEditProfileForm = Form.create()(EditProfile);
   export default WrappedNormalEditProfileForm;
