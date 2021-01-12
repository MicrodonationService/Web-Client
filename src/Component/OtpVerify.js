import ReactDOM from 'react-dom';
import React from 'react'
import { Layout, Form, Button, Col, Input, Tooltip, Checkbox } from 'antd';

class OtpVerify extends React.Component{
  constructor(props){
    super(props);
    this.state={mess:""}
    this.readOnlyPhoneText = this.props.mobileReadOnlyField;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById("readOnlyPhoneText").value = this.readOnlyPhoneText;
  }
  componentDidUpdate(prevProps, prevState) {
    try {
      if (document.getElementById("readOnlyPhoneText").value === "") {
        this.readOnlyPhoneText = this.props.phoneResp;
      } else {
        this.readOnlyPhoneText = document.getElementById("readOnlyPhoneText").value;
      }
      document.getElementById("readOnlyPhoneText").value = this.readOnlyPhoneText;
    } catch (e) { console.error(e) }
  }

  handleSubmit(e){
    e.preventDefault();
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

            } else if (respJson.success === false) {
              this.setState({ mess: respJson.message })
            }
          })

        //this.setState({mess:respJson.message})
        //ReactDOM.render(<WrappedNormalPasswordSetSeccessInnerForm mess={this.state.mess}/>,document.getElementById('root'));

      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
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
              <Input disabled style={{ borderRadius: '25px', position: 'relative', top: '-6px' }} />)}
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
          <Form.Item style={{ width: '90%', display: 'inline-block', alignContent: 'center', position: 'relative', left: '71px'}}>
            <Button onClick={this.handleSubmit} type="primary" htmlType="submit" style={{ width: '54%', borderRadius: '25px', background: '#f8a500' }}>
              VERIFY
             </Button>
          </Form.Item>
        </Form>
        <h4 style={{ position: 'relative', color:(this.state.mess==="Mobile Number Verified Successfully!")?'blue': 'red',  left: '5px', textAlign: 'center' }}>{this.state.mess}</h4>
      </div>
    );
  }
}
const WrappedOtpVerifyForm = Form.create()(OtpVerify);
export default WrappedOtpVerifyForm;
