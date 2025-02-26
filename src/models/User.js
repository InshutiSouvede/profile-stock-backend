import mongoose, { model, Schema } from "mongoose";
const UserSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      default: "I enjoy learning new things, meeting people from different backgrounds, and having great conversations. Always up for a good chat or an interesting story!",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = model("User", UserSchema);

export default Users;
