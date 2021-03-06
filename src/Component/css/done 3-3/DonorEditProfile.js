import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import GlobalHelper from '../utils/GlobalHelper.js'
import '../index.css';
import MainLayout from "./MainLayout.js"
import WrappedOtpVerifyForm from "./OtpVerify.js"
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Row, Modal, Col, Collapse, Result, Breadcrumb, Radio, Icon, Button, DatePicker, Carousel, Form, Input, Checkbox, Avatar, Badge, Select, message, Upload } from 'antd';
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

class DonorEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: "", visible: false, value: 1, mobileReadOnlyField: "", message1: "", handleFlag: true, updatefail: "", mess: "", verifyFlag1: false, verifyFlag2: true, updateFlag: false, donorcatgdropdown: "", donorcategorys: "", ispanvalid: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { mess: "", loading: false }
    this.onChange = this.onChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.donorFetchname = this.donorFetchname.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.pancardValidation = this.pancardValidation.bind(this);


    this.email = this.props.email;

    this.donorFetchname();


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
    //this.NGOCATEGORY = value;
    this.setState({
      donorcatgdropdown: value

    })
    console.log("DONOR CATG Drop Down", this.state.donorcatgdropdown)
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

  // handleValidation = (event)=>{
  //   event.preventDefault();
  //   const {name, value} = event.target;
  //   let errors = this.state.errors;

  //   switch (name){
  //     case
  //   }
  // }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };





  pancardValidation(value) {
    let regex = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
    console.log(`selected${value}`);
    if (regex.test(value)) {
      console.log("In True");
      return true;
    }
    else {
      console.log("In False");
      this.setState({
        mess: "Pan Invalid"
      })
      return false;
    }

  }


  donorFetchname() {
    let donorcategory = {
      "lookuptype": "DONOR_OCC"
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

        console.log("Donor Category", this.state.donorcategorys)
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Data");
    this.props.form.validateFields((err, values) => {
      this.setState({ handleFlag: true })
      // var mobilen
      // console.log("Mobile",mobilenumber);
      if (this.pancardValidation(values.pancard)) {


        if (!err) {

          let updateProfileRequest = {
            "CognitoID": this.props.loginResponse,
            "name": values.name,
            "age": "" + values.age,
            "address": values.address,
            "city": values.city,
            "State": "Maharashtra",
            "Country": "India",
            "PostalCode": "121211",
            "email": this.props.email,
            "contactNo": values.mobile,
            "Occupation": this.state.donorcatgdropdown,
            "pancard": "" + values.pancard//this.props.donorfetchdata.body.SZ_PANCARD
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
                this.setState({ mess: "Profile Data Updated Successfully!!!" })
                let loginRequest = {
                  "email": this.props.email
                };
                const superagent = require('superagent');
                superagent
                  .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donarfetchdata') // Ajax call
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
                    // ReactDOM.render(<MainLayout email={this.props.email} donorcategorydrop={this.props.donorcategorydrop} donorfetchdata={fatchDetailsRespJson} />, document.getElementById('root'));
                  })
              } else if (respJson.Status === "FAILED") {
                this.setState({ failedmess: "Failed In Updated Data..." })
              }
            });
        }
      } else {
        console.log('In Pan Else');
        this.setState({ message1: "Invalid PAN Number" })
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

    //document.getElementById("Mobile").value=this.mobile;
  }

  render() {
    console.log("Donor Details", this.props.donorfetchdata)
    const { visible, confirmLoading } = this.state;
    const { loading, imageUrl } = this.state;
    //var bgimg = "url('"+ window.origin+"/background.png')";

    const { getFieldDecorator } = this.props.form;
    const { posts } = this.state;

    const uploadButton = (
      <div style={{ marginTop: 8 }}>Upload</div>
    );

    return (

      <div className={styles.mainlayout} style={{ height: (window.innerHeight), backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }} >
        <Header>
          <div className={styles.mobileviewiheaderimg} style={{ marginLeft: '-50px', width: (window.innerWidth), background: 'white' }}>
            <img className={styles.mobileviewiheaderimg} src="img/mdHeader.png" style={{ width: window.innerWidth, height: '70px', top: '0px', left: '0px' }} />

          </div>
          
        </Header>
        <Layout className={styles.mainlayout}>
          <Content className={styles.mainlayout} >
            <div style={{}}>
              <h5 className={styles.myprofiletext} >MY PROFILE</h5>
              <span style={{ margin: '60px 0px 0px 105px' }}>
                <Avatar className={styles.staticprofileimage} size={64} shape="circle" src="img/NGO.png" />
              </span>
              <div className={styles.uploadbuttoncss} >
                <Upload
                  name="avatar"
                  className={styles.uploadbuttoncss}
                  listType="picture-card"
                  //className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange1}
                >
                  {imageUrl ? <img alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>

              </div>
            </div>
            {/* <h1 style={{ display: 'block', position: 'relative', left: '680px', top: '-250px', fontWeight: 900, color: '#f8a500', fontSize: 'x-large' }}>MY PROFILE</h1> */}
            <div style={{ width: (window.innerWidth - 400), height: (window.innerHeight - 300), margin: '0px 0px 0px 160px', position: 'relative', bottom: '40px', border: '1px solid #ffffff' }}>

              <Form className={styles.donorformmaindiv} {...layout}>


                <div style={{ width: (window.innerWidth - 450), height: (window.innerHeight - 300), margin: '-180px 0px 0px 100px', border: '1px solid #ffffff' }}>
                  <div style={{ background: '#FFFFFF' }}>
                    <h4 className={styles.donorformlabelname} >NAME <span style={{ color: 'red' }}>*</span> </h4>
                    <Form.Item className={styles.donorformitemnamecss}

                    // style={{ width: '55%', alignContent: 'center', position: 'relative', top: '21px', left: '70px' }}
                    >
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter Name',
                          }
                        ],

                      })(
                        <Input type="text" title="Name must be only letters" oninvalid="setCustomValidity('Name must be only letters')" pattern="[A-Za-z]" style={{ borderRadius: '25px' }} />)}
                      {/* <span class="validity"  style={{color:'red'}}>Name must be only letters</span> */}
                    </Form.Item>
                    <h4 className={styles.donorformlabelage} >AGE<span style={{ color: 'red' }}>*</span></h4>
                    <Form.Item className={styles.donorformitemagecss}

                    // style={{ width: '53%', alignContent: 'center', position: 'relative', left: '422px', top: '-19px' }}
                    >
                      {getFieldDecorator('age', {
                        rules: [
                          {
                            required: true,
                          }, {
                            max: 2
                          }
                        ],


                      })(
                        <Input maxLength={2} onChange={(e) => {
                          const { value } = e.target;
                          const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                          if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {

                          }
                          else {
                            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                            return;
                          }
                        }} style={{ borderRadius: '25px', width: '24%' }} />)}
                    </Form.Item>
                    <h4 className={styles.donoroccupationlabel} >OCCUPATION<span style={{ color: 'red' }}>*</span></h4>
                    <Form.Item className={styles.donoroccupationitemcss}
                    //  style={{ width: '68%', alignContent: 'center', position: 'relative', left: '520px', top: '-60px' }}
                    >
                      {getFieldDecorator('occupation', {
                        rules: [
                          {
                            required: true,
                            message: 'Select Occupation',
                          }
                        ],

                      })(
                        <Select placeholder="Select Occupation" onChange={this.clickChange} style={{ width: '30%' }} >
                          {
                            (this.state.donorcategorys !== undefined) ?
                              this.state.donorcategorys.Body.map((value) => (
                                <option value={value}>{value}</option>
                              )) : ""
                          }
                        </Select>
                      )}

                    </Form.Item>
                    <h4 className={styles.donorformcitylabel}>CITY <span style={{ color: 'red' }}>*</span></h4>

                    <Form.Item className={styles.donorformitemcitycss}

                    // style={{ width: '68%', alignContent: 'center', position: 'relative', left: '668px', top: '-126px' }}
                    >
                      {getFieldDecorator('city', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter City',
                          }
                        ],

                      })(
                        <Input type="text" style={{ borderRadius: '25px', width: '36%' }} />)}
                    </Form.Item>
                  </div>
                  <Form.Item style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px', top: '-55px' }}>
                    <h4 className={styles.donorformaddresslabel} >ADDRESS<span style={{ color: 'red' }}>*</span></h4>
                  </Form.Item>
                  <Form.Item className={styles.donorformitemaddresscss}
                  // style={{ width: '123%', left: '69px', top: '-50px' }}
                  >{getFieldDecorator('address', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Address',
                      }
                    ],

                  })(
                    <Input type="text" style={{ borderRadius: '25px' }} />)}
                  </Form.Item>
                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-45px' }}>
                    <h4 className={styles.donoremaillabel} >E-MAIL ID<span style={{ color: 'red' }}>*</span></h4>
                  </Form.Item>
                  <Form.Item className={styles.donoremailformitemcss}

                  // style={{ width: '84%', display: 'inline-block', alignContent: 'center', position: 'relative', top: '-60px', left: '70px' }}
                  >
                    {getFieldDecorator('email', {

                    })(
                      <Input readOnly={true} style={{ borderRadius: '25px', width: '70%', backgroundColor: '	#E0E0E0' }}
                        onChange={
                          (e) => {
                            this.setState({ verifyFlag1: true })
                          }
                        }
                      />)}
                  </Form.Item>

                  <Form.Item style={{ alignContent: 'center', position: 'relative', left: '0px', top: '-38px' }}>
                    <h4 className={styles.donorphonenumberlabel} >PHONE NUMBER <span style={{ color: 'red' }}>*</span></h4>
                  </Form.Item>
                  <Form.Item className={styles.donorformitemphonenumbercss}

                  // style={{ width: '60%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '450px', top: '-99px' }}
                  > {getFieldDecorator('mobile', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Phone Number',

                      },
                      {
                        min: 10,
                        message: "Please enter minimum 10 digits"
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

                  </Form.Item>
                  <a onClick={this.showModal} className={styles.verifynumbertext} >Verify Mobile Number</a>
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
                    <h4 className={styles.donorformpancardtext} >PAN CARD <span style={{ color: 'red' }}>*</span></h4>
                  </Form.Item>
                  <Form.Item className={styles.donorformitempancardcss}

                  // style={{ width: '58.6%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '70px', top: '50px' }}
                  >{getFieldDecorator('pancard', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter Pancard Number',
                      }
                    ],

                  })(
                    <Input

                      className="PAN"
                      type="text"

                      maxLength="10"


                    // onChange={
                    //   (e)=>{
                    //     this.setState({verifyFlag2 : true})
                    //   }
                    // }
                    />

                  )}
                    <span style={{ color: 'red' }}>{this.state.message1}</span>


                  </Form.Item>
                  <Form.Item style={{ width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '649px', top: '-80px' }}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} className={styles.donorprofileupdatebutton} >
                      Update
                        </Button>
                  </Form.Item>

                </div>



              </Form>
              <h4 style={{ position: 'relative', top: '2px', color: 'blue', textAlign: 'center', right: '-90px' }}>{this.state.mess}</h4>
              <h4 style={{ position: 'relative', top: '2px', color: 'red', textAlign: 'center', right: '-90px' }}>{this.state.failedmess}</h4>

            </div>
          </Content>
        </Layout>

      </div>


    );
  }
}
const WrappedDonorEditProfile = Form.create()(DonorEditProfile);
export default WrappedDonorEditProfile;