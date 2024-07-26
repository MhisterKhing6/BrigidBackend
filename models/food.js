import { model, Schema } from "mongoose";
const FoodSchema = new Schema({
    name:{type: String, required:true},
    description:{type:String, required:true},
    url: {type:String, required:true},
    size:{type:String, required:true},
    price:{type:Number, required:true},
    enabled: {type:Boolean, default:true},
    category: {type:String, required:true}
})

//create a model
let FoodModel = model("Food", FoodSchema)
export { FoodModel };

