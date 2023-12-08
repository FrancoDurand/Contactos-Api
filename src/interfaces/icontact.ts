import { IUser } from "./iuser";
import { RowDataPacket } from "mysql2";

interface IContact extends Omit<IUser, 'password'> {
    added: boolean;
}

interface IUpdateContactRequest extends Omit<IContact, 'name' | 'email'> { }

interface IContactRow extends RowDataPacket, IContact { }

export { IContact, IUpdateContactRequest, IContactRow };