const weakPasswords = ["password", "123456", "qwerty", "abc123", "letmein", "welcome"];

export function validateForm(name, email, password) {
    let errors = {};

    if (!name) {
        errors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        errors.password = "Password must have uppercase, lowercase, number, and special character.";
    } else if (weakPasswords.includes(password.toLowerCase())) {
        errors.password = "This password is too common.";
    }

    

    return errors;
};