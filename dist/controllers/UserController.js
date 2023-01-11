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
exports.deleteMyUser = exports.updateMyUser = exports.getMyUser = exports.getOneUser = exports.getAllUsers = exports.login = exports.register = void 0;
const UserServices = __importStar(require("../services/UserServices"));
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const ValidationHandler = __importStar(require("../helpers/ValidationHandler"));
const JwtHandler_1 = __importDefault(require("../helpers/JwtHandler"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, birthdate, email, password } = req.body;
        const isAllString = ValidationHandler.isAStringType(name, birthdate, email, password);
        const hasEmptyFields = isAllString ? ValidationHandler.hasEmptyFieldsCreateOrUpdate(name, birthdate, email, password) : ValidationHandler.hasEmptyFieldsCreateOrUpdate(name.toString(), birthdate.toString(), email.toString(), password.toString());
        if (hasEmptyFields) {
            res.status(400).json({ error: ErrorHandler_1.errorsMessages.requiredFields });
        }
        else {
            const resJson = yield UserServices.register(name, birthdate, email, password);
            res.json(resJson);
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const isAllString = ValidationHandler.isAStringType(undefined, email, undefined, password);
        const hasEmptyFields = isAllString ? ValidationHandler.hasEmptyFieldsLogin(email, password) : ValidationHandler.hasEmptyFieldsLogin(email.toString(), password.toString());
        if (hasEmptyFields) {
            res.status(400).json({ error: ErrorHandler_1.errorsMessages.requiredFields });
        }
        else {
            const resJson = yield UserServices.login(email, password);
            res.json(resJson);
        }
    });
}
exports.login = login;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const resJson = yield UserServices.getUsers();
        res.json(resJson);
    });
}
exports.getAllUsers = getAllUsers;
function getOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (id && ValidationHandler.isAValidObjectId(id)) {
            const resJson = yield UserServices.getUser(id);
            res.json(resJson);
        }
        else {
            res.status(400).json({ error: ErrorHandler_1.errorsMessages.invalidId });
        }
    });
}
exports.getOneUser = getOneUser;
function getMyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, JwtHandler_1.default)(req.headers.authorization);
        const resJson = yield UserServices.getMyUser(id);
        res.json(resJson);
    });
}
exports.getMyUser = getMyUser;
function updateMyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, JwtHandler_1.default)(req.headers.authorization);
        const { name, birthdate, email, password } = req.body;
        const isAllString = ValidationHandler.isAStringType(name, birthdate, email, password);
        const missingData = !name && !birthdate && !email && !password;
        if (missingData) {
            res.status(400).json({ error: ErrorHandler_1.errorsMessages.noChangedDetected });
        }
        else {
            const user = isAllString ? yield UserServices.updateMyUser(id, name, birthdate, email, password) : yield UserServices.updateMyUser(id, name.toString(), birthdate.toString(), email.toString(), password.toString());
            res.json(user);
        }
    });
}
exports.updateMyUser = updateMyUser;
function deleteMyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, JwtHandler_1.default)(req.headers.authorization);
        const user = yield UserServices.deleteMyUser(id);
        res.json(user);
    });
}
exports.deleteMyUser = deleteMyUser;
