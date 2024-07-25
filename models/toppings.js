import { Schema, Types, model } from "mongoose";
let Topping = new Schema(
    {
    inGredientName: {type:String, required:true},
    orderItemId: {type:Types.ObjectId, required:true},
    }
)

//create a model
let ToppingModel = model("Topping", Topping)

//return model
export { ToppingModel };

