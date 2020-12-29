import React, { useState,  Component } from 'react';
import { Layout, Tabs, Button, Form, Input,Row,Col} from 'antd';
import { Radio } from 'antd';
import "antd/dist/antd.css"

class Onetimedonation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount : "",
            ngo_Id : "1",
            total_amount : null,
        }

    this.handleamount = this.handleamount.bind(this);
    this.submitdata = this.submitdata.bind(this);


    }





    submitdata(e){
        e.preventDefault();
        console.log("sfsf",this.state);

        let datatosend = {
            "DonateAmount" : this.state.total_amount,
            "NgoID" : this.state.ngo_Id

        }
        console.log("dfsf",datatosend);
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
              "name": "Pavan Patil",
              "email": this.props.data
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



        // const superagent = require('superagent');
        // superagent

        // // https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registeruser

        // // 7branYVhGyDqSQmEva/A9p6elA2wE3j6FZmjQfTj  Auth Token


        //   .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/registeruser') // Ajax Call
        //   .send(datatosend)                              // Sends a JSON post body
        //   .set('X-API-Key', 'foobar')
        //   .set('X-CSRF-Token','7branYVhGyDqSQmEva/A9p6elA2wE3j6FZmjQfTj')

        //   .set('accept', 'application/json')
        //   .end((err, res) => {                                // Calling the end function will send the request
        //     console.log("service call", res);
        //     console.log(err);
        //     let respJson = JSON.parse(res.text);              // Getting response in respJson veriable
        //     console.log("respJson", respJson);
        //     if (respJson.success === true) {
        //         this.setState({ mess: "Your data sucessfully Goes to Database"})
        //     } else if (respJson.success === false) {
        //       this.setState({ mess: "Please fill all the field" })
        //     }
        //   });


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




    <input type="radio" name="" id="" checked /> <input type="number" name="total_amount" onChange={this.handleamount} placeholder="₹ Amount"   style={{ borderRadius: '10px', height: '32px', marginBottom: '4px' }} />
    <br /> <br />
    <input type="radio" name="" id="" checked /> &nbsp;&nbsp;
    <select onChange={this.handleamount}>
        <option selected="true">Select NGO Name</option>
        <option value="1">NGO 1</option>
        <option value="2">NGO 2</option>
        <option value="3">NGO 3</option>
    </select>

    <br /><br />




<div className="askrecurring" style={{marginTop: 150 }}>
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
