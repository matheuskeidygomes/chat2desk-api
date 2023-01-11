import { Request, Response, NextFunction } from 'express';
import { errorsMessages } from '../helpers/ErrorHandler';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Auth = {

    // Checking if the user is logged in

    private: async (req: Request, res: Response, next: NextFunction) => {

        if (req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');

            if (authType === 'Bearer') {

                JWT.verify(token, process.env.JWT_SECRET_KEY as string, (err, data) => {
                    if (err) {
                        if (err.name === "JsonWebTokenError") { res.status(403).json({ error: errorsMessages.invalidToken }); console.log(err); }
                        else res.status(403).json({ error: errorsMessages.expiredToken });
                    } else next();
                });

            } else res.status(403).json({ error: errorsMessages.invalidAuthType });

        } else res.status(403).json({ error: errorsMessages.unauthorized });

    }

}

export default Auth;