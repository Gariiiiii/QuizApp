document.addEventListener("DOMContentLoaded", function () {
    const userName = prompt("What's your name?");
    const displayName = userName ? userName : "Guest";
    document.querySelector(".username").textContent = displayName;
});

const quizCategories = [
    {
        name: "General Knowledge", 
        img: "img/General-knowledge.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
    },
    {
        name: "Mathematics",
        img: "img/Mathematics.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple"
    },
    {
        name: "Science",
        img: "img/Science.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=17"
    },
    {
        name: "Computer",
        img: "img/Computer.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple"
    },
    {
        name: "Geography",
        img: "img/Geography.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=22"
    },
    {
        name: "Arts",
        img: "img/Arts.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=25"
    },
    {
        name: "Books",
        img: "img/Books.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple"
    },
    {
        name: "Politics",
        img: "img/Politics.jpg",
        api: "https://opentdb.com/api.php?amount=10&category=24"
    }
];

// Select the container
const container = document.getElementById("quiz-container");

// Generate cards dynamically
quizCategories.forEach((category) => {
    const cardCol = document.createElement("div");
    cardCol.className = "col-8 col-md-3 ";

    const card = document.createElement("div");
    card.className = "card quiz-card text-center py-1";

    const img = document.createElement("img");
    img.src = category.img;
    img.className = "mx-auto";
    img.alt = category.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("p");
    title.className = "quiz-title";
    title.textContent = category.name;

    const subtitle = document.createElement("p");
    subtitle.className = "quiz-subtitle";
    subtitle.textContent = "10 Quizzes";

    // Append elements
    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardCol.appendChild(card);
    container.appendChild(cardCol);

    // On click, go to quiz page with 'api' in the URL
  card.addEventListener("click", () => {
    // Encode the API URL so it can safely go into the query string
    const encodedApi = encodeURIComponent(category.api);
    // Navigate to quiz.html, passing the API URL
    window.location.href = `quiz.html?api=${encodedApi}&title=${encodeURIComponent(category.name)}`;
  });
});


