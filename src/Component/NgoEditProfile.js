import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import WrappedNormalMainLayoutNGO from "./MainLayoutNGO.js";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Collapse, Row, Col, Result, Breadcrumb, Radio, Icon, Button, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge, Select, Upload, message, Tabs, Modal } from 'antd';
import { Spin } from 'antd';
import WrappedOtpVerifyForm from './OtpVerify.js'
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
    this.state = { posts: "", value: 1, visible: false, mobileReadOnlyField: "", fetchfail: "", ngocatgdropdown: "", message1: "", ngocategory: "", ngocategoryother: "", ngoorgtype: "", ngotypeoforg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.ngoCategoryOther = this.ngoCategoryOther.bind(this);
    this.ngoOrgType = this.ngoOrgType.bind(this);
    this.state = { mess: "", loading: false, reqFlag1: true, updatedmessage: "", base64TextString:"",ngoprofileimage:"" }
    this.onChange = this.onChange.bind(this);
    this.bankifscvalidation = this.bankifscvalidation.bind(this);
    this.showModal = this.showModal.bind(this);
    this.ngoFetchname = this.ngoFetchname.bind(this);
    this.typeoforganization = this.typeoforganization.bind(this);
    this.state = { ngoupdatedetails: "", ngoupdateprofile: "" };
    this.email = this.props.email;

    this.ngoFetchname();
    this.ngoOrgType();




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

  bankifscvalidation(value) {
    let regex = new RegExp("^[A-Z]{4}0[A-Z0-9]{6}$");
    console.log(`selected ${value}`);
    if (regex.test(value)) {
      console.log("In True");
      return true;
    }
    else {
      console.log("In False");
      this.setState({
        message1: "IFSC CODE INVALID"
      })
      return false;
    }
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
          "cognitoId": this.props.loginResponse,
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

      if (this.bankifscvalidation(values.ifsccode)) {


        if (!err) {
          let ngoupdatedetails = {

            "cognitoID": this.props.loginResponse,
            "name": values.ngoname,
            "address": values.address,
            "city": values.city,
            "state": "Maharashtra",
            "country": "India",
            "email": this.props.email,
            "website": values.website,
            "ifsc": values.ifsccode,
            "bank_acc_no": values.accountnumber,
            "bank_acc_name": values.accname,
            "postalCode": "" + values.pincode, //Converted to String
            "contactNo": values.mobile,
            "ngoCategory": this.state.ngocatgdropdown,
            "bankbranch": values.branch,
            "contactpersonname": values.contactpersonname,
            "bankname": values.bankname,
            "operationalsince": "" + values.operationalsince,
            "registrationnumber": values.registrationnumber,
            "ngocategorysecondary": this.state.ngocatgdropdownother,
            "typeoforganization": this.state.ngotypeoforg

          };
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
              let respJson = JSON.parse(res.text);
              console.log("respJson", respJson);
              if (respJson.Status === "SUCCESS") {
                console.log("hi", respJson);
                this.setState({ updatedmessage: "Profile Updated Successfully!!!" })
                let loginRequest = {
                  "email": this.props.email
                };
                const superagent = require('superagent');
                superagent
                  .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoupdateprofile') // Ajax call
                  .send(loginRequest)                                 // sends a JSON post body
                  .set('X-API-Key', 'foobar')
                  .set('Content-Type', 'application/json')
                  .set('accept', '*/*')
                  .set('Access-Control-Request-Headers', 'content-type,x-api-key')
                  .set('Access-Control-Request-Method', 'POST')
                  .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
                  .set('Origin', 'http://localhost:3000')
                  .set('Accept-Encoding', 'gzip, deflate, br')
                  .set('Sec-Fetch-Dest', 'empty')
                  .set('Sec-Fetch-Mode', 'cors')
                  .end((err, res) => {                               // Calling the end function will send the request
                    console.log("service call", res);
                    let fatchDetailsRespJson = JSON.parse(res.text);
                    if (fatchDetailsRespJson.Status === "SUCCESS") {
                      ReactDOM.render(<WrappedNormalMainLayoutNGO email={this.props.email} ngocategorydropdown={this.props.ngocategorydropdown} ngoupdateprofile={fatchDetailsRespJson} />, document.getElementById('root'));
                    } else if (respJson.Status === "FAILED") {
                      this.setState({ fetchfail: "Failed In Getting Data..." })
                    }

                    // ReactDOM.render(<WrappedNormalMainLayoutNGO data={loginRespJson} ngoupdateprofile={fatchDetailsRespJson} />, document.getElementById('root'));
                  });
                // this.setState({ mess: respJson.Messege });
                // ReactDOM.render(<WrappedNormalMainLayoutNGO   />, document.getElementById('root'));
              }

            });
        } else {
          console.log("In IFSC False");
          this.setState({ message1: "Invalid IFSC Code" });
          console.log("Message", this.state.message1);
        }

      }
    })
  }

  componentDidMount() {
    //setTimeout(()=>{


    document.getElementById("email").value = this.email;

    let loginRequest = {
      "cognitoId": this.props.loginResponse
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
    const { visible, confirmLoading } = this.state;
    const uploadButton = (
      <div style={{ marginTop: 8 }}>Upload</div>
    );


    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    return (
      <div className={styles.mainlayout} style={{ height: (window.innerHeight), backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>

        <div className={styles.mobileviewheaderdiv}  >
          <img className={styles.mobileviewiheaderimg} src="img/mdHeader.png" />
        </div>


        <div className={styles.ngoeditprofilediv} >
          <h5 className={styles.ngoeprofilemydetailstext} >MY DETAILS</h5>
          <span style={{ margin: '60px 0px 0px 105px' }}>
            <Avatar className={styles.staticprofileimagengo} size={64} shape="circle" src={this.state.ngoprofileimage} />
          </span>
          <div className={styles.uploadbuttoncss}>
          <label for="file-upload" className={styles.customfileupload}>
                <i class="fa fa-upload" aria-hidden="true"></i>Upload
</label>
              <input id="file-upload" type="file" style={{ display: 'none',borderRadius:'25px' }} onChange={(e) => this.onPhotoupload(e)} />

          </div>
          {/* <label for="file-upload" className={styles.customfileupload}>
                <i class="fa fa-upload" aria-hidden="true"></i>Upload
</label>
              <input id="file-upload" type="file" style={{ display: 'none',borderRadius:'25px' }} onChange={(e) => this.onPhotoupload(e)} /> */}

          {/* <input type="file" style={{width:'20'}} onChange={(e)=>this.onPhotoupload(e)}></input> */}

          <div className={styles.ngpprofiledivbeforeform} >
            <Form  {...layout} style={{ border: '1px solid #FFFFFF' }}>
              <h4 className={styles.ngoname} >NGO NAME<span style={{ color: "red" }}>*</span></h4>
              <Form.Item className={styles.ngonameformitemcss}

              // style={{ width: '45%', alignContent: 'center', position: 'relative', top: '0px', left: '220px' }}
              >
                {getFieldDecorator('ngoname', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter NGO Name',
                    }
                  ],

                })(
                  <Input type="text" style={{ borderRadius: '25px' }}
                /*onChange={(e) =>{
                  this.setState({reqFlag1 : true})
                  }}*//>)}

              </Form.Item>
              <h4 className={styles.ngocategory}>NGO CATEGORY <span style={{ color: "red" }}>*</span></h4>
              <Form.Item className={styles.ngocategoryformitemcss}

              >
                {getFieldDecorator('ngocategory', {
                  rules: [
                    {
                      required: true,
                      message: 'Select Category',
                    }
                  ],

                })(
                  <Select placeholder='Select Category' onChange={this.clickChange} style={{ width: '85%' }} >

                    {
                      (this.state.ngocategory !== undefined) ?
                        this.state.ngocategory.Body.map((value) => (
                          <option value={value}>{value}</option>
                        )) : ""
                    }
                  </Select>
                )}

              </Form.Item>

              <h4 className={styles.ngocategoryotherlabel} >NGO CATEGORY OTHER</h4>
              <Form.Item className={styles.ngocategoryotherformitemcss}


              >
                {getFieldDecorator('ngocategoryother', {
                  //  rules: [
                  //   {
                  //     required: true,
                  //     message: 'Select Category',
                  //   }
                  // ],

                })(
                  <Select placeholder='Select Category' onChange={this.ngoCategoryOther} style={{ width: '85%' }} >

                    {
                      (this.state.ngocategory !== undefined) ?
                        this.state.ngocategory.Body.map((value) => (
                          <option value={value}>{value}</option>
                        )) : ""
                    }
                  </Select>
                )}

              </Form.Item>

              <h4 className={styles.ngotypeoforg} >TYPE OF ORGANIZATION<span style={{ color: 'red' }}>*</span></h4>
              <Form.Item className={styles.ngotypeoforgformitemcss}


              >
                {getFieldDecorator('typeoforganization', {
                  rules: [
                    {
                      required: true,
                      message: 'Select Organization Type',
                    }
                  ],

                })(
                  <Select placeholder='Select Organization Type' onChange={this.typeoforganization} style={{ width: '85%' }} >

                    {
                      (this.state.ngoorgtype !== undefined) ?
                        this.state.ngoorgtype.Body.map((value) => (
                          <option value={value}>{value}</option>
                        )) : ""
                    }
                  </Select>
                )}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '20px' }}>
                <h4 className={styles.ngoaddressngoeditprofilelabel} >NGO ADDRESS <span style={{ color: 'red' }}>*</span></h4>
              </Form.Item>
              <Form.Item className={styles.ngoaddressformitemcss}

              // style={{ width: '45%', alignContent: 'center', position: 'relative', top: '-15px', left: '220px' }}
              >
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter NGO Address',
                    }
                  ],

                })(
                  <Input type="text" style={{ borderRadius: '25px' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>
              <h4 className={styles.ngocitylabel} >CITY <span style={{ color: 'red' }}>*</span></h4>
              <Form.Item className={styles.ngocityformitemcss}

              // style={{ width: '86%', alignContent: 'center', position: 'relative', left: '530px', top: '-55px' }}
              >
                {getFieldDecorator('city', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter NGO City',
                    }
                  ],

                })(
                  <Input type="text" style={{ borderRadius: '25px', width: '24%' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>
              <h4 className={styles.ngopincodelabel} >PIN CODE <span style={{ color: 'red' }}>*</span></h4>
              <Form.Item className={styles.ngopincodeformitemcss}

              // style={{ width: '100%', alignContent: 'center', position: 'relative', left: '680px', top: '-95px' }}
              >
                {getFieldDecorator('pincode', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter Pincode',
                    },
                    {
                      max: 6,
                      message: "Please enter correct pincode"
                    }
                  ],

                })(
                  <Input maxLength={6} style={{ borderRadius: '25px', width: '22%' }}
                    onChange={(e) => {
                      const { value } = e.target;
                      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                      }
                      else {
                        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                        return;
                      }
                    }} />)}


              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
                <h4 className={styles.ngoemailabel} >E-MAIL ID<span style={{color:'red'}}>*</span></h4>
              </Form.Item>

              <Form.Item className={styles.ngoemailformitemcss}

                // style={{ width: '65%', alignContent: 'center', position: 'relative', top: '-65px', left: '220px' }}
              >
                {getFieldDecorator('email', {

                })(
                  <Input readOnly={true} style={{ borderRadius: '25px', width: '144%', backgroundColor: '	#E0E0E0' }}
                  /*onChange={(e) =>{
                    this.setState({reqFlag1 : true})
                    }}*/
                  />)}

              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
                <h4 className={styles.ngowebsite} >WEBSITE</h4>
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
                <h4 className={styles.ngooperationalsince} >OPERATIONAL SINCE <span style={{ color: 'red' }}>*</span></h4>
              </Form.Item>

              <Form.Item className={styles.ngooperationalsinceformitemcss}

                // style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-20px', left: '220px' }}
              >
                {getFieldDecorator('operationalsince', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter Operational Year',
                    },
                    {
                      max: 4,
                      message: 'Please enter Year in YYYY Format'
                    }
                  ],

                })(
                  <Input pattern="/^[0-9]+$/" maxLength={4} placeholder="Year Ex:1999" style={{ borderRadius: '25px', width: '144%' }}
                    onChange={(e) => {
                      const { value } = e.target;
                      const reg = /^[0-9]+$/;
                      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                      }
                      else {
                        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                        return;
                      }
                    }}
                  />)}


              </Form.Item>

              <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px', top: '0px' }}>
                <h4 className={styles.ngoregistartionnumber} >REGISTRATION NUMBER <span style={{ color: 'red' }}>*</span></h4>
              </Form.Item>

              <Form.Item className={styles.ngoregistartionnumberformitemcss}

                // style={{ width: '20%', alignContent: 'center', position: 'relative', top: '-60px', left: '425px' }}
              >
                {getFieldDecorator('registrationnumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter Registration Number',
                    }
                  ],

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
                  <Input type="text" readOnly={true} style={{ borderRadius: '25px', width: '144%', backgroundColor: '	#E0E0E0' }}
                  /* onChange={(e) =>{
                     this.setState({reqFlag1 : true})
                     }}*/
                  />)}


              </Form.Item>


              <h4 className={styles.ngobanksection} >
                BANK ACCOUNT DETAILS</h4>
              <div className={styles.ngobanksectiondiv} >
                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngobankname} >BANK NAME <span style={{ color: 'red' }}>*</span> </h4>
                </Form.Item>

                <Form.Item className={styles.ngobanknameformitemcss}

                  // style={{ width: '100%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
                >
                  {getFieldDecorator('bankname', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Bank Name',
                      }
                    ],

                  })(
                    <Input type="text" style={{ borderRadius: '25px' }}
                    /*onChange={(e) =>{
                      this.setState({reqFlag1 : true})
                      }}*/
                    />)}

                </Form.Item>
                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngobankaccountnumber} >BANK ACCOUNT NUMBER <span style={{ color: 'red' }}>*</span></h4>
                </Form.Item>

                <Form.Item className={styles.ngobankaccountnumberformitemcss}

                  // style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
                >
                  {getFieldDecorator('accountnumber', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Account Number',
                      },
                      {
                        max: 15,
                        message: 'Please enter correct account number'
                      }
                    ],

                  })(
                    <Input maxLength={15} style={{ borderRadius: '25px' }}
                      onChange={(e) => {
                        const { value } = e.target;
                        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                        }
                        else {
                          e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                          return;
                        }
                      }}
                    />)}

                </Form.Item>

                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngoifsccode} >IFSC CODE <span style={{ color: 'red' }}>*</span></h4>
                </Form.Item>

                <Form.Item className={styles.ngoifsccodeformitemcss}

                  // style={{ width: '50%', alignContent: 'center', position: 'relative', top: '-15px', left: '10px' }}
                >
                  {getFieldDecorator('ifsccode', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter IFSC CODE',
                      }, {
                        max: 11,
                        message: 'Please enter correct IFSC CODE'
                      }
                    ],

                  })(
                    <Input maxLength={11} style={{ borderRadius: '25px' }}
                      onChange={(e) => {
                        this.setState({ message1: "" })
                      }}
                    />)}
                  <span style={{ color: 'red' }}>{this.state.message1}</span>
                </Form.Item>

                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngobranch} >BRANCH<span style={{ color: 'red' }}>*</span></h4>
                </Form.Item>

                <Form.Item className={styles.ngobranchformitemcss}

                  // style={{ width: '53%', alignContent: 'center', position: 'relative', top: '-54px', left: '360px' }}
                >
                  {getFieldDecorator('branch', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Branch Name',
                      }
                    ],

                  })(
                    <Input type="text" style={{ borderRadius: '25px' }}
                    /*onChange={(e) =>{
                      this.setState({reqFlag1 : true})
                      }}*/
                    />)}

                </Form.Item>
                <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                  <h4 className={styles.ngoaccountholdername} >ACCOUNT HOLDER NAME <span style={{ color: 'red' }}>*</span></h4>
                </Form.Item>

                <Form.Item className={styles.ngoaccountholdernameformitemcss}

                  // style={{ width: '145%', alignContent: 'center', position: 'relative', top: '-32px', left: '10px' }}
                >
                  {getFieldDecorator('accname', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Account Holder Name',
                      }
                    ],

                  })(
                    <Input type="text" style={{ borderRadius: '25px' }}
                    /*onChange={(e) =>{
                      this.setState({reqFlag1 : true})
                      }}*/
                    />)}

                </Form.Item>

                <h4 className={styles.ngocontactpersondetails} >
                  CONTACT PERSON DETAILS</h4>

                <div className={styles.ngocontactpersondetailsdiv} >
                  <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                    <h4 className={styles.ngocontactpersonname} >NAME <span style={{ color: 'red' }}>*</span></h4>
                  </Form.Item>

                  <Form.Item className={styles.ngocontactpersonnameformitemcss}

                    // style={{ width: '100%', alignContent: 'center', position: 'relative', top: '-10px', left: '10px' }}
                  >
                    {getFieldDecorator('contactpersonname', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Contact Person Name',
                        }
                      ],

                    })(
                      <Input type="text" style={{ borderRadius: '25px' }}
                      /*onChange={(e) =>{
                        this.setState({reqFlag1 : true})
                        }}*/
                      />)}

                  </Form.Item>

                  <Form.Item style={{ alignContent: 'center', position: 'relative', top: '0px' }}>
                    <h4 className={styles.ngocontactpersonphone} >PHONE NUMBER <span style={{ color: 'red' }}>*</span></h4>
                  </Form.Item>

                  <Form.Item className={styles.ngocontactpersonphone}


                    // style={{ width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '10px', top: '-15px' }}
                  >
                    {getFieldDecorator('mobile', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Mobile Number',
                        }, {
                          min: 10,
                          message: "Please enter 10 digits mobile number"
                        }
                      ],

                    })(
                      <Input maxLength={10} style={{ borderRadius: '25px', width: '100%' }}
                        onChange={(e) => {
                          const { value } = e.target;
                          const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                          if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                          }
                          else {
                            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                            return;
                          }
                        }}
                      />)}

                    <a onClick={this.showModal} style={{ position: 'relative', color: '#000000', top: '-10px', left: '0px', textDecoration: 'underline' }}>Verify Mobile Number</a>
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
                  </Form.Item>



                </div>

                {/* <a href="" style={{ position: 'relative', left: '10px', top: '20px', color: '#000000' }}>Change Your Password</a> */}

                <Form.Item
                  name="agreement"
                  className={styles.ngotermscondition}
                  // style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', marginLeft: '146px' }}
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                    },
                  ]}
                >

                  <Checkbox className={styles.termsandcondition} onChange={this.checkboxchange} required={true}>
                    I agreed to the <a href="https://ngouploads.s3.ap-south-1.amazonaws.com/public/termsandconditions.txt">Term and Conditions</a>
                  </Checkbox>


                </Form.Item>

                <Form.Item className={styles.ngoupdatebuttonformitemeditprofile} >
                  <Button className={styles.ngoupdatebutton} type="primary" htmlType="submit" onClick={this.handleSubmit} >
                    Update
                      </Button>
                </Form.Item>
                <center>
                  <p style={{ color: 'blue' }}>{this.state.updatedmessage}</p>
                  <p style={{ color: 'red' }}>{this.state.fetchfail}</p>
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
