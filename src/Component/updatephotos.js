import ReactDOM from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Radio ,Card,Row,Col,Upload,Icon, message} from 'antd';
import { event } from 'jquery';
//import File_Uploader from './fileuploader.js';
//import DeleteFileUploads from './DeleteFile.js';
//import NgoGetPhotos from './NgoGetPhotos.js';
//import FilesUploader from './fileuploader.js';
import { previewImage } from 'antd/lib/upload/utils';
import Popup from './popup.js';
import './css/images.css';
class Update_photos extends React.Component
{
    constructor(props)
    {   super(props);
        const { TextArea } = Input;

        this.state={ filename: '', imageUrl:'',message:'' ,base64TextString:'',
        imgDisplayflag:false,
        GetFileUrl:[],
        ImageUrlArray:[],
        showModal:false,
        popImageUrl:'',
        PresignedUrlToShowInImgSrc:''
    };

        this.onChange=this.onChange.bind(this);
        this.GetSignedurl=this.GetSignedurl.bind(this);
        this.handlesubmit=this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.GetSignedurl();
      }

    GetSignedurl ()
    {
        // console.log(this.state.Filnames[0].slice(1,-1));
        let loginRequest = {
            "ngoname": "Udaan",

            // "filename":this.state.Filnames[1].slice(1,-1)///event.file.name //
        };
        const superagent=require('superagent');
        superagent
        .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/getimagepresignedurl')
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


            this.setState({ImageUrlArray:JSON.parse(res.text)});
            console.log('Filelist',this.state.ImageUrlArray);


        });





    }



   handlepopup=(url)=>
   {
       this.setState({ showModal:!this.state.showModal,
        popImageUrl:url})




   }
   onChange=(e)=>
   {

        let file= e.target.files[0] ;//parameter to pass
        this.state.filename= e.target.files[0].name;
        if(file)
        {
            const reader=new FileReader();
            console.log(reader)
            reader.onload=this._handleReaderLoader.bind(this);
            reader.readAsBinaryString(file);
        }

    }

    _handleReaderLoader=(readerEvt) =>
    {
        let binaryString =readerEvt.target.result;

        this.setState({base64TextString:btoa(binaryString)}) ;



    }

    handleSubmit=(e)=>
    {    e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log("values",values.ngoname);
            console.log("File Description",values.filedesc);
            console.log("FILE BASE64",this.state.base64TextString)
            console.log(this.state.filename);

            let loginRequest = {
                "ngoname":values.ngoname ,
                "ngo_id" :"1",
                "filename": this.state.filename,
                "image_description":values.filedesc,
                "user_avatar":this.state.base64TextString
              };

              const superagent=require('superagent');

              superagent
                  .post('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/ngouploadphotos')
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
                      if(responseJson.Status=="Success"){
                          console.log(responseJson.message);
                          this.GetSignedurl();
                      }
                      // this.setState({ imgDisplayflag:true,message:'File Deleted Successfully'})


                  });

        });


    }


    render()
    {
        const { getFieldDecorator } = this.props.form;
           let ImageUrlArray=this.state.ImageUrlArray;
           const images=ImageUrlArray.map((url,index)=>
           {
               return(
                   <img className='singleImage'
                   src={url}
                   key={index}
                    onClick={()=> this.handlepopup(url)}
                    ></img>
               )
           })

        return(

            <div style={{ marginLeft:'40px', height:'100%'}}>
            <h1 style={{color: '#f8a500' , fontSize:'20px',fontWeight:'bold'}}> Update Photos/ Videos</h1>
            <Form
            style={{ width:'100%'}}>
                <Form.Item label="NGO Name" style={{display: 'block', position: 'relative', top: '-21px'}} >
                {getFieldDecorator('ngoname', {
                  rules: [
                    {/* {
                      required: true,
                      message: 'Please enter user name!',
                    } */}
                  ],
                })(
                  <Input
                    autoComplete="off"
                    maxLength={30}
                    style={{  borderRadius: '20px', height: '32px' ,width:'50%'}}
                  />)}
              </Form.Item>

              <Form.Item label="File Description" style={{display: 'block', position: 'relative', top: '-31px'}} >
                {getFieldDecorator('filedesc', {
                  rules: [
                    {/* {
                      required: true,
                      message: 'Please enter user name!',
                    } */}
                  ],
                })(
                    <Input.TextArea
            style={{ borderRadius: '20px',width:'50%', marginBottom: '2px', marginTop: '0px'}}
            placeholder=""

            />)}
              </Form.Item>
              <div style={{display:'flex',marginTop: '-21px',    marginLeft: '25.5%', marginBottom: '11px'}}>
              <input type="file" style={{width:'20'}} onChange={(e)=>this.onChange(e)}></input>
              <Button type="submit" style={{
                      color:'black',
                      borderRadius:'20px',
                      background: '#f8a500' , fontSize:'30px',fontWeight:'bold',
                      cursor: 'pointer'}}
                      onClick={this.handlesubmit}> Update</Button>
          </div>
            <div style={{display:'flex', justifyContent:'flex-start', position:'fixed' }}>
                {images}
                      {this.state.showModal ? (
                            <Popup
                                   popImageUrl={this.state.popImageUrl}
                                    closepopup={this.handlepopup}
                                    deleteImage={this.deleteImage}
                               />
                           ): null}
                        </div>


    </Form>
  </div>

        );
    }

}


const Update_photos_1=  Form.create()(Update_photos)
export default Update_photos_1;
