import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row,Card, Cascader,Divider, Select, AutoComplete,Tabs, Radio} from 'antd';

import "antd/dist/antd.css"
import UIregisterMD from "./UIRegisterMD.js";
import PasswordSetSuccess from "./PasswordSetSuccess.js"
import WrappedNormalChangePasswordForm from "./ChangePassword.js"
// import WrappedNormalReferPage from "./ReferPage.js"
import WrappedNormalEditProfileForm from "./EditProfile.js"
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import { Table, Tag } from 'antd';
import "../App.css"
const { Header, Sider, Content, Footer } = Layout;
const {Group} = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const AutoCompleteOption = AutoComplete.Option
const columns = [
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',

  },
  {
    title: 'NGO CATEGORY',
    dataIndex: 'category',
    key: 'categorye',
  },
  {
    title: 'NGO NAME',
    dataIndex: 'ngo_name',
    key: 'ngo_name',
  },
  {
      title: 'DONATION AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
    },
  {
    title: 'SHARE',
    dataIndex: 'share',
    key: 'share',
  },
];
const data = [];
class MyDonation extends React.Component
{

                        constructor(props)
                        {
                          super(props);
                          const data2 = [];
                          this.state ={
                            ngodetails:undefined
                          }
                          this.state = {data2};
                          this.layout = {
                          labelCol: {
                            span: 8,
                          },
                          wrapperCol: {
                            span: 16,
                          },
                          };

                         // this.FetchData=this.FetchData.bind(this);
                          this.FetchData();
                        }
    FetchData(e){
                          console.log("Fetch Data");

                          let confirmOtpOnPhoneRequest= {
                              "email": "pranavvikh03@gmail.com"
                          };
                        const superagent = require('superagent');
                        superagent
                        .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donationdetails')
                        .send(confirmOtpOnPhoneRequest)
                        .set('X-API-Key', 'foobar')
                                  .set('accept', 'application/json')
                        .end((err, res)=>{
                          console.log("Updated Data", res);
                          let detailsRespJSOn = JSON.parse(res.text);
                              console.log("respjson", detailsRespJSOn.Body);
                              this.setState({ ngodetails: detailsRespJSOn})
                              console.log("Ngo Detail",(this.state.ngodetails))
                        })
                    console.log(data)
    };
  render(){
                        var i=0;
                        var jso=0;
                        console.log( this.state.ngodetails)
                        if(this.state.ngodetails!=undefined)
                        {
                          this.state.ngodetails.Body.map((i1)=>{
                            console.log(i1.F_GROSS_AMOUNT)
                            data.push({
                              Date: i1.DT_PAYMENT,
                              category:i1.SZ_NGO_NAME,
                              ngo_name:i1.SZ_CATEGORY_PRIMARY,
                              amount:i1.F_GROSS_AMOUNT,
                              share:<img src="img/WhatsApp.png" style={{ height: '26px', top: '0px', left: '0px' }} />
                          });

                          })
                          console.log(data)
                        }
                      return(
                        <div>

                        <Layout style={{ background: "white"}}>
                                <Row style={{marginTop:'100px',marginLeft:'30px'}}>
                                <Col>
                                     Donation Summary
                                </Col>

                                  </Row>
                                {<Table
                                      style={{ color: 'black'}}
                                      bordered
                                      columns={columns} dataSource={data}
                                />

                                }
                                {/*
                                <table  border="1">

                                  <tr>
                                    <th>
                                      date

                                    </th>
                                    <th>
                                    NGO CATEGORY

                                    </th>
                                    <th>
                                    NGO NAME

                                    </th>
                                    <th>
                                    DONATION AMOUNT
                                    </th>
                                    <th>
                                    SHARE
                                    </th>
                                  </tr>

                                { (this.state.ngodetails!=undefined)?this.state.ngodetails.Body.map((i1)=>{
                            console.log(i1.DT_PAYMENT)
                            return(
                              <tr>
                                <td>
                                  {i1.DT_PAYMENT}
                                </td>
                                <td>
                                  {i1.SZ_NGO_NAME}
                                </td>
                                <td>
                                  {i1.SZ_CATEGORY_PRIMARY}
                                </td>
                                <td>
                                  {i1.F_GROSS_AMOUNT}
                                </td>
                              </tr>
                            )
                          }):null}

                                </table>


*/}
                            </Layout>

                        </div>

     );
  }
}
export default MyDonation;
