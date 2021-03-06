import React, { useState, Component } from 'react';
import { Layout, Form, Button, Col, Input, Tooltip, Checkbox, Table, Row, Card, Select, AutoComplete, Tabs, Radio, Avatar } from 'antd';
import './css/MyNgo.css';
import "antd/dist/antd.css"
import ReactDOM from 'react-dom';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
// import DonateToCharity from './message.js'
const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;


const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

class MyNGO extends React.Component {

  constructor(props) {
    super(props);

  }; // End Constructor



  render() {


    // Values in Table


    const dataSource = [{

      name: 'NGO 12',
      category: 'Health',
      totaldonar: '300',
      totaldonation: '₹ 3500',
      viewpage: 'View',

    },];

    const columns = [

      {
        title: 'Add',
        dataIndex: 'name',
      },

      {
        title: 'Category',
        dataIndex: 'category',
      },
      {
        title: 'Total Donars',
        dataIndex: 'totaldonar',
      },
      {
        title: 'Total Donation',
        dataIndex: 'totaldonation',
      },
      {
        title: 'View Page',
        dataIndex: 'viewpage',
      },
    ];

    // Values in Table Ends Here

    return (

      <div>

        <Layout style={{    background: 'white'}}>

          {/* Cards Grids Start From here */}

          <div className="cardgrid">

            <div className="CardCss">

              {/* Card 1 Start here */}

              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="img/ngo1.jpg"
                    style={{ height: 70 }}
                  />
                }
              >
                <Meta
                  title="NGO 1"
                  description={[
                    <div>
                      <span>Health</span><br />
                      <span>Last Donation <span style={{ color: 'red' }}>50 days Ago</span></span>
                    </div>
                  ]}
                />
                <div>
                  <br />
                  <Row>
                    <Col span={12}>
                      <div >
                        <h4>My donation</h4>
                        <span>₹ 5000</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <h4>% of donation </h4>
                        <span>30%</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>

              {/* Card 1 Ends Here */}
            </div>

            <div className="">

              {/* Card 2 Start Here */}

              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="img/ngo2.jpg"
                    style={{ height: 70 }}
                  />
                }
              >
                <Meta
                  title="NGO 2"
                  description={[
                    <div>
                      <span>Health</span><br />
                      <span>Last Donation <span style={{ color: 'red' }}>50 days Ago</span></span>
                    </div>
                  ]}
                />
                <div>
                  <br />
                  <Row>
                    <Col span={12}>
                      <div >
                        <h4>My donation</h4>
                        <span>₹ 5000</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <h4>% of donation </h4>
                        <span>30%</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>


              {/* Card 2 Ends Here */}
            </div>


            <div className="">


              {/* Cards 3 Ends Here */}

              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="img/ngo3.jpg"
                    style={{ height: 70 }}
                  />
                }
              >
                <Meta
                  title="NGO 3"
                  description={[
                    <div>
                      <span>Health</span><br />
                      <span>Last Donation <span style={{ color: 'red' }}>50 days Ago</span></span>
                    </div>
                  ]}
                />
                <div>
                  <br />
                  <Row>
                    <Col span={12}>
                      <div >
                        <h4>My donation</h4>
                        <span>₹ 5000</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <h4>% of donation </h4>
                        <span>30%</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
              {/* Card 3 Ends Here */}
            </div>
          </div>
          {/* Cards Grids Ends here       */}
          {/*<div className="searchbox">
            <Row>
              <Col span={4}>
                <h1>
                  Search For NGO
                </h1>
              </Col>

              <Col span={4}>
                <Search placeholder="Search" />
              </Col>

              <Col span={4}>
                <Select style={{ width: 120 }}>
                  <Option selected>Select Category</Option>
                </Select>
              </Col>

              <Col span={4}>
                <Select style={{ width: 120 }}>
                  <Option >Select City</Option>
                </Select>
              </Col>

              <Col span={4}>
                <Select style={{ width: 120 }}>
                  <Option>Select Type</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Button >
                  Search
                </Button>
              </Col>
            </Row>
          </div>*/}
          <div className="table">
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </Layout>
      </div>
    );
  }
}
export default MyNGO;
