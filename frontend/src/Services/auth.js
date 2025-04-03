import { get, postWithOutToken } from "../Utils/module"


const register = (data) => {
    return postWithOutToken("api/auth/register", data)
}

const login = (data) => {
    return postWithOutToken("api/auth/login", data)
}

const logOut = () => {
    return get("api/auth/logout")
}

const verifyAuth = () => {
    return get("api/auth/protect")
}

export default { register, login, logOut, verifyAuth }