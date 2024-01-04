import { postData } from "./httpReq.js"
import { setCookie } from "./cookie.js"
import { authHandler } from "./authorization.js"
import { validateForm } from "./validation.js"

const inputsBox = document.querySelectorAll("input")
const loginButton = document.querySelector("button")


const submitHandler = async (e) => {
    e.preventDefault();

    const username = inputsBox[0].value;
    const password = inputsBox[1].value;

    const validation = validateForm(username, password);
    if (!validation) {
        return
    }

    const data = {
        username: "mor_2314",
        password: "83r5^_",
    }
    const response = await postData("auth/login", {
        username,
        password,
    });
    setCookie(response.token)
    location.assign("index.html");
}

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authHandler);