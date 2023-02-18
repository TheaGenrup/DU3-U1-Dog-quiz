
function create_quiz(user_name) {

    create_quiz_layout()

    function create_quiz_layout() {

        document.querySelector("#wrapper").style.backgroundImage = "url(media/logo.png)";

        show_feedback_no_button("Getting a random image");


        document.querySelector("main").innerHTML = `
        <div class="user">
            <div>${user_name}</div>
            <button>LOG OUT</button>
        </div>
    
        <img id="image" src="" alt="">
        <div id="alternatives"></div>`;


        document.querySelector(".user button").addEventListener("click", () => {
            localStorage.removeItem("user");
            location.reload();
            create_login_page();
        })


        create_quiz_game()

        async function create_quiz_game() {

            // get four random dogs
            let array_with_dogs = []
            for (let i = 0; i < 4; i++) {
                array_with_dogs.push(ALL_BREEDS[random_number(ALL_BREEDS.length)]);
            }


            const random_dog = array_with_dogs[random_number(array_with_dogs.length)]

            // get image for one of the four dogs
            const get_image = await (await fetch_resource(`https://dog.ceo/api/breed/${random_dog.url}/images/random`)).json();

            document.querySelector("#image").src = await get_image.message;

            hide_feedback()

            //create alternative buttons
            array_with_dogs.forEach(animal => {
                const alt_btn = document.createElement("div");
                alt_btn.classList.add("alt_btn");
                document.querySelector("#alternatives").append(alt_btn);
                alt_btn.textContent = animal.name;
                document.querySelector("#wrapper").style.backgroundImage = "";

                alt_btn.addEventListener("click", (event => {

                    if (event.target.textContent === random_dog.name) {
                        show_feedback_with_button("Correct answer!", "ONE MORE");
                        document.querySelector("#feedback").style.backgroundColor = "rgb(184, 215, 111)";

                    } else {
                        show_feedback_with_button("Sorry, wrong answer", "ONE MORE")
                        document.querySelector("#feedback").style.backgroundColor = "#c57c76";

                    }

                    document.querySelector(".close_button").addEventListener("click", create_quiz_layout)
                }))
            })

        }
    }

}
