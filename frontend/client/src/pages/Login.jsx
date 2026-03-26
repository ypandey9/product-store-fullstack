import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";



function Login() {
    const [email,setEmail] =useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    // useEffect(()=>{
    //     const token=localStorage.getItem("token");

    //     if(token) {
    //         navigate("/products");
    //     }
    // },[]);

    const handleLogin=async()=>{

        try {

            const res=await API.post("/auth/login",{email,password});

            localStorage.setItem("token",res.data.token);
            alert("Login successful!");

            navigate("/products");

        } catch(err) { 
            alert(err.response?.data || err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            
            <input
            type="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            />

            <br />

            <input 
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleLogin}>Login</button>

        </div>
    );
}

export default Login;