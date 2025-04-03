import User from "../Models/usersSchema.mjs";
import JWTToken from "../Utils/generateJWTToken.mjs";
import handleEncryptDecrypt from "../Utils/passwordEncript.mjs"

const addUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body

        const encryptedPassword = await handleEncryptDecrypt.passwordHash(password);

        const newUser = new User({ firstName, lastName, email, password: encryptedPassword, phone, role: role ? role : 'Admin' })

        const user = await newUser.save()

        res.status(200).json({ data: user, message: "New user add successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on add new user request. Error: ${JSON.stringify(error)}`.underline.red);
        if (error.code == 11000) {
            return res.status(409).json({ message: "Check your mail id, It's already used.", isSuccessful: false });
        }
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const users = await User.findOne({ email, isDeleted: false });

        if (!users || users.length == 0) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        const isPasswordMatch = await handleEncryptDecrypt.verifyPassword(password, users.password);

        if (!isPasswordMatch) {
            const error = new Error('Re-check your credentials.');
            error.status = 409;
            throw error;
        }

        console.log(`Generate token for user login.`.underline.cyan);
        const token = await JWTToken.generateJsonWebToken({ email: email, id: users._id, role: users.role });

        await User.updateOne({ email, isDeleted: false }, { isAuthenticated: true });

        // Set the httpOnly cookie
        res.cookie("access_token", token, {
            httpOnly: true, // Prevent access by JavaScript
            secure: true, // Ensures the cookie is sent over HTTPS
            sameSite: "strict", // Protects against CSRF
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: "Logged in successfully", data: { user: { email: users.email, firstName: users.firstName, lastName: users.lastName, phone: users.phone, role: users.role } }, isSuccessful: true });
        // res.status(200).json({ data: { access_token: token, user: { email: users.email, firstName: users.firstName, lastName: users.lastName, phone: users.phone, role: users.role } }, message: "User login successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on user login request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const protect = async (req, res) => {
    try {
        res.status(200).json({ message: "Successfully verified authentication.", data: { isAuth: true }, isSuccessful: true });
    } catch (error) {
        console.log(`Error on verify authentication request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const logout = async (req, res) => {
    try {
        const { email } = req.body

        const loggedUser = await User.findOneAndUpdate({ email, isDeleted: false }, { isAuthenticated: false }, { isNew: true, runValidators: true });

        if (!loggedUser || loggedUser.length == 0) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logged out successfully.", isSuccessful: true });
        // res.status(200).json({ message: "User logged out successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on user login request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}


const getUser = async (req, res) => {
    try {
        const { email } = req.body

        const users = await User.find({ email, isDeleted: false });

        if (!users || users.length == 0) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ data: users, message: "Users data get successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on user get by id request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

const updateUser = async (req, res) => {
    try {
        const { email } = req.body

        if (req.body.password) {
            req.body.password = await handleEncryptDecrypt.passwordHash(req.body.password);
        }

        const response = await User.findOneAndUpdate({ email, isDeleted: false }, { ...req.body }, { isNew: true, runValidators: true })

        if (!response) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ data: response, message: "User update successfully.", isSuccessful: true });
    } catch (error) {
        console.log(`Error on user update request. Error: ${JSON.stringify(error)}`.underline.red);
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

export default {
    login,
    logout,
    addUser,
    getUser,
    updateUser,
    protect
}