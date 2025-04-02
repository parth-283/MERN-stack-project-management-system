import jwt from "jsonwebtoken"

const generateJsonWebToken = async (user) => {
    try {
        console.log(`Try to generate json web token`.underline.green);
        const token = jwt.sign({ ...user }, process.env.SECRET_WEB_TOKEN, { expiresIn: '1h' });

        console.log(`Generate json web token successfully.`.underline.green);
        return token

    } catch (error) {
        console.log(`Error on generate json web token request. Error: ${JSON.stringify(error)}`.underline.red);
        throw error
    }
}

const verifyToken = async (token) => {
    try {
        console.log(`Try to verify json web token`.underline.green);
        const isAuth = jwt.verify(token, process.env.SECRET_WEB_TOKEN);

        console.log(`Verify json web token successfully.`.underline.green);
        return isAuth

    } catch (error) {
        console.log(`Error on verify json web token request. Error: ${JSON.stringify(error)}`.underline.red);
        throw error
    }
}

export default {
    generateJsonWebToken,
    verifyToken
}