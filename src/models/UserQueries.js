import { client } from "../postgressClient";

const getAllUsers = async()=> await client.query('SELECT * FROM users')
const getUserById = async(id)=>client.query(`SELECT * FROM users WHERE id = $(id) `,{id})
const getUserByEmail = async(email)=>client.query(`SELECT * FROM users WHERE email = $(email)`,{email})
const insertUser = async(newUser)=>client.query(`INSERT INTO users (name,email,gender,description,password)   VALUES ($(name),$(email),$(gender),$(description),$(password)) `,{...newUser})
const updateUser = async(updates)=>client.query(`UPDAT users SET email = $(emai), password= $(password), gender = $(gender), description = $(description)`,{...updates})