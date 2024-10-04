import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'; // Use Next.js cookies API
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";



export const getUserSession=()=>{
    const token = cookies().get("authToken")?.value; // Get token from cookies
    let user = null;

    if(token) {
        try {
        user = jwt.verify(token, JWT_SECRET); // Verify JWT token
        } catch (error) {
        console.error("Invalid token:", error);
        }
    }
    return user
}