import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row, Cascader, Select, AutoComplete,Tabs, Radio} from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import WrappedNormalLoginForm from "./Login.js";
import UIregisterMD from "./UIRegisterMD.js";
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
class PasswordSetSuccess extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state ={
        flag: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

       handleSubmit(){
         this.setState({flag:true})
       }

  render(){

    if(this.state.flag === true){
      return(
        <div style={{display:"inline-block",height:"100%",width:"100%"}}>
        <Router>
            <Route exact component={WrappedNormalLoginForm}/>
        </Router>

        </div>
      )
    }
     return(
       <div>
       <Layout>
        <Header>
        <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white'}}>
            <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>
        </div>
        </Header>
        <Layout style={{marginTop: '6px',height:( window.innerHeight - 107 )}}>
          <Sider style={{background:'white',width: '400px' , flex:'0 0 0px',minWidth: "400px"}}>
            <img src="img/siderMD.png" style={{width: window.innerWidth-966 ,height: '550px',top: '0px',left: '0px'}}/>
          </Sider>
          <Content style={{background:'white',marginTop:'1px',marginLeft:'2px',overflow : 'unset'}}>
             <div style={{width:'80%', height: '80%', margin: '47px 0px 0px 110px'}}>
             <img src="img/rightSign.png" style={{ position: 'relative',left: '290px',top: '100px',display: 'inline-block'}}/>
             <h1 style={{display: 'block', position: 'relative', left: '152px',fontWeight: 900, top:'119px'}}>Your Password Has Been Changed Successfully.</h1>
                <Form {...layout}>
                   <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '340px', top: '142px'}}>
                    <Button type="primary" onClick={this.handleSubmit} htmlType="submit" style={{width:'50%',borderRadius: '25px',background: '#f8a500',color:'#000000', left:'-125px'}}>
                      HOME
                    </Button>
                    </Form.Item>
                </Form>
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
export default PasswordSetSuccess;
