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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = __importStar(require("../controllers/UserController"));
const Authentication_1 = __importDefault(require("../middlewares/Authentication"));
const router = (0, express_1.Router)();
// User Routes ------------------------------------------------------------------
// Login and Register
router.post('/register', UserController.register);
router.post('/login', UserController.login);
// Profile Settings
router.get('/profile', Authentication_1.default.private, UserController.getMyUser);
router.put('/profile', Authentication_1.default.private, UserController.updateMyUser);
router.delete('/profile', Authentication_1.default.private, UserController.deleteMyUser);
// Users Data Visualization 
router.get('/users', Authentication_1.default.private, UserController.getAllUsers);
router.get('/users/:id', Authentication_1.default.private, UserController.getOneUser);
exports.default = router;
