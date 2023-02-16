"use strict"

function create_register_page() {
    document.querySelector("#feedback_bg").classList.add("invisible");

    document.querySelector("main").innerHTML = `
    <h1 class="register-head">REGISTER</h1>
    <p>User Name</p>
    <input type="text" class="input_username">
    <p>Password</p>
    <input type="password" class="input_password">
    <p class="ready">Ready when you are...</p>
    <button class="register_btn">Register</button>
    <p class="go_to_login">Already have an account? Go to login</p>
    `;
    document.querySelector("#wrapper").style.backgroundColor = "rgb(168, 206, 206)";

    //button interaction
    document.querySelector(".register_btn").addEventListener("click", async (event) => {

        const feedback_container = document.querySelector("#feedback");
        feedback_container.textContent = "Contacting the server...";
        feedback_container.classList.remove("invisible");
        document.querySelector("#feedback_bg").classList.remove("invisible");

        // Get input and post it
        const user_name_input = document.querySelector(".input_username").value;
        const password_input = document.querySelector(".input_password").value;


        const post_new_user = await fetch_resource(new Request("https://teaching.maumt.se/apis/access/", {
            method: "POST",
            body: JSON.stringify({
                action: "register",
                user_name: user_name_input,
                password: password_input
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }))


        switch (post_new_user.status) {
            case 200:
                await alert("Registration complete. Please proceed to login");
                break;

            case 409:
                await alert("Sorry, that name is taken. Please try with another one.")
                break;

            case 418:
                await alert("The server thinks it's not a teapot!")
                break;

            default:
                break;
        }

        document.querySelector(".input_username").value = "";
        document.querySelector(".input_password").value = "";
    })

}


function create_login_page() {

    const check_credentials = fetch_resource(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=X&password=Y`);
}


function alert(message) {


    const feedback_container = document.querySelector("#feedback")
    feedback_container.innerText = message;

    const button = document.createElement("button");
    feedback_container.append(button);
    button.classList.add("close_button");
    button.textContent = "CLOSE";

    button.addEventListener("click", (event) => feedback_container.classList.add("invisible"))

    document.querySelector("#feedback_bg").classList.add("invisible");

}
