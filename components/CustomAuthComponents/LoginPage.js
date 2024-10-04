'use client'
// pages/login.js
import { useState } from "react";
//import { useAuth } from "../hooks/useAuth";
import { useAuthCustom } from "@/lib/hooks/useAuthCustom";
import { useRouter } from "next/navigation";

export default function LoginPageCustom() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signOut, user } = useAuthCustom();
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(userName, password);

    if (result.success) {
      // Redirect to the dashboard or home page after successful login
      //router.push("/dashboard");
      console.log(result)
    } else {
      setError(result.msg);
    }

    setLoading(false);
  };

  const logoutHandler = async ()=>{
    await signOut();
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "5px" }}>
      <div>
        {user?.id? <p className="text-green-500">Online: <span>{user.name}</span></p> : 
          <p className="text-red-500">Offline</p>}
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
