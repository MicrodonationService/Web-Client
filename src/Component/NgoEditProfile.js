import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js";
import WrappedOtpVerifyForm from './OtpVerify.js'
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Collapse, Row, Col, Result, Breadcrumb, Radio, Icon, Button, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge,Modal, Select, Upload, message, Tabs } from 'antd';
import { Spin } from 'antd';

import { ReloadOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Option } = Select;

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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


class NgoEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: "", value: 1,visible: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.state = { mess: "", loading: false, reqFlag1: true, updatedmessage:"" }
    this.onChange = this.onChange.bind(this);
    this.showModal = this.showModal.bind(this);

    this.state = {ngoupdatedetails:"", ngoupdateprofile:""};

    this.email = this.props.email;

    // this.mobile = this.props.ngoupdateprofile.Body.SZ_PHONE1;
    // this.email = this.props.ngoupdateprofile.Body.SZ_EMAIL;
    // this.city = this.props.ngoupdateprofile.Body.SZ_CITY;
    // this.name = this.props.ngoupdateprofile.Body.SZ_NGO_NAME;
    // this.website = this.props.ngoupdateprofile.Body.SZ_WEBSITE;
    // this.accountnumber = this.props.ngoupdateprofile.Body.SZ_BANK_ACCOUNT_NO;
    // this.accname = this.props.ngoupdateprofile.Body.SZ_BANK_ACCT_NAME;
    // this.ifsccode = this.props.ngoupdateprofile.Body.SZ_IFSC_CODE;
    // this.address = this.props.ngoupdateprofile.Body.SZ_ADDRESS_LINE1;
    // this.pincode = this.props.ngoupdateprofile.Body1.SZ_POSTAL_CODE;

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

  componentWillReceiveProps(nextProps)
  {
       this.setState({mess : ""});
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

  handleChange1 = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  clickChange(value) {
    console.log(`selected ${value}`);
    this.NGOCATEGORY = value;
  }

  handleSubmit(e) {
    console.log(this.state.reqFlag1);
    e.preventDefault();
      this.props.form.validateFields((err, values) => {
          this.setState({reqFlag1:true})
          if (!err){
    let ngoupdatedetails = {

      "cognitoID": this.props.loginResponse,
      "name": values.ngoname,

      "address": values.address,

      "city": values.city,
      "state":"Maharashtra",
      "country":"India",
      "email": this.props.email,
      "website":values.website,
      "ifsc":values.ifsccode,
      "bank_acc_no": values.accountnumber,
      "bank_acc_name": values.accname,
      "postalCode":""+values.pincode, //Converted to String
      "role": "Admin",
      "contactNo": values.mobile,
      "ngoCategory": "Education",
    };


    let ngoupdateres;
    const superagent = require('superagent');
    superagent
    .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/microdonorngoupdate')
    .send(ngoupdatedetails)
    .set('X-API-Key', 'foobar')
    .set('accept', 'application/json')
    .set('accept', '*/*')
    .set('Access-Control-Request-Headers','content-type,x-api-key')
    .set('Access-Control-Request-Method','POST')
    .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
    .set('Origin','http://localhost:3000')
    .set('Accept-Encoding','gzip, deflate, br')
    .set('Sec-Fetch-Dest','empty')
    .end((err, res)=>{
      console.log("Updated Data", res);
      ngoupdateres = JSON.parse(res.text);
      if(ngoupdateres.Status ==="SUCCESS"){
        this.setState({updatedmessage : "Profile Updated Successfully"})
        let loginRequest = {
          "email": this.props.email
        };
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoupdateprofile') // Ajax call
          .send(loginRequest)                                 // sends a JSON post body
          .set('X-API-Key', 'foobar')
          .set('Content-Type','application/json')
          .set('accept', '*/*')
          .set('Access-Control-Request-Headers','content-type,x-api-key')
          .set('Access-Control-Request-Method','POST')
          .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
          .set('Origin','http://localhost:3000')
          .set('Accept-Encoding','gzip, deflate, br')
          .set('Sec-Fetch-Dest','empty')
          .set('Sec-Fetch-Mode', 'cors')
          .end((err, res) => {                               // Calling the end function will send the request
            console.log("service call", res);
            let fatchDetailsRespJson = JSON.parse(res.text);
        ReactDOM.render(<WrappedNormalMainLayoutNGO ngoupdateprofile={fatchDetailsRespJson} />, document.getElementById('root'));
      })
      }
    })
  }
})
  }

  componentDidMount() {
    //setTimeout(()=>{


    document.getElementById("email").value = this.email;


    //},500)
  }

  componentDidUpdate(prevProps, prevState) {

    try {
      if (document.getElementById("email").value === "") {
        this.email = this.email;
      } else {
        this.email = document.getElementById("email").value;
      }
      document.getElementById("email").value = this.email;
    } catch (e) { console.error(e) }


  }

  render() {
    console.log("Mydetails", this.props.ngoupdateprofile)
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div style={{ marginTop: 8 }}>Upload</div>
    );


    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    return (
        <div style={{ height: (window.innerHeight), backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>

          <Header>
            <div style={{ marginLeft: '-50px', width: (window.innerWidth), background: 'white', marginTop: '-20px' }}>
              <img src="img/mdHeader.png" style={{ width: window.innerWidth, height: '50px', top: '0px', left: '0px' }} />
            </div>
          </Header>


      <div style={{ width: '90%', height: '100%', marginLeft: '0px'}}>
        <h5 style={{ display: 'block', position: 'relative', left: '70px', top: '7px', fontWeight: 800, color: '#f8a500', fontSize: 'x-large' }}>MY DETAILS</h5>
        <span style={{ margin: '60px 0px 0px 105px' }}>
          <Avatar size={64} shape="circle" src="img/NGO.png"/>
        </span>
        <div style={{ margin: '15px 0px 0px 85px'}}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange1}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>

        </div>

        <div style={{ width: '80%', height: '80%', marginTop: '-180px', marginLeft: '50px', overflowY: 'auto', overflowX: 'hidden' }}>
          <Form {...layout} style={{ border: '1px solid #FFFFFF' }}>
            <h4 style={{ marginTop: '-20x', marginLeft: '220px' }}>NGO NAME</h4>
            <Form.Item

              style={{ width: '45%', alignContent: 'center', position: 'relative', top: '0px', left: '220px' }}
            >
              {getFieldDecorator('ngoname', {

              })(
                <Input style={{ borderRadius: '25px' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*//>)}

            </Form.Item>
            <h4 style={{ marginTop: '-69px', marginLeft: '530px' }}>NGO CATEGORY</h4>
            <Form.Item style={{ left: '530px', top: '-41px', width: '53%' }}>
              <Select defaultValue="1" onChange={this.clickChange} style={{ width: '85%' }}>
                <Option value="1">Health</Option>
                <Option value="2">NGO2</Option>
                <Option value="3">NGO3</Option>
                <Option value="4">NGO4</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 style={{ marginTop: '-43px', marginLeft: '70px' }}>NGO ADDRESS</h4>
            </Form.Item>
            <Form.Item

              style={{ width: '45%', alignContent: 'center', position: 'relative', top: '-15px', left: '220px' }}
            >
              {getFieldDecorator('address', {

              })(
                <Input style={{ borderRadius: '25px' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}

            </Form.Item>
            <h4 style={{ marginTop: '-75px', marginLeft: '530px' }}>CITY</h4>
            <Form.Item

              style={{ width: '86%', alignContent: 'center', position: 'relative', left: '530px', top: '-55px' }}
            >
              {getFieldDecorator('city', {

              })(
                <Input style={{ borderRadius: '25px', width: '24%' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}

            </Form.Item>
            <h4 style={{ marginTop: '-115px', marginLeft: '680px' }}>PIN CODE</h4>
            <Form.Item

              style={{ width: '100%', alignContent: 'center', position: 'relative', left: '680px', top: '-95px' }}
            >
                {getFieldDecorator('pincode', {

})(
  <Input style={{ borderRadius: '25px', width: '22%' }}
  /*onChange={(e) =>{
    this.setState({reqFlag1 : true})
    }}*//>)}


            </Form.Item>

            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 style={{ marginTop: '-97px', marginLeft: '70px' }}>E-MAIL ID</h4>
            </Form.Item>

            <Form.Item

              style={{ width: '65%', alignContent: 'center', position: 'relative', top: '-65px', left: '220px' }}
            >
              {getFieldDecorator('email', {

              })(
                <Input style={{ borderRadius: '25px', width: '144%' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}

            </Form.Item>

            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 style={{ marginTop: '-71px', marginLeft: '70px' }}>WEBSITE</h4>
            </Form.Item>

            <Form.Item

              style={{ width: '65%', alignContent: 'center', position: 'relative', top: '-40px', left: '220px' }}
            >
              {getFieldDecorator('website', {

              })(
                <Input style={{ borderRadius: '25px', width: '144%' }}
               /* onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}


            </Form.Item>
            <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '220px', top: '-35px' }}>
              BANK ACCOUNT DETAILS</h4>
            <div style={{ width: '63%', height: '214px', marginLeft: '220px', marginTop: '-40px', background: '#e8e8e8' }}>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '0px', marginLeft: '-170px' }}>BANK ACCOUNT NUMBER</h4>
              </Form.Item>

              <Form.Item

                style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
              >
                {getFieldDecorator('accountnumber', {

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '-15px', marginLeft: '10px' }}>IFSC CODE</h4>
              </Form.Item>

              <Form.Item

                style={{ width: '90%', alignContent: 'center', position: 'relative', top: '-15px', left: '10px' }}
              >
                {getFieldDecorator('ifsccode', {

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '-86px', marginLeft: '390px' }}>BRANCH</h4>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ width: '53%', alignContent: 'center', position: 'relative', top: '-54px', left: '388px' }}
              >
                <Input style={{ borderRadius: '25px' }} />
              </Form.Item>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '-60px', marginLeft: '10px' }}>REGISTERED NAME</h4>
              </Form.Item>

              <Form.Item

                style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-32px', left: '10px' }}
              >
                {getFieldDecorator('accname', {

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px', top: '-18px' }}>
                CONTACT PERSON DETAILS</h4>

              <div style={{ width: '100%', height: '180px', marginLeft: '0px', marginTop: '-10px', background: '#e8e8e8' }}>
                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 style={{ marginTop: '0px', marginLeft: '10px' }}>NAME</h4>
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
                >
                  <Input style={{ borderRadius: '25px' }} />
                </Form.Item>

                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 style={{ marginTop: '-10px', marginLeft: '10px' }}>PHONE NUMBER</h4>
                </Form.Item>

                <Form.Item


                  style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '10px', top: '-15px' }}
                >
                  {getFieldDecorator('mobile', {

                  })(
                    <Input style={{ borderRadius: '25px', width: '100%' }}
                    /*onChange={(e) =>{
                      this.setState({reqFlag1 : true})
                      }}*/
                    />)}

                  <a onClick={this.showModal} style={{ position: 'relative', right: '0px', top: '-7px', color: '#000000' }}>Verify Phone Number</a>
                  <div>
                    <Modal
                      title="Verify Mobile"
                      visible={this.state.visible}
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
                </Form.Item>

              </div>
              <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '430px', top: '-10px' }}>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ width: '50%', borderRadius: '25px', background: '#f8a500', border: '#FFFFFF', color: '#000000' }}>
                  Update
                      </Button>
              </Form.Item>
              <center>
              <p style={{ color:(this.state.updatedmessage==="Profile Updated Successfully")? 'blue':'red'}}>{this.state.updatedmessage}</p>
                </center>

            </div>

          </Form>
        </div>

      </div>

      </div>
    );
  }
}
const WrappedNgoEditProfile = Form.create()(NgoEditProfile);
export default WrappedNgoEditProfile;
