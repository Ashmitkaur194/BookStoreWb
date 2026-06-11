
// import Navbar from "../components/Navbar";
// import "./../css/Cart.css";

// function Cart() {

//   const cartItems = [

//     {
//       id:1,
//       title:"Atomic Habits",
//       price:499,
//       quantity:1,
//       image:"https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
//     },

//     {
//       id:2,
//       title:"The Alchemist",
//       price:299,
//       quantity:2,
//       image:"https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
//     }
//   ];

//   return (

//     <div>

//       <Navbar />

//       <div className="cart-page">

//         <div className="cart-items">

//           {
//             cartItems.map((item)=>(

//               <div className="cart-card" key={item.id}>

//                 <img src={item.image} />

//                 <div className="cart-details">

//                   <h2>{item.title}</h2>

//                   <h3>₹ {item.price}</h3>

//                   <div className="quantity-section">

//                     <button>-</button>

//                     <span>{item.quantity}</span>

//                     <button>+</button>

//                   </div>

//                   <button className="remove-btn">
//                     Remove
//                   </button>

//                 </div>

//               </div>
//             ))
//           }

//         </div>

//         <div className="summary-box">

//           <h2>Order Summary</h2>

//           <div className="summary-row">
//             <p>Items</p>
//             <p>3</p>
//           </div>

//           <div className="summary-row">
//             <p>Total</p>
//             <p>₹ 1097</p>
//           </div>

//           <button>
//             Place Order
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Cart;


import { useEffect,useState }
from "react";

import axios from "axios";

import "./../css/Cart.css";

function Cart(){

    const [cart,setCart] =
    useState([]);

    useEffect(()=>{

        fetchCart();

    },[]);

    const fetchCart = async()=>{

        try{

            const token =
            localStorage.getItem("token");

            const response =
            await axios.get(

                "http://localhost:5000/cart",

                {
                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }
                }

            );

            setCart(response.data);

        }

        catch(error){

            console.log(error);

        }

    };

    const handleRemove =
    async(id)=>{

        try{

            const token =
            localStorage.getItem("token");

            const response =
            await axios.delete(

                `http://localhost:5000/remove-cart/${id}`,

                {
                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }
                }

            );

            alert(
                response.data.message
            );

            fetchCart();

        }

        catch(error){

            console.log(error);

        }

    };

    const totalPrice =
    cart.reduce(

        (total,item)=>
        total + item.price,

        0

    );
    return (
        <div className="cart-container">
            <h1>
                My Cart
            </h1>
            <div className="cart-books">

                {
                    cart.map((item)=>(

                        <div
                          className="cart-card"

                          key={item.id}
                        >

                            <img

                              src={
                                `http://localhost:5000/uploads/${item.image}`
                              }

                              alt=""
                            />

                            <h2>
                                {item.title}
                            </h2>

                            <p>
                                ₹ {item.price}
                            </p>

                            <button

                              onClick={()=>
                                handleRemove(item.id)
                              }
                            >

                                Remove

                            </button>

                        </div>

                    ))
                }

            </div>

            <h2 className="total-price">

                Total:
                ₹ {totalPrice}

            </h2>

        </div>

    )

}

export default Cart;
