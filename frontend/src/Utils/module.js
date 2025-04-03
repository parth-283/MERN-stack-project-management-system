
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

const getOption = (method, data) => {
    let body = data ? { body: JSON.stringify(data) } : {}
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        ...body
    }
}

export const postWithOutToken = async (url, data) => {
    return fetchMapper(url, getOption("POST", data))
}

export const putWithOutToken = async (url, data) => {
    return fetchMapper(url, getOption("PUT", data))
}

export const getWithOutToken = async (url) => {
    return fetchMapper(url, getOption("GET"))
}

export const post = async (url, data) => {
    return fetchMapper(url, getOption("POST", data))
}

export const put = async (url, data) => {
    return fetchMapper(url, getOption("PUT", data))
}

export const get = async (url) => {
    return fetchMapper(url, getOption("GET"))
}