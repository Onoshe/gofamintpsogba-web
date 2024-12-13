import cookie from "cookie";
//import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// JWT secret (must match what you use when signing tokens in the API route)
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET; // || "supersecretkey";

export default function CustomSessionProvider({ user, children }) {
  return (
    <>
      {children}
    </>
  );
}

// Server-side function to validate the JWT
export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = cookie.parse(req.headers.cookie || "");

  if (!token) {
    // Redirect to the login page if no token is present
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return user data as props if token is valid
    return {
      props: {
        user: decoded,
      },
    };
  } catch (error) {
    console.error("Invalid token:", error);

    // If token is invalid or expired, redirect to login page
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
