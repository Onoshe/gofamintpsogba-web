// pages/api/auth/logout.js
import cookie from "cookie";


export const POST = async (req, res) => {
    if (req.method === "POST") {
      //const data = await req.json();
      
    
      // Set the session cookie
      return new Response(JSON.stringify({ok:true, msg:"User logged out"}), {
        status: 200,
        headers: {
          'Set-Cookie': cookie.serialize("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: -1,
            path: "/",
          }),
        },
      });
    } else {
      return new Response(JSON.stringify({ok:false,  msg: "Method not allowed" }), { status: 401 })
    }
  }
  
