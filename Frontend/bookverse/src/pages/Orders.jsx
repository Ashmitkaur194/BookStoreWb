
import Navbar from "../components/Navbar";
import "./../css/Orders.css";

function Orders() {

  const orders = [

    {
      id:1,
      title:"Atomic Habits",
      price:499,
      status:"Delivered",
      date:"5 June 2026",
      image:"https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
    },

    {
      id:2,
      title:"The Alchemist",
      price:299,
      status:"Shipped",
      date:"4 June 2026",
      image:"https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
    }
  ];

  return (

    <div>

      <Navbar />

      <div className="orders-page">

        <h1 className="orders-heading">
          My Orders 📦
        </h1>

        <div className="orders-container">

          {
            orders.map((order)=>(

              <div className="order-card" key={order.id}>

                <img src={order.image} />

                <div className="order-details">

                  <h2>{order.title}</h2>

                  <h3>₹ {order.price}</h3>

                  <p>
                    Ordered On:
                    <span> {order.date}</span>
                  </p>

                  <div className="status-section">

                    <span className="status-badge">
                      {order.status}
                    </span>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Orders;

