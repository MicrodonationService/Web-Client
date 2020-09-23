import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import 'antd/dist/antd.css';
import '../App.module.css';
import '../index.css';
import {Route,Link,Switch,Redirect} from 'react-router-dom';
import { Layout, Menu,Collapse, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge} from 'antd';

import { Spin} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
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

   class ReferPage extends React.Component
           {
       constructor(props)
           {
          super(props);
          this.state =  {posts :"",value:1} ;
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
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
        handleSubmit(e)
        {
               }

    render(){


            /*if(this.registerResponse === true)
            {
                return(<Switch>

                <Route path="/*" render={() => (
                  <Redirect to={GlobalHelper.globlevar['contextpath']+ "OtpGenerate"} />
                 )} />
                   </Switch>)

            }*/

              //var bgimg = "url('"+ window.origin+"/background.png')";
              const { getFieldDecorator } = this.props.form;
              const {posts} = this.state;

        return(
        <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
        <Content style={{background:'white',marginLeft:'2px',overflow : 'unset'}}>
              <div style={{display:'flex'}}>

              <Layout style={{background:'white',height:'100%'}}>

                 <div style={{width:'80%', height: '95%', margin: '143px 0px 0px 110px', border: '1px solid #FFFFFF'}}>
                 <h5 style={{display: 'block', position: 'relative', left: '508px', top: '3px',fontWeight: 800, color:'#f8a500', fontSize: 'x-large'}}>REFER</h5>
                  <div style={{width:'95%',height:'60%',border:'1px solid #FFFFFF',margin:'-10px 0px 0px 23px',display:'flex'}}>
                      <div style={{width:'50%',height:'100%',border:'1px solid #FFFFFF',margin:'0px 0px 0px 0px'}}>
                      <h3 style={{display: 'block', position: 'relative', left: '10px', top: '0px',color:'#000000'}}>Refer Charity</h3>

                      <div style={{border:'1px solid #e8e8e8',width:'95%',height:'90%',margin:'-10px 0px 0px 10px',borderRadius:'5px'}}>
                      <h4 style={{display: 'block', position: 'relative', left: '35px', top: '5px', color:'#000000'}}>Name</h4>
                      <Form.Item
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                      style={{width: '85%', alignContent: 'center', position: 'relative',  top: '-5px',left:'30px'}}
                      >
                      <Input style={{borderRadius: '25px',height:'30px'}}/>
                      </Form.Item>

                      <h4 style={{display: 'block', position: 'relative', left: '35px', top: '0px', color:'#000000'}}>E-Mail</h4>
                      <Form.Item
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                      style={{width: '85%', alignContent: 'center', position: 'relative',  top: '-10px',left:'30px'}}
                      >
                      <Input style={{borderRadius: '25px',height:'30px'}}/>
                      </Form.Item>

                      <h4 style={{display: 'block', position: 'relative', left: '35px', top: '0px', color:'#000000'}}>Phone Number</h4>
                      <Form.Item
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                      style={{width: '85%', alignContent: 'center', position: 'relative',  top: '-10px',left:'30px'}}
                      >
                      <Input style={{borderRadius: '25px',height:'30px'}}/>
                      </Form.Item>

                      <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '285px', top: '-10px'}}>
                       <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'40%',borderRadius: '25px',background: '#f8a500',border:'#FFFFFF',color:'#000000'}}>
                         Submit
                       </Button>
                       </Form.Item>
                             </div>
                      </div>

                      <div style={{width:'50%',height:'100%',border:'1px solid #FFFFFF',margin:'0px 0px 0px 0px'}}>
                      <h3 style={{display: 'block', position: 'relative', left: '10px', top: '0px', color:'#000000'}}>Refer Donor</h3>
                      <div style={{border:'1px solid #e8e8e8',width:'95%',height:'90%',margin:'-10px 0px 0px 10px',borderRadius:'5px'}}>
                      <h4 style={{display: 'block', position: 'relative', left: '35px', top: '5px', color:'#000000'}}>Name</h4>
                      <Form.Item
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                      style={{width: '85%', alignContent: 'center', position: 'relative',  top: '-5px',left:'30px'}}
                      >
                      <Input style={{borderRadius: '25px',height:'30px'}}/>
                      </Form.Item>

                      <h4 style={{display: 'block', position: 'relative', left: '35px', top: '0px', color:'#000000'}}>E-Mail</h4>
                      <Form.Item
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                      style={{width: '85%', alignContent: 'center', position: 'relative',  top: '-10px',left:'30px'}}
                      >
                      <Input style={{borderRadius: '25px',height:'30px'}}/>
                      </Form.Item>

                      <h4 style={{display: 'block', position: 'relative', left: '35px', top: '0px', color:'#000000'}}>Phone Number</h4>
                      <Form.Item
                      rules={[
                      {
                        required: true,
                      },
                      ]}
                      style={{width: '85%', alignContent: 'center', position: 'relative',  top: '-10px',left:'30px'}}
                      >
                      <Input style={{borderRadius: '25px',height:'30px'}}/>
                      </Form.Item>

                      <Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '285px', top: '-10px'}}>
                       <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:'40%',borderRadius: '25px',background: '#f8a500',border:'#FFFFFF',color:'#000000'}}>
                         Submit
                       </Button>
                       </Form.Item>
                             </div>
                      </div>
</div>

{/*<div style={{width:'95%',height:'32%',border:'1px solid #FFFFFF',margin:'0px 0px 0px 23px',display:'flex'}}>
  <div style={{width:'50%',height:'100%',border:'1px solid #FFFFFF',margin:'0px 0px 0px 0px'}}>
  <h4 style={{display: 'block', position: 'relative', left: '0px', top: '0px', color:'#000000'}}>My Charity Reference</h4>
  <div style={{border:'1px solid #e8e8e8',width:'95%',height:'83%',margin:'0px 0px 0px 10px',borderRadius:'5px'}}>
</div>
  </div>
  <div style={{width:'50%',height:'100%',border:'1px solid #FFFFFF',margin:'0px 0px 0px 0px'}}>
  <h4 style={{display: 'block', position: 'relative', left: '0px', top: '0px', color:'#000000'}}>My Donor Reference</h4>
  <div style={{border:'1px solid #e8e8e8',width:'95%',height:'83%',margin:'0px 0px 0px 10px',borderRadius:'5px'}}>
  </div>

</div>
</div>*/}
                 </div>


                 {/*<Form.Item style={{width: '85%', display: 'inline-block', alignContent: 'center', position: 'relative', left:'150px', top: '-5px'}}>
                                         <h4>Have you tried our mobile app yet? </h4>
                                         <a href="" style={{textDecoration:'underline',position: 'relative', top: '-30px', color:'#000000'}}>DOWNLOAD NOW</a>
                 </Form.Item>
               */}




                 </Layout>
                 </div>
                </Content>

          </div>
           );
           }
           }
   const WrappedNormalReferPage = Form.create()(ReferPage);
   export default WrappedNormalReferPage;
