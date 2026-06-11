import { useState } from "react";
import axios from "axios";
import "./../css/Addbook.css";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleAddBook = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("author", author);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/addbook",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      alert("Book Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-box">
        <h1>Add Book</h1>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </div>
  );
}

export default AddBook;
