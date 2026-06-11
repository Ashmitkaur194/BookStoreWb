
import Navbar from "../components/Navbar";
import "./../css/Dashboard.css";
import BookCard from "../components/BookCard";
import { useState,useEffect } from "react";
import axios from "axios";
function Dashboard() {

const [search,setSearch]=useState("");
const [category,setCategory]=useState("All");
const[user,setUser]=useState("");
const [books,setBooks] = useState([]);

useEffect(()=>{
    fetchBooks();
},[]);
const fetchBooks= async()=>{
    try{
        const response=await axios.get("http://localhost:5000/books");
        setBooks(response.data);
    }
    catch(error){
        console.error("Error fetching books:",error);
    }
};
// const books = [

//   {
//     id:1,
//     title:"Atomic Habits",
//     author:"James Clear",
//     price:499,
//     category:"Self Help",
//     image:"https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
//   },

//   {
//     id:2,
//     title:"Rich Dad Poor Dad",
//     author:"Robert Kiyosaki",
//     price:399,
//     category:"Finance",
//     image:"https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"
//   },

//   {
//     id:3,
//     title:"The Alchemist",
//     author:"Paulo Coelho",
//     price:299,
//     category:"Fiction",
//     image:"https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
//   },

//   {
//     id:4,
//     title:"Do Epic Shit",
//     author:"Ankur Warikoo",
//     price:350,
//     category:"Motivation",
//     image:"https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg"
//   }
// ];

const filteredBooks= books.filter((book)=>{
    const matchesSearch= book.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory= category==="All" || book.category===category

    return matchesSearch && matchesCategory
})


  return (
    <div>
      <Navbar />
<div className="hero-section">

  <div className="hero-content">
  {/* <h1>Welcome to the App {user.name}</h1> */}
    <h1>
      Discover Your Next
      Favorite Book 📚
    </h1>

    <p>
      Explore thousands of books
      from every genre.
    </p>

    <button>
      Browse Collection
    </button>

  </div>

</div>

    <div className="filter-section">
        <input 
          type="text" 
          placeholder="Search books..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Self Help">Self Help</option>
          <option value="Finance">Finance</option>
          <option value="Fiction">Fiction</option>
          <option value="Motivation">Motivation</option>
        </select>
      </div>
      <div className="dashboard">

        {
          filteredBooks.map((book)=>(
            <BookCard 
            key={book.id} 
            book={book} />

          ))
        }
      </div>
    </div>
  );
}
export default Dashboard;

