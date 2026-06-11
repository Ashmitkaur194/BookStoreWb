import axios from 'axios';
function BookCard({book}) {

const handleAddCart =
async(book)=>{
    try{
        const token =
        localStorage.getItem("token");
        const response =
        await axios.post(
            "http://localhost:5000/add-cart",
            {
                book_id:book.id,
                title:book.title,
                price:book.price,
                image:book.image
            },
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

    }

    catch(error){

        console.log(error);
    }
};
  return (
    <div className="book-card">
      <img src={ `http://localhost:5000/uploads/${book.image}` } />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <h3>₹ {book.price}</h3>
      <button onClick={()=> handleAddCart(book) } > 
        Add To Cart 
        </button>

    </div>
  );
}
export default BookCard;

