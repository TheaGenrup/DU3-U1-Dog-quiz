"use strict"

create_login_page();



function show_feedback_with_button(message, button_text) {

    const feedback_container = document.querySelector("#feedback");
    feedback_container.innerText = message;

    feedback_container.classList.remove("invisible");
    document.querySelector("#feedback_bg").classList.remove("invisible");


    const button = document.createElement("button");
    feedback_container.append(button);
    button.classList.add("close_button");
    button.textContent = button_text;

    button.addEventListener("click", (event) => {
        feedback_container.classList.add("invisible");
        document.querySelector("#feedback_bg").classList.add("invisible");
    })
}


function show_feedback_no_button(message) {

    const feedback_container = document.querySelector("#feedback");
    feedback_container.innerText = message;
    feedback_container.style.backgroundColor = "white";
    feedback_container.classList.add("feedback")

    feedback_container.classList.remove("invisible");
    document.querySelector("#feedback_bg").classList.remove("invisible");

}


function hide_feedback() {
    const feedback_container = document.querySelector("#feedback");
    feedback_container.classList.add("invisible");
    document.querySelector("#feedback_bg").classList.add("invisible");
}



function random_number(max) {
    return Math.floor(max * Math.random());
}


function save_credentials(user_name_input, password_input) {

    const credentials = JSON.stringify({
        user_name: user_name_input,
        password: password_input,
    })

    localStorage.setItem("user", credentials)

    const recent_user = JSON.parse(localStorage.getItem("user"))

    if (recent_user !== null) {

    }
}