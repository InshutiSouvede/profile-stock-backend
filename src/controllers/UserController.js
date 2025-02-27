// import Users from "../models/User.js";
import { hash } from 'bcryptjs';
import Users from '../models/UserQueries.js'
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    console.log("Users",users.rows)
    res.json({ success: true, data: users.map(user=>({id:user.id, name:user.name,email:user.email,gender:user.gender, createdAt: user.createdat})) }).status(200);
  } catch (error) {
    res.json({ error: true, message: error.message }).status(401);
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id",id);
    const user = await Users.findById(id);
    console.log("Userby id", user)
    res.json({success:true, data: {id:user.id,email:user.email,name:user.name,gender:user.gender,description:user.description, createdAt: user.createdat}}).status(201)
  } catch (error) {
    res.json({ error: true, message: error.message }).status(401);
  }
};
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender,email, description, password } = req.body;
    const hashedPassword = password? await hash(password,10): null
    console.log("User input", req.body)
    const user = await Users.findByIdAndUpdate(id, { name, password:hashedPassword, gender, email, description });
    res.json({success:true, data: {id:user.id, email:user.email,name:user.name,gender:user.gender, description:user.description, createdAt: user.createdat}}).status(201)
} catch (error) {
    res.json({ error: true, message: error.message }).status(401);
  }
};
