import express  from "express";
import {registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController
} from "../controller/authController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register",registerController);

// LOGIN || POST
router.post("/login", loginController);

// test routes
router.get("/test",requireSignIn,isAdmin,testController);

// Forgot Password || POST
router.post('/forgot-password' , forgotPasswordController)
// protected User route auth
router.get("/user-auth", requireSignIn,(req,res) =>{
    res.status(200).send({ ok:true });
});
// protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin ,(req,res) =>{
    res.status(200).send({ ok:true });
});

//update profile

router.put('/profile', requireSignIn, updateProfileController);

// orders
router.get('/orders',requireSignIn,getOrdersController);
// All orders
router.get('/all-orders',requireSignIn,isAdmin, getAllOrdersController);

export default router;