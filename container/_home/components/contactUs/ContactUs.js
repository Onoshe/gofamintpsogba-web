import React from 'react'
import CardTopText, { CardTopTextCustom } from '../CardTopText'
import { handlePostMail } from './handlePostMail';
import { postRequest } from '@/lib/apiRequest/postRequest';



const ContactUs = ({alert, setAlert}) => {
    const [form, setForm] = React.useState({userName:'', email:'', phoneNo:'', message:''});

    const handleOnChange =(e)=>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    }
    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const {body, url} = handlePostMail(form);
        //return console.log(body, url)
        await postRequest(url, body)
        .then((res)=>{
            setForm({userName:'', email:'', phoneNo:'', message:''});
            setAlert({msg:'Message posted successfully. You will receive our feedback',msgTitle:'', type:'success', show:true});
        })
    }

  return (
    <div className="flex flex-1 py-16 relative overflow-hidden h-[100vh] lg:h-[70vh] lg:pb-32 flex-col lg:flex-row gap-16 "  
        style={{
            backgroundImage: `url('/slideImages/background_pattern.png')`,
            //backgroundSize: "content",
            //backgroundPosition: "center",
            backgroundRepeat:"round",
            height: "100%",
            width: "100%",
        }}>
        <div className='absolute h-full w-full bg-[#acc8e3]/80 left-0 right-0 top-0'></div>
        <section className='flex-1 lg:max-w-[650px]'>
        <CardTopTextCustom title={"Get in Touch: Choose a Package or Schedule a Training"}
            text={"Need guidance or a tailored solution for your business? Reach out to explore our flexible package plans or book a hands-on training session with our experts. We’re here to help you maximize your business potential!"}/>
        </section>
        <div  className='flex w-full flex-1 flex-col h-[400px] transform transition-transform duration-500'
            >
         <form onSubmit={handleOnSubmit} className="max-w-[550px] flex justify-center flex-col gap-3 p-8">
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                    >
                    <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
            <input type="text" required className="grow" 
                placeholder="Username"
                name="userName"
                value={form.userName}
                onChange={handleOnChange}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="email"
                    name="email"
                    value={form.email}
                    onChange={handleOnChange}
                    required className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                <input type="phone"
                    name="phoneNo"
                    value={form.phoneNo}
                    onChange={handleOnChange}
                    required className="grow" placeholder="Phone contact" />
            </label>
             <textarea
                required
                name="message"
                value={form.message}
                onChange={handleOnChange}
                placeholder="I am interest in your app. Please, send your different packages."
                className="textarea textarea-bordered textarea-md w-full"
                rows={6}>
            </textarea>  
            <div className="">
                <input type="submit" className="w-full sm:w-[200px] btn bg-blue-400 text-white hover:bg-blue-600 active:bg-blue-500" value="Send" />
            </div>
            </form> 
        </div>
    </div>
  )
}

export default ContactUs