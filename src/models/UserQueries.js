import { client } from "../postgressClient.js";
export function rowToObject(row){
    return {...row}
  }
const find = async()=>{
     return (await client.query('SELECT * FROM users')).rows
}
const findById = async(id)=>{
     return (await client.query(`SELECT * FROM users WHERE id = '${id}'`)).rows[0]
}
const findByEmail = async(email)=>{
     const query = `SELECT * FROM users WHERE email = '${email}'`
     return (await client.query(query)).rows[0]
}
const create = async(newUser)=>{
     const query = `INSERT INTO users(name,email,password,gender,description) VALUES('${newUser.name}','${newUser.email}','${newUser.password}','${newUser.gender}','${newUser.description} RETURNING *')`
     
     return await client.query(query)
}
const findByIdAndUpdate = async(id,updates)=>{
     const {email, name ,password,gender,description} = updates
     const keys = Object.keys(updates).length
     const query = `UPDATE users SET ${name? `name = '${name}'${email||password || gender|| description?',':''}`:''} ${email? `email = '${email}'${password || gender|| description?',':''}`:''} ${password? `password = '${password}'${gender|| description ?',':''}`:''} ${gender? `gender = '${gender}'${description?',':''}`:''} ${description? `description = '${description}'`:''} WHERE id = '${id}'`
     console.log("UpdateQuery", query)
    return await client.query(query)
}

export default {
    find, findByEmail, findById,create, findByIdAndUpdate
}