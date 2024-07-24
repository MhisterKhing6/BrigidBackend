import { Router } from "express";
import { ClientController } from "../controllers/clientController.js";
import { UserModel } from "../models/user.js";
import { decodeToken, getAuthorizationtoken } from "../utils/WebTokenController.js";
import { erroReport } from "../utils/errors.js";

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

clientRoute.get("/order/:orderId", ClientController.orderItems)

/**
 * get enabled foods
 * method:get
 */
clientRoute.post("/food", ClientController.searchFood)

export { clientRoute };