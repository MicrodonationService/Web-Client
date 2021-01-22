import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Collapse, Row, Col, Result, Breadcrumb, Radio, Icon, Button, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge, Select, Upload, message, Tabs } from 'antd';
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


class MyDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: "", value: 1 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.state = { mess: "", loading: false, reqFlag1: true, updatedmessage: "", ngocatgdropdown: "" }
    this.onChange = this.onChange.bind(this);

    this.state = { ngoupdatedetails: "", ngoupdateprofile: "", ngocategorydropdown: "" };

    this.mobile = this.props.ngoupdateprofile.Body.SZ_PHONE1;
    this.email = this.props.ngoupdateprofile.Body.SZ_EMAIL;
    this.city = this.props.ngoupdateprofile.Body.SZ_CITY;
    this.name = this.props.ngoupdateprofile.Body.SZ_NGO_NAME;
    this.website = this.props.ngoupdateprofile.Body.SZ_WEBSITE;
    this.accountnumber = this.props.ngoupdateprofile.Body.SZ_BANK_ACCOUNT_NO;
    this.accname = this.props.ngoupdateprofile.Body.SZ_BANK_ACCT_NAME;
    this.ifsccode = this.props.ngoupdateprofile.Body.SZ_IFSC_CODE;
    this.address = this.props.ngoupdateprofile.Body.SZ_ADDRESS_LINE1;
    this.pincode = this.props.ngoupdateprofile.Body1.SZ_POSTAL_CODE;
    this.ngocategory = this.props.ngoupdateprofile.Body.SZ_CATEGORY_PRIMARY;
    this.operationalsince = this.props.ngoupdateprofile.Body1.I_OPERATIONAL_SINCE;
    this.bankname = this.props.ngoupdateprofile.Body.SZ_BANK_NAME;
    this.bankbranch = this.props.ngoupdateprofile.Body.SZ_BANK_BRANCH;
    this.contactpersonname = this.props.ngoupdateprofile.Body.SZ_CONTACT_PERSON_NAME;
    this.registrationnumber = this.props.ngoupdateprofile.Body.SZ_REGISTRATION_ID;

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
    this.setState({
      ngocatgdropdown: value

    })
    console.log("NGO CATG Drop Down", this.state.ngocatgdropdown)
  }

  handleSubmit(e) {
    console.log(this.state.reqFlag1);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState({ reqFlag1: true })
      if (!err) {
        let ngoupdatedetails = {

          "cognitoID": this.props.ngoupdateprofile.Body.SZ_COGNITO_USER_ID,
          "name": (this.state.reqFlag1 === undefined ? this.name : values.ngoname),
          "address": (this.state.reqFlag1 === undefined ? this.address : values.address),
          "city": (this.reqFlag1 === undefined ? this.city : values.city),
          "state": "Maharashtra",
          "country": "India",
          "email": (this.reqFlag1 === undefined ? this.email : values.email),
          "website": (this.reqFlag1 === undefined ? this.website : values.website),
          "ifsc": (this.reqFlag1 === undefined ? this.ifsccode : values.ifsccode),
          "bank_acc_no": (this.reqFlag1 === undefined ? this.accountnumber : values.accountnumber),
          "bank_acc_name": (this.reqFlag1 === undefined ? this.accname : values.accname),
          "postalCode": "" + (this.reqFlag1 === undefined ? this.pincode : values.pincode), //Converted to String
          "contactNo": (this.reqFlag1 === undefined ? this.mobile : values.mobile),
          "ngoCategory": (this.reqFlag1 === undefined ? this.ngocategory : values.ngocategory),
          "bankbranch" : (this.reqFlag1 === undefined ? this.bankbranch : values.bankbranch),
          "contactpersonname" : (this.reqFlag1 === undefined ? this.contactpersonname : values.contactpersonname),
          "bankname" : (this.reqFlag1 === undefined ? this.bankname : values.bankname),
          "operationalsince" : ""+(this.reqFlag1 === undefined ? this.operationalsince : values.operationalsince),
          "registrationnumber" : (this.reqFlag1 === undefined ? this.registrationnumber : values.registrationnumber)


        };


        let ngoupdateres;
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/microdonorngoupdate')
          .send(ngoupdatedetails)
          .set('X-API-Key', 'foobar')
          .set('accept', 'application/json')
          .set('accept', '*/*')
          .set('Access-Control-Request-Headers', 'content-type,x-api-key')
          .set('Access-Control-Request-Method', 'POST')
          .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
          .set('Origin', 'http://localhost:3000')
          .set('Accept-Encoding', 'gzip, deflate, br')
          .set('Sec-Fetch-Dest', 'empty')
          .end((err, res) => {
            console.log("Updated Data", res);
            ngoupdateres = JSON.parse(res.text);
            console.log("Updated Data", ngoupdateres);
            this.setState(
              {
                updatedmessage: "Profile Updated Successfully"
              }
            )

          })
      }
    })
  }

  componentDidMount() {
    //setTimeout(()=>{

    document.getElementById("ngoname").value = this.name;
    document.getElementById("mobile").value = this.mobile;
    document.getElementById("email").value = this.email;
    document.getElementById("city").value = this.city;
    document.getElementById("website").value = this.website;
    document.getElementById("accountnumber").value = this.accountnumber;
    document.getElementById("accname").value = this.accname;
    document.getElementById("ifsccode").value = this.ifsccode;
    document.getElementById("address").value = this.address;
    document.getElementById("pincode").value = this.pincode;
    document.getElementById("ngocategory").value = this.ngocategory;
    document.getElementById("operationalsince").value = this.operationalsince;
    document.getElementById("bankname").value = this.bankname;
    document.getElementById("bankbranch").value = this.bankbranch;
    document.getElementById("contactpersonname").value = this.contactpersonname;
    document.getElementById("registrationnumber").value = this.registrationnumber;

    //},500)
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (document.getElementById("ngoname").value === "") {
        this.name = this.name;
      } else {
        this.name = document.getElementById("ngoname").value;
      }
      document.getElementById("ngoname").value = this.name;
    } catch (e) { console.error(e) }
    //document.getElementById("EmailID").value=this.email;
    try {
      if (document.getElementById("mobile").value === "") {
        this.mobile = this.mobile;
      } else {
        this.mobile = document.getElementById("mobile").value;
      }
      document.getElementById("mobile").value = this.mobile;
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
      if (document.getElementById("city").value === "") {
        this.city = this.city;
      } else {
        this.city = document.getElementById("city").value;
      }
      document.getElementById("city").value = this.city;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("website").value === "") {
        this.website = this.website;
      } else {
        this.website = document.getElementById("website").value;
      }
      document.getElementById("website").value = this.website;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("accountnumber").value === "") {
        this.accountnumber = this.accountnumber;
      } else {
        this.accountnumber = document.getElementById("accountnumber").value;
      }
      document.getElementById("accountnumber").value = this.accountnumber;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("accname").value === "") {
        this.accname = this.accname;
      } else {
        this.accname = document.getElementById("accname").value;
      }
      document.getElementById("accname").value = this.accname;
    } catch (e) { console.error(e) }
    try {
      if (document.getElementById("ifsccode").value === "") {
        this.ifsccode = this.ifsccode;
      } else {
        this.ifsccode = document.getElementById("ifsccode").value;
      }
      document.getElementById("ifsccode").value = this.ifsccode;
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
      if (document.getElementById("pincode").value === "") {
        this.pincode = this.pincode;
      } else {
        this.pincode = document.getElementById("pincode").value;
      }
      document.getElementById("pincode").value = this.pincode;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("ngocategory").value === "") {
        this.ngocategory = this.ngocategory;
      } else {
        this.ngocategory = document.getElementById("ngocategory").value;
      }
      document.getElementById("ngocategory").value = this.ngocategory;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("operationalsince").value === "") {
        this.operationalsince = this.operationalsince;
      } else {
        this.operationalsince = document.getElementById("operationalsince").value;
      }
      document.getElementById("operationalsince").value = this.operationalsince;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("bankbranch").value === "") {
        this.bankbranch = this.bankbranch;
      } else {
        this.bankbranch = document.getElementById("bankbranch").value;
      }
      document.getElementById("bankbranch").value = this.bankbranch;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("bankname").value === "") {
        this.bankname = this.bankname;
      } else {
        this.bankname = document.getElementById("bankname").value;
      }
      document.getElementById("bankname").value = this.bankname;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("contactpersonname").value === "") {
        this.contactpersonname = this.contactpersonname;
      } else {
        this.contactpersonname = document.getElementById("contactpersonname").value;
      }
      document.getElementById("contactpersonname").value = this.contactpersonname;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("registrationnumber").value === "") {
        this.registrationnumber = this.registrationnumber;
      } else {
        this.registrationnumber = document.getElementById("registrationnumber").value;
      }
      document.getElementById("registrationnumber").value = this.registrationnumber;
    } catch (e) { console.error(e) }

  }

  render() {
    console.log("Mydetails", this.props.ngoupdateprofile)
    console.log("NGO Drop Down Vales", this.props.ngocatgdropdown)
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div style={{ marginTop: 8 }}>Upload</div>
    );


    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    return (
      <div style={{ width: '90%', height: '100%', marginLeft: '0px', border: '1px solid #FFFFFF' }}>
        <h5 style={{ display: 'block', position: 'relative', left: '70px', top: '7px', fontWeight: 800, color: '#f8a500', fontSize: 'x-large' }}>MY DETAILS</h5>
        <span style={{ margin: '60px 0px 0px 105px' }}>
          <Avatar size={64} shape="circle" src="img/NGO.png" />
        </span>
        <div style={{ margin: '15px 0px 0px 85px ' }}>
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

        <div style={{ width: '80%', height: '90%', marginTop: '-240px', marginLeft: '50px', overflowY: 'auto', overflowX: 'hidden' }}>
          <Form {...layout} style={{ border: '1px solid #FFFFFF' }}>
            <h4 style={{ marginTop: '-05px', marginLeft: '220px' }}>NGO NAME</h4>
            <Form.Item

              style={{ width: '45%', alignContent: 'center', position: 'relative', top: '0px', left: '220px' }}
            >
              {getFieldDecorator('ngoname', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter NGO Name',
                //   }
                // ],

              })(
                <Input style={{ borderRadius: '25px' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*//>)}

            </Form.Item>
            <h4 style={{ marginTop: '-69px', marginLeft: '530px' }}>NGO CATEGORY</h4>
            <Form.Item style={{ left: '530px', top: '-41px', width: '53%' }}>
              {/* <Select  onChange={this.clickChange}  style={{ width: '85%' }}>
                  {
                this.props.ngocatgdropdown.Body.map((value) => (
                <option value={value}>{value}</option>
      ))
  }
                </Select> */}
              {getFieldDecorator('ngocategory', {

              })(
                <Input readOnly={true} style={{ borderRadius: '25px', width: '30%' }} />)}
            </Form.Item>
            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 style={{ marginTop: '-43px', marginLeft: '70px' }}>NGO ADDRESS</h4>
            </Form.Item>
            <Form.Item

              style={{ width: '45%', alignContent: 'center', position: 'relative', top: '-15px', left: '220px' }}
            >
              {getFieldDecorator('address', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter NGO Address',
                //   }
                // ],

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
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter NGO City',
                //   }
                // ],

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
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Pincode',
                //   }
                // ],

              })(
                <Input type="number" style={{ borderRadius: '25px', width: '22%' }}
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
                <Input readOnly={true} style={{ borderRadius: '25px', width: '144%' }}
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
                <Input type="text" style={{ borderRadius: '25px', width: '144%' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>
            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 style={{ marginTop: '-50px', marginLeft: '70px' }}>OPERATIONAL SINCE</h4>
            </Form.Item>

            <Form.Item

              style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-20px', left: '220px' }}
            >
              {getFieldDecorator('operationalsince', {
                //  rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Operational Year',
                //   }
                // ],

              })(
                <Input type="number" style={{ borderRadius: '25px', width: '144%' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>
            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 style={{ marginTop: '-90px', marginLeft: '410px' }}>REGISTRATION NUMBER</h4>
            </Form.Item>

            <Form.Item

              style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-60px', left: '560px' }}
            >
              {getFieldDecorator('registrationnumber', {
                //  rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Registration Number',
                //   }
                // ],

              })(
                <Input  style={{ borderRadius: '25px', width: '144%' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>
            <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '220px', top: '-40px' }}>
              BANK ACCOUNT DETAILS</h4>
            <div style={{ width: '63%', height: '300px', marginLeft: '220px', marginTop: '-20px', background: '#e8e8e8' }}>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '0px', marginLeft: '10px' }}>BANK NAME</h4>
              </Form.Item>

              <Form.Item

                style={{ width: '100%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
              >
                {getFieldDecorator('bankname', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Bank Name',
                  //   }
                  // ],

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '-20px', marginLeft: '10px' }}>BANK ACCOUNT NUMBER</h4>
              </Form.Item>

              <Form.Item

                style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
              >
                {getFieldDecorator('accountnumber', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Account Number',
                  //   }
                  // ],

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
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter IFSC CODE',
                  //   }
                  // ],

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '-86px', marginLeft: '370px' }}>BRANCH</h4>
              </Form.Item>

              <Form.Item
               
                style={{ width: '53%', alignContent: 'center', position: 'relative', top: '-54px', left: '360px' }}
              >
                {getFieldDecorator('bankbranch', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Branch Name',
                  //   }
                  // ],

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}
               
              </Form.Item>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 style={{ marginTop: '-60px', marginLeft: '10px' }}>ACCOUNT HOLDER NAME</h4>
              </Form.Item>

              <Form.Item

                style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-32px', left: '10px' }}
              >
                {getFieldDecorator('accname', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Account Holder Name',
                  //   }
                  // ],

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px', top: '-5px' }}>
                CONTACT PERSON DETAILS</h4>

              <div style={{ width: '100%', height: '180px', marginLeft: '0px', marginTop: '-10px', background: '#e8e8e8' }}>
                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 style={{ marginTop: '0px', marginLeft: '10px' }}>NAME</h4>
                </Form.Item>

                <Form.Item
                  
                  style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
                >
                  {getFieldDecorator('contactpersonname', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Contact Person Name',
                  //   }
                  // ],

                })(
                  <Input style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}
                  
                </Form.Item>

                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 style={{ marginTop: '-10px', marginLeft: '10px' }}>PHONE NUMBER</h4>
                </Form.Item>

                <Form.Item


                  style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '10px', top: '-15px' }}
                >
                  {getFieldDecorator('mobile', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: 'Please enter Mobile Number',
                    //   }
                    // ],

                  })(
                    <Input style={{ borderRadius: '25px', width: '100%' }}
                    /*onChange={(e) =>{
                      this.setState({reqFlag1 : true})
                      }}*/
                    />)}

                  <a href="" style={{ position: 'relative', right: '0px', top: '-7px', color: '#000000' }}>Verify Phone Number</a>
                </Form.Item>

                {/* <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 style={{ marginTop: '-125px', marginLeft: '450px' }}>OTP</h4>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  style={{ width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '400px', top: '-96px' }}
                >
                  <Input style={{ borderRadius: '25px', width: '58%' }} />
                  <a href="" style={{ position: 'relative', right: '155px', top: '30px', color: '#000000' }}>Resend OTP</a>
                </Form.Item> */}

              </div>

              {/* <a href="" style={{ position: 'relative', left: '10px', top: '20px', color: '#000000' }}>Change Your Password</a> */}

              <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '410px', top: '-01px' }}>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{ width: '50%', borderRadius: '25px', background: '#f8a500', border: '#FFFFFF', color: '#000000' }}>
                  Update
                      </Button>
              </Form.Item>
              <center>
                <p style={{ color: 'blue' }}>{this.state.updatedmessage}</p>
              </center>

            </div>

          </Form>
        </div>

      </div>
    );
  }
}
const WrappedNormalMyDetailsPage = Form.create()(MyDetailsPage);
export default WrappedNormalMyDetailsPage;
