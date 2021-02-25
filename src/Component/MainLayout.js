import ReactDOM from 'react-dom';
import React from 'react';
import { Layout, Avatar, Form, Button, Col, Input, Tooltip, Checkbox, Row, Card, Cascader, Divider, Select, AutoComplete, Tabs, Radio } from 'antd';
//import {Pie} from 'react-chartjs-2';
import "../App.css"
import "antd/dist/antd.css"
// import { useGoogleLogout } from 'react-google-login';
import UIregisterMD from "./UIRegisterMD.js";
import PasswordSetSuccess from "./PasswordSetSuccess.js"
import MyDonation from "./myDonation.js"
import WrappedNormalChangePasswordForm from "./ChangePassword.js"
import WrappedNormalReferPage from "./ReferPage.js"
import WrappedNormalEditProfileForm from "./EditProfile.js"
// import MyNGO from "./MyNGO.js"
// import OneTimeDonation from './onetimedonation.js';
// import RecurringDonation from './donatetocharity.js';

import { Chart, registerShape, Geom, Axis, Interval, Interaction, Coordinate } from 'bizcharts';

import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import Logout from './Logout';

const { Header, Sider, Content, Footer } = Layout;

const { Group } = Radio;
const { Option } = Select;
const { TabPane } = Tabs;
const { Meta } = Card;
const AutoCompleteOption = AutoComplete.Option
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const donationdata = [
  { charity: 'Helping Hands ', donation: 380 },
  { charity: 'RobinHood', donation: 520 },
];
const data = [
  {
    type: "Inactive",
    value: 38
  },
  {
    type: "Active",
    value: 62
  }
];


class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: "",
      flag1: "",
      profileUpdateFlag: "",
      myDonatiion:"",
      changePasswordFlag: "",
      MycHarity: "",//MY CHARITY APP
      oneTimeDonation: "", //onetimeDonation
      recurringDonation: "", //recurringDonation
      donorfetchdata:undefined,
      labels: ['Under18', 'Age 18-54', 'Age 55+'],
      datasets: [{
        data: [2000, 4000, 2850],
        backgroundColor: ['red', 'blue', 'green']
      }]

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.myDonatiion = this.myDonatiion.bind(this);

    //this.userName1 = this.props.data.data.user.name;
  }

  componentDidMount() {
    this.setState({ profileUpdateFlag: "" })
    this.setState({ changePasswordFlag: "" })
  }

  myDonatiion(data){
    this.setState({myDonatiion:data})
    this.setState({ flag1: "" })
    this.setState({ changePasswordFlag: "" })
    this.setState({ flag: "" })
    this.setState({ profileUpdateFlag: "" })
    this.setState({ oneTimeDonation: "" })
  }
  handleSubmit(data) {
    this.setState({ flag: data })
    this.setState({ profileUpdateFlag: "" })
    this.setState({ changePasswordFlag: "" })
    //ReactDOM.render(<WrappedNormalReferPage />,document.getElementById('root'));
  }
  handleChange(data) {
    this.setState({ changePasswordFlag: data })
    ReactDOM.render(<WrappedNormalChangePasswordForm data={this.props.data} />, document.getElementById('root'));
  }

  homeClick(data) {
    this.setState({ flag1: data })
    this.setState({ changePasswordFlag: "" })
    this.setState({ flag: "" })
    this.setState({ profileUpdateFlag: "" })
    this.setState({ oneTimeDonation: "" })
  }

  MyCharity(data) {
    this.setState({ MycHarity: data })
    this.setState({ changePasswordFlag: "" })
    this.setState({ flag: "" })
    this.setState({ profileUpdateFlag: "" })
    this.setState({ oneTimeDonation: "" })
  }
  profileUpdateClick(data) {
    this.setState({ profileUpdateFlag: data })
    this.setState({ changePasswordFlag: "" })
    this.setState({ flag: "" })
    this.setState({ oneTimeDonation: "" })

    let loginRequest = {
      "email": this.props.email
    };
    const superagent = require('superagent');
    superagent
      .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/donarfetchdata') // Ajax call
      .send(loginRequest)                                 // sends a JSON post body
      .set('X-API-Key', 'foobar')
      .set('Content-Type', 'application/json')
      .set('accept', '*/*')
      .set('Access-Control-Request-Headers', 'content-type,x-api-key')
      .set('Access-Control-Request-Method', 'POST')
      .set('Host', 'ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
      .set('Origin', 'http://localhost:3000')
      .set('Accept-Encoding', 'gzip, deflate, br')
      .set('Sec-Fetch-Dest', 'empty')
      .set('Sec-Fetch-Mode', 'cors')
      .end((err, res) => {                               // Calling the end function will send the request
        console.log("service call", res);
        let fatchDetailsRespJson = JSON.parse(res.text);
        if(fatchDetailsRespJson.Status === "SUCCESS"){
          this.setState({donorfetchdata:fatchDetailsRespJson})
        }
        // ReactDOM.render(<MainLayout donorcategorydrop={this.props.donorcategorydrop} donorfetchdata={fatchDetailsRespJson} />, document.getElementById('root'));
      })
  }

  onetimedonationClick(data) {
    this.setState({ oneTimeDonation: data })
    this.setState({ changePasswordFlag: "" })
    this.setState({ flag: "" })
    this.setState({ profileUpdateFlag: "" })
    this.setState({ MycHarity: "" })
  }

  recurringdonationClick(data) {
    this.setState({ recurringDonation: data })
    this.setState({ oneTimeDonation: data })
    this.setState({ changePasswordFlag: "" })
    this.setState({ flag: "" })
    this.setState({ profileUpdateFlag: "" })
    this.setState({ MycHarity: "" })
  }


  render() {
    console.log("this.props.email",this.props.email);
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

    return (
      <div>
        <Layout>
          <Header>
            <div style={{ marginLeft: '-50px', width: (window.innerWidth), background: 'white' }}>
              <img src="img/mdHeader.png" style={{ width: window.innerWidth, height: '70px', top: '0px', left: '0px' }} />

              <a style={{ textDecoration: 'underline', position: 'relative', top: '-57px', color: '#FFFFFF', left: '-580px', float: 'right', color: '40a9ff' }} onClick={this.homeClick.bind(this, "home")}><Router><Link >HOME</Link></Router></a>
              <a style={{ textDecoration: 'underline', position: 'relative', top: '-57px', color: '#FFFFFF', right: '-818px' }} onClick={this.profileUpdateClick.bind(this, "profile_update")}><Router><Link >MY PROFILE</Link></Router></a>
              <a style={{ textDecoration: 'underline', position: 'relative', top: '-57px', color: '#FFFFFF', right: '-853px' }} onClick={this.handleSubmit.bind(this, "refer")}><Router><Link >REFER</Link></Router></a>
              <a style={{ textDecoration: 'underline', position: 'relative', top: '-57px', color: '#FFFFFF', right: '-881px' }} onClick={this.handleChange.bind(this, "change_password")}><Router><Link >CHANGE PASSWORD</Link></Router></a>
              <a style={{ textDecoration: 'underline', position: 'relative', top: '-57px', color: '#FFFFFF', right: '-917px', display: "none" }} onClick={this.MyCharity.bind(this, "my_charity")}><Router><Link >MY CHARITY</Link></Router></a>
              <a style={{ textDecoration: 'underline', position: 'relative', top: '-57px', color: '#FFFFFF', right: '-913px' }} onClick={this.myDonatiion.bind(this, "myDonatiion")}><Router><Link >MY DONATION</Link></Router></a>
              <Logout />
            </div>
            <Row style={{ width: window.innerWidth, position: 'relative', left: '-50px', top: '-64px', height: '100px', boxShadow: '0 2px 5px #efc940', border: '1px solid #efc940' }}>
              <Col span={8}>
                <div>
                  <img src="img/subHeaderleft.png" style={{ width: window.innerWidth - 911, height: '100px', top: '0px', left: '0px' }} />
                </div>
              </Col>

              <div>
                <Row style={{ width: window.innerWidth - 455, position: 'relative', left: '455px', height: '100px' }}>
                  <Col span={4} style={{ width: '38%', maxWidth: '215px', top: '4px', minWidth: '150px', position: 'relative', right: '441px' }}>
                    <div style={{ position: 'relative', left: '43px' }}>
                      <h1 style={{ color: "#000", fontWeight: "bold" }}>Last Donation</h1>
                      <h2 style={{ fontSize: "medium", marginTop: '-29px', position: 'relative', top: '-23px', color: "#000", fontWeight: "bold" }}>₹ 10,000</h2>
                    </div>
                  </Col>
                  <Col span={4} style={{ width: '38%', maxWidth: '254px', minWidth: '150px', height: '65px' }}>
                    <Divider type="vertical" style={{ height: '35px', position: 'relative', right: '-190px', top: '-105px' }} />

                    <div style={{ position: 'relative', left: '238px', bottom: '177px' }}>
                      <h1 style={{ color: "#000", fontWeight: "bold" }}>Last Donation Date</h1>
                      <h2 style={{ fontSize: "medium", marginTop: '-29px', position: 'relative', top: '-23px', color: "#000", fontWeight: "bold" }}>20th June, 2020</h2>
                    </div>
                  </Col>
                  <Col span={4} style={{ width: '38%', maxWidth: '234px', minWidth: '150px', height: '65px' }}>
                    <Divider type="vertical" style={{ height: '35px', position: 'relative', right: '-160px', top: '-105px' }} />

                    <div style={{ position: 'relative', left: '217px', bottom: '177px' }}>
                      <h1 style={{ color: "#000", fontWeight: "bold" }}>Amount</h1>
                      <h2 style={{ fontSize: "medium", marginTop: '-29px', position: 'relative', top: '-23px', color: "#000", fontWeight: "bold" }}>₹ 500</h2>
                    </div>
                  </Col>
                  <Col span={4} style={{ width: '35%', maxWidth: '215px', minWidth: '150px', height: '65px' }}>
                    <Divider type="vertical" style={{ height: '35px', position: 'relative', right: '-100px', top: '-105px' }} />
                    <div style={{ position: 'relative', left: '165px', bottom: '175px' }}>
                      <h1 style={{ color: "#000", fontWeight: "bold" }}>View</h1>
                      <h2 style={{ fontSize: "medium", marginTop: '-29px', position: 'relative', top: '-23px', color: "#000", fontWeight: "bold" }}>Recurrence: 10th of month</h2>
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>

          </Header>
          <Layout style={{ marginTop: '6px', height: (window.innerHeight - 107) }}>

            <Content style={{ background: 'white', marginTop: '1px', marginLeft: '2px'}}>
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
                (this.state.profileUpdateFlag === "profile_update") ? <WrappedNormalEditProfileForm federated={this.props.federated} profilepic={this.props.profilepic}  data={this.props.data}  donorcategorydrop={this.props.donorcategorydrop} donorfetchdata={(this.state.donorfetchdata == undefined)? this.props.donorfetchdata : this.state.donorfetchdata} />
                  : null
              }
              {
                (this.state.flag === "refer") ? <WrappedNormalReferPage /> : null
              }
              {
                (this.state.myDonatiion === "myDonatiion") ? <MyDonation email={this.props.donorfetchdata.body.SZ_EMAIL} /> : null
              }
              {/* {
                             (this.state.MycHarity=== "my_charity")?<MyNGO />:null
                           }
                            {
                             (this.state.oneTimeDonation=== "onetimedonation")?<OneTimeDonation />:null
                           }
                            {
                             (this.state.recurringDonation=== "recurringdonation")?<RecurringDonation />:null
                           } */}
              {
                (this.state.flag1 === "home") ? <div>
                  <img src="img/newMidImg.png" style={{ marginTop: '82px' }} />
                </div> : null
              }


              <div>
                <br></br>


                {/* <Card
                                     style={{ width: 300, marginTop: 60}}    >
                                <Meta
                          avatar={
                                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                             }
                                  title="Card title"
                              description="This is the description"
                         />
                        </Card> */}
                <Row style={{ marginTop: 40 }}>
                  <Row style={{ position: "absolute" }}>
                    <Col span={4} style={{ position: "absolute" }} >
                      <Card style={{ width: 200, marginTop: 30 }}    >
                        <Chart data={data} height={300} autoFit >
                          <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
                          <Axis visible={false} />
                          <Tooltip showTitle={true} />
                          <Interval
                            adjust="stack"
                            position="value"
                            color="type"
                            shape="sliceShape"
                          />
                          <Interaction type="element-single-selected" />
                        </Chart>
                        {/* <Meta
                                              avatar={
                                              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                 }
                                               title="Add Chart Here"
                                              description="This is the description"
                            /> */}
                        <div>
                          {/*<Pie
                              data={{
                                datasets :this.state.datasets
                              }}
                              height='100%'
                            />*/}
                        </div>
                      </Card>
                    </Col>
                    <Col span={4} style={{ marginLeft: 320 }}>
                      <Card style={{ width: 250, marginTop: 60 }}    >
                        <Chart height={200} autoFit data={donationdata} interactions={['element-active']} padding={[30, 30, 30, 50]} >
                          <Interval position="charity*donation" />
                        </Chart>
                        {/* <Meta
                                              avatar={
                                              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                 }
                                               title="Add Chart Here"
                                              description="This is the description"
                            /> */}
                        <div>
                          {/*<Pie
                              data={{
                                datasets :this.state.datasets
                              }}
                              height='100%'
                            />*/}
                        </div>
                      </Card>
                    </Col>

                  </Row>

                  <Row style={{ marginLeft: 600 }}>
                    <h6 style={{ marginTop: 60, marginLeft: 30 }}>Other NGO that  I have Donated</h6>
                    <Col span={4} style={{ marginLeft: 30 }}>
                      <Card style={{ width: 190 }}    >
                        <Col span={12}>
                          <img src="img/rightSign.png" style={{ height: 50 }}></img>
                        </Col>
                        <Col span={12}>
                          <p>
                            NGO 14
                                  <br></br>
                                  Health
                                  <br /><br />
                            <a>Donate Now</a>

                          </p>
                        </Col>
                      </Card>
                    </Col>
                    <Col span={4} style={{ marginLeft: 150 }}>
                      <Card style={{ width: 190 }}    >
                        <Col span={12}>
                          <img src="img/rightSign.png" style={{ height: 50 }}></img>
                        </Col>
                        <Col span={12}>
                          <p>
                            NGO 14
                                  <br></br>
                                  Health
                                  <br /><br />
                            <a>Donate Now</a>

                          </p>
                        </Col>

                      </Card>
                    </Col>
                    <Col span={4} style={{ marginLeft: 160 }}>
                      <Card style={{ width: 190 }}    >
                        <Col span={12}>
                          <img src="img/rightSign.png" style={{ height: 50 }}></img>
                        </Col>
                        <Col span={12}>
                          <p>
                            NGO 14
                                  <br></br>
                                  Health
                                  <br /><br />
                            <a>Donate Now</a>

                          </p>
                        </Col>

                      </Card>
                    </Col>


                  </Row>

                </Row>

                {/*Second row three cards  */}
                <div >
                  <Row style={{ borderWidth: 4 }}>
                    <h6 style={{ marginTop: 80 }}>Other Charities Similar to my Charities</h6>
                    <Col span={8}>
                      <Card
                        style={{ width: 400, height: 100, marginTop: 0, borderRadius: 25 }}    >

                        {/* <Meta
                                  avatar={
                                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                  }
                                  title="Card title"
                                description="This is the description"
                                    />
          */}
                        <Col span={8}>
                          <img src="img/rightSign.png" ></img>
                        </Col>
                        <Col span={8}>
                          <p>
                            NGO 14
                                  <br></br>
                                  Health
                                  <br /><br />
                            <a>Donate Now</a>

                          </p>
                        </Col>
                        <Col span={8}>
                          <p>
                            Total Donars
                                  <br></br>
                                  Health

                                </p>

                        </Col>

                      </Card>

                    </Col>
                    <Col span={8}>
                      <Card
                        style={{ width: 400, height: 100, marginTop: 0, borderRadius: 25 }}    >

                        {/* <Meta
                                  avatar={
                                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                  }
                                  title="Card title"
                                description="This is the description"
                                    />
          */}
                        <Col span={8}>
                          <img src="img/rightSign.png"></img>
                        </Col>
                        <Col span={8}>
                          <p>
                            NGO 15
                                  <br></br>
                                  Orphanage
                                  <br /><br />
                            <a>Donate Now</a>

                          </p>
                        </Col>
                        <Col span={8}>
                          <p>
                            Total Donars
                                  <br></br>
                                  Health

                                </p>

                        </Col>

                      </Card>

                    </Col>


                    <Col span={8}>
                      <Card
                        style={{ width: 400, height: 100, marginTop: 0, borderRadius: 25 }}    >

                        {/* <Meta
                                  avatar={
                                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                  }
                                  title="Card title"
                                description="This is the description"
                                    />
          */}
                        <Col span={8}>
                          <img src="img/rightSign.png"></img>
                        </Col>
                        <Col span={8}>
                          <p>
                            NGO 16
                                  <br></br>
                                  Education
                                  <br /><br />
                            <a>Donate Now</a>

                          </p>
                        </Col>
                        <Col span={8}>
                          <p>
                            Total Donars
                                  <br></br>
                                  Health

                                </p>

                        </Col>

                      </Card>

                    </Col>

                  </Row>
                </div>

                <Row style={{ marginTop: 40 }}>
                  <Col span={5} >
                    <p>
                      <h3>Have You Tried Our Mobile App Yet? </h3>
                      <h1>Download Now</h1>
                    </p>
                  </Col>
                  <Col span={4} style={{ marginLeft: 30 }}>

                    <Button onClick={this.recurringdonationClick.bind(this, "recurringdonation")} style={{ borderRadius: 10, height: 35, width: 250 }}><Router><Link >Recurring Donation</Link></Router></Button>

                  </Col>
                  <Col span={4} style={{ marginLeft: 20 }}>
                    <Button style={{ borderRadius: 10, height: 35, width: 250 }}>Repeat Last Donation</Button>

                  </Col>
                  <Col span={4} style={{ marginLeft: 20 }}>
                    <Button onClick={this.onetimedonationClick.bind(this, "onetimedonation")} style={{ borderRadius: 10, height: 35, width: 250 }}><Router><Link >One time Donation</Link></Router></Button>

                  </Col>
                  <Col span={4} style={{ marginLeft: 20 }}>
                    <Button style={{ borderRadius: 10, height: 35, width: 250 }}>Refer Donor or Charity</Button>

                  </Col>

                </Row>

                {/* <img src="img/newMidImg.png" style={{marginTop: '82px'}}/> */}
              </div>


            </Content>
          </Layout>
          <Footer style={{ padding: '0px' }}>
            <div style={{ width: (window.innerWidth), background: 'white' }}>
              <img src="img/footerMD.png" style={{ width: window.innerWidth + 24, height: '50px', marginLeft: '-8px' }} />
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}
export default MainLayout;