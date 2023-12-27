import { IUser, IUserRow } from "../interfaces/iuser";
import { Database } from "../config/database";
import { Response } from "express";
import { generateJWT } from "../middlewares/jwt";
import { ResultSetHeader } from "mysql2";
import { IContact, IUpdateContactRequest } from "../interfaces/icontact";
import { Contact } from "./contact";

class User implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;

    constructor(user: Partial<IUser>) {
        this.id = user.id || 0;
        this.name = user.name || "";
        this.email = user.email || "";
        this.password = user.password || "";
    }

    public async register(res: Response): Promise<string> {
        try {
            const db = Database.getInstance();
            const registerResult: ResultSetHeader = await db.register(this);

            if (registerResult.affectedRows > 0) {
                /* const loginResult: IUserRow[] = await db.login(this);
                const token = generateJWT(loginResult[0], res);
                return token; */
                return this.login(res);
            }
            else return "";
        }
        catch (e) {
            throw e;
            //res.status(500).json({ message: "Internal server error" });
        } //TODO: validar si el usuario ya existe
    }

    public async login(res: Response): Promise<string> {
        try {
            const db = Database.getInstance();
            const loginResult: IUserRow[] = await db.login(this);

            if (loginResult.length > 0) {
                const token = generateJWT(loginResult[0], res);
                return token;
                //res.status(200).json({ message: "Login successful" });
            }
            else return "";
            //res.status(401).json({ message: "Invalid credentials" });
        }
        catch (e) {
            throw e;
            //res.status(500).json({ message: "Internal server error" });
        }
    }

    public async updateName(): Promise<boolean> {
        try {
            const db = Database.getInstance();
            const updateResult: ResultSetHeader = await db.updateName(this);

            if (updateResult.affectedRows > 0) {
                return true;
            }
            else return false;
        }
        catch (e) {
            throw e;
        }
    }

    public async updateEmail(): Promise<boolean> {
        try {
            const db = Database.getInstance();
            const updateResult: ResultSetHeader = await db.updateEmail(this);

            if (updateResult.affectedRows > 0) {
                return true;
            }
            else return false;
        }
        catch (e) {
            throw e;
        }
    }

    public async updatePassword(): Promise<boolean> {
        try {
            const db = Database.getInstance();
            const updateResult: ResultSetHeader = await db.updatePassword(this);

            if (updateResult.affectedRows > 0) {
                return true;
            }
            else return false;
        }
        catch (e) {
            throw e;
        }
    }

    public async getContacts(): Promise<IContact[]> {
        try {
            const db = Database.getInstance();
            const contactList: any = await db.getContacts(this);

            return contactList[0];
        }
        catch (e) {
            throw e;
        }
    }

    public async updateContacts(contactList: IUpdateContactRequest[]): Promise<{ addedContacts: number, deletedContacts: number }> {
        try {
            let addContactList: Contact[] = [];
            let deleteContactList: Contact[] = [];

            contactList.forEach((contact) => {
                if (contact.added) addContactList.push(new Contact(contact));
                else deleteContactList.push(new Contact(contact));
            });

            let updateResult: { addedContacts: number, deletedContacts: number } = {
                addedContacts: 0,
                deletedContacts: 0
            };

            addContactList.forEach(async (contact) => {
                try {
                    const result = await contact.addContact(this);
                    if (result) updateResult.addedContacts++;
                }
                catch (e) {
                    throw e;
                }
            });

            deleteContactList.forEach(async (contact) => {
                try {
                    const result = await contact.deleteContact(this);
                    if (result) updateResult.deletedContacts++;
                }
                catch (e) {
                    throw e;
                }
            });

            return updateResult;
        }
        catch (e) {
            throw e;
        }

    }
}

export { User };
