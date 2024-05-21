import axios from 'axios';

const UserAPIs = axios.create({
    baseURL: "https://dnsmanager-backend-olzn.onrender.com"
})

export async function userSignUp(signupData) {
    try {
        const data = await UserAPIs.post("/signup", signupData);
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export async function userLogIn(loginData) {
    try {
        const data = await UserAPIs.post("/login", loginData);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}