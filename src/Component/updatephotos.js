import ReactDOM from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Radio ,Modal,Card,Row,Col,Upload,Icon, message} from 'antd';
import { event, nodeName } from 'jquery';
//import File_Uploader from './fileuploader.js';
//import DeleteFileUploads from './DeleteFile.js';
//import NgoGetPhotos from './NgoGetPhotos.js';
//import FilesUploader from './fileuploader.js';
import { previewImage } from 'antd/lib/upload/utils';
import Popup from './Popup.js';
import { FormInstance } from 'antd/lib/form';
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
        image_Description:[],
        popImageUrl:'',
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        PresignedUrlToShowInImgSrc:'',
        ngoname:''

        
        
    };

    // if (this.state.ngoname!==undefined)
    // {  
    //   this.setState({ngoname:this.props.ngoupdateprofile.Body.SZ_NGO_NAME})
    //   console.log("NGO NAME In IF", this.state.ngoname)
    // }
    // else{
    //   this.setState({ngoname:''})
    //   console.log("NGO NAME In ELSE", this.state.ngoname)
    // }
        
        console.log("NGO NAME FROM MAINLAYOUT",this.state.ngoname);
        this.onChange=this.onChange.bind(this);
        this.GetSignedurl=this.GetSignedurl.bind(this);
        this.handlesubmit=this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.GetSignedurl();

      }

    componentWillReceiveProps(nextProps) {
        this.setState({ngoname:''})
        
      };

    GetSignedurl ()
    {
        // console.log(this.state.Filnames[0].slice(1,-1));
        let loginRequest = {
            "ngoname": this.props.ngoupdateprofile.Body.SZ_NGO_NAME,

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

            console.log("Response Onject GETSIGNED URL",Object.values(JSON.parse(res.text)));
            this.setState({ImageUrlArray:Object.keys(JSON.parse(res.text)),image_Description:Object.values(JSON.parse(res.text))});
            // console.log('Filelist',this.state.ImageUrlArray);
            console.log(" Image Description",this.state.image_Description)
            

        });





    }



   handlepopup=(url)=>
   {    console.log(url);
       this.setState({ showModal:!this.state.showModal,
        popImageUrl:url})
        console.log(this.state.popImageUrl);




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

        if(this.state.base64TextString != undefined)
        {
            this.handleSubmit()
        }



    }

    handleSubmit=(e)=>
    {   
        console.log("Insid handle Submit")
        
        this.props.form.validateFields((err, values) => {
            console.log("values",values.ngoname);
            console.log("File Description",values.filedesc);
            console.log("FILE BASE64",this.state.base64TextString)
            console.log(this.state.filename);

            let loginRequest = {
                "ngoname":this.props.ngoupdateprofile.Body.SZ_NGO_NAME,
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
           console.log(ImageUrlArray);
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

           const ImageDesc=this.state.image_Description.
           map((url,index) =>
           {
            
            return (
              <h1 style={{width:'20%'}}>
                {url}
             </h1>

            )
             

           })


           console.log("NGO NAME1 PROPS",this.props.ngoname)
           console.log(images[0]);

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
                    required  
                    disabled
                    autoComplete="off"
                    maxLength={30}
                    placeholder={(this.props.ngoupdateprofile.Body.SZ_NGO_NAME === undefined)?this.props.ngoname1:this.props.ngoupdateprofile.Body.SZ_NGO_NAME}
                    style={{  borderRadius: '20px', height: '32px' ,width:'50%' ,color:'black'}}
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
                    required
                    autoComplete="off"
                    maxLength={30}
            style={{ color:'black', borderRadius: '20px',width:'50%', marginBottom: '2px', marginTop: '0px'}}
            placeholder=""

            />)}
              </Form.Item>
              <div style={{display:'flex',marginTop: '-21px',    marginLeft: '25.5%', marginBottom: '11px'}}>
              <label for="file-upload" className="customfileupload">
              <i class="fa fa-upload" aria-hidden="true"> Image upload</i>
</label>
<input id="file-upload" type="file" style={{display:'none'}} onChange={(e)=>this.onChange(e)}/>

              {/* <i class="fa fa-upload" aria-hidden="true" onclick={(e)=>this.onChange(e)}></i> */}
              {/* <Button type="submit" style={{
                      color:'black',
                      borderRadius:'20px',
                      background: '#f8a500' , fontSize:'30px',fontWeight:'bold',
                      cursor: 'pointer'}}
                      onClick={this.handlesubmit} > Update</Button> */}
          </div>
          <div style={{overflowX:'scroll'}} > 
            <div style={{display:'flex',justifyContent:'flex-start' }}>
                
                
                {images}
                
                      {this.state.showModal ? (
                            <Popup
                                   popImageUrl={this.state.popImageUrl}
                                    closepopup={this.handlepopup}
                                    deleteImage={this.deleteImage}
                                    ngoname1={this.props.ngoupdateprofile.Body.SZ_NGO_NAME === undefined?this.props.ngoname1:this.props.ngoupdateprofile.Body.SZ_NGO_NAME}
                                    
                               />
                           ): null}
                        
                
                        </div>
                        <div style={{display:'flex'   }} > 
                        {ImageDesc}
                  </div> 
                        </div>      
                       
    </Form>
  </div>

        );
    }

}


const Update_photos_1=  Form.create()(Update_photos)
export default Update_photos_1;
