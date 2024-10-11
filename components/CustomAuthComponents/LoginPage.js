'use client'
// pages/login.js
import { useState, useEffect } from "react";
//import { useAuth } from "../hooks/useAuth";
import { useAuthCustom } from "@/lib/hooks/useAuthCustom";
import { useRouter } from "next/navigation";


function LoginPageCustom({ssUser}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signOut, user, userRendering, status} = useAuthCustom(ssUser);
  let userObj = user;
  let userSession = userRendering;
  const router = useRouter();


  if(status == "logout" || status == "authenticated" || status == "sign_in_attempt" || status == "sign_in_error"){
    //Siderside user, ssUser will not update upon logout or login except when page is refreshed. But is session is available, ssUser will always be on
    //Switch to user upon logout || if authenticated  
    // userObj = user;
    // userSession = "Hook";
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(userName, password);

    if (result.success) {
      // Redirect to the dashboard or home page after successful login
      //router.push("/dashboard");
      //console.log(result)
    } else {
      setError(result.msg);
    }

    setLoading(false);
  };

  const logoutHandler = async ()=>{
    await signOut({dispatchCoy});
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "5px" }}>
      <div className="flex flex-row gap-2">
        {userObj?.id? <p className="text-green-500">Online: <span>{userObj.name}</span></p> : 
          <p className="text-red-500">Offline</p>}
          <span className="mx-2 text-cyan-400">{userSession}</span>
      </div>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            autoComplete
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label>
          <input
            type=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="btn btn-error" onClick={logoutHandler}>Logout</p>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
}


/*  HOME PAGE
import LoginPageCustom from "@/components/CustomAuthComponents/LoginPage";
import { getUserSession } from "@/lib/authActions/getUserSession";
import Image from "next/image";


export default function Home() {
  
  const user = getUserSession();
  //console.log("User Data- "+user);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        

        <LoginPageCustom ssUser={user}/>
      </main>
     
    </div>
  );
}

*/