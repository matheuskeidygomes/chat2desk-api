"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
exports.default = (mongoose_1.connection && mongoose_1.connection.models["User"]) ? mongoose_1.connection.models["User"] : (0, mongoose_1.model)("User", schema);
