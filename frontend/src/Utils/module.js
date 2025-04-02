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
    let token = isAuth ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : null
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