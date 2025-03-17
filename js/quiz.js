let questions = [];
let currentQuestionIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
    // Get 'api' and 'title' from URL
    const params = new URLSearchParams(window.location.search);
    const apiUrl = params.get('api');
    const quizTitle = params.get('title') || "Quiz";

    // Set the quiz title in the header
    document.getElementById("quiz-title").textContent = quizTitle;

    // handle the back button 
    document.getElementById("backBtn").addEventListener("click", () => {
        window.history.back();
    });

    // Fetch quiz data from the passed API URL
    if (!apiUrl) {
        alert("No quiz API found!");
        return;
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results; // Open Trivia DB returns an array in data.results
        showQuestion();
    })
        .catch(error => console.error("Error fetching quiz:", error));

    // "Check" button logic
    const checkBtn = document.getElementById("check-btn");
    checkBtn.addEventListener("click", checkAnswer);
});

function showQuestion() {
    // Get the current question
    const questionObj = questions[currentQuestionIndex];
    if (!questionObj) return;

    // Update question text
    document.getElementById("question-text").innerHTML = decodeHTML(questionObj.question);

    // Display question number
    document.getElementById("question-count").textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    //Combine correct & incorrect answers, then shuffle
    const answers = [ questionObj.correct_answer, ...questionObj.incorrect_answers ];
    shuffleArray(answers);

    //  Render answers in #options-list
    const optionsList = document.getElementById("options-list");
    optionsList.innerHTML = ""; // Clear old options
    answers.forEach(answer => {
        const li = document.createElement("li");
        li.textContent = decodeHTML(answer);
        li.classList.add("list-group-item");

        // On click, highlight the selected option
        li.addEventListener("click", () => {
            // rem ove 'selected' class from any other li
            Array.from(optionsList.children).forEach(item => item.classList.remove("selected"));
            li.classList.add("selected");
        });
    optionsList.appendChild(li);
  });
}

// Called when user clicks "Check"
function checkAnswer() {
    const questionObj = questions[currentQuestionIndex];
    const correct = questionObj.correct_answer;

    // Find which option is selected
    const optionsList = document.getElementById("options-list");
    const selectedLi = optionsList.querySelector(".selected");
    if (!selectedLi) {
        alert("Please select an option!");
        return;
    }

    const selectedAnswer = selectedLi.textContent;
    if (selectedAnswer === decodeHTML(correct)) {
        selectedLi.style.backgroundColor = "#c8ffc8"; // Green
    } else {
        selectedLi.style.backgroundColor = "#ffc8c8"; // Red
        // highlight correct answer
    const correctLi = Array.from(optionsList.children)
        .find(li => li.textContent === decodeHTML(correct));
        if (correctLi) correctLi.style.backgroundColor = "#c8ffc8";
    }

    // Move to next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            // Reset styles
            selectedLi.style.backgroundColor = "";
            Array.from(optionsList.children).forEach(li => li.style.backgroundColor = "");
            showQuestion();
        } else {
            alert("Quiz Finished!");
            // You can redirect to a results page or show a summary
        }
    }, 1000);
}

// Utility function to decode HTML entities from Open Trivia DB
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Utility to shuffle the answers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
