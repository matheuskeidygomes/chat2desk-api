"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMyUser = exports.updateMyUser = exports.getUser = exports.getMyUser = exports.getUsers = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const ValidationHandler = __importStar(require("../helpers/ValidationHandler"));
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function register(name, birthdate, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const validInfo = ValidationHandler.isAValidInfo(name, email, password, birthdate);
        if (validInfo) {
            const userExists = yield User_1.default.findOne({ email });
            if (userExists)
                return { message: ErrorHandler_1.errorsMessages.emailAlreadyExists };
            else {
                let hashPassword = bcryptjs_1.default.hashSync(password, 10);
                const newUser = yield User_1.default.create({ name, birthdate, email, password: hashPassword });
                const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 });
                const credentials = { name: newUser.name, email: newUser.email, token };
                return credentials;
            }
        }
        else {
            if (!ValidationHandler.isAValidName(name))
                return { message: ErrorHandler_1.errorsMessages.invalidName };
            if (!ValidationHandler.isAValidEmail(email))
                return { message: ErrorHandler_1.errorsMessages.invalidEmail };
            if (!ValidationHandler.isAValidPassword(password))
                return { message: ErrorHandler_1.errorsMessages.invalidPassword };
            if (!ValidationHandler.isAValidBirthdate(birthdate))
                return { message: ErrorHandler_1.errorsMessages.invalidBirthdate };
            return { message: ErrorHandler_1.errorsMessages.invalidData };
        }
    });
}
exports.register = register;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email });
        const isAValidInfo = ValidationHandler.isAValidInfo(undefined, email, password);
        if (user && isAValidInfo && bcryptjs_1.default.compareSync(password, user.password)) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 });
            const credentials = { name: user.name, email: user.email, token };
            return credentials;
        }
        else {
            if (!isAValidInfo)
                return { message: ErrorHandler_1.errorsMessages.invalidData };
            else
                return { message: ErrorHandler_1.errorsMessages.invalidCredentials };
        }
    });
}
exports.login = login;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.default.find().select('-password -__v');
        if (users.length === 0)
            return { message: ErrorHandler_1.errorsMessages.noUsersAvailable };
        else
            return users;
    });
}
exports.getUsers = getUsers;
function getMyUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(id).select('-password -__v');
        if (!user)
            return { message: ErrorHandler_1.errorsMessages.notFoundUser };
        else
            return user;
    });
}
exports.getMyUser = getMyUser;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(id).select('-password -__v');
        if (!user)
            return { message: ErrorHandler_1.errorsMessages.notFoundUser };
        else
            return user;
    });
}
exports.getUser = getUser;
function updateMyUser(id, name, birthdate, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(id);
        const validData = ValidationHandler.isAValidInfo(name, email, password, birthdate);
        const hasChangedSomething = user ? ValidationHandler.hasChangedData(user, name, birthdate, email, password) : false;
        if (user && validData && hasChangedSomething) {
            if (name)
                user.name = name;
            if (birthdate)
                user.birthdate = birthdate;
            if (email)
                user.email = email;
            if (password)
                user.password = bcryptjs_1.default.hashSync(password, 10);
            yield user.save();
            return { message: "Your user was been updated with sucess!" };
        }
        else {
            if (!user)
                return { message: ErrorHandler_1.errorsMessages.notFoundUser };
            if (!hasChangedSomething)
                return { message: ErrorHandler_1.errorsMessages.noChangedDetected };
            if (!validData) {
                if (name && !ValidationHandler.isAValidName(name))
                    return { message: ErrorHandler_1.errorsMessages.invalidName };
                if (email && !ValidationHandler.isAValidEmail(email))
                    return { message: ErrorHandler_1.errorsMessages.invalidEmail };
                if (password && !ValidationHandler.isAValidPassword(password))
                    return { message: ErrorHandler_1.errorsMessages.invalidPassword };
                if (birthdate && !ValidationHandler.isAValidBirthdate(birthdate))
                    return { message: ErrorHandler_1.errorsMessages.invalidBirthdate };
            }
            return { message: ErrorHandler_1.errorsMessages.invalidData };
        }
    });
}
exports.updateMyUser = updateMyUser;
function deleteMyUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(id);
        if (user) {
            yield user.remove();
            return { message: "Your user was been deleted with sucess!" };
        }
        else
            return { message: ErrorHandler_1.errorsMessages.notFoundUser };
    });
}
exports.deleteMyUser = deleteMyUser;
