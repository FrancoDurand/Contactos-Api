import { Router } from "express";
import hashPassword from "../middlewares/hash-password";
import { validateJWT } from "../middlewares/jwt";
import UserController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post("/login", hashPassword);
userRouter.post("/register", hashPassword);

userRouter.use(validateJWT);
userRouter.post("/updateName", UserController.updateName);
userRouter.post("/updateEmail", UserController.updateEmail);
userRouter.post("/updatePassword", UserController.updatePassword);
userRouter.get("/getContacts", UserController.getContacts);
userRouter.post("/updateContacts", UserController.updateContacts);

export { userRouter }