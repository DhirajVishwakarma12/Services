const router = require("express").Router()
const {body} = require("express-validator")
const authController = require("../controller/auth.controller")

/**
 * @route /api/auth/register
 * @description create a usser
 * @access public
 */
router.post("/register",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email is required"),
        body("password")
            .notEmpty()
            .withMessage("Password is required"),
        body("username")
            .notEmpty()
            .withMessage("username is required")
    ],
    authController.register

)

/**
 * @route /api/auth/login
 * @description login an usser
 * @access public
 */
router.post("/login",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email is required"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    authController.login

)

/**
 * @route /api/auth/verify-otp
 * @description verify a user's OTP
 * @access public
 */
router.post("/verify-otp",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email is required"),
        body("otp")
            .notEmpty()
            .withMessage("OTP is required")
    ],
    authController.verifyOtp
)

module.exports = router
