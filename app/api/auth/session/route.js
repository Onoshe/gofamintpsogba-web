// pages/api/auth/session.js
//import { cookies } from 'next/headers';
import cookie from "cookie";
import jwt from "jsonwebtoken";



  // JWT secret
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "supersecretkey";
//console.log(JWT_SECRET);

  export const GET = async (req, res) => {
    const cookieHeader = req.headers.get('Cookie');
  const cookies = cookie.parse(cookieHeader);
  const authToken = cookies.authToken;
   
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
  