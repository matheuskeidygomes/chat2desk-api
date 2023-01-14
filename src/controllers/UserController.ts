import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';
import { errorsMessages } from '../helpers/ErrorHandler';
import * as ValidationHandler from '../helpers/ValidationHandler';
import JwtHandler from '../helpers/JwtHandler';

export async function register(req: Request, res: Response): Promise<void> {
    const { name, birthdate, email, password } = req.body;
    const isAllString = ValidationHandler.isAStringType(name, birthdate, email, password);
    const hasEmptyFields = isAllString ? ValidationHandler.hasEmptyFieldsCreateOrUpdate(name, birthdate, email, password) : ValidationHandler.hasEmptyFieldsCreateOrUpdate(name.toString(), birthdate.toString(), email.toString(), password.toString());
    if (hasEmptyFields) {
        res.status(400).json({ error: errorsMessages.requiredFields});
    } else {
        const resJson = await UserServices.register(name, birthdate, email, password);
        res.json(resJson);
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const isAllString = ValidationHandler.isAStringType(undefined, email, undefined, password);
    const hasEmptyFields = isAllString ? ValidationHandler.hasEmptyFieldsLogin(email, password) : ValidationHandler.hasEmptyFieldsLogin(email.toString(), password.toString());
    if (hasEmptyFields) {
        res.status(400).json({ error: errorsMessages.requiredFields});
    } else {
        const resJson = await UserServices.login(email, password);
        res.json(resJson);
    }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    const resJson = await UserServices.getUsers();
    res.json(resJson);
}

export async function getOneUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (id && ValidationHandler.isAValidObjectId(id)) {
        const resJson = await UserServices.getUser(id);
        res.json(resJson);
    } else {
        res.status(400).json({ error: errorsMessages.invalidId });
    }
}

export async function getMyUser(req: Request, res: Response): Promise<void> {
    const { id } = JwtHandler(req.headers.authorization as string);
    const resJson = await UserServices.getMyUser(id);
    res.json(resJson);
}

export async function updateMyUser(req: Request, res: Response): Promise<void> {
    const { id } = JwtHandler(req.headers.authorization as string);
    const { name, birthdate, email, password } = req.body;
    const isAllString = ValidationHandler.isAStringType(name, birthdate, email, password);
    const missingData = !name && !birthdate && !email && !password;
    if (missingData) {
        res.status(400).json({ error: errorsMessages.noChangedDetected });
    } else {
        const user = isAllString ? await UserServices.updateMyUser(id, name, birthdate, email, password) : await UserServices.updateMyUser(id, name.toString(), birthdate.toString(), email.toString(), password.toString());
        res.json(user);
    }
}

export async function deleteMyUser(req: Request, res: Response): Promise<void> {
    const { id } = JwtHandler(req.headers.authorization as string);
    const user = await UserServices.deleteMyUser(id);
    res.json(user);
}
