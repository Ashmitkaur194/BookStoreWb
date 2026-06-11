import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'A192004@kaurnik',
    database:'bookshop'
});

const SECRET_KEY = "AshmitKaur1944";

db.connect((err)=>{

  if(err){
    console.log(err);
  }

  else{
    console.log("MySQL Connected");
  }

});

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },

  filename:(req,file,cb)=>{
    cb(null,Date.now() +path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage:storage });
app.use( "/uploads", express.static("uploads") );


// verify token middleware
const verifyToken = (req,res,next)=>{

  const token =
  req.headers.authorization?.split(" ")[1];

  if(!token){
    return res.json({
      message:"No Token Found"
    });
  }
  jwt.verify(
    token,
    SECRET_KEY,
    (err,decoded)=>{
      if(err){
        return res.json({
          message:"Invalid Token"
        });
      }
      req.user = decoded;
      next();
    }
  );
};



app.get("/",(req,res)=>{
    res.json("Hello this is the backend");
})

//register user

app.post("/register",(req,res)=>{

    const {name,email,password} = req.body;
    console.log(req.body);
    const checkSql =
    "SELECT * FROM users WHERE email=?";

  db.query(checkSql, [email], async (err, data) => {

    if (err) {
      return res.json(err);
    }
    
    // EMAIL ALREADY EXISTS
    if (data.length > 0) {
      return res.json({
        message: "User already registered",
      });
    }


    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);


    // INSERT USER
    const insertSql =
      "INSERT INTO users(name,email,password) VALUES(?,?,?)";

    db.query(
      insertSql,
      [name, email, hashedPassword],
      (err, result) => {

        if (err) {
          return res.json(err);
        }

        res.json({
          message: "User Registered Successfully",
        });
      }
    );
  });
});


//login user

app.post("/login",(req,res)=>{

  const {email,password} = req.body;
  console.log(req.body);

  const sql =
  "SELECT * FROM users WHERE email=?";

  db.query(sql,[email],async(err,result)=>{

    if(err){

      return res.json({
        message:"Error"
      });

    }

    if(result.length === 0){

      return res.json({
        message:"User Not Found"
      });

    }

    const user = result[0];

    const match =
    await bcrypt.compare(
      password,
      user.password
    );

    if(!match){
      return res.json({
        message:"Invalid Password"
      });
    }
    const token = jwt.sign(
      {
        email:user.email
      },
      SECRET_KEY,
      {
        expiresIn:"1d"
      }
    );
    res.json({
      message:"Login Successful",
      token:token,
      user:user.email
    });
    console.log({
        message:"Login Successful",
        token:token,
        user:user.email
      });
    });

});

//protected route

app.get("/dashboard",
  verifyToken,
  (req,res)=>{
    res.json({
      message:"Protected Dashboard",
      user:req.user
    });
});


// Add Book api 

app.post("/addbook",
  verifyToken,
  upload.single("image"),(req,res)=>{
  const {title,author,price,category} = req.body;
  const image = req.file.filename;
  console.log(req.body);
  console.log("Req.File: ",req.file);

  const sql =
  `
  INSERT INTO books
  (title,author,price,category,image)
  VALUES(?,?,?,?,?)
  `;

  db.query(
    sql,[title,author,price,category,image],
    (err,result)=>{
      if(err){
        return res.json({
          message:"Error Adding Book"
        });
      }
      res.json({
        message:"Book Added Successfully"
      });
    }
  );
});


// get all books api 
app.get("/books",(req,res)=>{

  const sql =
  "SELECT * FROM books";
  db.query(sql,(err,result)=>{
    if(err){
      return res.json({
        message:"Error Fetching Books"
      });
    }
    res.json(result);
   
  });
});

//add to cart
app.post(
  "/add-cart",
  verifyToken,
  (req,res)=>{
    const {book_id,title,price,image} = req.body;
    const user =req.user.email;
    const sql =
    `
    INSERT INTO cart
    (user,book_id,title,price,image)
    VALUES(?,?,?,?,?)
    `;

    db.query(

      sql,

      [
        user,
        book_id,
        title,
        price,
        image
      ],
      (err,result)=>{
        if(err){
          return res.json({
            message:"Error Adding To Cart"
          });
        }
        res.json({
          message:"Added To Cart"
        });
      }
    );
});


app.get(
  "/cart",
  verifyToken,
  (req,res)=>{
    const user =
    req.user.email;
    const sql =
    `
    SELECT * FROM cart
    WHERE user=?
    `;
    db.query(
      sql,
      [user],
      (err,result)=>{
        if(err){
          return res.json({
            message:"Error Fetching Cart"
          });
        }
        res.json(result);
      }
    );
});





app.delete(

  "/remove-cart/:id",

  verifyToken,

  (req,res)=>{

    const id =
    req.params.id;

    const sql =
    `
    DELETE FROM cart
    WHERE id=?
    `;

    db.query(

      sql,

      [id],

      (err,result)=>{

        if(err){

          return res.json({
            message:"Error Removing Item"
          });

        }

        res.json({
          message:"Item Removed"
        });

      }

    );

});





app.listen(5000,()=>{ 
    console.log("Server Started"); 
});



