
import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Layout, Form, Button,Col,Input,Tooltip,Checkbox, Row,Card, Cascader,Divider, Select, AutoComplete,Tabs, Radio} from 'antd';
import "antd/dist/antd.css"
import { Table, Tag } from 'antd';
import "../App.css"



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

                        this.Export=this.Export.bind(this);
                        this.FetchData=this.FetchData.bind(this);
                        this.FetchData();
                        }

Export(csvData,fileName){
                          console.log("This method is called")
                          const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                           const fileExtension = '.xlsx';
                           const ws = XLSX.utils.json_to_sheet(csvData);

                           const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

                           const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

                           const data = new Blob([excelBuffer], {type: fileType});

                           FileSaver.saveAs(data, fileName + fileExtension);
                        };

    FetchData(e){
                          console.log("Fetch Data");

                          let confirmOtpOnPhoneRequest= {
                              "email": this.props.email
                             // "email": "pranavvikh03@gmail.com"
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
                              console.log("Donation Details",(this.state.ngodetails))
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
                              amount:i1.F_GROSS_AMOUNT

                          });

                          })
                          console.log(data)
                        }
                      return(
                        <div>

                        <Layout style={{ background: "white"}}>

                          <Row style={{marginTop:'100px',marginLeft:'30px'}}>
                          <Col>
                                         <span style={{fontSize: "medium",fontWeight: "bold"}}> Donation Summary
                                         </span>
                        <Button type="primary" onClick={this.Export.bind(this,data,"Donation History")} style={{width:'10%',float:"right",borderRadius: '25px',color:'Black',borderColor:'white'}}>
                                            Download
                        </Button>
                           </Col>



                          </Row>


                                {<Table id={"t1"}
                                      style={{margin:'30px', color: 'black',fontSize: "medium",fontWeight: "bold"}}
                                      bordered
                                      columns={columns} dataSource={data}
                                      scroll={{  y: 300 }}
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
