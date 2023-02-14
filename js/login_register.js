"use strict"

async function create_register_page() {

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

        const user_name_input = document.querySelector(".input_username").value;
        const password_input = document.querySelector(".input_password").value;


        const post_new_user = await fetch_resource("https://teaching.maumt.se/apis/access/", {
            action: "register",
            user_name: user_name_input,
            password: password_input
        });

        console.log(post_new_user);

        document.querySelector(".input_username").textContent = "";
        document.querySelector(".input_password").textContent = "";

        // om allt gick bra
        alert("Registration complete. Please proceed to login.")
    })

}


function create_login_page() {



    const check_credentials = fetch_resource(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=X&password=Y`);
}

function alert(message) {

    //Contacting server
    //Registration complete. Please proceed to login

    const alert_container = document.createElement("div");

}