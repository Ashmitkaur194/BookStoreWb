
import "../css/Register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
 
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    const HandleRegister = async() => {
        try{
            const response = await axios.post("http://localhost:5000/register",{
                name,
                email,
                password
            });
            console.log(response.data);
            if(response.data.message === "Registration Successful"){
                alert("Registration Successful! Please login.");
                navigate("/login");
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            console.error("Registration Error:",error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="Register-container">
            <div className="Register-box">

                <h1>Register</h1>
                <input type="text" placeholder="Enter name..." 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                />

                <input type="email" placeholder="Enter email..." 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />

                <input type="password" placeholder="Enter password..." 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={HandleRegister}>Register</button>
            </div>
        </div>
    );
}

export default Register;