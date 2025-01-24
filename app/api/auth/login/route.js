import cookie from "cookie";
//import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataLink } from "@/lib/apis/urlLinks";
import { getRequest } from "@/lib/apis/getRequest";
import { generateToken } from "@/lib/strings/generateToken";
//import { findUser } from "@/lib/authActions/findUser";
//import { cookies } from 'next/headers';

const days = 366;

const SESSION_MAX_AGE = 60 * 60 * 24 * days * 1000; // 1 week in seconds
const todayDate = new Date();

// JWT secret and expiration settings
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET; // || "supersecretkey"; // Use environment variables in production
const JWT_EXPIRATION = days+"d"; // Token is valid for 7 days

export const POST = async (req, res) => {
  if (req.method === "POST") {
    const data = await req.json();   
    
    let userWithoutSecret = {};
    if (data?.type === "ANONYMOUS") {
      //return new Response(JSON.stringify({ok:false, msg: user.msg }), { status: 401 })
    }else{
       const url =  getDataLink({table:'official_site_usersaccount', s:'email, phoneNo', c:'email,secret', v:data?.email+','+data.password});
        const userRes =  await getRequest(url);

        let userObj = {};
        if(userRes?.data?.length){
          userObj = userRes.data[0]; 
          const {secret, ...userDataRes} = userObj;
          userWithoutSecret = userDataRes;
        }else{
          return new Response(JSON.stringify({ok:false,  msg: "Incorrect email or password" }), { status: 401 })
        }
    }


     const userData = userWithoutSecret;
     userData['ckAt'] = todayDate.toISOString(); //Cokies set at
     userData['ckExp'] = new Date(todayDate.getTime() + SESSION_MAX_AGE).toISOString(); //Cokies expires at
     userData['type'] = data?.type;
     userData['id'] = generateToken(64);
     const sessionToken = jwt.sign(userData,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
    
    return new Response(JSON.stringify({ok:true, user: userData }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie.serialize("authToken", sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: SESSION_MAX_AGE,
          path: "/",
        }),
      },
    });
  } else {
    return new Response(JSON.stringify({ok:false,  msg: "Method not allowed" }), { status: 401 })
  }
}


// Generate a session token (a simple example using user ID)
//const sessionToken = `token-${user.id}`;
//const pwdHarshed =  "abc123"; //await bcrypt.hash('abc123', 10);
