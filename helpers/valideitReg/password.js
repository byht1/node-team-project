"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordSchema = void 0;
exports.passwordSchema = Object.freeze({
    upperCase: {
        value: /(?=.*[A-Z])/,
        message: 'Password must contain at least one capital letter',
    },
    lowerCase: {
        value: /(?=.*[a-z])/,
        message: 'Password must contain at least one small letter',
    },
    lat: {
        value: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
        message: 'Password should only contain Latin letters, digits or special characters',
    },
    number: {
        value: /(?=.*[0-9])/,
        message: 'The password must contain numbers',
    },
    max: {
        value: 32,
        message: 'The maximum password length is 32 characters',
    },
    min: {
        value: 7,
        message: 'The minimum password length is 7 characters',
    },
});
//# sourceMappingURL=password.js.map