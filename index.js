"use strict"

load_page()

function load_page() {
    create_login_page();
}



function alert(message, button_text = "CLOSE") {


    const feedback_container = document.querySelector("#feedback");
    feedback_container.innerText = message;

    feedback_container.classList.remove("invisible");
    document.querySelector("#feedback_bg").classList.remove("invisible");

    const button = document.createElement("button");
    feedback_container.append(button);
    button.classList.add("close_button");
    button.textContent = button_text;

    button.addEventListener("click", (event) => {
        feedback_container.classList.add("invisible")
        document.querySelector("#feedback_bg").classList.add("invisible");

    })


}