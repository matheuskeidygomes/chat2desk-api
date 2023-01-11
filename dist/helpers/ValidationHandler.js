"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAStringType = exports.isAValidObjectId = exports.isHigherThanToday = exports.hasChangedData = exports.hasEmptyFieldsLogin = exports.hasEmptyFieldsCreateOrUpdate = exports.isAValidInfo = exports.isAValidBirthdate = exports.isAValidName = exports.isAValidPassword = exports.isAValidEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Checking if email is valid ---------------------------------------------------------------------
function isAValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}
exports.isAValidEmail = isAValidEmail;
// Checking if password contains at least one number, one letter and one special character ---------
function isAValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
    return passwordRegex.test(password);
}
exports.isAValidPassword = isAValidPassword;
// Checking if name contains only letters and spaces ------------------------------------------------
function isAValidName(name) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    return nameRegex.test(name);
}
exports.isAValidName = isAValidName;
// Checking if birthdate is a valid Date ------------------------------------------------------------
function isAValidBirthdate(birthdate) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    //console.log(isHigherThanToday(birthdate));
    return dateRegex.test(birthdate) && !isHigherThanToday(birthdate);
}
exports.isAValidBirthdate = isAValidBirthdate;
// Checking all the four functions above ---------------------------------------------------------
function isAValidInfo(name, email, password, birthdate) {
    if (name && !isAValidName(name))
        return false;
    if (email && !isAValidEmail(email))
        return false;
    if (password && !isAValidPassword(password))
        return false;
    if (birthdate && !isAValidBirthdate(birthdate))
        return false;
    return true;
}
exports.isAValidInfo = isAValidInfo;
// Checking if has any empty field ------------------------------------------------------------------
function hasEmptyFieldsCreateOrUpdate(name, birthdate, email, password) {
    return [name, birthdate, email, password].some(field => !field || field.trim() === "");
}
exports.hasEmptyFieldsCreateOrUpdate = hasEmptyFieldsCreateOrUpdate;
function hasEmptyFieldsLogin(email, password) {
    return [email, password].some(field => !field || field.trim() === "");
}
exports.hasEmptyFieldsLogin = hasEmptyFieldsLogin;
// Checking if the data has changed for update user ------------------------------------------------
function hasChangedData(user, name, birthdate, email, password) {
    if (name && name !== user.name)
        return true;
    if (birthdate && birthdate !== user.birthdate)
        return true;
    if (email && email !== user.email)
        return true;
    if (password && !bcryptjs_1.default.compareSync(password, user.password))
        return true;
    return false;
}
exports.hasChangedData = hasChangedData;
// Checking if the date string is higher than today -------------------------------------------------
function isHigherThanToday(date) {
    const today = new Date();
    const dateArray = date.split("/");
    const dateToCheck = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
    return dateToCheck > today;
}
exports.isHigherThanToday = isHigherThanToday;
// checking if the string is a valid ObjectId string -----------------------------------------------
function isAValidObjectId(id) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
}
exports.isAValidObjectId = isAValidObjectId;
// Checking if the req.body received data is a string type -----------------------------------------
function isAStringType(name, email, birthdate, password) {
    const values = [name, email, birthdate, password].filter(value => value !== undefined);
    return values.every(value => typeof value === "string");
}
exports.isAStringType = isAStringType;
