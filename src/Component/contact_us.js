import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import GlobalHelper from '../utils/GlobalHelper.js'
import '../index.css';
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import { Layout,Select  ,Menu,Row, Col,Collapse, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge} from 'antd';
import { Descriptions } from 'antd';
import { Spin} from 'antd';
//import {ReloadOutlined} from '@ant-design/icons';
/*import {
    FacebookFilled,
    GooglePlusCircleFilled,
    TwitterCircleFilled,
    InstagramFilled
  } from '@ant-design/icons';*/
import './css/MyNgo.css';
import "antd/dist/antd.css"

const { Header, Content, Sider ,Footer} = Layout;
const { Option } = Select;
const { TextArea } = Input;

var styles=require('../App.module.css');
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

   class ContactUs extends React.Component
           {


    render(){

        return(
            <div className="contactus">
                 <Row>
                     <Col span={8}>
                        <h3 className="contacttitle">Address</h3>
                        <p>Nilkanth road, near bajaj showroom,<br/> Karvenagar, Pune, Dist. Pune,<br/> Maharashtra</p>
                        <br/>

                        <h3 className="contacttitle">Contact Us</h3>
                        <p>+91- 9658758422</p>
                        <p>myemail@gmail.com</p>
                        <br/>

                        <h3>Helpful Links</h3>

                        <a href="">Blog</a>
                        <br/>
                        <p>Social Media</p>
                        {/*<FacebookFilled style={{color:'orange'}}/>
                        <GooglePlusCircleFilled style={{color:'orange'}} />
                        <TwitterCircleFilled style={{color:'orange'}} />
                        <InstagramFilled style={{color:'orange'}}/>*/}
                     </Col>
                     <Col span={8}>
                     <h3 className="contacttitle">Information</h3>
                     <br/>
                     <a href="">About Us</a>
                     <br/>
                     <a href="">NGO Registration</a>
                     <br/>
                     <a href="">Processing Charges</a>
                     <br/>
                     <a href="">Our Team</a>
                     <br/>
                     <br/>
                     <h3 className="contacttitle">Get App on</h3>
                     <br/>
                     <img src='img/googleplay.png' style={{width:140, height:100}}></img>
                     </Col>
                     <Col span={8}>
                     <h3 className="contacttitle">Write To Us</h3>
                     <br/>
                     <Form {...layout}  name="control-hooks" >
                    <h4>* WHAT ARE YOU WRITING TO US ABOUT</h4>
        <Select
          placeholder="Select category"

          allowClear
        >
          <Option value="male">1</Option>
          <Option value="female">2</Option>
          <Option value="other">other</Option>
        </Select>
        <br/>
        <h4>* YOUR MESSAGE</h4>
        <TextArea rows={4} placeholder="Your Message here"/>

            <br/> <br/><br/><br/>
            <Button type="primary" style={{background:'orange', float:'right'}}>Submit</Button>

      </Form>
                     </Col>
                 </Row>
             </div>
        );





           }
           }
   const WrappedNormalEditProfileForm = Form.create()(ContactUs);
   export default WrappedNormalEditProfileForm;
