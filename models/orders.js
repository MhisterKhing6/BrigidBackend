import { Schema, Types, model } from "mongoose";
let Order = new Schema({
    email: {type:String, required:true},
    createdAt : {type:Date, default:Date.now()},
    totalPrice : {type:Number, default:0},
    status : {type:String, enum:["preparing", "on delivery", "cancelled", "delivered"]},
}
)

//create a model
let OrderModel = model("Order", Order)

//return model
export { OrderModel };

