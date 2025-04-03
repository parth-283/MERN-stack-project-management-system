import JWTToken from "../Utils/generateJWTToken.mjs"

const authenticationCheck = async (req, res, next) => {
    try {

        // const token = req.headers.authorization.replace('Bearer ', "");
        const token = req.cookies.access_token

        if (!token) {
            const error = new Error('Token not found!');
            error.status = 401;
            throw error;
        }

        console.log(`check authenticate for users.`.underline.cyan);
        let tokenData = await JWTToken.verifyToken(token)

        if (!tokenData) {
            const error = new Error('User not authenticate!');
            error.status = 401;
            throw error;
        }

        req.body = { ...req.body, email: tokenData.email }

        console.log(`User successfully authenticate.`.underline.green);
        next()
    } catch (error) {
        console.log(`Error on user get request. Error: ${JSON.stringify(error)}`.underline.red);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Your token is expired!", isSuccessful: false });
        }
        res.status(error?.status || 500).json({ message: error.message || "Somethings wen wrong!", isSuccessful: false });
    }
}

export default authenticationCheck