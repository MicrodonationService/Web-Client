import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Form, Button,Col,Input,Row,Select,Tabs,AutoComplete} from 'antd';
import "../App.css"
import "antd/dist/antd.css"
import MainLayout from "./MainLayout.js"
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
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
class PasswordSetSeccessInner extends React.Component
{
    constructor(props)
    {
      super(props);
      this.state ={
        flag: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

       handleSubmit(e){
         this.setState({flag:true})
            //  ReactDOM.render(<MainLayout />,document.getElementById('root'));
            }

  render(){

    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    if(this.state.flag === true){
      return(
        <div style={{display:"inline-block",height:"100%",width:"100%"}}>
        <Router>
            <Route exact component={MainLayout}/>
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
            <img src="img/subHeaderImg.png" style={{width: window.innerWidth+1 ,height: '100px',top: '0px',left: '0px'}}/>

          <Content style={{background:'white',marginTop:'1px',marginLeft:'2px',overflow : 'unset'}}>
          <div style={{width:'80%', height: '80%', margin: '47px 0px 0px 320px'}}>
          <img src="img/rightSign.png" style={{ position: 'relative',left: '290px',top: '100px',display: 'inline-block'}}/>
          <h1 style={{display: 'block', position: 'relative', left: '134px',fontWeight: 900, top:'119px'}}>{this.props.mess}</h1>
             <Form {...layout}>
                <Form.Item style={{width: '50%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '356px', top: '142px'}}>
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
const WrappedNormalPasswordSetSeccessInnerForm = Form.create()(PasswordSetSeccessInner);
export default WrappedNormalPasswordSetSeccessInnerForm;
