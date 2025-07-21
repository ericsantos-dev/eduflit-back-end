"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    statusCode;
    errorCode;
    details;
    constructor(message, statusCode, errorCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map