
import bcrypt from "bcrypt"
const saltRound = 10;

const passwordHash = async (password) => {
    try {
        console.log(`Try to encrypt password.`.underline.cyan);

        const bcryptPassword = await bcrypt.hash(password, saltRound);
        console.log(`Password successfully encrypted.`.underline.green);

        return bcryptPassword

    } catch (error) {
        console.log(`Error on Password encryption method. Error: ${JSON.stringify(error)}`.underline.red);
        throw error
    }
}

const verifyPassword = async (newPassword, encryptedPassword) => {
    try {
        console.log(`Try to verify password.`.underline.cyan);

        const isMatch = await bcrypt.compare(newPassword, encryptedPassword);
        console.log(`Password is ${isMatch ? 'matched' : 'notMatched'}.`.underline.yellow);

        return isMatch

    } catch (error) {
        console.log(`Error on Password encryption method. Error: ${JSON.stringify(error)}`.underline.red);
        throw error
    }
}

export default {
    passwordHash,
    verifyPassword
}