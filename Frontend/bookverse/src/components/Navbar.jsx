
import "./../css/Navbar.css";
import { useNavigate,Link } from "react-router-dom";

function Navbar() {

  const navigate=useNavigate();
  const handleLogout=()=>
  {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/"); 
  };


  
  return (

    <div className="navbar">
      <div className="logo">
        📚 BookVerse
      </div>
      <div className="nav-links">
        {/* <p>Home</p> */}
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;

