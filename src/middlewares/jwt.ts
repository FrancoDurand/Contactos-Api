import jwt from 'jsonwebtoken';
import fs from 'fs';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/iuser';
import hashPassword from './hash-password';

const privateKeyPath = process.env.PRIVATE_KEY || 'src/config/private.pem';
const publicKeyPath = process.env.PUBLIC_KEY || 'src/config/public.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

function generateJWT(user: IUser, res: Response) {
    const payload = { id: user.id };

    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    res.append('Authorization', token);
    return token;
}

function validateJWT(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: "No token" });

    if (req.path == "/updatePassword")
        hashPassword(req, res);

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Invalid token" });

        req.body.id = (decoded as jwt.JwtPayload).id;
        //if (decoded)
        //res.json(decoded);
    });

    next();
}

export { generateJWT, validateJWT };