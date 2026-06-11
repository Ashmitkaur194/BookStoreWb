import "./../css/Login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try{
            const response = await axios.post("http://localhost:5000/login",{
                email,
                password
            });
            if(response.data.message === "Login Successful"){
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("user",response.data.user);
                navigate("/dashboard");
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            console.error("Login Error:",error);
            alert("An error occurred during login. Please try again.");
        }

    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Book Verse</h1>

                <input type="text" 
                placeholder="Enter email..." 
                value={email} 
                onChange={(e) => setEmail(e.target.value)
                } />

                <input type="password" 
                placeholder="Enter password..." 
                value={password} 
                onChange={(e) => setPassword(e.target.value)
                } />

                <button onClick={handleLogin}>Login</button>

                <p>Don't have an account? <a href="/register">Register</a></p>


            </div>
            </div>
    );
}

export default Login;
