'use client'
import React, { useEffect } from 'react'
import Collapsible from '../Collapsible'
import { TextAreaInput, TextInput } from '../InputComponents';
import { getPastorCornerFields } from './constants'
import Preview from './Preview'
import { getDateString } from '@/lib/getDateString';
import QuillEditorApp from '../misc/QuillEditorApp';
import { publishPastorCorner } from '../../utils/publishPastorCorner';
import usePstCornerMsgStore from '@/context/usePstCornerMsgStore';
import { getDataLink } from '@/lib/apis/urlLinks';
import getPastorCornerMessages from '@/assets/data/pastorCorner';
const dataLink = getDataLink({table:'official_site_pastorcorner'});


const pastorCornerPhotos = [];
const defValues = {date:'', bibleRef:'', messageBy:'', messagebody:'', prayer:'', topic:'', make:'HTML'};
const IndexPostPastorCorner = () => {
  const pstcornerflds = getPastorCornerFields('pstcornerflds');
  //const [pastorMsg, setPastorMsg] = useAddAndGetPastorMsgs();
  const {pstCornerData, disPstCornerData,} = usePstCornerMsgStore((state)=>state);
  const [collapse, setCollapse] = React.useState(0);
  const [seltdImage, setSeltdImage] = React.useState({src:'', sn:0});
  const [formValues, setFormValues] = React.useState(defValues);
  const [postFeedback, setPostFeedback] = React.useState({error:false,show:false, errorMsg:"Message posted successfully!"});
  const [postingMsg, setPostingMsg] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [plainContent, setPlainContent] = React.useState("");
  const [plainFmtContent, setPlainFmtContent] = React.useState("");

  
  //console.log(formValues);
  const fetchDataHandler = async ()=>{
    const initData = getPastorCornerMessages();
    const dataRes = await getRequest(dataLink);
    if(dataRes?.data?.length){
      disPstCornerData([...initData, ...dataRes.data]);
    }
  }
  const handleEditorChange =(e)=>{
    setContent(e);
    setPostFeedback({error:false,show:false, errorMsg:""});
  }
  const onChangeHandler =(e)=>{
    const {name, value} = e.target;
    const newValue = {...formValues, [name]:value}
    setFormValues(newValue);
    setCollapse(prev=>prev+1);
    setPostFeedback({error:false,show:false, errorMsg:""});
  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();

    await publishPastorCorner(formValues, plainFmtContent, content)
    .then((res)=>{
      //console.log(res)
      if(res?.ok){
        setPostFeedback({error:false,show:true, errorMsg:"Message posted successfully!"});
        resetHandler("NO-FEEDBACK");
        fetchDataHandler();
      }else{
        setPostFeedback({error:true,show:true, errorMsg:"Error in posting message!"});
      }
    })
    
  }



  const resetHandler =(act)=>{
        setPlainContent("");
        setPlainFmtContent("");
        setContent("");
        setFormValues(defValues);
      if(act==="NO-FEEDBACK"){
      }else{setPostFeedback({error:false,show:false, errorMsg:""});}
  }
  const msgbody = formValues.messagebody.replace(/\r\n/g, '\n').split('\n');

  

  return (
    <div className='shadow-lg m-3 pb-10'>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <Collapsible
                        contStyle="my-3 mx-1 border-2 border-solid border-teal-700"
                        titleStyle={`${formValues.surname? 'bg-blue-800' : 'bg-teal-600'} text-white`}
                        iconCol="fill-white"
                        iconHoverCol="hover:fill-[yellow]"
                        hideDeleteIcon
                        collapse={collapse}
                        addedInfo={"Preview"}
                        >
                       
                        <Preview formValues={formValues} 
                          msgbody={msgbody} photo={seltdImage}
                          content={content}/>
                      </Collapsible>
                  </div>
                  <div className='hidden'>
                    <p>Select display photo</p>
                    <div className='p-2 flex overflow-y-hidden bg-[aliceblue] overflow-x-auto flex-row items-center boder border-2 border-solid border-gray-500 mb-5 mt-2 h-[200px]'>
                        {
                          pastorCornerPhotos.map((item, i)=>{
                            //{sn:1,src:photo1,name:''},
                            return (
                              <img key={i+'photo'} src={item.src} alt={item.name+'photo'} 
                                className="flex w-[250px] p-[3px] h-full m-2"
                                //onClick={()=>onClickImage({index:i, src:item.src})}
                                style={{backgroundColor:seltdImage.index===i? 'lime' : ''}}/>
                            );
                          })
                        }
                    </div>
                  </div>
                  <div className='grid lg:grid-cols-2'>
                    <div>
                      {
                        pstcornerflds?.fields.slice(0,3).map((fld, i)=>{

                          return (
                            <TextInput
                            contStyle={'max-w-[750px]'}
                              key={`${i}+key`}
                              title={fld.title}
                              subTitle={fld.subTitle}
                              placeholder={fld.pholder}
                              type={fld.type}
                              value={formValues[fld.name]} 
                              onChange={onChangeHandler} 
                              required={fld.required}
                              name={fld.name}
                              autoComplete={'autoComplete'}
                            />
                          );
                        })
                      }
                    </div>
                    
                    <div>
                      <QuillEditorApp
                          handleEditorChange={handleEditorChange}
                          setPlainContent={(e)=>setPlainContent(e)}
                          setPlainFmtContent={(e)=>setPlainFmtContent(e)}
                          content={content}
                      />
                      {/*<TextAreaInput
                          title={pstcornerflds.textarea.fields.title}
                          subTitle={pstcornerflds.textarea.fields.subTitle}
                          placeholder={pstcornerflds.textarea.fields.pholder}
                          type={pstcornerflds.textarea.fields.type}
                          value={formValues[pstcornerflds.textarea.fields.name]}
                          onChange={onChangeHandler} 
                          required={pstcornerflds.textarea.fields.required}
                          name={pstcornerflds.textarea.fields.name}
                          autoComplete={'autoComplete'}
                        />*/}
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <TextInput
                        contStyle={'max-w-[750px]'}
                        title={'Prayer'}
                        placeholder={'Prayer...'}
                        type={'text'}
                        value={formValues.prayer} 
                        onChange={onChangeHandler} 
                        required=""
                        name={'prayer'}
                        autoComplete={'autoComplete'}
                      />
                      <TextInput
                        contStyle={'max-w-[750px]'}
                        title={'Message by'}
                        //subTitle={'Name of Pastor'}
                        placeholder={'Message by... L. Ajagunna, K. Ogundare'}
                        type={'text'}
                        value={formValues.messageBy} 
                        onChange={onChangeHandler} 
                        required
                        name={'messageBy'}
                        autoComplete={'autoComplete'}
                      />
                      <div className='flex flex-row flex-wrap px-4'>
                        <input type='checkbox' className='checkbox mr-2'
                          onChange={()=>setFormValues({...formValues, make:"HTML"})}
                          checked={formValues.make==="HTML"}/><p>HTML (Default)</p>
                        <input type='checkbox' className='checkbox ml-7 mr-2'
                          onChange={()=>setFormValues({...formValues, make:"INIT"})}
                          checked={formValues.make==="INIT"}/><p>INIT</p>
                      </div>
                      <br/>
                    </div>
                  </div>
                  <p className={`ml-4 my-2 ${postFeedback?.show? '':'hidden' } ${postFeedback?.error? 'text-red-600': 'text-[green]'}`}>
                    {postFeedback?.errorMsg}
                  </p>
                  <div className='w-fit'>
                    <TextInput type="submit" value="POST"
                      contStyle={'sm:w-44 cursor-pointer'}
                      inputStyle={`${postingMsg? 'bg-[silver]': 'bg-blue-800'} text-white hover:bg-blue-500 
                      focus:bg-blue-500 focus:border-slate-600
                      `}/>
                    <TextInput type="button" value="RESET"
                      contStyle={'sm:w-44 cursor-pointer'}
                      inputStyle={`bg-red-800 text-white hover:bg-red-500 
                        focus:bg-red-500 focus:border-blue-600
                        `}
                      onClick={resetHandler}/>
                    <TextInput type="button" value="CREATE DOCS"
                      contStyle={'sm:w-44 cursor-pointer hidden'}
                      inputStyle={`bg-teal-800 text-white hover:bg-teal-500 
                      focus:bg-teal-500
                      `}
                      //onClick={fetchDataHandler}
                      />
                    </div>
              </form>
    </div>

  )
}


export default IndexPostPastorCorner;


function createPastorCornerDoc(form) {
  const {sn, postedBy, topic, bibleRef, body, pray, details} = form;
  const id = "1"; //generateMessageID(topic, sn);
  //const bodyText = body.join('\n\n');

  const doc = {
      _id:id,
      _type: 'pastorCorner',
      topic,
      messageID:id,
      sn,
      pray,
      bibleRef,
      body,
      postedBy,
      date:getDateString(details.date),
    };

  return doc
}


const queryPstCorner =
`
    *[_type == "pastorCorner"] | order(date desc){
        _id,
        topic,
        messageID,
        sn,
    }
 `;
