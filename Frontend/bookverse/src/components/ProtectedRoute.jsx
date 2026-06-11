
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const token =
    localStorage.getItem("token");
    if(!token){

            return <Navigate to="/" />
        }
    return children;// renders actual protected page.
}
export default ProtectedRoute;
