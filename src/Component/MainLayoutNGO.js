import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import './css/MyNgo.css';
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import {Layout, Menu,Collapse,Row,Col,Table, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge,Select,Upload,message,Tabs,Card } from 'antd';
import WrappedNormalMyDetailsPage from './MyDetailsPage.js';
import WrappedNormalChangePasswordForm from "./ChangePassword.js"
import { Spin} from 'antd';
import { Chart,  registerShape,  Geom,  Axis,  Tooltip,  Interval,  Interaction,  Coordinate} from 'bizcharts';
//import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import {ReloadOutlined} from '@ant-design/icons';
import '../App.css';
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
const logo ='https://ngouploads.s3.ap-south-1.amazonaws.com/public/icon+give.png';
//       function getBase64(img, callback) {
//         const reader = new FileReader();
//         reader.addEventListener('load', () => callback(reader.result));
//         reader.readAsDataURL(img);
//       }

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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
  function callback(key) {
      console.log(key);
      }

   class mainlayoutNGO extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",value:1,varDetail:"", flag1:""} ;
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange1=this.handleChange1.bind(this);
          this.clickChange=this.clickChange.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.myDetailClick = this.myDetailClick.bind(this);
          this.state={ mess : "", loading:false}
          this.onChange=this.onChange.bind(this);
          this.state = {ngoupdatedetails:"", ngoupdateprofile:""};
        }

            onChange = e =>
            {
            console.log('radio checked', e.target.value);
            this.setState({
              value: e.target.value,
            });
          };
           /*handleChange(event)
        {
             this.setState({ value: event.target.value });
               window.location.reload();
        }*/

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

          handleChange(data){
            this.setState({changePasswordFlag:data})
            ReactDOM.render(<WrappedNormalChangePasswordForm data={this.props.data}/>,document.getElementById('root'));
          }
        handleSubmit(e)
        {
               }
               homeClick(data){
                 this.setState({flag1:data})
                 this.setState({varDetail:""})
               }

          myDetailClick(data){
            this.setState({varDetail:data})
            this.setState({flag1:""})
          }

    render(){
                  const { loading, imageUrl } = this.state;
                   const uploadButton = (
                   <div style={{ marginTop: 8 }}>Upload</div>
               );


              //var bgimg = "url('"+ window.origin+"/background.png')";

              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;
              const alltimedonation = 43000;
              const location = "Pune";
              const currentmonthdonation = 3000;
              const donarData=[
                {
                 Name:"Pratik",
                 Location: "Pune",
                 Amount: "₹ 1000",
                 Date: "Date"
                },
                {
                  Name:"Name",
                  Location: "Pune",
                  Amount: "₹ 1040",
                  Date: "Date"
                 },
                 {
                  Name:"Name",
                  Location: "Pune",
                  Amount: "₹ 2000",
                  Date: "Date"
                 },
                 {
                  Name:"Name",
                  Location: "Pune",
                  Amount: "₹ 5000",
                  Date: "Date"
                 }
              ]
              const dataSource = [
                {
                  key: '1',
                  Month: 'June 2019',
                  Donation: '₹ 500',

                },
                {
                  key: '2',
                  Month: 'July 2019',
                  Donation: '₹ 700',

                },
                {
                    key: '2',
                    Month: 'Augest 2019',
                    Donation: '₹ 200',

                  },
                  {
                    key: '2',
                    Month: 'Sepetember 2019',
                    Donation: '₹ 40',

                  },

                  {
                    key: '2',
                    Month: 'October 2019',
                    Donation: '₹ 400',

                  },
                  {
                    key: '2',
                    Month: 'November 2019',
                    Donation: '₹ 400',

                  }
              ];
              const donationdata = [
                { day: '1951 ', donation: 38 },
                { day: '1952 ', donation: 52 },
                { day: '1956 ', donation: 61 },
                { day: '1957 ', donation: 45 },
                { day: '1958 ', donation: 48 },
                { day: '1959 ', donation: 38 },
                { day: '1960 ', donation: 38 },
                { day: '1962 ', donation: 38 },
              ];
              const columns = [
                {
                  title: 'Month',
                  dataIndex: 'Month',
                  key: 'Month',
                },
                {
                  title: 'Donation',
                  dataIndex: 'Donation',
                  key: 'Donation Amount',
                },

              ];
              const data = [
                {
                  type: "Inactive",
                  value: 38
                },
                {
                  type: "Active",
                  value: 62
                }
              ];
        return(
        <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
        <Layout>
            <Header>
                <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white',marginTop:'-20px'}}>
                    <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '50px',top: '0px',left: '0px'}}/>
                    <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-950PX'}}><Router><Link onClick={this.homeClick.bind(this,"home")} style={{color:'#FFFFFF'}} to={'Home'}>HOME</Link></Router></a>
                    <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-970px'}}><Router><Link onClick={this.myDetailClick.bind(this,"my_detail")} style={{color:'#FFFFFF'}}>MY DETAILS</Link></Router></a>
                    <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-990px'}}><Router><Link onClick={this.handleChange.bind(this,"change_password")} style={{color:'#FFFFFF'}}>CHANGE PASSWORD</Link></Router></a>
                    <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1010px'}}>NGO</a>
                    <a  href = "" style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1030px'}}>LOGOUT</a>
                </div>
            </Header>

            <Layout style={{marginTop: '-25px',height:( window.innerHeight - 107 )}}>
                <img src="img/subHeaderImg.png" style={{width: window.innerWidth+1 ,height: '110px',top: '0px',left: '0px'}}/>
              <Content style={{background:'white',marginLeft:'2px',overflow : 'scroll'}}>
                  {
                    (this.state.flag1==="home")?<div>
                         <img src="img/NGOLanding.png" style={{width: '100%', height: '100%', paddingBottom:'40px'}}/>
                    </div>:null
                  }
                 {
                   (this.state.varDetail=== "my_detail")?<WrappedNormalMyDetailsPage ngocategorydropdown={this.props.ngocategorydropdown}  ngoupdateprofile={this.props.ngoupdateprofile}/>:null
                 }
                 <div>
                      <img src="img/NGOLanding.png" style={{width: '100%', height: '100%'}}/>
                 </div>
                </Content>
                </Layout>
            <Footer style={{marginLeft:'-50px',background:'#FFFFFF'}}>
        <img src="img/footerMD.png" style={{width: window.innerWidth+22 ,height: '45px',marginLeft:'-9px'}} />
          </Footer>
          </Layout>
          </div>
           );
           }
           }
   const WrappedNormalMainLayoutNGO = Form.create()(mainlayoutNGO);
   export default WrappedNormalMainLayoutNGO;
