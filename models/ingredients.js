import { Schema, Types, model } from "mongoose";
let IngredientShema = new Schema(
    {
    name: {type:String, required:true},
    price: {type:Number, required:true},
    enable: {type:Boolean, default:true}
    }
)

//create a model
let IngredientModel = model("Ingredient", IngredientShema)

//return model
export { IngredientModel };

