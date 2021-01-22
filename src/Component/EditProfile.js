import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import GlobalHelper from '../utils/GlobalHelper.js'
import '../index.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Row, Col, Collapse, Result, Breadcrumb, Radio, Icon, Button, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge } from 'antd';

import { Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
const { Header, Content, Sider, Footer } = Layout;
var styles = require('../App.module.css');
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: "", value: 1, handleFlag: true, mess: "", verifyFlag1: false, verifyFlag2: true, updateFlag: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { mess: "", loading: false }
    this.onChange = this.onChange.bind(this);

    this.name = this.props.donorfetchdata.body.SZ_DONOR_NAME;
    this.occupation = this.props.donorfetchdata.body.SZ_OCCUPATION;
    this.city = this.props.donorfetchdata.body.SZ_CITY;
    this.address = this.props.donorfetchdata.body.SZ_ADDRESS_LINE1;
    this.email = this.props.donorfetchdata.body.SZ_EMAIL;
    this.mobile = this.props.donorfetchdata.body.SZ_PHONE;
    this.panCard = this.props.donorfetchdata.body.SZ_PANCARD;
    this.age = this.props.donorfetchdata.Body1.SZ_AGE;

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mess: "" });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
    window.location.reload();
  }
  handleSubmit(e) {

  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState({ handleFlag: true })
      // var mobilen
      // console.log("Mobile",mobilenumber);

      if (!err) {

        let updateProfileRequest = {
          "CognitoID": this.props.donorfetchdata.body.SZ_COGNITO_ID,
          "name": (this.handleFlag === undefined ? this.name : values.name),
          "age": "" + (this.handleFlag === undefined ? this.age : values.age),
          "address": (this.handleFlag === undefined ? this.address : values.address),
          "city": (this.handleFlag === undefined ? this.city : values.city),
          "State": "Maharashtra",
          "Country": "India",
          "PostalCode": "121211",
          "email": this.props.donorfetchdata.body.SZ_EMAIL,
          "contactNo": (this.handleFlag === undefined ? this.mobile : values.mobile),
          "Occupation": (this.handleFlag === undefined ? this.occupation : values.occupation),
          "pancard": (this.handleFlag === undefined ? this.panCard : values.panCard)//this.props.donorfetchdata.body.SZ_PANCARD
        };
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/microdonar-donar-update')
          .send(updateProfileRequest) // sends a JSON post body
          .set('X-API-Key', 'foobar')
          .set('accept', 'application/json')
          .set('accept', '*/*')
          .set('Access-Control-Request-Headers', 'content-type,x-api-key')
          .set('Access-Control-Request-Method', 'POST')
          .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
          .set('Origin', 'http://localhost:3000')
          .set('Accept-Encoding', 'gzip, deflate, br')
          .set('Sec-Fetch-Dest', 'empty')
          .set('Sec-Fetch-Mode', 'cors')
          .end((err, res) => {
            // Calling the end function will send the request
            console.log("service call", res);
            let respJson = JSON.parse(res.text);
            console.log("respJson", respJson);
            if (respJson.Status === "SUCCESS") {
              console.log("hi", respJson);
              this.setState({ mess: respJson.Messege })
            } else if (respJson.success === false) {
              this.setState({ mess: respJson.message })
            }
          });
      }

    })
  }

  componentDidMount() {
    //setTimeout(()=>{

    document.getElementById("name").value = this.name;
    document.getElementById("age").value = this.age;
    document.getElementById("occupation").value = this.occupation;
    document.getElementById("city").value = this.city;
    document.getElementById("address").value = this.address;
    document.getElementById("email").value = this.email;
    document.getElementById("mobile").value = this.mobile;
    document.getElementById("pancard").value = this.panCard;
    document.getElementById("age").value = this.age;
    //},500)
  }
  componentDidUpdate(prevProps, prevState) {
    try {
      if (document.getElementById("name").value === "") {
        this.name = this.name;
      } else {
        this.name = document.getElementById("name").value;
      }
      document.getElementById("name").value = this.name;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("pancard").value === "") {
        this.panCard = this.panCard;
      } else {
        this.panCard = document.getElementById("pancard").value;
      }
      document.getElementById("pancard").value = this.panCard;
    } catch (e) { console.error(e) }
    //document.getElementById("EmailID").value=this.email;
    try {
      if (document.getElementById("age").value === "") {
        this.age = this.age;
      } else {
        this.age = document.getElementById("age").value;
      }
      document.getElementById("age").value = this.age;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("occupation").value === "") {
        this.occupation = this.occupation;
      } else {
        this.occupation = document.getElementById("occupation").value;
      }
      document.getElementById("occupation").value = this.occupation;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("city").value === "") {
        this.city = this.city;
      } else {
        this.city = document.getElementById("city").value;
      }
      document.getElementById("city").value = this.city;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("address").value === "") {
        this.address = this.address;
      } else {
        this.address = document.getElementById("address").value;
      }
      document.getElementById("address").value = this.address;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("email").value === "") {
        this.email = this.email;
      } else {
        this.email = document.getElementById("email").value;
      }
      document.getElementById("email").value = this.email;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("mobile").value === "") {
        this.mobile = this.mobile;
      } else {
        this.mobile = document.getElementById("mobile").value;
      }
      document.getElementById("mobile").value = this.mobile;
    } catch (e) { console.error(e) }
    //document.getElementById("Mobile").value=this.mobile;
  }

  render() {
    console.log("Donor Details", this.props.donorfetchdata)
    //var bgimg = "url('"+ window.origin+"/background.png')";

    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    return (
      <div style={{ height: (window.innerHeight), backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
        <Layout>
          <Content style={{ background: 'white', marginLeft: '2px', overflow: 'unset' }}>
            <h1 style={{ display: 'block', position: 'relative', left: '680px', fontWeight: 900, color: '#f8a500', top: '135px', fontSize: 'x-large' }}>MY PROFILE</h1>
            <div style={{ width: (window.innerWidth - 400), height: (window.innerHeight - 300), margin: '38px 0px 0px 160px', border: '1px solid #ffffff' }}>

              <Form {...layout}>


                <div style={{ width: (window.innerWidth - 450), height: (window.innerHeight - 300), margin: '100px 0px 0px 100px', border: '1px solid #ffffff' }}>
                  <div style={{ background: '#FFFFFF' }}>
                    <h4 style={{ marginBottom: '-18px', marginLeft: '72px' }}>NAME</h4>
                    <Form.Item

                      style={{ width: '55%', alignContent: 'center', position: 'relative', top: '21px', left: '70px' }}
                    >
                      {getFieldDecorator('name', {
                        // rules:[
                        //   {
                        //     required:true,
                        //     message:'Please enter Name'
                        //   }
                        // ],

                      })(
                        <Input style={{ borderRadius: '25px' }} />)}
                    </Form.Item>
                    <h4 style={{ marginTop: '-41px', marginLeft: '427px' }}>AGE</h4>
                    <Form.Item

                      style={{ width: '53%', alignContent: 'center', position: 'relative', left: '422px', top: '-19px' }}
                    >
                      {getFieldDecorator('age', {

                      })(
                        <Input style={{ borderRadius: '25px', width: '24%' }} />)}
                    </Form.Item>
                    <h4 style={{ marginTop: '-80px', marginLeft: '521px' }}>OCCUPATION </h4>
                    <Form.Item

                      style={{ width: '100%', alignContent: 'center', position: 'relative', left: '518px', top: '-58px' }}
                    >
                      {getFieldDecorator('occupation', {
                        //  rules:[
                        //   {
                        //     required:true,
                        //     message:'Please enter Occupation'
                        //   }
                        // ],

                      })(
                        <Input readOnly={true} style={{ borderRadius: '25px', width: '22%' }} />)}
                    </Form.Item>
                    <h4 style={{ marginTop: '-119px', marginLeft: '670px' }}>CITY</h4>

                    <Form.Item

                      style={{ width: '68%', alignContent: 'center', position: 'relative', left: '668px', top: '-98px' }}
                    >
                      {getFieldDecorator('city', {
                        //  rules:[
                        //   {
                        //     required:true,
                        //     message:'Please enter City'
                        //   }
                        // ],

                      })(
                        <Input style={{ borderRadius: '25px', width: '36%' }} />)}
                    </Form.Item>
                  </div>
                  <Form.Item style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px', top: '-55px' }}>
                    <h4 style={{ marginTop: '-46px', marginLeft: '72px' }}>ADDRESS</h4>
                  </Form.Item>
                  <Form.Item
                    style={{ width: '123%', left: '69px', top: '-90px' }}
                  >{getFieldDecorator('address', {
                    // rules:[
                    //   {
                    //     required:true,
                    //     message:'Please enter Address'
                    //   }
                    // ],

                  })(
                    <Input style={{ borderRadius: '25px' }} />)}
                  </Form.Item>
                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-45px' }}>
                    <h4 style={{ marginTop: '-46px', marginLeft: '72px' }}>E-MAIL ID</h4>
                  </Form.Item>
                  <Form.Item

                    style={{ width: '84%', display: 'inline-block', alignContent: 'center', position: 'relative', top: '-60px', left: '70px' }}
                  >
                    {getFieldDecorator('email', {

                    })(
                      <Input readOnly={true} style={{ borderRadius: '25px', width: '70%' }}
                        onChange={
                          (e) => {
                            this.setState({ verifyFlag1: true })
                          }
                        }
                      />)}
                  </Form.Item>

                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-38px' }}>
                    <h4 style={{ marginTop: '-127px', position: 'relative', left: '452px', top: '35px' }}>PHONE NUMBER</h4>
                  </Form.Item>
                  <Form.Item

                    style={{ width: '60%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '450px', top: '-99px' }}
                  > {getFieldDecorator('mobile', {
                    // rules:[
                    //   {
                    //     required:true,
                    //     message:'Please enter Phone Number'
                    //   }
                    // ],

                  })(
                    <Input style={{ borderRadius: '25px', width: '100%' }}
                    /*onChange={(e) =>{
                      this.setState({reqFlag1 : true})
                      }}*/
                    />)}
                  </Form.Item>
                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-38px' }}>
                    <h4 style={{ marginTop: '-127px', position: 'relative', left: '72px', top: '54px' }}>PAN CARD</h4>
                  </Form.Item>
                  <Form.Item

                    style={{ width: '58.6%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '70px', top: '-81px' }}
                  >{getFieldDecorator('pancard', {
                    // rules:[
                    //   {
                    //     required:true,
                    //     message:'Please enter PanCard Number'
                    //   }
                    // ],

                  })(
                    <Input
                      onChange={
                        (e) => {
                          this.setState({ verifyFlag2: true })
                        }
                      }
                    />)}
                  </Form.Item>
                  {/* <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-38px' }}>
                    <h4 style={{ marginTop: '-110px', position: 'relative', left: '72px', top: '54px' }}>Required Fields <span style={{color:'red'}}>*</span></h4>
                  </Form.Item> */}
                  <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '649px', top: '-80px' }}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ width: '32%', borderRadius: '25px', background: '#f8a500', color: 'Black', borderColor: 'white' }}>
                      Update
                        </Button>
                  </Form.Item>



                </div>
                <h4 style={{ position: 'relative', top: '-20px', color: 'red', textAlign: 'center', right: '-86px' }}>{this.state.mess}</h4>


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