import Cookies from "js-cookie"

const fetchMapper = async (url, responseHeader) => {
    return await fetch(`${url}`, responseHeader)
        .then((response) => response.json())
        .then((response) => {
            console.log("Success:", response)
            return response
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

const getOption = (method, isAuth, data) => {
    debugger
    let token = Cookies.get('access_token')
    // let token = isAuth ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : null
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...token
        },
        body: JSON.stringify(data),
    }
}

export const postWithOutToken = async (url, data) => {
    return fetchMapper(url, getOption("POST", false, data))
}

export const putWithOutToken = async (url, data) => {
    return fetchMapper(url, getOption("PUT", false, data))
}

export const getWithOutToken = async (url, data) => {
    return fetchMapper(url, getOption("GET", false, data))
}

export const post = async (url, data) => {
    return fetchMapper(url, getOption("POST", true, data))
}

export const put = async (url, data) => {
    return fetchMapper(url, getOption("PUT", true, data))
}

export const get = async (url, data) => {
    return fetchMapper(url, getOption("GET", true, data))
}