import { Router } from "express";
import { ClientController } from "../controllers/clientController.js";

let clientRoute = Router()


/**
 * adds client address
 * method: post
 * domain: restricted to clients
 */
clientRoute.post("/address", ClientController.addAddress)

/**
 * view foods
 * method: get
 * domain:client and users
 */

/**
 * post order with  food item
 * method: post
 * domain: client
 */
clientRoute.post('/order', ClientController.order)

/**
 * view foods not delivered
 * method: post
 * domain: client
 */
clientRoute.get('/order/:email', ClientController.OrderNotDelivered)





/**
 * get food items for a an order
 * method: get
 */
/**
 * get user reviews
 */
clientRoute.post("/review", ClientController.review)

/**
 * get all reviews
 */
clientRoute.get("/review", ClientController.getReview)

/**
 * get all reviews of user with an email
 */
clientRoute.get("/review/:email", ClientController.customerReview)

/**get items of orders */
clientRoute.get("/order/items/:orderId", ClientController.orderItems)

/**
 * get enabled foods
 * method:get
 */
clientRoute.post("/food", ClientController.searchFood)

export { clientRoute };
