import { ResultSetHeader } from "mysql2/promise";
import { Database } from "../config/database";
import { IContact } from "../interfaces/icontact";
import { IUser } from "../interfaces/iuser";

class Contact implements IContact {
    id: number;
    name: string;
    email: string;
    added: boolean;

    constructor(contact: Partial<IContact>) {
        this.id = contact.id || 0;
        this.name = contact.name || "";
        this.email = contact.email || "";
        this.added = contact.added || false;
    }

    public async addContact(user: IUser): Promise<number> {
        try {
            const db = Database.getInstance();
            const addResult: ResultSetHeader = await db.addContact(user, this);

            return addResult.affectedRows > 0 ? 1 : 0;
        }
        catch (e) {
            throw e;
        }
    }

    public async deleteContact(user: IUser): Promise<number> {
        try {
            const db = Database.getInstance();
            const addResult: ResultSetHeader = await db.deleteContact(user, this);

            return addResult.affectedRows > 0 ? 1 : 0;
        }
        catch (e) {
            throw e;
        }
    }
}

export { Contact };