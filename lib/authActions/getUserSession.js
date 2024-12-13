import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'; // Use Next.js cookies API
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET; // || "supersecretkey";



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



/**
 * Modify the user session by adding a new property and saving it back to cookies.
 * Useage: modifyUserSession({ role: "admin", isAuthenticated: true });
 */
// Modify the user session without altering expiresIn or cookie options
const modifyUserSession = (newProperty) => {
    const token = cookies().get("authToken")?.value;
    let user = getUserSession();

    if (user) {
        // Add the new property to the user session object
        Object.assign(user, newProperty);

        // Decode the original token to extract the original claims (without verifying)
        const decoded = jwt.decode(token, { complete: true });

        if (!decoded) {
            console.error("Failed to decode the token.");
            return null;
        }

        const { header, payload } = decoded;

        // Re-sign the token with the original payload (preserving claims like expiresIn)
        const newToken = jwt.sign(payload, JWT_SECRET, {
            header, // Use the original header
        });

        // Get the original cookie options
        const existingCookie = cookies().get("authToken");
        const cookieOptions = existingCookie?.options || {}; // Preserve options

        // Save the updated token back to the cookies using original options
        cookies().set("authToken", newToken, cookieOptions);

        console.log("Session updated successfully.");
        return user;
    } else {
        console.error("No valid session found to modify.");
        return null;
    }
};