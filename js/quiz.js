
function create_quiz(user_name) {

    document.querySelector("main").style.backgroundImage = "url(../media/logo.png)";

    let array_with_dogs = []
    for (let i = 0; i < 4; i++) {
        array_with_dogs.push(ALL_BREEDS[random_number(ALL_BREEDS.length)]);

    }

    function random_number(max) {
        return Math.floor(max * Math.random());
    }

    document.querySelector("main").innerHTML = `
    <div class="user">
        <div>${user_name}</div>
        <button>LOG OUT</button>
    </div>

    <img id="image" src="" alt="">
    <div id="alternatives"></div>

    `;

    get_rest_of_info()

    async function get_rest_of_info() {
        const random_dog = array_with_dogs[random_number(array_with_dogs.length)]
        console.log(random_dog.name);

        const get_image = await (await fetch_resource(`https://dog.ceo/api/breed/${random_dog.url}/images/random`)).json();

        const image = document.querySelector("#image");
        image.src = await get_image.message;

        array_with_dogs.forEach(animal => {

            const alt_btn = document.createElement("div");
            alt_btn.classList.add("alt_btn");
            document.querySelector("#alternatives").append(alt_btn);
            alt_btn.textContent = animal.name;

            alt_btn.addEventListener("click", (event => {

                if (event.target.textContent === random_dog.name) {
                    alert("Correct answer!", "ONE MORE");
                    document.querySelector("#feedback").style.backgroundColor = "rgb(184, 215, 111)";

                } else {
                    alert("Sorry, wrong answer", "ONE MORE")
                    document.querySelector("#feedback").style.backgroundColor = "#c57c76";

                }

                document.querySelector(".close_button").addEventListener("click", create_quiz)
            }))
        })

    }

}
