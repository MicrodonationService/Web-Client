import 'babel-polyfill';
import React from 'react';
import { Link,Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import "././css/MyNgo.css";
import { Layout,Select  ,Menu,Row, Col,Collapse, Result,Breadcrumb, Radio,Icon,Button,DatePicker ,Carousel,Form,Input,Checkbox,Avatar, Badge} from 'antd';

import {
    PhoneFilled
  } from '@ant-design/icons';
class Ngopage extends React.Component {

  constructor(props){
    super(props);
    this.state = {ngodetails:''}
    this.handleDetails = this.handleDetails.bind(this);

    
  }
 

  handleDetails(e){
    
        let ngodetails = {
          "ngoid":2
        };
        const superagent = require('superagent');
        superagent
        .get('NgoUpdateDetailsfetch.json')
        .send(ngodetails)
        .set('X-API-Key','foobar')
        .set('accept','application/json')
        .end((err,res)=>{
          console.log("Response",res);
          let detailsRespJSOn = JSON.parse(res.text);
          console.log("respjson", detailsRespJSOn);
          this.setState({ ngodetails: detailsRespJSOn })
        
        
        })
  
    
  }

  
  

 render(){

    function myFunction(imgs) {
        var expandImg = document.getElementById("expandedImg");
        var imgText = document.getElementById("imgtext");
        expandImg.src = imgs.src;
        imgText.innerHTML = imgs.alt;
        expandImg.parentElement.style.display = "block";
      }

      console.log(this.state.ngodetails)

      //this.handleDetails();
      

 
 if(this.state.ngodetails=== ""){
  return(
    <Button onClick={this.handleDetails}>Hi</Button>
   );
 }

 else{
  return(

    <div >
      <Row >
          <Col span={6} style={{background:'#161E2D', color:'white', height:'1000px'}}>
            <div style={{float:'right'}}>
            <input type="checkbox"/>Add to my NGO
            </div>    
            <br/>
            <h5 style={{background:'#161E2D', color:'white',}} className="contacttitle">What We Do:</h5>
            <p>{this.state.ngodetails.body.SZ_WHAT_WE_DO}</p>
            <br/>
            <h5 style={{background:'#161E2D', color:'white'}} className="contacttitle">Category</h5>
            <h3 style={{background:'#161E2D', color:'white'}}>{this.state.ngodetails.body.SZ_CATEGORY_PRIMARY}</h3>
            <h5 style={{background:'#161E2D', color:'white'}} className="contacttitle">City</h5>
            <h3 style={{background:'#161E2D', color:'white'}}>{this.state.ngodetails.body.SZ_CITY}</h3>
            <h5 style={{background:'#161E2D', color:'white'}} className="contacttitle">Website</h5>
            <h3 style={{background:'#161E2D', color:'white'}}>{this.state.ngodetails.body.SZ_WEBSITE}</h3>
            <h5 style={{background:'#161E2D', color:'white'}}>Main Office:</h5>
            <p>{this.state.ngodetails.body.SZ_ADDRESS_LINE1}</p>
            <p>{this.state.ngodetails.body.SZ_ADDRESS_LINE2}</p>
            <br/>
            <PhoneFilled  style={{background:'orange'}}/> {this.state.ngodetails.body.SZ_PHONE1}
          </Col>
          <Col span={12} >

              <div >
                  <div  >
                  <img src="img/newngo2.jpg" style={{height:500, width: (window.innerWidth)}}></img> 
                    </div>
                    <div >
                    
           <div className="container">
 
</div>
  
</div>  
</div>




          </Col>
      </Row>
  
  </div>
  
 );
 }

 
 
}
}
export default Ngopage;
