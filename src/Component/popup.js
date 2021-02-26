import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import './css/images.css';
import { Button , Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Update_photos_1 from './updatephotos';



class App extends Component
{
    
    constructor(props)
    {
        super(props);
        this.DeleteImage=this.DeleteImage.bind(this);
    }

    
    
    DeleteImage=()=>{
            console.log('Delete Image Functiona')
            let arr= this.props.popImageUrl.split('?')
            let arr2=arr[0].split('/')
            var ngoname=arr2[3]
            var filename=arr2[4]
            console.log(filename)


            let loginRequest = {
                "ngoname": ngoname,
                "filename": filename //event.file.name //
            };

            const superagent=require('superagent');

    superagent
        .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/deletefileuploadsfroms3')
        .send(loginRequest)
        .set('X-API-Key', 'foobar')
        .set('Content-Type','application/json')
        .set('accept', '*/*')
        .set('Access-Control-Request-Headers','content-type,x-api-key')
        .set('Access-Control-Request-Method','PUT')
        .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
        .set('Origin','http://localhost:3000')
        .set('Accept-Encoding','gzip, deflate, br')
        .set('Sec-Fetch-Dest','empty')
        .set('Sec-Fetch-Mode', 'cors')
        .end((err,res)=>{
            let responseJson=JSON.parse(res.text);

            console.log(responseJson.message)
            // this.setState({ imgDisplayflag:true,message:'File Deleted Successfully'})


        });

   }
   





    render()
    {
        return(
            <div className='popupParent' onClick={this.props.closepopup}>
                <div className='popupImage'>
                

                <Button className='imageClosingButton' 

                   onClick={()=>{
                        if (window.confirm("Delete the Image?")) {
              let removeToCollection = this.removeToCollection.bind(this, this.props.popImageUrl);
              removeToCollection();
            }
                         }}>


                       <i class=" fa fa-trash fa-10x" ></i>
                       {/* <i class="fa fa-upload" aria-hidden="true"></i> */}

                    </Button>

                   

                    <img src={this.props.popImageUrl}>

                    </img>
                </div>

            </div>
        );
    }

    removeToCollection(key, e) {
        console.log(key);
            console.log('Delete Image Functiona')
            let arr= this.props.popImageUrl.split('?')
            let arr2=arr[0].split('/')
            var ngoname=arr2[3]
            var filename=arr2[4]
            console.log(filename)


            let loginRequest = {
                "ngoname": ngoname,
                "filename": filename //event.file.name //
            };

            const superagent=require('superagent');

    superagent
        .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/deletefileuploadsfroms3')
        .send(loginRequest)
        .set('X-API-Key', 'foobar')
        .set('Content-Type','application/json')
        .set('accept', '*/*')
        .set('Access-Control-Request-Headers','content-type,x-api-key')
        .set('Access-Control-Request-Method','PUT')
        .set('Host','ub9is67wk0.execute-api.ap-south-1.amazonaws.com')
        .set('Origin','http://localhost:3000')
        .set('Accept-Encoding','gzip, deflate, br')
        .set('Sec-Fetch-Dest','empty')
        .set('Sec-Fetch-Mode', 'cors')
        .end((err,res)=>{
            let responseJson=JSON.parse(res.text);

            console.log(responseJson.message)
            // this.setState({ imgDisplayflag:true,message:'File Deleted Successfully'})
           window.location.reload()
            
        });

   
      }
}

export default App;
