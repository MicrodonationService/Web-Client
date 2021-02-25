import ReactDOM from 'react-dom';
import React from 'react'
import { Layout, Statistic, Form, Button, Col, Input, Tooltip, Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';


const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 145;

class OtpVerify extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { mess: "" ,minutes:2,seconds:0,resendotpflag:false}
    this.readOnlyPhoneText = this.props.mobileReadOnlyField;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.ondeadlinefinish = this.ondeadlinefinish.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
    this.startTimer = this.startTimer.bind(this);

    
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
}

  /*componentDidUpdate(prevProps, prevState) {
    try {
      if (document.getElementById("readOnlyPhoneText").value === "") {
        this.readOnlyPhoneText = this.props.phoneResp;
      } else {
        this.readOnlyPhoneText = document.getElementById("readOnlyPhoneText").value;
      }
      document.getElementById("readOnlyPhoneText").value = this.readOnlyPhoneText;
    } catch (e) { console.error(e) }
  }*/

  handleSubmit(e) {
    e.preventDefault();
    this.readOnlyPhoneText = this.props.mobileReadOnlyField;
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let confirmOtpOnPhoneRequest = {
          "I_USER_ID": this.props.mobileReadOnlyField,
          "I_OTP": values.otp
        };
        const superagent = require('superagent');
        superagent
          .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/otpconfirm')
          .send(confirmOtpOnPhoneRequest) // sends a JSON post body
          .set('X-API-Key', 'foobar')
          .set('accept', 'application/json')
          .end((err, res) => {
            // Calling the end function will send the request
            let respJson = JSON.parse(res.text);
            console.log("respJson11", respJson);
            if (respJson.Status === "SUCCESS") {
              this.setState({ mess: "Mobile Number Verified Successfully!" })
              setTimeout(() => {
                this.props.onCancel();
              }, 5000);

            } else if (respJson.Status === "FAILED" && respJson.Message === "Invalid OTP") {
              this.setState({ mess: respJson.Message })
              setTimeout(() => {
                this.props.onCancel();
                this.handleCancel();
              }, 3000);
            } else if (respJson.Status === "FAILED" && respJson.Message === "Expired") {
              this.setState({ mess: "Expired OTP" })
              setTimeout(() => {
                this.props.onCancel();
                this.handleCancel();
              }, 3000);
            }
          })

        //this.setState({mess:respJson.message})
        //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));

      }
    })
  }

  resendOtp(e) {
    console.log("In Resend OTP");
    e.preventDefault();
    this.readOnlyPhoneText = this.props.mobileReadOnlyField;
    console.log("Phone no", this.readOnlyPhoneText);
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let confirmOtpOnPhoneRequest = {
          "SZ_USER_TYPE": "D",
          "I_USER_ID": this.readOnlyPhoneText,
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
            } else if (respJson.Status === "FAILED") {
              this.startTimer();
              this.setState({ mess: respJson.message })
            }
          })

        //this.setState({mess:respJson.message})
        //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));

      }
    })
  }


  startTimer() {
    console.log("In Start Timer");
    this.setState({
      minutes:2,
      seconds:0
    })
    this.componentDidMount();
    // const Countdown = Statistic;
    // const deadline = Date.now() + 1000 * 145;
  }

  handleCancel() {
    this.props.form.resetFields();
    this.setState({ mess: "" });
    this.props.onCancel()
  }

  ondeadlinefinish() {
    console.log("Finished");
  };


  render() {
    // const Countdown  = Statistic;
    // const deadline = Date.now()+ 1000 * 145;
    const {minutes,seconds} = this.state
    const { getFieldDecorator } = this.props.form;
    this.readOnlyPhoneText = this.props.mobileReadOnlyField;
    return (
      <div style={{ width: '80%', height: '80%', margin: '-7px 0px 0px 29px' }}>
        <Form>

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="PHONE"
            style={{ width: '90%', position: 'relative', left: '18px' }}
          >
            {getFieldDecorator('readOnlyPhoneText', {
            })(
              <Input placeholder={this.props.mobileReadOnlyField} disabled style={{ borderRadius: '25px', position: 'relative', top: '-6px' }} />)}
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="OTP"
            style={{ width: '90%', position: 'relative', left: '-11px' }}
          >
            {getFieldDecorator('otp', {
              rules: [
                {
                  required: true,
                  message: 'Please enter OTP!',
                }
              ],
            })(
              <Input style={{ position: 'relative', top: '-8px', marginLeft: '26px' }} />)}
          </Form.Item>
          <Form.Item style={{ width: '90%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '29px' }}>
            <Button onClick={this.handleSubmit} type="primary" htmlType="submit" style={{ width: '42%', borderRadius: '25px', background: '#f8a500' }}>
              VERIFY
             </Button>
          </Form.Item>

          {/* {this.state.resendotpflag === true ? 
          <Form.Item style={{ width: '90%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '156px', top: '-39px' }}>
            <Button onClick={this.resendOtp} type="primary"  style={{ width: '50%', borderRadius: '25px', background: '#f8a500' }}>
              RESEND OTP
             </Button>
          </Form.Item>
          :""
          } */}
          
          <Form.Item style={{ width: '90%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '156px', top: '-39px' }} >
            <div >{minutes === 0 && seconds === 0  ? 
            
             <Form.Item style={{ width: '90%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '-6px' }}>
            <Button onClick={this.resendOtp} type="primary"  style={{ width: '50%', borderRadius: '25px', background: '#f8a500' }}>
              RESEND OTP
             </Button>
          </Form.Item> : <h4>OTP EXPIRES IN:{minutes}:{seconds<10 ? `0${seconds}`:seconds} </h4>}
              
              </div>
            {/* <Countdown title="OTP EXPIRES IN" value={deadline} onFinish={this.ondeadlinefinish} style={{ width: '90%', position: 'relative', left: '-59px', color: 'red' }} /> */}
          </Form.Item>
        </Form>
        <h4 style={{ position: 'relative', color: (this.state.mess === "Mobile Number Verified Successfully!") ? 'blue' : 'red', left: '5px', textAlign: 'center' }}>{this.state.mess}</h4>
      </div>
    );
  }
}
const WrappedOtpVerifyForm = Form.create()(OtpVerify);
export default WrappedOtpVerifyForm;