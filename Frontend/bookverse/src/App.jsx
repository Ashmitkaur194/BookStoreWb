import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addbook" element={<AddBook />} />


        <Route path="/orders" element={
          <ProtectedRoute>
          <Orders />
          </ProtectedRoute>
          } />

      
        <Route path="/cart" element={
          <ProtectedRoute>
          <Cart />
           </ProtectedRoute >
         } />

  
        <Route path="/dashboard" element={
          <ProtectedRoute >
            <Dashboard/>
          </ProtectedRoute >
          } />


      </Routes>
    </BrowserRouter>
  )
}
export default App;