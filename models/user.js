import { model, Schema } from "mongoose";
const UserSchema = new Schema({
    password: {type:String, required:true},
    email: {type:String, required: true, unique:true},
    role: {type:String, enum:["admin", "customer"], default: "admin"}
    
})

//create a model
let UserModel = model("User", UserSchema)
export { UserModel };

