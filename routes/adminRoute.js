import { Router } from "express";
import { AdminController } from "../controllers/adminController.js";

let adminRoute = Router()


//add ingredients
adminRoute.post("/ingredient", AdminController.addIngredients)

//get ingredients
adminRoute.get("/ingredient", AdminController.getIngredients)

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
adminRoute.post("/toggle/food", AdminController.enableFood)

/**
 * view orders in a databases
 */
adminRoute.get("/order", AdminController.ViewOrders)

//admin add
adminRoute.post("/register-admin", AdminController.addAdmin)

//admin get Admin
adminRoute.get("/admin-status/:email", AdminController.isAdmin)

//get admin
adminRoute.get("/admin", AdminController.getAdmin)

//edit ingredient
adminRoute.put("/ingredient", AdminController.editIngredient)
//toggle ingredient
adminRoute.post("/toggle/ingredient", AdminController.enableIngredient)

//change status
adminRoute.post("/order/status", AdminController.orderStatus)




export { adminRoute };
