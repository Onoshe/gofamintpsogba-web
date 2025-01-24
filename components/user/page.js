'use client'
import { sendContactForm } from '@/lib/apis/contactus';
import React,{useState} from 'react';
import GeneratePdf from '../components/generatePdf/GeneratePdf';


const UserIndex = () => {
  const [data, setData] = useState(null);

   const description = "";

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users/20");
      const datas = await response.json();
      setData(datas);
    };
    
    const postData = async () => {
      fetch("/api/email", { 
          method: "POST",
        body: JSON.stringify({
          description,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
      .then(res=> setData(res))
    }
    //fetchData();
    //postData()
  }, []);
   
  async function postMailHandler(){
    //const data = {subject: 'Email Testing', body: 'This is a testing email', userId: 2005,};
    //await postData(data).then(()=>{console.log('Posted')}) 
  }

  async function mailerSendHandler(){
    //const data = {subject: 'Mailersend Tesing multiple', body: 'Sending Mail by mailerSend to multiple persons', userId: 2005,};
    //await mailerSendData(data).then(()=>{console.log('Mailersend Posted')}) 
  }
  const values = {
    name:'Sunday Adegboye',
    email:'ozitechstudio@gmail.com',
    subject:'Notice of Meeting',
    message:'Please, attached is a mail from us. Thank you.'
  };
  const sendContactUsHandler = async () => {
    /*setState((prev) => ({
      ...prev,
      isLoading: true,
    }));*/
    try {
      await sendContactForm(values);
      /*setTouched({});
      //setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });*/
      console.log('Congratulations!, message sent');
    } catch (error) {
      /*setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));*/
      console.log(error.message)
    }
  };

  return (
    <div className="bg-mainColor flex flex-col">
      UserPage

      <div className='bg-blue-700 text-white py-1 px-4 w-fit m-7 cursor-pointer'
        onClick={postMailHandler}>
        Post Mail Test
      </div>
      <div className='bg-blue-700 text-white py-1 px-4 w-fit m-7 cursor-pointer'
        onClick={mailerSendHandler}>
        Mailer Send
      </div>
      <div className='bg-blue-700 text-white py-1 px-4 w-fit m-7 cursor-pointer'
        onClick={sendContactUsHandler}>
        Nodemailer Send
      </div>
      <div className='bg-teal-700 text-white py-1 px-4 w-fit m-7 cursor-pointer'
        >
        <GeneratePdf/>
      </div>
    </div>
  );
};


export default UserIndex;


const fetchData = async () => {
  const response = await fetch("/api/users/20");
  const datas = await response.json();
  setData(datas);
};

const postData = async (data) => {
  const response = await fetch("/api/postMail", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


const mailerSendData = async (data) => {
  const response = await fetch("/api/mailerSend", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

