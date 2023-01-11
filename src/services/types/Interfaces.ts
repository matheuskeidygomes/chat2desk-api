import { ObjectId } from 'mongodb';

export interface CredentialsInterface {
    name: string;
    email: string;
    token: string;
}

export interface MessageInterface {
    message: string;
}

export interface UserInterface {
    id?: ObjectId;
    name: string;
    birthdate: string;
    email: string;
}

export interface UsersListInterface {
    [index: number]: UserInterface;
}
