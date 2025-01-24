'use client'
import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { SelectionTag, TextInput, PostButton, ResetButton } from './components/Components';
import {UploadedItem,} from './components/UploadedItem';
import {BsExclamationTriangleFill } from "react-icons/bs";
import { getFieldsVals } from './components/constants';
import Tabs from './components/Tabs';
import Spinner from '@/assets/svg/Spinner';
import { fileValidator,  validateInputs } from './components/modules';
//import { v4 as uuidv4 } from 'uuid';
import CustomLoader from '@/components/loader/CustomLoader';
import { getUploadLink } from '@/lib/apis/urlLinks';
import { postUploadedResources } from './postUploadedResources';
import { postUploadedImages } from './postUploadedImages';


const CreateUploadIndex = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({});
  const [flds, setFlds] = useState([]);
  const [fileAsset, setFileAsset] = useState();
  const [uploadedFileAsset, setUploadedFileAsset] = useState([]);
  //const [fetchedData, setFetchedData] = useState({});
  const [errorMsg, setErrorMsg] = useState({error:false, msg:""});
  const [errorKey, setErrorKey] = useState("");
  const [otherFlds, setOtherFlds] = useState({multipleFiles:false});
  const [seltdTab, setSeltdTab] = React.useState(0);
  const [uploadedDoc, setUploadedDoc] = React.useState([]);
  const [uploadTabs, setUploadTabs] = React.useState(['Resources upload', 'Photo Gallery upload',]);  //'Advert Photo upload', 'Advert Video upload']);
  const [fileUploading, setFileUploading] = React.useState("");
  //const uploadRef = React.useRef(null);

  //const navigate = useNavigate();
  // console.log(uploadedFileAsset, fieldsValues);

  //console.log(fieldsValues, seltdTab);


    React.useEffect(()=>{
    let res = {};
    if(seltdTab===0){
      res = getFieldsVals('biblestudy');
    }else if(seltdTab===1){
      res = getFieldsVals('photoGal');
    }

    setFieldsValues(res.values);
    setFlds(res.fields);
    setOtherFlds({...otherFlds, multipleFiles: res.multipleFiles, maxSize:res.maxSize});
    //console.log(otherFlds.multipleFiles)
  },[seltdTab]);  

  function onChangeHandler(e){
    const {name, value} = e.target;
    const formVals = {...fieldsValues, [name]: value};
    //formVals[e.name] = e.value
    setFieldsValues(formVals);
    setErrorMsg({error:false, msg:""});
    setErrorKey("");
  }
 
   
  const uploadFile = (e) => {
    setLoading(true);
    const rawFile = {...e};
    const uploadFiles = rawFile.target.files;
    let fileLst = []; let fileRaw = [];
    for (let i=0; i < uploadFiles.length; i++){
        const file = uploadFiles[i];
        const {name, size} = file;
        let type = name.split('.');
        type = type[type.length-1];
        fileLst.push({name:name, size:size, type:type});
        fileRaw.push(file);
    }
    setUploadedDoc(fileLst);
    
    const res = fileValidator(e, {maxSize:otherFlds.maxSize, tab:seltdTab});
    if(res.error === "OKAY"){
      setErrorMsg({error:false, msg:'Uploads okay'});
      setFileAsset(res.files);
      setUploadedFileAsset(fileRaw);
      //console.log(res.files[0]['imgSrc']);
    }else{
      setErrorMsg({error:true, msg:res.error})
    }
  };

  function resetAllFields(){
    const fieldsKey = getFieldsVals('fieldsKey');
    const activeFlds = getFieldsVals(fieldsKey[seltdTab]);
    setFileAsset(null);
    setFieldsValues(activeFlds.values);
    setErrorMsg({error:false, msg:""});
    setErrorKey("");
    setUploadedDoc([]);
    setUploadedFileAsset([]);
    setLoading(false);
    setFileUploading("");
  }
  useEffect(()=>{
    resetAllFields();
  },[seltdTab]);

  const processUpload = async ()=>{
    const url = getUploadLink();
      const formData = new FormData();
      const contentType = 'multipart/form-data';

      formData.append('file',  uploadedFileAsset[0]);
      formData.append('act',  "FILE_UPLOAD");
      const response = await fetch(url, {
          method: 'POST',
          body: formData,
          'Content-Type': contentType,
          'Authorization': `Bearer ${'authToken'}`
        });
        const data = await response.json();
        console.log(data)
  }
  const saveUploads = () => {

    if(!fileAsset){
      setErrorMsg({error:true, msg: 'Please, upload a file'});  
      return }
    const {error, msg} = validateInputs(fieldsValues, seltdTab);
    if(error){
      setErrorMsg({error:true, msg: msg});  
      return 
    }  
      if(seltdTab === 0 && uploadedFileAsset.length > 0 && fieldsValues.topic && fieldsValues.date){
        setUploading(true);
        postUploadedResources(uploadedFileAsset, fieldsValues, setFileUploading).then(res => {
          //console.log(res);
          if(res?.ok){
            setUploading(false);
            resetAllFields();
          }else{
            setUploading(false);
            setErrorMsg({error:true, msg: res?.message || res?.error}); 
          }
        }) 
      }else if(seltdTab === 1 && uploadedFileAsset.length > 0){
        setUploading(true);
        postUploadedImages(uploadedFileAsset, fieldsValues, setFileUploading).then(res => {
          //console.log(res);
          if(res?.ok){
            setUploading(false);
            resetAllFields();
          }else{
            setUploading(false);
            setErrorMsg({error:true, msg: res?.message || res?.error}); 
          }
        }) 
      }     
    }
    
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 relative">
      <div className={`absolute w-full h-full bg-[rgba(5,1,1,0.5)] justify-center items-center
          ${uploading? 'flex flex-col' : 'hidden'}`}>
        <CustomLoader loadingMsg="Uploading asset, please wait...." color="white" 
          loading={uploading} textCol="white"/>
        <p className={`text-cyan-100 ${uploading? '' : 'hidden'}`}>{fileUploading}</p>
      </div>
      <Tabs contStyle="w-[97%]" seltdTab={seltdTab} setSeltdTab={setSeltdTab}
        uploadTabs={uploadTabs}/>
        <div className='w-[97%] flex justify-center border-gray-400 border-solid border-l-[3px] border-r-[3px]'>
          <h1 className='text-blue-800 py-2 px-2'>
            {uploadTabDis[seltdTab]}  
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className='pb-5 flex lg:flex-row xl:px-40 flex-col justify-center items-center bg-white lg:pb-5 border-gray-400 w-[97%] border-[3px] border-solid border-t-0'>
            <div className=" bg-secondaryColor p-3 flex flex-0.7 w-[95%] md:w-3/5 max-w-[500px] flex-col">
              <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full">
                {loading && (
                  <Spinner/>
                )}
                {!fileAsset ? (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label>
                    <div className="flex flex-col items-center cursor-pointer justify-center h-full"
                      //onClick={()=>uploadRef.current.click()}
                      >
                      <div className="flex flex-col justify-center items-center"
                        >
                        <p className="font-bold text-2xl">
                          <AiOutlineCloudUpload size={50}/>
                        </p>
                        <p className="text-lg">Click to upload</p>
                      </div>

                      <div className="mt-5 mb-4 flex flex-wrap text-gray-400 text-center">
                       Supported formats are {supportedFmts[seltdTab]}
                      </div>
                    </div>
                    <input
                      type={"file"}
                      name="upload-image"
                      onChange={uploadFile}
                      className="w-0 h-0"
                      accept={seltdTab === 0? ".pdf, .doc, .docx" : seltdTab === 1 || seltdTab === 2? ".jpg, .jpeg, .png" : 'video/mp4'}
                      alt={flds.name}
                      //hidden={true}
                      //placeholder="Upload imageuu "
                      //{`${fileAsset.length>1? 'grid grid-cols-3 gap-2' : 'w-full h-full'}`}
                      multiple={otherFlds.multipleFiles}
                    />
                  </label>
                ) : (
                    <div className='h-[200px] sm:h-[300px] md:h-[350px] w-full overflow-y-auto'>
                       <div className={`${fileAsset.length>1? 'grid grid-cols-3 gap-2' : 'w-full h-full'}`}>
                        
                          {
                            fileAsset.map((file, i)=>{

                              return(
                                <UploadedItem key={`${i}+keys`}
                                  imgSrc={file.imgSrc}
                                  onClickHandler={() => setFileAsset(null)}
                                  seltdTab={seltdTab}
                                  uploadedDoc={uploadedDoc}
                                />
                              );
                            })
                          }
                       </div>
                    </div>
                )}
                
              </div>
              <div className={`mb-0 flex flex-row pb-1 px-4 text-red-700 items-center`}
                  style={{visibility: errorMsg.error? 'visible' : 'hidden'}}>
                  <BsExclamationTriangleFill color="red" size={20}/> 
                  <p className="text-sm ml-3">
                    {errorMsg.msg}
                  </p>
              </div>
              
            </div>
            <div className="flex flex-1 px-0 sm:px-5 flex-col gap-1 lg:pl-5 mt-3 w-full">
                {
                  flds?.map((item, i)=>{

                    return (
                      <div key={`${i}+key`} className="w-full flex flex-col justify-center">
                        { item.type !== 'select'?
                        <TextInput
                          name={item.name}
                          type={item.type}
                          required={item.required}
                          value={fieldsValues[item.name]}
                          onChangeHandler={e=>onChangeHandler(e)}
                          placeholder={item.phold}
                          errorKey={errorKey}
                          />:
                          <SelectionTag
                            optArr={item.arr}
                            name={item.name}
                            type={item.type}
                            required={item.required}
                            value={fieldsValues[item.name]}
                            onChange={e=>onChangeHandler(e)}
                            placeholder={item.phold}
                            errorKey={errorKey}
                          />}
                      </div>
                    );
                  })
                }
                <div className={`flex-row gap-2 flex-wrap ${seltdTab === 0? 'hidden' : 'flex'}`}>
                  <p className='font-bold'>Tables: </p>
                  <div className='flex flex-row items-center gap-2'>
                      <input type='radio' className='size-5 cursor-pointer' value={"image_table"} checked={fieldsValues?.image_table === "GENERAL"}
                       onChange={()=>setFieldsValues({...fieldsValues, image_table:"GENERAL"})}/>
                      <p>General Images (official_site_images)</p>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <input type='radio' className='size-5 cursor-pointer' value={"image_table"} checked={fieldsValues?.image_table === "MEDIAPAGE"}
                     onChange={()=>setFieldsValues({...fieldsValues, image_table:"MEDIAPAGE"})}/>
                    <p>Media Page (official_site_media_page)</p>
                  </div>
                </div>
              <div className="flex flex-row px-3 justify-end flex-wrap">
                <PostButton
                  onClickHandler={saveUploads}
                />
                <ResetButton 
                  onClickHandler={resetAllFields}/>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CreateUploadIndex;

const uploadTabDis = [
  'Upload any resourceful material like Bible Study, etc',
  'Upload events photos. The photos will be displayed at Media Page',
  'Upload Advert Photo',
  'Upload Advert Video',
];

const query = `*[ _type == 'bibleStudyUploads' ] | order(_createdAt desc){
    fileuploaded{
      asset->{
        url
      }
    },
    _id,
    topic,
    description,
    destination,
    date,
  }`;


const supportedFmts = [
  "PDF, DOC, DOCX and file must be less than 4mb. Single file upload",
  "JPG, JPEG, PNG and each file must be less than 2mb. Multiple files up to 10 shoould be selected and uploaded at once",
  "JPG, JPEG, PNG and file must be less than 3mb. Single file upload",
  "MP4 and file must be less than 20mb. Single file upload",
]; 