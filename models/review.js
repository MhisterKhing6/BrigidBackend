import { Schema, Types, model } from "mongoose";
const ReviewSchema = new Schema({
    email:{type: String, required:true},
    comment: {type:String,},
    rating: {type:Number, required: true},
})


//create a model
let ReviewModel = model("Reviews", ReviewSchema)
export { ReviewModel };

