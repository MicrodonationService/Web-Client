import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import tabsjson from './json/tabJson.js'
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import {Layout, Menu,Collapse,Row,Col, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge,Select,Upload,message,Tabs } from 'antd';
import GlobalHelper from '../utils/GlobalHelper.js';
import WrappedNormalMyDetailsPage from './MyDetailsPage.js';
import { Spin} from 'antd';
import tabJson from './json/tabJson.js'
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

  function callback(key) {
      console.log(key);
      }


   class mainlayoutNGO extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",value:1,varDetail:""} ;
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleChange1=this.handleChange1.bind(this);
          this.clickChange=this.clickChange.bind(this);
          this.myDetailClick = this.myDetailClick.bind(this);
          this.state={ mess : "", loading:false}
          this.onChange=this.onChange.bind(this);

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

          myDetailClick(data){
            this.setState({varDetail:data})
          }

    render(){
                  const { loading, imageUrl } = this.state;
                   const uploadButton = (
                   <div style={{ marginTop: 8 }}>Upload</div>
               );


            if(this.registerResponse === true)
            {
                return(<Switch>

                <Route path="/*" render={() => (
                  <Redirect to={GlobalHelper.globlevar['contextpath']+ "OtpGenerate"} />
                 )} />
                   </Switch>)

            }

              //var bgimg = "url('"+ window.origin+"/background.png')";
              var bgimg = "url('"+  GlobalHelper.globlevar['contextpath'] +"background.png')";
              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;

        return(
        <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
        <Layout>
            <Header>
                <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white',marginTop:'-20px'}}>
                    <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '50px',top: '0px',left: '0px'}}/>
                  <a href="" style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1000PX'}}>HOME</a>
                    <a href=""  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1020px'}}><Link onClick={this.myDetailClick.bind(this,"my_detail")} style={{color:'#FFFFFF'}} to={'MyDetailsPage'}>MY DETAILS</Link></a>
                    <a href="" style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1040px'}}>CONTACT US</a>
                    <a href="" style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1060px'}}>NGO</a>


                </div>
            </Header>

            <Layout style={{marginTop: '-25px',height:( window.innerHeight - 107 )}}>
                <img src="img/subHeaderImg.png" style={{width: window.innerWidth+1 ,height: '55px',top: '0px',left: '0px'}}/>
              <Content style={{background:'white',marginLeft:'2px',overflow : 'unset'}}>

                 {
                   (this.state.varDetail=== "my_detail")?<WrappedNormalMyDetailsPage/>:null
                 }
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
