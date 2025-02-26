import { compare, hash } from "bcryptjs"
import Users from "../models/User.js"
import { secret } from "../constants.js"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    try {
        const {name, email, password,gender,description} = req.body
        const hashedPassword = await hash(password,10)
        const user = await Users.create({name,email,password:hashedPassword,gender,description})
   
        res.json({success:true, data: {id:user._id,email:user.email,name:user.name,gender:user.gender, description:user.description, createdAt:user.createdAt}}).status(201)
    } catch (error) {
        res.json({error:true, message:error.message}).status(401)
    }
}

export const login = async(req,res)=>{
    try {
        const {email, password} = req.body
        const user = await Users.findOne({email})
        if(!user) throw new Error("User not found")
        const isMatch = await compare(password, user.password)
        if(!isMatch) throw new Error("Invalid credentials")
        const token = jwt.sign({ id: user._id }, secret)
        res.json({success:true, data: {token, id: user._id}}).status(200)
    } catch (error) {
        res.json({error:true, message:error.message}).status(401)
    }
}