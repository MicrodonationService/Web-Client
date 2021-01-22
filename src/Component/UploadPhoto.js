import ReactDOM from 'react-dom';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Radio ,Card,Row,Col,Upload,Icon,Modal} from 'antd';


class FilesUploader extends React.Component
{


    constructor(props)
    {
        super(props);
        this.state ={
          UploadUrl: "",
          SelectedFile:null,
          binaryImg : ""
        }

        this.formData = new FormData();
        this.handleClick = this.handleClick.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.onFileUpload=this.onFileUpload.bind(this);
        this.getUploadURL = this.getUploadURL.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    onFileChange = event =>
    {
        // this.setState({SelectedFile: event.target.files[0]});
        console.log(event.file.name);
        let loginRequest = {
          "ngoname": "Saksham",
          "filename":"vishal"
      };

      const superagent=require('superagent');

      superagent
      .put('https://ub9is67wk0.execute-api.ap-south-1.amazonaws.com/dev/api/auth/presignedurl')
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

        let UploadResponseJson=JSON.parse(res.text);

        this.setState({UploadUrl:UploadResponseJson.body});

        console.log(this.state.UploadUrl)

      });
    };

    onFileUpload()
    {


      // let  reader  =new FileReader();
      // reader.readAsDataURL(this.state.SelectedFile)
      // reader.onload =(e) =>
      // {
      //   console.warn("img data",e.target.result)

      //   const url=this.state.UploadUrl;

      //   const formData={file:e.target.result}

      const superagent=require('superagent');

      superagent
      .put(this.state.UploadUrl)
      .send(this.formData)
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
         console.log("Response",res);
      });
      // }
    };

    handleUpload = info => {

      console.log("inside handleChange" , info);
    }

    getUploadURL = (form) =>
        {
          console.log("Object...",form);
          console.log(this.UploadUrl);
          this.formData.append('enctype','multipart/form-data');
          this.formData.append('Content-Type','multipart/form-data');
          if(this.filedetails !== undefined){
            this.formData.append('file', this.filedetails);
            this.formData.append('filename', this.filedetails.name);
            this.formData.append('filetype',this.filedetails.name.split('.')[1] );
            this.formData.append('imagename',this.filedetails.name);
            this.formData.append('extenstion', this.filedetails.name.split('.')[1]);
            this.formData.append('docMode', this.filedetails.name.split('.')[1]);
       }
       this.formData.append('isnew', true);
       this.formData.append('_pn','digi_document_upload');

       //this.setState({binaryImg: this.formData})
       return this.formData;

      }
    handleClick()
    {

    }
    getExtraData = (obj)=>{
      console.log("getExtraData " , obj);
    }



    render()
    {
        return(
          <Form>
              <div>
          <Form.Item>
{/*
            <input type='file' onChange={this.onFileChange}></input>
             */}
             <Upload
               showUploadList={false}
               action={this.getUploadURL}
               multiple = {true}
               onChange={(e)=>{
                 this.onFileChange(e);
               }
               }
               data ={this.getExtraData}
               >


              <Button className="spanCss" onclick={this.handleUpload} style={{borderRadius:"15px", margin: 'auto',marginRight:window.navigator.userAgent.match(/Mobile/i)?'200px':'0px'}}>
                       <Icon type="upload" />{window.navigator.userAgent.match(/Mobile/i)?"":"Click to Upload Photo"}
                 </Button>
            </Upload>

            </Form.Item>

              <button onClick={this.onFileUpload}> Upload!</button>

      </div>
      </Form>
        );
    }
}

export default FilesUploader;
