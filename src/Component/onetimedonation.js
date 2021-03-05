import React, { useState,  Component } from 'react';
import { Layout, Tabs, Button, Form, Input,Row,Col} from 'antd';
import { Radio } from 'antd';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css"
import GlobalHelper from '../utils/GlobalHelper.js'
import './css/MyNgo.css'
import QuickDonate from './onetimedonation_after.js';



class Onetimedonation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount : "",
            NgoName : null,
            donaremail : null,
            total_amount : null,
            ngodetails : '',
           
        }
 
    this.handleamount = this.handleamount.bind(this);
    this.submitdata = this.submitdata.bind(this);

  
    
    // console.log("Login Response",this.props.data.data.user.email)
    // console.log("Ngoname",this.props.ngoname)


    }


 
    submitdata(e){
        e.preventDefault();
        console.log(this.state);
        
        let datatosend = {
            "DonateAmount" : this.state.total_amount,
            "NgoName" : this.state.ngoname,
            // "DonarEmail" : this.props.data.data.user.email
            "DonarEmail":"pratikdpatil2000@gmail.com"

        }
     
        console.log("Data To send",datatosend);
      
        let options = {
            "key": "rzp_test_xSNp5khST8Il60",
            "amount": "200", // 2000 paise = INR 20, amount in paisa
            "name": "Microdonation",
            "description": "NGO Name is Here and Details about NGO",
            "image": "img/abstract-persons-make-swirl-1169ld.png",
            "handler": function (response){
              alert(response.razorpay_payment_id);
            },
            "prefill": {
              // "name": this.props.data.data.user.name,
              // "email": this.props.data.data.user.email
              "name":"Pratik Patil",
              "email":"pratikdpatil2000@gmail.com"

            },
            "notes": {
              "address": "Hello World"
            },
            "theme": {
              "color": "#F37254"
            }
          };
      
          let rzp = new window.Razorpay(options);
          rzp.open();



        // aws signature in auth header
        
   
    
        }
    handleamount(event){
        console.log(event.target.name);
        const target = event.target;
        var value = target.value;
        const name = target.name;
  
        this.setState({
            amount : event.target.name,
            [name]:value,
            ngo_Id : event.target.value
        })
    }


   render(){
      
 

    return(
     

      
        <div className="box" >

        <div className="boxcontent">

      


        <div className="title">
     <center>   <h2 style={{color:' #f8a500'}}>ONE TIME DONATION</h2> </center>
    </div>
{/* 
    <input type="checkbox" name="100" id="" value="100" onChange={this.handleamount} /> ₹ 100
    <input type="checkbox" name="200" id="" value="200" onChange={this.handleamount} /> ₹ 200
    <input type="checkbox" name="500" id="" value="500" onChange={this.handleamount} /> ₹ 500
    <input type="checkbox" name="1000" id="" value="1000" onChange={this.handleamount} /> ₹ 1000 */}
    <br /><br />
    <form action="/payment/charge" method="POST">


    <input type="radio" name="" id="" checked /> <input type="text" name="donaremail" onChange={this.handleamount} placeholder="₹ Amount" value={"pratikdpatil2000@gmail.com"}   style={{ borderRadius: '10px', height: '32px', marginBottom: '4px' }} />
    <br /> <br />

    <input type="radio" name="" id="" checked /> <input type="number" name="total_amount" onChange={this.handleamount} placeholder="₹ Amount"   style={{ borderRadius: '10px', height: '32px', marginBottom: '4px' }} />
    <br /> <br />
    <input type="radio" name="" id="" checked /> &nbsp;&nbsp;
 
   
    <select name="ngoname" onChange={this.handleamount}>
    {/* {
      this.props.ngoname.body.map((value) => (
        <option value={value}>{value}</option>
      ))
  } */}
    <option>
      Robin
    </option>
    </select>
   
    <br /><br />
   

   
<div className="askrecurring" style={{marginTop: 50 }}>
<h4 style={{ position: 'relative', color: 'red', top: '70px', left: '-36px', textAlign: 'center' }}>{this.state.mess}</h4>
<br />
    <input type="checkbox"  name="yes" id="" /> Want to Make Recurring ?
</div>
<br />
<div className="continuebutton" style={{float:'right'}}>

<div>
                                 <Button type="submit" onClick={this.submitdata}
                style={{ background: '#f8a500', color: 'Black', height: '', margin: '-40px 0px 5px 75px', borderRadius: '20px', width: '50%', height: '40px' }} onClick={this.submitdata} >Continue</Button>
                             </div>

{/* <Button type="submit" onClick={this.handleLogin}
                style={{ background: '#f8a500', color: 'Black', height: '', margin: '-40px 0px 5px 75px', borderRadius: '20px', width: '50%', height: '40px' }} onClick={this.submitdata} >Continue</Button> */}
</div>


        </form>


        
        </div>
        <br /><br />

        </div>
        
       );
   };
};

export default Onetimedonation; 