import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import WrappedOtpVerifyForm from './OtpVerify.js'
import '../index.css';
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Collapse, Row,Modal, Col, Result, Breadcrumb, Radio, Icon, Button, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge, Select, Upload, message, Tabs } from 'antd';
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
    this.state = { posts: "", value: 1,mobileverifyflag:false   };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ngoFetchname = this.ngoFetchname.bind(this);
    this.showModal = this.showModal.bind(this);
    //this.handleChange1 = this.handleChange1.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.state = { mess: "", loading: false, reqFlag1: true, updatedmessage: "",updatefail:"", ngocatgdropdown: "",ngocategoryother:"",ngoorgtype:"",ngotypeoforg:"" }
    this.onChange = this.onChange.bind(this);
    this.ngoCategoryOther = this.ngoCategoryOther.bind(this);
    this.ngoOrgType = this.ngoOrgType.bind(this);
    this.onPhotoupload = this.onPhotoupload.bind(this);
    this.ngoFetchname = this.ngoFetchname.bind(this);
    this.typeoforganization = this.typeoforganization.bind(this);
    this.state = { ngoupdatedetails: "",visible:"", ngoupdateprofile: "", ngocategorydropdown: "" , base64TextString:"",ngoprofileimage:""};

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
    this.ngocategoryother = this.props.ngoupdateprofile.Body.SZ_CATEGORY_SECONDARY;
    this.typeoforganization = this.props.ngoupdateprofile.Body.SZ_TYPE_OF_ORAGANIZATION;

    this.ngoFetchname();
    this.ngoOrgType();


  }

  clickChange(value) {
    console.log(`selected ${value}`);
    this.NGOCATEGORY = value;
    this.setState({
      ngocatgdropdown: value

    })
    console.log("NGO CATG Drop Down", this.state.ngocatgdropdown)
  }

  
  ngoCategoryOther(value) {
    console.log(`selected ${value}`);
    this.NGOCATEGORY = value;
    this.setState({
      ngocatgdropdownother: value

    })
    console.log("NGO CATG Drop Down", this.state.ngocatgdropdownother)
  }

  typeoforganization(value) {
    console.log(`selected ${value}`);
    this.NGOCATEGORY = value;
    this.setState({
      ngotypeoforg: value

    })
    console.log("NGO CATG Drop Down", this.state.ngotypeoforg)
  }

  showModal = (e) => {
    console.log("In ShowModal");

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let confirmOtpOnPhoneRequest = {
          "SZ_USER_TYPE": "N",
          "I_USER_ID": values.mobile,
          "SZ_Purpose": "Mobile OTP",
          "SZ_OTP_MODE": "M",
          "I_OTP_COUNT": "1",
          "I_OTP_ERROR_COUNT": "0"
        };
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/otpgenration')
          .send(confirmOtpOnPhoneRequest) //sends a JSON post body
          .set('X-API-Key', 'foobar')
          .set('accept', 'application/json')
          .end((err, res) => {
            let responseJson = JSON.parse(res.text);
            console.log("Respomse", responseJson);
            if (responseJson.Status === "SUCCESS") {
              this.setState({ mess: responseJson.Messege, visible: true, mobileReadOnlyField: responseJson.Body })
            } else if (responseJson.Status === "FAILED") {
              this.setState({ mess: responseJson.message })
            }
          })

      }
    })
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ mess: "" });
  };

  ngoFetchname() {
    let ngocategorys = {
      "lookuptype": "NGO_CATG"
    }
    const superagent = require('superagent');
    superagent
      .post(' https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/lookupfetch') // Ajax Call
      .send(ngocategorys)
      .set('X-API-Key', 'foobar')
      .set('accept', 'application/json')
      .end((err, res) => {
        console.log("Response", res);
        let detailsRespJSOn = JSON.parse(res.text);
        console.log("respjson", detailsRespJSOn);
        if (detailsRespJSOn.Status == "SUCCESS") {
          console.log("NGO Data", detailsRespJSOn)
          this.setState({ ngocategory: detailsRespJSOn })
          console.log("NGO CATEGORY", this.state.ngocategory)

        }

        console.log("Ngo Category", this.state.ngocategory)
      })
  }

  ngoOrgType() {
    let ngoCategoryOther = {
      "lookuptype": "ORG_TYPE"
    }
    const superagent = require('superagent');
    superagent
      .post(' https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/lookupfetch') // Ajax Call
      .send(ngoCategoryOther)
      .set('X-API-Key', 'foobar')
      .set('accept', 'application/json')
      .end((err, res) => {
        console.log("Response", res);
        let detailsRespJSOn = JSON.parse(res.text);
        console.log("respjson", detailsRespJSOn);
        if (detailsRespJSOn.Status == "SUCCESS") {
          console.log("NGO Data", detailsRespJSOn)
          this.setState({ ngoorgtype: detailsRespJSOn })
          console.log("NGO CATEGORY", this.state.ngoorgtype)

        }

        console.log("Ngo Category", this.state.ngoorgtype)
      })

  }

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

  // handleChange1 = info => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     );
  //   }
  // };

  


  onPhotoupload=(e)=>
   {

        let file= e.target.files[0] ;//parameter to pass
        this.state.filename= e.target.files[0].name;
        
        if(file)
        {
            const reader=new FileReader();
            console.log(reader)
            reader.onload=this._handleReaderLoader.bind(this);
            reader.readAsBinaryString(file);
        }

    }
    _handleReaderLoader=(readerEvt) =>
    {
        let binaryString =readerEvt.target.result;

        this.setState({base64TextString:btoa(binaryString)}) ;

        console.log("Photo",this.state.base64TextString);

        let loginRequest = {
          "cognitoId": this.props.ngoupdateprofile.Body.SZ_COGNITO_USER_ID,
          "user_avatar": this.state.base64TextString
        }

        const superagent=require('superagent');

              superagent
                  .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoprofileimageupload')
                  .send(loginRequest)
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
                  .end((err,res)=>{
                      console.log("Response:",res)
                      this.componentDidMount();
                      //window.location.reload();
                      // this.setState({ imgDisplayflag:true,message:'File Deleted Successfully'})
                  });

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
          "registrationnumber" : (this.reqFlag1 === undefined ? this.registrationnumber : values.registrationnumber),
          "ngocategorysecondary":(this.reqFlag1 === undefined ? this.ngocategoryother : values.ngocategoryother),
          "typeoforganization":(this.reqFlag1 === undefined ? this.typeoforganization : values.typeoforganization)


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
            if(ngoupdateres.Status === "SUCCESS"){
              this.setState(
                {
                  updatedmessage: "Profile Updated Successfully!!!"
                }
              )
            }else{
              this.setState({
                updatefail : "Failed To Update Profile!!!"
              })
            }
            

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
    document.getElementById("ngocategoryother").value = this.ngocategoryother;
    document.getElementById("typeoforganization").value = this.typeoforganization;
    //document.getElementById("ngoprofileimage").value = this.

    let loginRequest = {
      "cognitoId": this.props.ngoupdateprofile.Body.SZ_COGNITO_USER_ID
    }

    const superagent=require('superagent');

          superagent
              .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoprofileimagepresignedgeturl')
              .send(loginRequest)
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
              .end((err,res)=>{
                  //console.log("Response:",res)
                  this.setState({
                    ngoprofileimage : JSON.parse(res.text),
                  })
                  console.log("Res",JSON.parse(res.text));
                  console.log("Rsss",this.state.ngoprofileimage);
                  // this.setState({ imgDisplayflag:true,message:'File Deleted Successfully'})
              });

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

    try {
      if (document.getElementById("ngocategoryother").value === "") {
        this.ngocategoryother = this.ngocategoryother;
      } else {
        this.ngocategoryother = document.getElementById("ngocategoryother").value;
      }
      document.getElementById("ngocategoryother").value = this.ngocategoryother;
    } catch (e) { console.error(e) }

    try {
      if (document.getElementById("typeoforganization").value === "") {
        this.typeoforganization = this.typeoforganization;
      } else {
        this.typeoforganization = document.getElementById("typeoforganization").value;
      }
      document.getElementById("typeoforganization").value = this.typeoforganization;
    } catch (e) { console.error(e) }

  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  

  render() {
    console.log("Mydetails", this.props.ngoupdateprofile)
    console.log("NGO Drop Down Vales", this.props.ngocatgdropdown)
    const { loading, imageUrl,visible } = this.state;
    const uploadButton = (
      <div style={{ marginTop: 8 }}>Upload</div>
    );


    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    return (
      <div className={styles.mainlayout} style={{ width: '90%', height: '100%', marginLeft: '0px', border: '1px solid #FFFFFF' }}>
        <h5 className={styles.ngoeprofilemydetailstext} >MY DETAILS</h5>
        <span style={{ margin: '60px 0px 0px 105px' }}>
          <Avatar size={64} shape="circle" src={this.state.ngoprofileimage} className={styles.staticprofileimagengo} />
          
        </span>
        <div className={styles.uploadbuttoncss}>
          <label for="file-upload" className={styles.customfileupload}>
                <i class="fa fa-upload" aria-hidden="true"></i>Upload
</label>
              <input id="file-upload" type="file" style={{ display: 'none',borderRadius:'25px' }} onChange={(e) => this.onPhotoupload(e)} />

          </div>

        {/* <input type="file" style={{width:'20'}} onChange={(e)=>this.onPhotoupload(e)}></input> */}
        <div className={styles.ngpprofiledivbeforeform} >
          <Form {...layout} style={{ border: '1px solid #FFFFFF' }}>
            <h4 className={styles.ngoname} >NGO NAME</h4>
            <Form.Item className={styles.ngonameformitemcss}

              // style={{ width: '45%', alignContent: 'center', position: 'relative', top: '0px', left: '220px' }}
            >
              {getFieldDecorator('ngoname', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter NGO Name',
                //   }
                // ],

              })(
                <Input type="text" style={{ borderRadius: '25px' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*//>)}

            </Form.Item>
            <h4 className={styles.ngocategory} >NGO CATEGORY</h4>
            <Form.Item className={styles.ngocategoryformitemcss}>
              {/* <Select  onChange={this.clickChange}  style={{ width: '85%' }}>
                  {
                this.props.ngocatgdropdown.Body.map((value) => (
                <option value={value}>{value}</option>
      ))
  }
                </Select> */}
              {getFieldDecorator('ngocategory', {

              })(
                <Select placeholder={this.props.ngoupdateprofile.Body.SZ_CATEGORY_PRIMARY} onChange={this.clickChange} style={{ width: '85%' }} >

             {
               (this.state.ngocategory !== undefined ) ?
               this.state.ngocategory.Body.map((value) => (
                 <option value={value}>{value}</option>
               )):""
             }
           </Select>)}
            </Form.Item>

            <h4 className={styles.ngocategoryotherlabel} >NGO CATEGORY OTHER</h4>
            <Form.Item className={styles.ngocategoryotherformitemcss} >
              {/* <Select  onChange={this.clickChange}  style={{ width: '85%' }}>
                  {
                this.props.ngocatgdropdown.Body.map((value) => (
                <option value={value}>{value}</option>
      ))
  }
                </Select> */}
              {getFieldDecorator('ngocategoryother', {

              })(
                <Select placeholder={this.props.ngoupdateprofile.Body.SZ_CATEGORY_SECONDARY} onChange={this.ngoCategoryOther} style={{ width: '85%' }} >

                    {
                      (this.state.ngocategory !== undefined) ?
                        this.state.ngocategory.Body.map((value) => (
                          <option value={value}>{value}</option>
                        )) : ""
                    }
                  </Select>
               )}
            </Form.Item>

            <h4 className={styles.ngotypeoforg} >TYPE OF ORGANIZATION</h4>
            <Form.Item className={styles.ngotypeoforgformitemcss} >
              {/* <Select  onChange={this.clickChange}  style={{ width: '85%' }}>
                  {
                this.props.ngocatgdropdown.Body.map((value) => (
                <option value={value}>{value}</option>
      ))
  }
                </Select> */}
              {getFieldDecorator('typeoforganization', {

              })(
                <Select placeholder={this.props.ngoupdateprofile.Body.SZ_TYPE_OF_ORAGANIZATION} onChange={this.ngoCategoryOther} style={{ width: '85%' }} >

                {
                  (this.state.ngoorgtype !== undefined) ?
                    this.state.ngoorgtype.Body.map((value) => (
                      <option value={value}>{value}</option>
                    )) : ""
                }
              </Select>
               )}
            </Form.Item>

            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 className={styles.ngoaddresslabel} >NGO ADDRESS</h4>
            </Form.Item>
            <Form.Item className={styles.ngoaddressformitemcss}

              // style={{ width: '45%', alignContent: 'center', position: 'relative', top: '-15px', left: '220px' }}
            >
              {getFieldDecorator('address', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter NGO Address',
                //   }
                // ],

              })(
                <Input type="text" style={{ borderRadius: '25px' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}

            </Form.Item>
            <h4 className={styles.ngocitylabel} >CITY</h4>
            <Form.Item className={styles.ngocityformitemcss}


              // style={{ width: '86%', alignContent: 'center', position: 'relative', left: '530px', top: '-55px' }}
            >
              {getFieldDecorator('city', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter NGO City',
                //   }
                // ],

              })(
                <Input type="text" style={{ borderRadius: '25px', width: '24%' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}

            </Form.Item>
            <h4 className={styles.ngopincodelabel} >PIN CODE</h4>
            <Form.Item  className={styles.ngopincodeformitemcss}

              // style={{ width: '100%', alignContent: 'center', position: 'relative', left: '680px', top: '-95px' }}
            >
              {getFieldDecorator('pincode', {
                // rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Pincode',
                //   }
                // ],

              })(
                <Input type="number" pattern="^[1-9][0-9]{5}$" maxLength="6" style={{ borderRadius: '25px', width: '22%' }}
  /*onChange={(e) =>{
    this.setState({reqFlag1 : true})
    }}*//>)}


            </Form.Item>

            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 className={styles.ngoemailabel} >E-MAIL ID</h4>
            </Form.Item>

            <Form.Item className={styles.ngoemailformitemcss}

              // style={{ width: '65%', alignContent: 'center', position: 'relative', top: '-65px', left: '220px' }}
            >
              {getFieldDecorator('email', {

              })(
                <Input readOnly={true} style={{ borderRadius: '25px', width: '144%',backgroundColor:'	#E0E0E0' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*/
                />)}

            </Form.Item>

            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4  className={styles.ngowebsite} >WEBSITE</h4>
            </Form.Item>

            <Form.Item className={styles.ngowebsiteformitemcss}

              // style={{ width: '65%', alignContent: 'center', position: 'relative', top: '-40px', left: '220px' }}
            >
              {getFieldDecorator('website', {

              })(
                <Input type="url" placeholder="https://example.com" pattern="https://.*" size="30" style={{ borderRadius: '25px', width: '144%' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>
            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 className={styles.ngooperationalsince} >OPERATIONAL SINCE</h4>
            </Form.Item>

            <Form.Item className={styles.ngooperationalsinceformitemcss}

              // style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-20px', left: '220px' }}
            >
              {getFieldDecorator('operationalsince', {
                //  rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Operational Year',
                //   }
                // ],

              })(
                <Input type="number" pattern="/^[0-9]+$/" maxLength="4" placeholder="Year Ex:1999" style={{ borderRadius: '25px', width: '144%' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>
            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 className={styles.ngoregistartionnumber} >REGISTRATION NUMBER</h4>
            </Form.Item>

            <Form.Item className={styles.ngoregistartionnumberformitemcss}

              // style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-60px', left: '425px' }}
            >
              {getFieldDecorator('registrationnumber', {
                //  rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Registration Number',
                //   }
                // ],

              })(
                <Input type="text" style={{ borderRadius: '25px', width: '144%' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>

            <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
              <h4 className={styles.ngoreferer} >REFERRER</h4>
            </Form.Item>

            <Form.Item className={styles.ngorefererformitemcss}

              // style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-100px', left: '625px' }}
            >
              {getFieldDecorator('referrer', {
                //  rules: [
                //   {
                //     required: true,
                //     message: 'Please enter Registration Number',
                //   }
                // ],

              })(
                <Input type="text" readOnly={true} style={{ borderRadius: '25px', width: '144%',backgroundColor:'	#E0E0E0' }}
                /* onChange={(e) =>{
                   this.setState({reqFlag1 : true})
                   }}*/
                />)}


            </Form.Item>

            <h4 className={styles.ngobanksection} >
              BANK ACCOUNT DETAILS</h4>
            <div className={styles.ngobanksectiondiv} >
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 className={styles.ngobankname} >BANK NAME</h4>
              </Form.Item>

              <Form.Item className={styles.ngobanknameformitemcss}

                // style={{ width: '100%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
              >
                {getFieldDecorator('bankname', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Bank Name',
                  //   }
                  // ],

                })(
                  <Input type="text" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 className={styles.ngobankaccountnumber} >BANK ACCOUNT NUMBER</h4>
              </Form.Item>

              <Form.Item className={styles.ngobankaccountnumberformitemcss}

                // style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
              >
                {getFieldDecorator('accountnumber', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Account Number',
                  //   }
                  // ],

                })(
                  <Input type="number" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 className={styles.ngoifsccode} >IFSC CODE</h4>
              </Form.Item>

              <Form.Item className={styles.ngoifsccodeformitemcss}

                // style={{ width: '90%', alignContent: 'center', position: 'relative', top: '-15px', left: '10px' }}
              >
                {getFieldDecorator('ifsccode', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter IFSC CODE',
                  //   }
                  // ],

                })(
                  <Input pattern="^[A-Z]{4}0[A-Z0-9]{6}$" maxLength="11" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 className={styles.ngobranch} >BRANCH</h4>
              </Form.Item>

              <Form.Item className={styles.ngobranchformitemcss}
               
                // style={{ width: '53%', alignContent: 'center', position: 'relative', top: '-54px', left: '360px' }}
              >
                {getFieldDecorator('bankbranch', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Branch Name',
                  //   }
                  // ],

                })(
                  <Input type="text" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}
               
              </Form.Item>
              <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                <h4 className={styles.ngoaccountholdername} >ACCOUNT HOLDER NAME</h4>
              </Form.Item>

              <Form.Item className={styles.ngoaccountholdernameformitemcss}

                // style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-32px', left: '10px' }}
              >
                {getFieldDecorator('accname', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Account Holder Name',
                  //   }
                  // ],

                })(
                  <Input type="text" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <h4  className={styles.ngocontactpersondetails} >
                CONTACT PERSON DETAILS</h4>

              <div className={styles.ngocontactpersondetailsdiv} >
                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngocontactpersonname} >NAME</h4>
                </Form.Item>

                <Form.Item className={styles.ngocontactpersonnameformitemcss}
                  
                  // style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
                >
                  {getFieldDecorator('contactpersonname', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: 'Please enter Contact Person Name',
                  //   }
                  // ],

                })(
                  <Input type="text" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}
                  
                </Form.Item>

                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngocontactpersonphone} >PHONE NUMBER</h4>
                </Form.Item>

                <Form.Item className={styles.ngocontactpersonphone}


                  // style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '10px', top: '-15px' }}
                >
                  {getFieldDecorator('mobile', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: 'Please enter Mobile Number',
                    //   }
                    // ],

                  })(
                    <Input type="tel" pattern="[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}" maxLength="10" style={{ borderRadius: '25px', width: '100%' }}
                    onChange={(e) =>{
                      this.setState({mobileverifyflag: true});
                     
                      }}
                    />)}
                    <a onClick={this.showModal} className={styles.ngoeditprofileverifyphonecss}  style={{ display: this.state.mobileverifyflag === true ? 'inline' : 'none' }}>Verify Mobile Number</a>
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
                        style={{ position: 'relative', left: '0px', top: '0px' }}
                      >
                        <WrappedOtpVerifyForm mobileReadOnlyField={this.state.mobileReadOnlyField} onCancel={this.handleCancel} />
                      </Modal>
                    </div>

                  {/* <a href="" style={{ position: 'relative', right: '0px', top: '-7px', color: '#000000' }}>Verify Phone Number</a> */}
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

              <Form.Item className={styles.ngoupdatebuttonformitem}  >
                <Button className={styles.ngoupdatebutton} type="primary" htmlType="submit" onClick={this.handleSubmit} >
                  Update
                      </Button>
              </Form.Item>
              <center>
                <p style={{ color: 'blue' }}>{this.state.updatedmessage}</p>
                <p style={{color:'red'}}>{this.state.updatefail}</p>
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
