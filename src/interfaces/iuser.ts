import { RowDataPacket } from "mysql2";

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface ILoginRequest extends Omit<IUser, "id" | "name"> { }

interface IRegisterRequest extends Omit<IUser, "id"> { }

interface IUpdateNameRequest extends Pick<IUser, "id" | "name"> { }

interface IUpdateEmailRequest extends Pick<IUser, "id" | "email"> { }

interface IUpdatePasswordRequest extends Pick<IUser, "id" | "password"> { }

interface IUserRow extends RowDataPacket, IUser { }

export { IUser, ILoginRequest, IRegisterRequest, IUpdateNameRequest, IUpdateEmailRequest, IUpdatePasswordRequest, IUserRow };