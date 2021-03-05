import React, { useState,  Component } from 'react';
import { Layout, Tabs, Button, Form, Input,Row,Col,Select } from 'antd';

const {Option} = Select;




class DonateToCharitys extends Component {
   render(){
       return(
        <div className="box">

        <div className="boxcontent">

    <div className="title">
      <center>  <h2 style={{color:' #f8a500'}}>DONATE TO CHARITY</h2> </center>
      
    </div>

    <input type="checkbox" name="Checkbox" id="" /> ₹ 100
    <input type="checkbox" name="Checkbox" id="" /> ₹ 200
    <input type="checkbox" name="Checkbox" id="" /> ₹ 500
    <input type="checkbox" name="Checkbox" id="" /> ₹ 1000
    <br /><br />
    <input type="radio" name="" id="" checked /> <input type="text" placeholder="₹ Amount"   style={{ borderRadius: '10px', height: '32px', marginBottom: '4px' }} />

    <div className="charities" style={{position: 'relative' }}>
        <div className="charitiesname" style={{position: 'absolute' }}>
            CHARITIES <br /><br />
          <div>
          <input type="radio" name="" id="" checked /> <span>Charity Name 1</span><br /><br />
            <input type="radio" name="" id="" checked /> <span>Charity Name 2</span><br /><br />
            <input type="radio" name="" id="" checked /> <span>Charity Name 3</span>
          </div>
        </div>
        <div class="modify" style={{float:'right'}}>
            Modify 
            
            <br /><br />
            <input type="text"   style={{borderRadius: '10px', height: '32px', marginBottom: '4px' }}  / ><br />
            <input type="text"   style={{ borderRadius: '10px', height: '32px', marginBottom: '4px' }}  / ><br />
            <input type="text"   style={{ borderRadius: '10px', height: '32px', marginBottom: '4px' }}  / >
        </div>
    </div>

    <br /><br /><br /><br /><br />
<div className="askrecurring" style={{marginTop: 60 }}>
    <input type="checkbox" name=" " id="" /> Want to Make Recurring ?
</div>
<br />


<div>
    <Row>
        <Col>
        <p>Repeat Every &nbsp;&nbsp;</p>
        </Col>
        <Col>
        <input type="number" value={"1"} />
        <Select defaultValue="month" style={{ width: 120 }} >
      <Option value="month">Month</Option>
    </Select>
        </Col>
    
        
    </Row>
    <br />

    <Row>
        <Col>
        <p>For &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
            
        </p>
        </Col>
        <Col>
        <input type="number" value={"6"} />
        <Select defaultValue="month" style={{ width: 120 }} >
      <Option value="month">Month</Option>
    </Select>
        </Col>
    
        
    </Row>
<br />

<Row>
<Col>
<p>Starts On &nbsp;&nbsp;
            </p>
</Col>

<Col>
<Select defaultValue="month" style={{ width: 120 }} >
      <Option value="month">May 4, 2020</Option>
    </Select>
</Col>

</Row>

</div>



<br />
<div className="continuebutton" style={{float:'right'}}>
<Button type="submit" onClick={this.handleLogin}
                style={{ background: '#f8a500', color: 'Black', height: '', margin: '-40px 0px 5px 75px', borderRadius: '20px', width: '50%', height: '40px' }} >Continue</Button>
</div>


        
        </div>
        <br /><br />
        </div>
       );
   };
};

export default DonateToCharitys; 