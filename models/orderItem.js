import { Schema, Types, model } from "mongoose";
const OrderItemSchema = new Schema({
    unitPrice:{type: Number, required:true},
    foodId: {type:String},
    quantity: {type:Number},
    orderId: {type:Types.ObjectId},
    foodName: {type:String, required:false}
})


//create a model
let OrderItemModel = model("OrderItem", OrderItemSchema)
export { OrderItemModel };

