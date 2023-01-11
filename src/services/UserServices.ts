import User from '../models/User';
import * as ValidationHandler from '../helpers/ValidationHandler';
import { errorsMessages } from '../helpers/ErrorHandler';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import * as Interfaces from './types/Interfaces';

export async function register(name: string, birthdate: string, email: string, password: string): Promise<Interfaces.CredentialsInterface | Interfaces.MessageInterface> {
    const validInfo = ValidationHandler.isAValidInfo(name, email, password, birthdate);
    if (validInfo) {
        const userExists = await User.findOne({email});
        if (userExists) return { message: errorsMessages.emailAlreadyExists };
        else {
            let hashPassword = bcrypt.hashSync(password,10);
            const newUser = await User.create({ name, birthdate, email, password: hashPassword });
            const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: 86400 });
            const credentials = { name: newUser.name, email: newUser.email, token };
            return credentials;
        }
    } else {
        if (!ValidationHandler.isAValidName(name)) return { message: errorsMessages.invalidName }
        if (!ValidationHandler.isAValidEmail(email)) return { message: errorsMessages.invalidEmail };
        if (!ValidationHandler.isAValidPassword(password)) return { message: errorsMessages.invalidPassword };
        if (!ValidationHandler.isAValidBirthdate(birthdate)) return { message: errorsMessages.invalidBirthdate };
        return { message: errorsMessages.invalidData };
    }
}

export async function login(email: string, password: string): Promise<Interfaces.CredentialsInterface | Interfaces.MessageInterface> {
    const user = await User.findOne({email});
    const isAValidInfo = ValidationHandler.isAValidInfo(undefined, email, password);
    if (user && isAValidInfo && bcrypt.compareSync(password, user.password as string)) {
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: 86400 });
        const credentials = { name: user.name, email: user.email, token };
        return credentials;
    } else {
        if (!isAValidInfo) return { message: errorsMessages.invalidData };
        else return { message: errorsMessages.invalidCredentials };
    }
        
}

export async function getUsers(): Promise<Interfaces.UsersListInterface | Interfaces.MessageInterface> {
    const users = await User.find().select('-password -__v');
    if (users.length === 0) return { message: errorsMessages.noUsersAvailable }
    else return users;
}

export async function getMyUser(id: string): Promise<Interfaces.UserInterface | Interfaces.MessageInterface> {
    const user = await User.findById(id).select('-password -__v');
    if (!user) return { message: errorsMessages.notFoundUser };
    else return user;
}

export async function getUser(id: string): Promise<Interfaces.UserInterface | Interfaces.MessageInterface> {
    const user = await User.findById(id).select('-password -__v');
    if (!user) return { message: errorsMessages.notFoundUser };
    else return user;
}

export async function updateMyUser(id: string, name?: string, birthdate?: string, email?: string, password?: string): Promise<Interfaces.MessageInterface> {
    const user = await User.findById(id);
    const validData = ValidationHandler.isAValidInfo(name, email, password, birthdate);
    const hasChangedSomething = user ? ValidationHandler.hasChangedData(user, name, birthdate, email, password) : false;
    if (user && validData && hasChangedSomething) {
        if (name) user.name = name;
        if (birthdate) user.birthdate = birthdate;
        if (email) user.email = email;
        if (password) user.password = bcrypt.hashSync(password,10);
        await user.save();
        return { message: "Your user was been updated with sucess!" };
    } else {
        if(!user) return { message: errorsMessages.notFoundUser };
        if(!hasChangedSomething) return { message: errorsMessages.noChangedDetected };
        if(!validData) {
            if (name && !ValidationHandler.isAValidName(name)) return { message: errorsMessages.invalidName }
            if (email && !ValidationHandler.isAValidEmail(email)) return { message: errorsMessages.invalidEmail };
            if (password && !ValidationHandler.isAValidPassword(password)) return { message: errorsMessages.invalidPassword };
            if (birthdate && !ValidationHandler.isAValidBirthdate(birthdate)) return { message: errorsMessages.invalidBirthdate };
        }
        return { message: errorsMessages.invalidData };
    }
}

export async function deleteMyUser(id: string) {
    const user = await User.findById(id);
    if (user) {
        await user.remove();
        return { message: "Your user was been deleted with sucess!" };
    } else return { message: errorsMessages.notFoundUser };
}
