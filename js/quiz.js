
function create_quiz(user_name) {

    create_quiz_layout()

    function create_quiz_layout() {

        document.querySelector("#wrapper").style.backgroundImage = "url(media/logo.png)";

        document.querySelector("#wrapper").style.backgroundColor = "rgb(227, 186, 166)";
        document.querySelector("#wrapper").style.removeProperty("transition");

        show_feedback_no_button("Getting a random image");


        document.querySelector("main").innerHTML = `
        <div class="user">
            <div>${user_name}</div>
            <button>LOG OUT</button>
        </div>
    
        <img id="image" src="" alt="">
        <div id="alternatives"></div>`;


        document.querySelector(".user button").addEventListener("click", () => {
            localStorage.removeItem("user_name");
            location.reload();
            document.querySelector("#wrapper").style.removeProperty("transition");
            create_login_page();
        })


        create_quiz_game()

        async function create_quiz_game() {

            // get four random dogs
            let array_with_dogs = []

            while (array_with_dogs.length < 4) {
                const new_dog = ALL_BREEDS[random_number(ALL_BREEDS.length)];
                if (!array_with_dogs.includes(new_dog)) {
                    array_with_dogs.push(new_dog);
                }
            }


            const random_dog = array_with_dogs[random_number(array_with_dogs.length)]

            // get image for one of the four dogs
            const get_image = await (await fetch_resource(`https://dog.ceo/api/breed/${random_dog.url}/images/random`)).json();

            document.querySelector("#image").src = await get_image.message;

            document.querySelector("#wrapper").style.removeProperty("background-image");

            hide_feedback();

            //create alternative buttons
            array_with_dogs.forEach(animal => {
                const alt_btn = document.createElement("div");
                alt_btn.classList.add("alt_btn");
                document.querySelector("#alternatives").append(alt_btn);
                alt_btn.textContent = animal.name;

                alt_btn.addEventListener("click", (event => {

                    if (event.target.textContent === random_dog.name) {
                        show_feedback_with_button("Correct answer!", "ONE MORE");
                        document.querySelector("#feedback").style.backgroundColor = "rgb(184, 215, 111)";

                    } else {
                        show_feedback_with_button("I'm afraid not...", "ONE MORE")
                        document.querySelector("#feedback").style.backgroundColor = "#c57c76";
                    }

                    document.querySelector(".close_button").addEventListener("click", create_quiz_layout);
                }))
            })

        }
    }

}
