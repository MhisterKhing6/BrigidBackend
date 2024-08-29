import { UserAddressModel } from "../models/address.js"
import { FoodModel } from "../models/food.js"
import { OrderItemModel } from "../models/orderItem.js"
import { OrderModel } from "../models/orders.js"
import { ReviewModel } from "../models/review.js"
import { ToppingModel } from "../models/toppings.js"


class ClientController {
    /**
     * adds user address
     * @param {object} req 
     * @param {object} res 
     * @returns json object
     */
    static addAddress = async (req, res) => {
        //
        let addressinfo = req.body
        if(!(addressinfo.email, addressinfo.addressLine1 && addressinfo.city && addressinfo.town && addressinfo.addAddress))
            return erroReport(res, 401, "allFields")
        //save information to the database
        let response = await new UserAddressModel(addressinfo).save()
        return res.status(200).json("address added")
    }

    static order = async (req, res) => {
        //order items {email:email, orderItems:[{foodId:quantity, price}, {foodId:quantity, price}]}
        let orderDetails = req.body
        //form food order
        if(!(orderDetails.phoneNumber && orderDetails.email && orderDetails.orderItems && orderDetails.location && orderDetails.mode))
            return res.status(400).json({"message": "not all fields given"})
        //get date of the day of order

        let order = await new OrderModel({phoneNumber:orderDetails.phoneNumber, mode:orderDetails.mode,email:orderDetails.email, location:orderDetails.location}).save()
        
        //calculate total price
        let totalPrice = 0
        const toppings = []
        //from order items model
        let modelOrder = orderDetails.orderItems.map(orderItems => {
            totalPrice += orderItems.unitPrice * orderItems.quantity
            let orderItem = new OrderItemModel({foodName:orderItems.foodName,foodId:orderItems.foodId, quantity:orderItems.quantity, orderId:order._id, unitPrice: orderItems.unitPrice})
            if(orderItems.toppings) {
                for(const topping of orderItems.toppings) {
                    toppings.push(new ToppingModel({inGredientName:topping.name,  orderItemId:orderItem._id}).save())
                }
            }
            return new OrderItemModel(orderItem.save())
        })
        order.totalPrice = totalPrice 
        //save orders and order items
        await Promise.all([order.save(), ...modelOrder, ...toppings])
        return res.status(200).json({"message": "orders saved"})
    }

    /**
     * view user orders
     */
    static OrderNotDelivered = async (req, res) => {
        //get customers orders where status is not delivered
        try {
        let email = req.params.email
        let cus = await OrderModel.find({email:email}).lean().select("-__v")
        let output = []
        for(const order of cus) {
            let items = await OrderItemModel.find({orderId: order._id}).lean()
            order.items = items
            output.push(order)
        }
        return res.status(200).json(output)
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "internal error contact admin"})
    }
    }

    
    static orderItems = async (req, res)=>{
        //get order id
        try {
        let orderId = req.params.orderId
        //find all order item that have given id
        let orderItems = await OrderItemModel.find({orderId}).lean().select("-__v")
        //get order items
        let orderItemL = []
        for(const orderItem of orderItems){
            let topping = await ToppingModel.find({orderItemId:orderItem._id}).lean().select("-__v")
            if(topping.length !== 0) {
                orderItem.topping = topping
            }
            orderItemL.push(orderItem)
        }
        return res.status(200).json(orderItemL)
    } catch(err) {
        console.log(err)
        return res.status(500).json({"message": "internal error"})
    }
    }

    static searchFood = async(req, res) => {
        //search for food
        let foodPattern = req.body.pattern
        let enabledFood = null
        if(!foodPattern){
            //returns all foods items that are enabled
            enabledFood = await FoodModel.find({enabled:true}).select("-__v").lean()
            //return foods
            //that are available
        }
        else {
            //search for meals that has pattern in them
            enabledFood = await FoodModel.find({name: {"$regex": foodPattern, "$options": "i"}}).select("-__v").lean()
        }
        return res.status(200).json(enabledFood)
    }

    static review = async (req, res) => {
        let revDetials = req.body
        if(!(revDetials.email && revDetials.rating)) {
            return res.status(400).json({"message": "not all fields given"})
        }
        let response = await ReviewModel({rating:revDetials.rating, email:revDetials.email, comment:revDetials.comment}).save()
        return res.status(200).json({"message": "comment saved"})
    }

    static getReview = async(req, res) => {
        /**
         * getReview: return all reviews for the plateform
         */
        let reviews  = await ReviewModel.find().lean().select("-__v -_id")
        return res.status(200).json(reviews)
    }

    static customerReview = async (req, res) => {
        let userEmail = req.params.email
        let userReview = await ReviewModel.find({"email":userEmail}).lean().select("-__v")
        return res.status(200).json(userReview)
    }
}

export { ClientController }
