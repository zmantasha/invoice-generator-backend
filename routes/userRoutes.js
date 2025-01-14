const express= require("express");
const UserValidation = require("../validation/userValidation");
const validateSchema = require("../middleware/validatemiddleware");
const UserController = require("../controllers/userController");
const UserMiddleware = require("../middleware/userMiddleware");
const passport= require("passport")
const accessTokenAutoRefresh = require("../middleware/accessTokenAutoRefresh");
const upload = require("../middleware/FileUploder");
const router= express.Router()

const validateRegistrationUser=validateSchema(UserValidation.registrationValidateSchema)
const validateLoginUser=validateSchema(UserValidation.loginValidateSchema)
const validateUpdateUser=validateSchema(UserValidation.updateUserValidateSchema)
const validateUpdateFileUser=validateSchema(UserValidation.updateUserFileValidateSchema)

// Routes
router.post("/registration",validateRegistrationUser, UserController.userRegistration)
router.post("/login",validateLoginUser,UserMiddleware.fetchEmailIncollection, UserController.userLogin)
router.post("/refresh-token", UserController.getNewAccessToken)
router.get("/me",accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }), UserController.userProfile)
router.put("/me/:id",validateUpdateUser,accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }),  UserController.updateProfile)
router.put("/me/:id/avatar",validateUpdateFileUser,accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }),upload.single("avatar"),  UserController.updateAvatarImage)
router.put("/me/:id/logo",validateUpdateFileUser,accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }),upload.single("logo"),  UserController.updateLogoImage)
router.delete("/me/:id",accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }),  UserController.deleteProfile)
router.post("/logout",accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }), UserController.userlogout)

module.exports= router;