import { postWithOutToken } from "../Utils/module"


const register = (data) => {
    return postWithOutToken("api/auth/register", data)
}

const login = (data) => {
    return postWithOutToken("api/auth/login", data)
}

export default { register, login }