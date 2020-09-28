import { API } from "../../core/backend"


export const Signup = user => {
    return fetch(`${API}sign-up`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
    .catch(err => console.log(err))
}

export const Signin = user => {
    return fetch(`${API}sign-in`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
        return response.json()
        })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()

    }
        
}

export const Signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()

        return fetch(`${API}sign-out`, {
            method : "GET",
        })
            .then(response => console.log("Singout Success", response))
        .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem("jwt")) //return true only if both jwt's are same
    } else {
        return false
    }
}