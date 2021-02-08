import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import GlobalHelper from '../utils/GlobalHelper.js'
import WrappedOtpVerifyForm from "./OtpVerify.js"
import '../index.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Row, Col, Collapse, Result,Modal, Breadcrumb, Radio, Icon, Button, Select, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge,message, Upload } from 'antd';

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


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: "", visible: false, value: 1, handleFlag: true,message1:"",failedmess:"",donorcategorys:"", mess: "", verifyFlag1: false, verifyFlag2: true, updateFlag: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { mess: "", loading: false }
    this.onChange = this.onChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.donorFetchname = this.donorFetchname.bind(this);
    // this.pancardValidation = this.pancardValidation.bind(this);

    this.name = this.props.donorfetchdata.body.SZ_DONOR_NAME;
    this.occupation = this.props.donorfetchdata.body.SZ_OCCUPATION;
    this.city = this.props.donorfetchdata.body.SZ_CITY;
    this.address = this.props.donorfetchdata.body.SZ_ADDRESS_LINE1;
    this.email = this.props.donorfetchdata.body.SZ_EMAIL;
    this.mobile = this.props.donorfetchdata.body.SZ_PHONE;
    this.pancard = this.props.donorfetchdata.body.SZ_PANCARD;
    this.age = this.props.donorfetchdata.Body1.SZ_AGE;
    this.donorFetchname();
  }
  donorFetchname(){
    let donorcategory = {
     "lookuptype":"DONOR_OCC"
    }
   const superagent = require('superagent');
   superagent
     .post(' https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/lookupfetch') // Ajax Call
     .send(donorcategory)
     .set('X-API-Key', 'foobar')
     .set('accept', 'application/json')
     .end((err, res) => {
       console.log("Response", res);
       let detailsRespJSOn = JSON.parse(res.text);
       console.log("respjson", detailsRespJSOn);
       if (detailsRespJSOn.Status == "SUCCESS") {
        console.log("DONOR Data", detailsRespJSOn)
        this.setState({ donorcategorys: detailsRespJSOn })
        console.log("DONOR CATEGORY", this.state.donorcategorys)

      }
      console.log("Donor Category",this.state.donorcategorys)
     })
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
              this.setState({ mess: respJson.Message, visible: true, mobileReadOnlyField: respJson.Body })


            } else if (respJson.success === false) {
              this.setState({ mess: respJson.message })
            }
          })

        //this.setState({mess:respJson.message})
        //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));

      }
    })
  };

//   pancardValidation(value) {
//     let  regex = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
//     console.log(`selected${value}`);
//     if(regex.test(value)) {
//       console.log("In True");
//          return true;
//     }
//     else{
//       console.log("In False");
//       this.setState({
//         mess:"Pan Invalid"
//       })
//       return false;
//     }


// }

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
          "pancard": (this.handleFlag === undefined ? this.pancard : values.pancard)//this.props.donorfetchdata.body.SZ_PANCARD
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
              this.setState({ mess: "Changes Updated Successfully!!!" })
            } else if (respJson.Status === "FAILED") {
              this.setState({ failedmess: "Failed To Update..." })
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
    document.getElementById("pancard").value = this.pancard;
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
        this.pancard = this.pancard;
      } else {
        this.pancard = document.getElementById("pancard").value;
      }
      document.getElementById("pancard").value = this.pancard;
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

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  render() {
    console.log("Donor Details", this.props.donorfetchdata)
    //var bgimg = "url('"+ window.origin+"/background.png')";
    const { loading, imageUrl } = this.state;
    const { visible} = this.state;
    const uploadButton = (
      <div style={{ marginTop: 8 }}>Upload</div>
    );

    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    return (
      <div className={styles.mainlayout} style={{ height: (window.innerHeight), backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
        <Layout className={styles.mainlayout}>
          <Content className={styles.mainlayout} style={{ background: 'white', marginLeft: '2px', overflow: 'unset' }}>
          <div style={{}}>
            <h5  className={styles.myprofiletextupdate}>MY PROFILE</h5>
          <span style={{ margin: '80px 0px 0px 105px' }}>
            <Avatar className={styles.staticprofileimage} size={64} shape="circle" src="img/NGO.png" style={{marginTop:'130px'}}/>
          </span>
          <div className={styles.editprofileupdatebutton} >
            <Upload
              name="avatar"
              listType="picture-card"
              className={styles.editprofileupdatebutton}
              //lassName="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange1}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

          </div>
            </div>
            {/* <h1 style={{ display: 'block', position: 'relative', left: '680px', fontWeight: 900, color: '#f8a500', top: '135px', fontSize: 'x-large' }}>MY PROFILE</h1> */}
            <div style={{ width: (window.innerWidth - 400), height: (window.innerHeight - 300), margin: '0px 0px 0px 160px', border: '1px solid #ffffff' }}>

              <Form className={styles.donoreditprofile} {...layout}>


                <div style={{ width: (window.innerWidth - 450), height: (window.innerHeight - 300), margin: '-250px 0px 0px 100px', border: '1px solid #ffffff' }}>
                  <div style={{ background: '#FFFFFF' }}>
                    <h4 className={styles.donorformlabelname} >NAME</h4>
                    <Form.Item className={styles.donorformitemnamecss}

                      // style={{ width: '55%', alignContent: 'center', position: 'relative', top: '21px', left: '70px' }}
                    >
                      {getFieldDecorator('name', {
                        // rules:[
                        //   {
                        //     required:true,
                        //     message:'Please enter Name'
                        //   }
                        // ],

                      })(
                        <Input type="text" style={{ borderRadius: '25px' }} />)}
                    </Form.Item>
                    <h4 className={styles.donorformlabelage} >AGE</h4>
                    <Form.Item className={styles.donorformitemagecss}

                      // style={{ width: '53%', alignContent: 'center', position: 'relative', left: '422px', top: '-19px' }}
                    >
                      {getFieldDecorator('age', {
                        rules:[
                          {
                            max:2
                          }
                        ]

                      })(
                        <Input maxLength={2} onChange={(e) =>{
                          const {value} = e.target;
                          const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                                   if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    
                                   }
                                   else{
                                     e.target.value = e.target.value.substring(0,e.target.value.length-1);
                                     return ;
                                   }
                          }} style={{ borderRadius: '25px', width: '24%' }} />)}
                    </Form.Item>
                    <h4 className={styles.donoroccupationlabel} >OCCUPATION </h4>
                    <Form.Item className={styles.donoroccupationitemcss}

                      // style={{ width: '100%', alignContent: 'center', position: 'relative', left: '518px', top: '-58px' }}
                    >
                      {getFieldDecorator('occupation', {
                      rules: [
                       {
                         required: true,
                         message: 'Select Occupation',
                       }
                     ],

                   })(
                     <Select placeholder="Select Occupation"  onChange={this.clickChange}  style={{ width: '22%' }} >
                 {
                 (this.state.donorcategorys !== undefined ) ?
                 this.state.donorcategorys.Body.map((value) => (
                   <option value={value}>{value}</option>
                 )):""
               }
             </Select>
                     )}</Form.Item>
                    <h4 className={styles.donorformcitylabel} >CITY</h4>

                    <Form.Item className={styles.donorformitemcitycss}

                      // style={{ width: '68%', alignContent: 'center', position: 'relative', left: '668px', top: '-98px' }}
                    >
                      {getFieldDecorator('city', {
                        //  rules:[
                        //   {
                        //     required:true,
                        //     message:'Please enter City'
                        //   }
                        // ],

                      })(
                        <Input type="text" style={{ borderRadius: '25px', width: '36%' }} />)}
                    </Form.Item>
                  </div>
                  <Form.Item style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px', top: '-55px' }}>
                    <h4 className={styles.donorformaddresslabel} >ADDRESS</h4>
                  </Form.Item>
                  <Form.Item className={styles.donorformitemaddresscss}
                    // style={{ width: '123%', left: '69px', top: '-90px' }}
                  >{getFieldDecorator('address', {
                    // rules:[
                    //   {
                    //     required:true,
                    //     message:'Please enter Address'
                    //   }
                    // ],

                  })(
                    <Input type="text" style={{ borderRadius: '25px' }} />)}
                  </Form.Item>
                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-45px' }}>
                    <h4 className={styles.donoremaillabel}>E-MAIL ID</h4>
                  </Form.Item>
                  <Form.Item className={styles.donoremailformitemcss}

                    // style={{ width: '84%', display: 'inline-block', alignContent: 'center', position: 'relative', top: '-60px', left: '70px' }}
                  >
                    {getFieldDecorator('email', {

                    })(
                      <Input readOnly={true} style={{ borderRadius: '25px', width: '70%',backgroundColor:'	#E0E0E0' }}
                        onChange={
                          (e) => {
                            this.setState({ verifyFlag1: true })
                          }
                        }
                      />)}
                  </Form.Item>

                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-38px' }}>
                    <h4 className={styles.donorphonenumberlabel} >PHONE NUMBER</h4>
                  </Form.Item>
                  <Form.Item className={styles.donorformitemphonenumbercss}

                    // style={{ width: '60%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '450px', top: '-99px' }}
                  > {getFieldDecorator('mobile', {
                    rules:[
                      {
                        min:10,
                        message:"Please enter minimum 10 digits"
                      }
                    ]
                    // rules:[
                    //   {
                    //     required:true,
                    //     message:'Please enter Phone Number'
                    //   }
                    // ],

                  })(
                    <Input maxLength={10}  style={{ borderRadius: '25px', width: '100%' }}
                    onChange={(e) =>{
                      const {value} = e.target;
                      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                               if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                               }
                               else{
                                 e.target.value = e.target.value.substring(0,e.target.value.length-1);
                                 return ;
                               }
                      }}
                    />)}
                  </Form.Item>
                  <a onClick={this.showModal} style={{ position: 'relative', color: '#000000', top: '-64px', left: '150px', textDecoration: 'underline' }}>Verify Mobile Number</a>
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
                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-38px' }}>
                    <h4 className={styles.donoreditppancardtext} >PAN CARD</h4>
                  </Form.Item>
                  <Form.Item className={styles.donorformitempancardcssprofileu}

                    // style={{ width: '58.6%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '70px', top: '-81px' }}
                  >{getFieldDecorator('pancard', {
                    // rules:[
                    //   {
                    //     required:true,
                    //     message:'Please enter PanCard Number'
                    //   }
                    // ],

                  })(
                    <Input
                    readOnly={true}
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
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} className={styles.donorprofileupdatebutton}>
                      Update
                        </Button>
                  </Form.Item>



                </div>
                <h4 style={{ position: 'relative', top: '-5px', color: 'blue', textAlign: 'center', right: '-86px' }}>{this.state.mess}</h4>
                <h4 style={{ position: 'relative', top: '-5px', color: 'red', textAlign: 'center', right: '-86px' }}>{this.state.failedmess}</h4>
                

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