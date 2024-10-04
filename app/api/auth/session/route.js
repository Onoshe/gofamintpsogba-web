// pages/api/auth/session.js
//import { cookies } from 'next/headers';
import cookie from "cookie";
import jwt from "jsonwebtoken";


const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
  ];
  // JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

  export const GET = async (req, res) => {
    const cookieHeader = req.headers.get('Cookie');
  const cookies = cookie.parse(cookieHeader);
  const authToken = cookies.authToken;
    
    // Check if the session token is valid
    /*if (authToken && authToken.startsWith("token-")) {
      const userId = parseInt(authToken.split("-")[1], 10);
      const user = users.find((u) => u.id === userId);
  
      if (user) {
        //return res.status(200).json({ user });
        return new Response(JSON.stringify({ok:true, user}), { status: 200 })
      }else{
        return new Response(JSON.stringify({ok:false}), { status: 200 })
      }
    }
    //return res.status(200).json({ user: null });
    return new Response(JSON.stringify({ok:false, user:null}), { status: 200 })  
    */
   
    if (!authToken) {
      return new Response(JSON.stringify({ok:false, msg:"Not Authenticated"}), { status: 401 })  
    }
  
    try {
      // Verify the JWT and decode its content
      const decoded = jwt.verify(authToken, JWT_SECRET);
      //return res.status(200).json({ user: decoded });
      return new Response(JSON.stringify({ok:true, user: decoded}), { status: 200 })
    } catch (error) {
      //return res.status(401).json({ message: "Invalid token" });
      return new Response(JSON.stringify({ok:false, msg:"Invalid token"}), { status: 401 })  
    }
  }
  