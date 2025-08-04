const express = require("express");
const router = express.Router();
const User = require("./../models/User");

// ✅ CREATE: Register new user


router.post("/register", async (req, res) => {
  try {
    const { name, email, password,phone,age,countary } = req.body;
    const newUser = await User.create({ name, email, password ,phone,age,countary});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});



router.get("/users", async(req,res)=>{

  try{
const {age} = req.query;
const {password} = req.query;
const {countary} = req.query;
const filter ={};
if(age){
  filter.age = Number(age);
}
if(password){
 filter.password= String(password);
}
if(countary){
  filter.countary = String(countary);
}
   
const users = await User.find(filter);
    res.json(users);
  }

catch(error){
res.status(500).json({error:"Error getting user"});
}
});


router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // data to update
      { new: true } // return updated document
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

 module.exports = router;