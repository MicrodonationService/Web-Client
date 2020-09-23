import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row,Card, Cascader,Divider, Select, AutoComplete,Tabs, Radio} from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import UIregisterMD from "./UIRegisterMD.js";
import PasswordSetSuccess from "./PasswordSetSuccess.js"
import WrappedNormalChangePasswordForm from "./ChangePassword.js"
import WrappedNormalReferPage from "./ReferPage.js"
import WrappedNormalEditProfileForm from "./EditProfile.js"
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
const {Group} = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const AutoCompleteOption = AutoComplete.Option
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
class MainLayout extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state ={
        flag: "",
        flag1: "",
        profileUpdateFlag : "",
        changePasswordFlag : "",

      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      //this.userName1 = this.props.data.data.user.name;
    }

    componentDidMount(){
       this.setState({profileUpdateFlag : ""})
       this.setState({changePasswordFlag : ""})
    }


       handleSubmit(data){
        this.setState({flag:data})
        this.setState({profileUpdateFlag : ""})
        this.setState({changePasswordFlag : ""})
         //ReactDOM.render(<WrappedNormalReferPage />,document.getElementById('root'));
       }
       handleChange(data){
         this.setState({changePasswordFlag:data})
         ReactDOM.render(<WrappedNormalChangePasswordForm data={this.props.data}/>,document.getElementById('root'));
       }

       homeClick(data){
         this.setState({flag1:data})
         this.setState({changePasswordFlag : ""})
         this.setState({flag:""})
         this.setState({profileUpdateFlag : ""})
       }

       profileUpdateClick(data){
         this.setState ({profileUpdateFlag : data })
         this.setState({changePasswordFlag : ""})
         this.setState({flag:""})
       }
  render(){

    /*if(this.state.flag === true){
      return(
        <div style={{display:"inline-block",height:"100%",width:"100%"}}>
        <Switch>
            <Route exact component={WrappedNormalEditProfileForm}/>
        </Switch>
        </div>
      )
}*/

    /*if(this.state.flag1 === true){
      return(
        <div style={{display:"inline-block",height:"100%",width:"100%"}}>
        <Switch>
            <Route exact component={WrappedNormalChangePasswordForm}/>
        </Switch>
        </div>
      )
}*/

     return(
       <div>
       <Layout>
        <Header>
        <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white'}}>
            <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>

              <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF', left: '-416px', float: 'right', color:'40a9ff'}}onClick={this.homeClick.bind(this,"home")}><Router><Link >Home</Link></Router></a>
              <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-978px'}} onClick={this.profileUpdateClick.bind(this,"profile_update")}><Router><Link >My Profile</Link></Router></a>
              <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1005px'}} onClick={this.handleSubmit.bind(this,"refer")}><Router><Link >Refer</Link></Router></a>
              <a  style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1033px'}} onClick={this.handleChange.bind(this,"change_password")}><Router><Link >Change Password</Link></Router></a>
              <a  href="" style={{textDecoration:'underline',position: 'relative', top: '-57px', color:'#FFFFFF',right:'-1062px', color:'40a9ff'}}>Logout</a>
        </div>
        <Row style={{width: window.innerWidth, position: 'relative', left: '-50px', top: '-64px', height: '100px',boxShadow: '0 2px 5px #efc940', border: '1px solid #efc940'}}>
            <Col span={8}>
              <div>
                <img src="img/subHeaderleft.png" style={{width: window.innerWidth-911 ,height: '100px',top: '0px',left: '0px'}}/>
              </div>
            </Col>

              <div>
              <Row style={{    width: window.innerWidth-455, position: 'relative', left: '455px', height: '100px'}}>
                  <Col span={4} style={{width: '38%', maxWidth: '215px', top: '4px', minWidth: '150px', position: 'relative', right: '441px'}}>
                    <div style={{position: 'relative',left: '43px'}}>
                     <h1 style={{color:"#000",fontWeight:"bold"}}>Last Donation</h1>
                     <h2 style={{fontSize:"medium",marginTop: '-29px',position: 'relative',top:'-23px',color:"#000",fontWeight:"bold"}}>₹ 10,000</h2>
                    </div>
                  </Col>
                  <Col span={4} style={{width: '38%', maxWidth: '254px', minWidth: '150px', height:'65px'}}>
                  <Divider type="vertical" style={{height: '35px', position: 'relative', right: '-190px', top: '-105px'}}/>

                    <div style={{position: 'relative',left: '238px',bottom: '177px'}}>
                     <h1 style={{color:"#000",fontWeight:"bold"}}>Last Donation Date</h1>
                     <h2 style={{fontSize:"medium",marginTop: '-29px',position: 'relative',top:'-23px',color:"#000",fontWeight:"bold"}}>20th June, 2020</h2>
                    </div>
                  </Col>
                  <Col span={4} style={{width: '38%', maxWidth: '234px', minWidth: '150px', height:'65px'}}>
                  <Divider type="vertical" style={{height: '35px', position: 'relative', right: '-160px', top: '-105px'}}/>

                    <div style={{position: 'relative',left: '217px',bottom: '177px'}}>
                     <h1 style={{color:"#000",fontWeight:"bold"}}>Amount</h1>
                     <h2 style={{fontSize:"medium",marginTop: '-29px',position: 'relative',top:'-23px',color:"#000",fontWeight:"bold"}}>₹ 500</h2>
                    </div>
                  </Col>
                  <Col span={4} style={{width: '35%', maxWidth: '215px', minWidth: '150px', height:'65px'}}>
                  <Divider type="vertical" style={{height: '35px', position: 'relative', right: '-100px', top: '-105px'}}/>
                    <div style={{position: 'relative',left: '165px',bottom: '175px'}}>
                     <h1 style={{color:"#000",fontWeight:"bold"}}>View</h1>
                     <h2 style={{fontSize:"medium",marginTop: '-29px',position: 'relative',top:'-23px',color:"#000",fontWeight:"bold"}}>Recurrence: 10th of month</h2>
                    </div>
                  </Col>
              </Row>
              </div>
            </Row>

        </Header>
        <Layout style={{marginTop: '6px',height:( window.innerHeight - 107 )}}>

          <Content style={{background:'white',marginTop:'1px',marginLeft:'2px',overflow : 'unset'}}>
        {/*  <div className="site-card-wrapper">
              <Row gutter={8}>
                <Col span={4} onClick={this.handleSubmit} style={{border: '2px solid coral', position: 'relative', top: '150px', left: '400px'}}>
                  <Card title="Update Profile" bordered={false}>
                    Press to update profile
                  </Card>
                </Col>
                <Col span={4} onClick={this.handleChange} style={{border: '2px solid coral', position: 'relative', top: '150px', left: '500px'}}>
                  <Card title="Password Change" bordered={false}>
                     Press to Password Change
                  </Card>
                </Col>
              </Row>
</div>*/}
                           {
                             (this.state.profileUpdateFlag=== "profile_update")?<WrappedNormalEditProfileForm data={this.props.data}/>
                             : null
                           }
                           {
                             (this.state.flag=== "refer")?<WrappedNormalReferPage />:null
                           }
                           {
                             (this.state.flag1==="home")?<div>
                                  <img src="img/newMidImg.png" style={{marginTop: '82px'}}/>
                             </div>:null
                           }
                           <div>
                                <img src="img/newMidImg.png" style={{marginTop: '82px'}}/>
                           </div>

          </Content>
          </Layout>
          <Footer style={{padding:'0px'}}>
            <div style={{width:(window.innerWidth),background:'white'}}>
              <img src="img/footerMD.png" style={{width: window.innerWidth+24 ,height: '50px', marginLeft: '-8px'}} />
            </div>
          </Footer>
       </Layout>
       </div>
     );
  }
}
export default MainLayout;
