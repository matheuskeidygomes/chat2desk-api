import JWT, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function decodeHash(hash: string): JwtPayload {
    const token = hash.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
    return decoded as JwtPayload;
}