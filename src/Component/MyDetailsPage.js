import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import {Layout, Menu,Collapse,Row,Col, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge,Select,Upload,message,Tabs } from 'antd';
import { Spin} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
const { TabPane } = Tabs;
const {Option} =Select;
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


   class MyDetailsPage extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",value:1} ;
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleChange1=this.handleChange1.bind(this);
          this.clickChange=this.clickChange.bind(this);
          this.state={ mess : "", loading:false}
          this.onChange=this.onChange.bind(this);

          this.mobile = this.props.ngoupdateprofile.Body.SZ_PHONE1;
          this.email = this.props.ngoupdateprofile.Body.SZ_EMAIL;
          this.name = this.props.ngoupdateprofile.Body.SZ_NGO_NAME;
          this.city = this.props.ngoupdateprofile.Body.SZ_CITY;
          this.pincode = this.props.ngoupdateprofile.Body1.SZ_POSTAL_CODE;
          /*this.website = this.props.ngoupdateprofile.Body.SZ_WEBSITE;
          this.accountnumber = this.props.ngoupdateprofile.Body.SZ_BANK_ACCOUNT_NO;
          this.accname = this.props.ngoupdateprofile.Body.SZ_BANK_ACCT_NAME;
          this.ifsccode = this.props.ngoupdateprofile.Body.SZ_IFSC_CODE;*/
          this.address = this.props.ngoupdateprofile.Body.SZ_ADDRESS_LINE1;

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
          clickChange(value)
          {
            console.log(`selected ${value}`);
            this.NGOCATEGORY = value;
          }

        handleSubmit(e)
        {
               }

               componentDidMount() {
                //setTimeout(()=>{

                  document.getElementById("ngoname").value=this.name;
                  document.getElementById("mobile").value=this.mobile;
                  document.getElementById("email").value=this.email;
                  document.getElementById("city").value=this.city;
                /*  document.getElementById("website").value=this.website;
                  document.getElementById("accountnumber").value=this.accountnumber;
                  document.getElementById("accname").value=this.accname;
                  document.getElementById("ifsccode").value=this.ifsccode;*/
                  document.getElementById("address").value= this.address;

                //},500)
              }

              componentDidUpdate(prevProps, prevState)
               {
                 try{
                   if( document.getElementById("ngoname").value === ""){
                     this.name = this.name;
                   }else {
                     this.name = document.getElementById("ngoname").value;
                   }
                   document.getElementById("ngoname").value=this.name;
                 }catch(e){console.error(e)}
                   //document.getElementById("EmailID").value=this.email;
                 try{
                   if( document.getElementById("mobile").value === ""){
                     this.mobile = this.mobile;
                   }else {
                     this.mobile = document.getElementById("mobile").value;
                   }
                   document.getElementById("mobile").value=this.mobile;
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
                  if( document.getElementById("city").value === ""){
                    this.city = this.city;
                  }else {
                    this.city = document.getElementById("city").value;
                  }
                  document.getElementById("city").value=this.city;
                }catch(e){console.error(e)}
                try{
                  if( document.getElementById("pinCode").value === ""){
                    this.pincode = this.pincode;
                  }else {
                    this.pincode = document.getElementById("pinCode").value;
                  }
                  document.getElementById("pinCode").value=this.pincode;
                }catch(e){console.error(e)}
                /*try{
                  if( document.getElementById("accountnumber").value === ""){
                    this.accountnumber = this.accountnumber;
                  }else {
                    this.accountnumber = document.getElementById("accountnumber").value;
                  }
                  document.getElementById("accountnumber").value=this.accountnumber;
                }catch(e){console.error(e)}
                try{
                  if( document.getElementById("accname").value === ""){
                    this.accname = this.accname;
                  }else {
                    this.accname = document.getElementById("accname").value;
                  }
                  document.getElementById("accname").value=this.accname;
                }catch(e){console.error(e)}
                try{
                  if( document.getElementById("ifsccode").value === ""){
                    this.ifsccode = this.ifsccode;
                  }else {
                    this.ifsccode = document.getElementById("ifsccode").value;
                  }
                  document.getElementById("ifsccode").value=this.ifsccode;
                }catch(e){console.error(e)}*/
                try{
                  if( document.getElementById("address").value === ""){
                    this.address = this.address;
                  }else {
                    this.address = document.getElementById("address").value;
                  }
                  document.getElementById("address").value=this.address;
                }catch(e){console.error(e)}

               }

    render(){
      console.log("Mydetails", this.props.ngoupdateprofile)
                  const { loading, imageUrl } = this.state;
                   const uploadButton = (
                   <div style={{ marginTop: 8 }}>Upload</div>
               );


              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;

        return(
                 <div style={{width:'90%', height: '100%',marginLeft:'0px', border: '1px solid #FFFFFF'}}>
                 <h5 style={{display: 'block', position: 'relative', left: '70px', top: '7px',fontWeight: 800, color:'#f8a500', fontSize: 'x-large'}}>MY DETAILS</h5>
                 <span style={{margin:'60px 0px 0px 105px'}}>
                      <Avatar size={64} shape="circle" src="img/NGO.png"  />
                  </span>
                 <div style={{margin:'15px 0px 0px 85px '}}>
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

                  <div style={{width:'80%',height:'96%',marginTop:'-220px',marginLeft:'50px',overflowY:'auto',overflowX:'hidden'}}>
                    <Form {...layout} style={{border:'1px solid #FFFFFF'}}>
                    <h4 style={{marginTop:'-30px',marginLeft:'220px'}}>NGO NAME</h4>
                          <Form.Item

                      style={{width: '45%', alignContent: 'center', position: 'relative',  top: '0px',left:'220px'}}
                      >
                        {getFieldDecorator('ngoname', {

})(
<Input style={{borderRadius: '25px'}} />)}

                      </Form.Item>
                      <h4 style={{marginTop:'-69px',marginLeft:'530px'}}>NGO CATEGORY</h4>
                      <Form.Item style={{left:'530px',top:'-41px',width:'53%'}}>
                          <Select defaultValue="1"  onChange={this.clickChange} style={{width:'85%'}}>
                            <Option value="1">Health</Option>
                            <Option value="2">NGO2</Option>
                            <Option value="3">NGO3</Option>
                            <Option value="4">NGO4</Option>
                          </Select>
                      </Form.Item>
                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px',top:'0px'}}>
                      <h4 style={{marginTop:'-43px',marginLeft:'70px'}}>NGO ADDRESS</h4>
                      </Form.Item>
                            <Form.Item

                        style={{width: '45%', alignContent: 'center', position: 'relative',  top: '-15px',left:'220px'}}
                        >
                           {getFieldDecorator('address', {

})(
<Input style={{borderRadius: '25px'}}/>)}

                        </Form.Item>
                       <h4 style={{marginTop:'-75px',marginLeft:'530px'}}>CITY</h4>
                   <Form.Item

                      style={{width: '86%', alignContent: 'center', position: 'relative', left: '530px', top: '-55px'}}
                      >
                         {getFieldDecorator('city', {

})(
  <Input style={{borderRadius: '25px',width: '24%'}}/>)}

                      </Form.Item>
                 <h4 style={{marginTop:'-115px',marginLeft:'680px'}}>PIN CODE</h4>
                      <Form.Item
                      style={{width: '100%', alignContent: 'center', position: 'relative', left: '680px', top: '-95px'}}
                      >{getFieldDecorator('pinCode', {

})(
                        <Input style={{borderRadius: '25px', width: '22%'}}/>)}
                      </Form.Item>

                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px',top:'0px'}}>
                      <h4 style={{marginTop:'-97px',marginLeft:'70px'}}>E-MAIL ID</h4>
                      </Form.Item>

                       <Form.Item

                      style={{width: '65%', alignContent: 'center', position: 'relative', top: '-65px',left:'220px'}}
                      >
                        {getFieldDecorator('email', {

})(
  <Input style={{borderRadius: '25px', width: '144%'}}/>)}

                      </Form.Item>

                      <Form.Item style={{ alignContent: 'center', position: 'relative', left: '150px',top:'0px'}}>
                      <h4 style={{marginTop:'-71px',marginLeft:'70px'}}>WEBSITE</h4>
                      </Form.Item>

                       <Form.Item

                      style={{width: '65%', alignContent: 'center', position: 'relative', top: '-40px',left:'220px'}}
                      >
                        {getFieldDecorator('website', {

})(
  <Input style={{borderRadius: '25px', width: '144%'}}/>)}


                      </Form.Item>
                      <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '220px', top: '-35px'}}>
                       BANK ACCOUNT DETAILS</h4>
                      <div style={{width:'63%',height:'214px',marginLeft:'220px',marginTop:'-40px',background:'#e8e8e8'}}>
                      <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                      <h4 style={{marginTop:'0px',marginLeft:'-170px'}}>BANK ACCOUNT NUMBER</h4>
                      </Form.Item>

                       <Form.Item

                      style={{width: '145%', alignContent: 'center', position: 'relative', top: '-10px',left:'10px'}}
                      >
                        {getFieldDecorator('accountnumber', {

})(
  <Input style={{borderRadius: '25px'}}/>)}

                      </Form.Item>

                      <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                      <h4 style={{marginTop:'-15px',marginLeft:'10px'}}>IFSC CODE</h4>
                      </Form.Item>

                       <Form.Item

                      style={{width: '90%', alignContent: 'center', position: 'relative', top: '-15px',left:'10px'}}
                      >
                         {getFieldDecorator('ifsccode', {

})(
  <Input style={{borderRadius: '25px'}}/>)}

                      </Form.Item>

                      <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                      <h4 style={{marginTop:'-86px',marginLeft:'390px'}}>BRANCH</h4>
                      </Form.Item>

                      <Form.Item
                     rules={[
                         {
                           required: true,
                         },
                       ]}
                     style={{width: '53%', alignContent: 'center', position: 'relative', top: '-54px',left:'385px'}}
                     >
                       <Input style={{borderRadius: '25px'}}/>
                     </Form.Item>
                     <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                     <h4 style={{marginTop:'-60px',marginLeft:'10px'}}>REGISTERED NAME</h4>
                     </Form.Item>

                     <Form.Item

                    style={{width: '145%', alignContent: 'center', position: 'relative', top: '-32px',left:'10px'}}
                    >
                       {getFieldDecorator('accname', {

})(
  <Input style={{borderRadius: '25px'}}/>)}

                    </Form.Item>

                    <h4 style={{ display: 'inline-block', alignContent: 'center', position: 'relative', left: '0px', top: '-18px'}}>
                     CONTACT PERSON DETAILS</h4>

                     <div style={{width:'100%',height:'180px',marginLeft:'0px',marginTop:'-17px',background:'#e8e8e8'}}>
                     <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                     <h4 style={{marginTop:'0px',marginLeft:'10px'}}>NAME</h4>
                     </Form.Item>

                      <Form.Item
                     rules={[
                         {
                           required: true,
                         },
                       ]}
                     style={{width: '145%', alignContent: 'center', position: 'relative', top: '-10px',left:'10px'}}
                     >
                       <Input style={{borderRadius: '25px'}}/>
                     </Form.Item>

                     <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                     <h4 style={{marginTop:'-10px',marginLeft:'10px'}}>PHONE NUMBER</h4>
                     </Form.Item>

                     <Form.Item


                     style={{width: '100%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '10px', top: '-15px'}}
                     >
                       {getFieldDecorator('mobile', {

})(
<Input style={{borderRadius: '25px', width: '100%'}}/>)}

                       <a href="" style={{position: 'relative', right: '0px', top: '-7px', color:'#000000'}}>Verify Phone Number</a>
                     </Form.Item>

                     <Form.Item style={{ alignContent: 'center', position: 'relative',top:'0px'}}>
                     <h4 style={{marginTop:'-125px',marginLeft:'450px'}}>OTP</h4>
                     </Form.Item>
                     <Form.Item
                     rules={[
                         {
                           required: true,
                         },
                       ]}
                     style={{width: '70%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '438px', top: '-96px'}}
                     >
                       <Input style={{borderRadius: '25px', width: '58%'}}/>
                       <a href="" style={{position: 'relative', right: '155px', top: '30px', color:'#000000'}}>Resend OTP</a>
                     </Form.Item>

                     </div>

                     <a href="" style={{position: 'relative', left: '10px', top: '20px', color:'#000000'}}>Change Your Password</a>

                     <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '430px', top: '-15px'}}>
                      <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'50%',borderRadius: '25px',background: '#f8a500',border:'#FFFFFF',color:'#000000'}}>
                        Update
                      </Button>
                      </Form.Item>

                      </div>

                    </Form>
</div>

                 </div>
           );
           }
           }
   const WrappedNormalMyDetailsPage = Form.create()(MyDetailsPage);
   export default WrappedNormalMyDetailsPage;
