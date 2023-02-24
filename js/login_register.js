"use strict"

function create_register_page() {
    document.querySelector("#wrapper").classList.remove("background_img");
    document.querySelector("#feedback_bg").classList.add("invisible");

    document.querySelector("main").innerHTML = `
    <h1 class="login_register_head">REGISTER</h1>
    <p>User Name</p>
    <input type="text" class="input_username">
    <p>Password</p>
    <input type="password" class="input_password">
    <div class="ready">Ready when you are...</div>
    <button class="register_btn">Register</button>
    <p class="where_to">Already have an account? Go to login</p>
    `;
    document.querySelector("#wrapper").style.backgroundColor = "rgb(97, 172, 172)";
    document.querySelector("#wrapper").style.transition = "background-color 1s";

    document.querySelector("main").classList.add("main_login_register");

    document.querySelector(".where_to").addEventListener("click", (event) => {
        document.querySelector("#wrapper").style.transition = "background-color 1s";
        create_login_page()
    })


    //button interaction
    document.querySelector(".register_btn").addEventListener("click", async (event) => {

        show_feedback_no_button("Contacting the server...");

        // Get input and post it
        const user_name_input = document.querySelector(".input_username").value;
        const password_input = document.querySelector(".input_password").value;

        try {
            const post_new_user = await fetch_resource(new Request("https://teaching.maumt.se/apis/access/", {
                method: "POST",
                body: JSON.stringify({
                    action: "register",
                    user_name: user_name_input,
                    password: password_input
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }));


            switch (post_new_user.status) {
                case 200:
                    show_feedback_with_button("Registration complete. Please proceed to login", "CLOSE");
                    break;

                case 409:
                    show_feedback_with_button("Sorry, that name is taken. Please try with another one.", "CLOSE")
                    break;

                case 418:
                    show_feedback_with_button("The server thinks it's not a teapot!", "CLOSE")
                    break;

                case 400:
                    show_feedback_with_button("Please enter username and password", "CLOSE")
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("NetworkError")) {
                show_feedback_with_button("Couldn't reach server, please try again", "CLOSE")
            }
        }


        document.querySelector(".input_username").value = "";
        document.querySelector(".input_password").value = "";
    })

}


function create_login_page() {


    document.querySelector("#wrapper").classList.remove("background_img");
    document.querySelector("#feedback_bg").classList.add("invisible");

    document.querySelector("main").innerHTML = `
    <h1 class="login_register_head">LOGIN</h1>
    <p>User Name</p>
    <input type="text" class="input_username">
    <p>Password</p>
    <input type="password" class="input_password">
    <p class="ready">Let the magic start!</p>
    <button class="login_btn">LOGIN</button>
    <p class="where_to">New to this? Register for free</p>`;

    document.querySelector("#wrapper").style.backgroundColor = "rgb(151, 196, 196)";
    document.querySelector("main").classList.add("main_login_register");


    document.querySelector(".where_to").addEventListener("click", create_register_page)


    //button interaction
    document.querySelector(".login_btn").addEventListener("click", async (event) => {

        show_feedback_no_button("Contacting the server...")


        // Get input and check it
        const user_name_input = document.querySelector(".input_username").value;
        const password_input = document.querySelector(".input_password").value;

        try {

            const check_credentials = await fetch_resource(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${user_name_input}&password=${password_input}`);


            document.querySelector("#feedback").classList.add("invisible");
            document.querySelector("#feedback_bg").classList.add("invisible");


            switch (check_credentials.status) {
                case 200:
                    localStorage.setItem("user_name", user_name_input);
                    create_quiz(user_name_input);
                    break;

                case 404:
                    const login_feedback = document.querySelector(".ready");
                    login_feedback.textContent = "Wrong user name or password.";
                    login_feedback.style.backgroundColor = "white";
                    // Empty inputs
                    document.querySelector(".input_username").value = "";
                    document.querySelector(".input_password").value = "";
                    break;

                case 418:
                    show_feedback_with_button("The server thinks it's not a teapot!", "CLOSE");
                    // Empty inputs
                    document.querySelector(".input_username").value = "";
                    document.querySelector(".input_password").value = "";
                    break;

                case 400:
                    show_feedback_with_button("Please enter username and password", "CLOSE");
                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error.message);
            if (error.message.includes("NetworkError")) {
                show_feedback_with_button("Couldn't reach server, please try again", "CLOSE");
            }
        }

    })

}

