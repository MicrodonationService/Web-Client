import ReactDOM from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css';
import '../App.module.css';
import { Layout, Button,Form,Input} from 'antd';
import PasswordSetSuccess from "./PasswordSetSuccess.js"
const { Header, Content, Footer} = Layout;
var styles=require('../App.module.css');
class ForgotPassField extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={confirmotp:"",userid:""};
        var otpId="";
        var usid="";
        var type="";
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e)
    {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                let InputData ={
                    "Username" : this.usid,
                    "Password" : values.Confirmpassword,
                    "ConfirmationCode" : this.otpId,

                };
                const superagent = require('superagent');
                var link=(this.type=="D")?"https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donorconfirmforgotpassword":"https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngoconfirmforgotpassword";
                console.log(link);
                console.log(this.type);
                superagent
                .post(link)
                .send(InputData) // sends a JSON post body
                .set('X-API-Key', 'foobar')
                .set('accept', 'application/json')
                .set('accept', '*/*')
                .set('Access-Control-Request-Headers','content-type,x-api-key')
                .set('Access-Control-Request-Method','POST')
                .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
                .set('Origin','http://localhost')
                .set('Accept-Encoding','gzip, deflate, br')
                .set('Sec-Fetch-Dest','empty')
                .set('Sec-Fetch-Mode', 'cors')
                .end((err, res) => {
                    // Calling the end function will send the request
                    let respJson = JSON.parse(res.text);
                    console.log("respJson12",respJson);
                      if(respJson.Status=== "SUCCESS"){
                           //this.setState({flag:true})
                           //this.setState({mess:respJson.message})
                           ReactDOM.render(<PasswordSetSuccess data={values.username}/>,document.getElementById('root'));
                      }else if (respJson.success=== false){
                        this.setState({mess:respJson.message})
                      }
                });
            }
        });
    }
    render()
    {
        const { getFieldDecorator } = this.props.form;
        var val1=window.location.search;
        val1=val1.split("&");
        var type=val1[0].split("=");
        var otp=val1[1].split("=");
        var userid=val1[2].split("=");
        /*this.setState({
            confirmotp:otp1,
            userid:userid1
        });*/
        let BtnStyle={
            height:"60px",width:"35%",borderRadius:"12px",left:"25%",background:"#f8a500",fontSize:"16px"
        };
        this.type=type[1];
        this.otpId=otp[1];
        this.usid=userid[1];
        return(
            <div style={{height:(window.innerHeight),backgroundPosition: 'center center' , backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize:'cover'}}>
                <Layout>
                <Header>
                    <div style={{marginLeft:'-50px',width:(window.innerWidth),background:'white',marginTop:'-10px'}}>
                    <img src="img/mdHeader.png" style={{width: window.innerWidth ,height: '70px',top: '0px',left: '0px'}}/>
                    </div>
                </Header>
                <Content>
                <div style={{display:'inlineFlex'}}>
              <img src="img/siderMD.png" style={{width: '400px', height: '546px',position:'absolute',left:'0px',top:'61px'}} />
              </div>
                <div className={styles.second3}>
                <h2 style={{color:'#f8a500',fontWeight:'Bold',textAlign:'center',marginLeft:"-120px"}}>RESET PASSWORD</h2>
                <Form style={{marginTop:"6%"}}>
                    <h4 style={{fontWeight:"Bold",fontSize:"20px",marginLeft:"1%"}}>New Password:</h4>
                    <Form.Item>
                        {getFieldDecorator('Password',{
                            rules:[
                                {
                                required:true,
                                message: "Please Enter Password",
                              },
                              {
                                validator: this.validateToNextPassword,
                              },
                            ],
                        })(
                        <Input.Password style={{width:"80%",height:"40px"}} autoComplete='off'/>,)}

                    </Form.Item>
                    <br/>
                    <h4 style={{fontWeight:"Bold",fontSize:"20px",marginLeft:"1%"}}>Confirm Password:</h4>
                    <Form.Item>
                        {getFieldDecorator('Confirmpassword',{
                            rules:[
                            {
                                required:true,
                                message: "Please Re-Enter Password",
                            },
                              {
                                validator: this.compareToFirstPassword,
                              },
                            ],
                        })(
                        <Input.Password style={{width:"80%",height:"40px"}} autoComplete='off'/>,)}

                    </Form.Item>
                    
                </Form>
                <br/><br/>
                <Button type="submit" style={BtnStyle} onClick={this.handleSubmit}>Change Password</Button>
                </div>
                </Content>
                <Footer style={{padding:'0px'}}>
                  <div style={{width:(window.innerWidth),background:'white'}}>
                    <img src="img/footerMD.png" style={{width: window.innerWidth+24 ,height: '50px', marginLeft: '-8px', top: '543px', position: 'relative'}} />
                  </div>
                </Footer>
                </Layout>
            </div>
        );
    }
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['Confirmpassword'], { force: true });
        }
        callback();
      };
    
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('Password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
}
const WrappedNormalForPassFormField = Form.create()(ForgotPassField);
   export default WrappedNormalForPassFormField;