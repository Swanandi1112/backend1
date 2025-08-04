// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
const path = require("path");
const cors = require('cors');
app.use(cors());

// Import routes
const videoUploadRoute = require("./routes/uploadVideo");



// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Middleware to parse JSON
app.use(express.json());

// Static folder for image access
app.use("/uploads", express.static("uploads")); //  allow access to uploaded files

const authRoutes = require("./routes/auth");
app.use("/api",authRoutes);

//mongoDB atlas connection string
const mongoURI = "mongodb+srv://swanandiwalkikar:swanandi@cluster0.8oulfqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//connect to mongoDB
mongoose
.connect(mongoURI)
.then(()=>{
  console.log("  MongoDB connected");
})

.catch((err)=>{
  console.error("  MongoDB connection error:",err);
});



  // Image upload route
const uploadRoute = require("./routes/uploads"); //  import upload route
app.use("/api", uploadRoute); //  mount it on /api/upload


app.get("/",(req,res)=>{
  res.send("API is working");
});

    const userRoutes = require("./routes/userRoutes");
   app.use("/api",userRoutes);
      
   
   const ProductRoutes = require("./routes/ProductRoutes");
  app.use("/api",ProductRoutes);


// Use routes
app.use("/api", videoUploadRoute);

  

// Start the server
app.listen(PORT, () => {
  console.log(`hello Server running on http://localhost:${PORT}`);
});