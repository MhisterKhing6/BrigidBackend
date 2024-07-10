import { Router } from "express";
import { UserController } from "../controllers/userController.js";

let nonAuthRoute = Router()

/**
 register administrators to the system
* method: post
* domain: restricted to company selected users
*/
nonAuthRoute.post("/register/admin", UserController.registerAdmin)

/**
 registers user to the system
* method: post
* domain: restricted to company selected users
*/
nonAuthRoute.post("/user", UserController.registerUser)

/**
 * verify customer email
 * method:post
 * domain: retricted to customer email
 */
nonAuthRoute.post("/verify/user", UserController.verifyCutomerEmail)

/**
 register logs users into the system
* method: post
* domain: public
*/
nonAuthRoute.post("/login", UserController.login)

/**
 sends verification code to user
* method: get
* domain: public
*/
nonAuthRoute.get("/verification/code/:email", UserController.sendVerificationNumber)

/**
* checks verfication code
* method: get
* domain: public
*/
nonAuthRoute.post("/verification", UserController.verify)

/**
 * update password
 * method:post 
 * domain: public
 */
nonAuthRoute.post("/password", UserController.updatePassword)

/**
 * resend verification with verification id
 * method:post
 * domain:public
 */
nonAuthRoute.get("/resend/verifcation/:vId", UserController.resendVerifcationCode)

export {nonAuthRoute}