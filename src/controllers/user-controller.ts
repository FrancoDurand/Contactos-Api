import { Request, Response } from 'express';
import { User } from '../models/user';
import { ILoginRequest, IRegisterRequest, IUpdateNameRequest, IUpdateEmailRequest, IUpdatePasswordRequest, IUser } from '../interfaces/iuser';
import { IUpdateContactRequest } from '../interfaces/icontact';

class UserController {
    public static async register(req: Request, res: Response): Promise<void> {
        try {
            const registerData: IRegisterRequest = req.body;

            if (!registerData.name || !registerData.email || !registerData.password) {
                res.status(400).json({ message: "Incomplete request" });
                return;
            }

            const user = new User(registerData);
            const registerResult = await user.register(res);

            if (registerResult)
                res.status(200).json({ message: "Register successful", token: registerResult });
            else
                res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async login(req: Request, res: Response): Promise<void> {
        try {
            const loginData: ILoginRequest = req.body;

            if (!loginData.email || !loginData.password) {
                res.status(400).json({ message: "Incomplete request" });
                return;
            }

            const user = new User(loginData);
            const loginResult = await user.login(res);

            if (loginResult)
                res.status(200).json({ token: loginResult });
            else
                res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async updateName(req: Request, res: Response): Promise<void> {
        try {
            const updateData: IUpdateNameRequest = req.body;

            if (!updateData.id || !updateData.name) {
                res.status(400).json({ message: "Incomplete request" });
                return;
            }

            const user = new User(updateData);

            const updateResult = await user.updateName();

            if (updateResult)
                res.status(200).json({ message: "Update successful" });
            else
                res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async updateEmail(req: Request, res: Response): Promise<void> {
        try {
            const updateData: IUpdateEmailRequest = req.body;

            if (!updateData.id || !updateData.email) {
                res.status(400).json({ message: "Incomplete request" });
                return;
            }

            const user = new User(updateData);

            const updateResult = await user.updateEmail();

            if (updateResult)
                res.status(200).json({ message: "Update successful" });
            else
                res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async updatePassword(req: Request, res: Response): Promise<void> {
        try {
            const updateData: IUpdatePasswordRequest = req.body;

            if (!updateData.id || !updateData.password) {
                res.status(400).json({ message: "Incomplete request" });
                return;
            }

            const user = new User(updateData);

            const updateResult = await user.updatePassword();

            if (updateResult)
                res.status(200).json({ message: "Update successful" });
            else
                res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getContacts(req: Request, res: Response) {
        try {
            const userData: IUser = req.body;

            const user = new User(userData);
            const contacts = await user.getContacts();

            res.status(200).json(contacts);
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async updateContacts(req: Request, res: Response) {
        try {
            const userData: IUser = req.body;
            const contacts: IUpdateContactRequest[] = req.body.contacts;

            const user = new User(userData);
            const updateResult = await user.updateContacts(contacts);

            if (updateResult)
                res.status(200).json(updateResult);
            else
                res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default UserController;