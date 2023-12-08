import mysql, { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { ILoginRequest, IRegisterRequest, IUpdateNameRequest, IUpdateEmailRequest, IUpdatePasswordRequest, IUserRow, IUser } from '../interfaces/iuser';
import dotenv from 'dotenv';
import { IContact, IContactRow } from '../interfaces/icontact';


dotenv.config();

class Database {
    private static instance: Database;
    private static pool: Pool;

    static getInstance(): Database {
        if (!Database.instance)
            Database.instance = new Database();

        return Database.instance;
    }

    static async connect(): Promise<PoolConnection> {
        if (!Database.pool) {
            try {
                Database.pool = mysql.createPool({
                    host: process.env.DB_HOST || 'localhost',
                    user: process.env.DB_USER || 'root',
                    password: process.env.DB_PASSWORD || 'root',
                    database: process.env.DB_NAME || 'test',
                    connectionLimit: 2 // Número máximo de conexiones en el pool
                });
            }
            catch (e) {
                throw e;
            }
        }

        return Database.pool.getConnection();
    }

    public async login(user: ILoginRequest): Promise<IUserRow[]> {
        try {
            const connection = await Database.connect();
            const query = "SELECT id, email, hash_pass as pass FROM users WHERE email = ? AND hash_pass = ?";

            const [rows] = await connection.query<IUserRow[]>(query, [user.email, user.password]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async register(user: IRegisterRequest): Promise<ResultSetHeader> {
        try {
            const connection = await Database.connect();
            const query = "INSERT INTO users (name, email, pass, hash_pass) VALUES (?, ?, 1, ?)";

            const [rows] = await connection.query<ResultSetHeader>(query, [user.name, user.email, user.password]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async updateName(user: IUpdateNameRequest): Promise<ResultSetHeader> {
        try {
            const connection = await Database.connect();
            const query = "UPDATE users SET name = ? WHERE id = ?";

            const [rows] = await connection.query<ResultSetHeader>(query, [user.name, user.id]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async updateEmail(user: IUpdateEmailRequest): Promise<ResultSetHeader> {
        try {
            const connection = await Database.connect();
            const query = "UPDATE users SET email = ? WHERE id = ?";

            const [rows] = await connection.query<ResultSetHeader>(query, [user.email, user.id]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async updatePassword(user: IUpdatePasswordRequest): Promise<ResultSetHeader> {
        try {
            const connection = await Database.connect();
            const query = "UPDATE users SET hash_pass = ? WHERE id = ?";

            const [rows] = await connection.query<ResultSetHeader>(query, [user.password, user.id]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async getContacts(user: IUser): Promise<IContactRow[]> {
        try {
            const connection = await Database.connect();
            const query = "CALL getContactList(?)";

            const [rows] = await connection.query<IContactRow[]>(query, [user.id]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async addContact(user: IUser, contact: IContact): Promise<ResultSetHeader> {
        try {
            const connection = await Database.connect();
            const query = "INSERT INTO contacts(user_id, contact_id) VALUES (?, ?)";

            const [rows] = await connection.query<ResultSetHeader>(query, [user.id, contact.id]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }

    public async deleteContact(user: IUser, contact: IContact): Promise<ResultSetHeader> {
        try {
            const connection = await Database.connect();
            const query = "DELETE FROM contacts WHERE user_id = ? AND contact_id = ?";

            const [rows] = await connection.query<ResultSetHeader>(query, [user.id, contact.id]);
            connection.release();

            return rows;
        }
        catch (e) {
            throw e;
        }
    }
}


/* async function test() {
    try {
        const db = Database.getInstance();
        const result = await db.login('franco', 'franco');
        console.log(result);

        const result2 = await db.login('franco', 'franco2');
        console.log(result2);
    }
    catch (e) {
        console.log(e);
    }
}

test(); */

export { Database };