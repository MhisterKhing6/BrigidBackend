import { Router } from "express";
import { decodeToken, getAuthorizationtoken } from "../utils/WebTokenController.js";
import { UserModel } from "../models/user.js";
import { erroReport } from "../utils/errors.js";
import { AdminController } from "../controllers/adminController.js";

let adminRoute = Router()




/**upload food category to the server
 * method:post
 * domain: restricted to admin users
 */
adminRoute.post("/food/category", AdminController.uploadFoodCategory)

/**upload food category to the server
 * method:post
 * domain: restricted to admin users
 */
adminRoute.get("/food/category", AdminController.ViewFoodCategory)



/**upload food food to the server
 * method:post
 * domain: restricted to admin users
 */
adminRoute.post("/food", AdminController.uploadFood)

/**upload food food to the server
 * method:post
 * domain: restricted to admin users
 */
adminRoute.get("/food", AdminController.viewFoods)

/**update food entry posted by users
 * method:post
 * domain: restricted to admin users
 */
adminRoute.put("/food", AdminController.editFood)

/**delete food entry  by users
 * method:delete
 * domain: restricted to admin users
 */
adminRoute.delete("/food/:id", AdminController.deleteFood)

/**
 * enable food for the week or day
 * method: post
 * domain: restricted to administrators
 */
adminRoute.post("/enable/food", AdminController.enableFood)

export {adminRoute}