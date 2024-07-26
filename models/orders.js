import { Schema, Types, model } from "mongoose";
let Order = new Schema(
    {
    email: {type:String, required:true},
    createdAt : {type:Date, default:Date.now()},
    totalPrice : {type:Number, default:0},
    location: {type:String},
    mode: {type:String},
    status : {type:String, enum:["pending", "completed", "cancelled"], default:"pending"},
    }
)

//create a model
let OrderModel = model("Order", Order)

//return model
export { OrderModel };

