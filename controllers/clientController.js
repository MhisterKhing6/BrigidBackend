import { UserAddressModel } from "../models/address.js"
import { FoodModel } from "../models/food.js"
import { OrderItemModel } from "../models/orderItem.js"
import { OrderModel } from "../models/orders.js"


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
    static order= async (req, res) => {
        //order items {email:email, orderItems:[{foodId:quantity, price}, {foodId:quantity, price}]}
        let orderDetails = req.body
        //form food order
        if(!(orderDetails.email && orderDetails.orderItems))
            return res.status(400).json({"message": "not all fields given"})
        //get date of the day of order

        let order = await new OrderModel({email:orderDetails.email}).save()
        
        //calculate total price
        let totalPrice = 0
        //from order items model
        let modelOrder = orderDetails.orderItems.map(orderItems => {
            totalPrice += orderItems.unitPrice * orderItems.quantity
            return new OrderItemModel({foodId:orderItems.foodId, quantity:orderItems.quantity, orderId:order._id, unitPrice: orderItems.unitPrice}).save()
        })
        order.totalPrice = totalPrice
        //save orders and order items
        await Promise.all([order.save(), ...modelOrder])
        return res.status(200).json({"message": "orders saved"})
    }

    /**
     * view user orders
     */
    static OrderNotDelivered = async (req, res) => {
        //get customers orders where status is not delivered
        let email = req.params.email
        let cus = await OrderModel.find({email}).lean().select("-__v")
        
        return res.status(200).json(cus)
    }

    
    static orderItems = async (req, res)=>{
        //get order id
        let orderId = req.params.orderId
        //find all order item that have given id
        let orderItems = await OrderItemModel.find({orderId}).lean().select("-__v")
        //get the food name and size associated with the order item        
        return res.status(200).json(orderItems)
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
}

export { ClientController }
