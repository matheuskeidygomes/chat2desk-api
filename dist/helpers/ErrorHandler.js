"use strict";
// Error messages for the application -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsMessages = void 0;
exports.errorsMessages = {
    requiredFields: 'Please fill all required fields',
    invalidCredentials: 'Invalid credentials, please try again',
    emailAlreadyExists: 'E-mail already exists, please try another one',
    invalidEmail: 'Invalid e-mail, please try a valid one.',
    invalidPassword: 'Invalid password, please try another one. Remember to use at least: 1 number, 1 Uppercase letter and 1 special character. The password must have at least 8 characters at all.',
    invalidName: 'Invalid name, please try another one. Use only letters and spaces',
    invalidBirthdate: 'Invalid birthdate, please try another. Use the format: DD/MM/YYYY, and remember that you must choose a date before today',
    invalidToken: 'Invalid token, please try again',
    expiredToken: 'Expired token, please do login again',
    unauthorized: 'Unauthorized, please do login',
    invalidAuthType: 'Invalid auth type, please try again',
    invalidData: 'Invalid data, please try again',
    notFoundUser: 'Sorry, we could not find this user',
    noUsersAvailable: 'Sorry, We have no users available',
    noChangedDetected: 'Sorry, we could not detect any changes',
    invalidId: 'Invalid id, please try again with a valid id',
    invalidStringType: 'Invalid string type, please try again with a valid string'
};
