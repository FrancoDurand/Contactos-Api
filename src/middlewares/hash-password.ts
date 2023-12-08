import { hash } from "../config/hashier";
import { Request, Response } from "express";
import UserController from "../controllers/user-controller";


function hashPassword(req: Request, res: Response) {
    if (!req.body || !req.body.password)
        return res.status(400).json({ message: "Incomplete request" });

    const { password } = req.body;
    req.body.password = hash(password);

    if (req.path === '/register')
        UserController.register(req, res);
    else if (req.path === '/login')
        UserController.login(req, res);
}

export default hashPassword;
