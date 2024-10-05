// pages/api/auth/login.js
//import bcrypt from "bcrypt";
import cookie from "cookie";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUser } from "@/lib/authActions/findUser";
//import { cookies } from 'next/headers';


const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 1 week in seconds

// JWT secret and expiration settings
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // Use environment variables in production
const JWT_EXPIRATION = "7d"; // Token is valid for 7 days

export const POST = async (req, res) => {
  if (req.method === "POST") {
    const data = await req.json();
    const { userName, password } = data;
    
    // Find the user by email
    //let user = users.find((user) => user.email === email);
    const user = await findUser({userName, password});
    
    if (!user?.id) {
      return new Response(JSON.stringify({ok:false, msg: user.msg }), { status: 401 })
    }

    // Compare the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.secret);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ok:false, msg: "Invalid password" }), { status: 401 })
    }

    
    // Set the session cookie
    //const sessionToken = `token-${user.id}`;
     // Create a JWT containing the user's ID and email
     const userData = user;
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
