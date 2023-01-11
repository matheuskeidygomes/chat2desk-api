"use strict";
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
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Auth = {
    // Checking if the user is logged in
    private: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer') {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
                    if (err) {
                        if (err.name === "JsonWebTokenError") {
                            res.status(403).json({ error: ErrorHandler_1.errorsMessages.invalidToken });
                            console.log(err);
                        }
                        else
                            res.status(403).json({ error: ErrorHandler_1.errorsMessages.expiredToken });
                    }
                    else
                        next();
                });
            }
            else
                res.status(403).json({ error: ErrorHandler_1.errorsMessages.invalidAuthType });
        }
        else
            res.status(403).json({ error: ErrorHandler_1.errorsMessages.unauthorized });
    })
};
exports.default = Auth;
