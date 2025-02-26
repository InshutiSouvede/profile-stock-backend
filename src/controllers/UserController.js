import Users from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ success: true, data: users.map(user=>({id:user._id, name:user.name,email:user.email,gender:user.gender, createdAt: user.createdAt})) }).status(200);
  } catch (error) {
    res.json({ error: true, message: error.message }).status(401);
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);
    res.json({success:true, data: {id:user._id,email:user.email,name:user.name,gender:user.gender,description:user.description, createdAt: user.createdAt}}).status(201)
  } catch (error) {
    res.json({ error: true, message: error.message }).status(401);
  }
};
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender,email, description } = req.body;
    const user = await Users.findByIdAndUpdate(id, { name, gender, email, description }, { new: true });
    res.json({success:true, data: {id:user._id, email:user.email,name:user.name,gender:user.gender, description:user.description, createdAt: user.createdAt}}).status(201)
} catch (error) {
    res.json({ error: true, message: error.message }).status(401);
  }
};
