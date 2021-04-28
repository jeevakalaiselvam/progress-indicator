//Progress marker references in DOM
const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

//This denotes current target in progress
let currentActive = 1;

//Whenever the user presses next button, Move the progress to next position
next.addEventListener("click", () => {
    currentActive++;
    console.log(currentActive);
    prev.disabled = false;

    if (currentActive >= circles.length) {
        currentActive = circles.length;
        next.disabled = true;
    }

    setupProgress();
});

//Whenever the user presses previous button, Move the progress to previous position
prev.addEventListener("click", () => {
    currentActive--;
    console.log(currentActive);
    next.disabled = false;

    if (currentActive <= 1) {
        currentActive = 1;
        prev.disabled = true;
    }

    setupProgress();
});

/**
 * @author Jeeva Kalaiselvam
 * Checks if the current progress marker is at same index and highlights the position
 */
function setupProgress() {
    circles.forEach((circle, index) => {
        if (index + 1 == currentActive) {
            removeAllCircleActive();
            circle.classList.add("active");
        }
    });
}

/**
 * Removes all highlight from all progress markers in application
 */
function removeAllCircleActive() {
    circles.forEach((circle) => {
        circle.classList.remove("active");
    });
}

prev.style.display = "none";
next.style.display = "none";

//QUIZ SECTION
//all quiz
const quizData = [
    {
        question:
            "The largest circular storm in our solar system is on the surface of which of the following planets?",
        a: "Jupiter",
        b: "Venus",
        c: "Uranus",
        d: "Neptune",
        correct: "a",
    },
    {
        question:
            "One of the largest volcanos in our solar system-if not the largest is named Olympus Mons. This volcano is located on?",
        a: "Jupiter's moon Callisto",
        b: "Venus",
        c: "Saturn's moon Titan",
        d: "Mars",
        correct: "d",
    },
    {
        question: "About how many light years across is the Milky Way?",
        a: "1,000",
        b: "10,000",
        c: "100,000",
        d: "1,000,000",
        correct: "d",
    },
    {
        question:
            "Who was the first man to classify stars according to their brightness?",
        a: "Aristarchus",
        b: "Pythagorus",
        c: "Copernicus",
        d: "Hipparchus",
        correct: "d",
    },
];

//get reference to ui element for access alter
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionE = document.getElementById("question");
const aE = document.getElementById("a_text");
const bE = document.getElementById("b_text");
const cE = document.getElementById("c_text");
const dE = document.getElementById("d_text");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const submitE = document.getElementById("submit");

let currentQuestion = 0; //track current question being shown
let score = 0; //track score for each correct answer selected

//hide result area and initiate the quiz
resultContainer.style.display = "none";
loadQuiz();

/**
 * This function compares the user selected answer to the one that is correct declared in the questions array and evaluates answer based on it and applies score to the user.
 */
function getSelectedValueAndEvaluate() {
    let optionSelected = "";

    if (a.checked) optionSelected = "a";
    if (b.checked) optionSelected = "b";
    if (c.checked) optionSelected = "c";
    if (d.checked) optionSelected = "d";

    //if answer provided is correct, increase score by 1
    if (quizData[currentQuestion].correct == optionSelected) {
        score++;
        circles[currentQuestion].style.border = "3px solid green";
    } else {
        circles[currentQuestion].style.border = "3px solid red";
    }
}

/**
 * This function unchecks all answers for a given question
 */
function unCheckAllOptions() {
    a.checked = false;
    b.checked = false;
    c.checked = false;
    d.checked = false;
}

/**
 *
 * @returns Boolean - Checks if any answer is checked and returns true or false based on that
 */
function checkSelectedStatus() {
    if (a.checked || b.checked || c.checked || d.checked) {
        return true;
    } else {
        return false;
    }
}

/**
 * Load the quiz app with new question selected randomly from array of questions declared above
 */
function loadQuiz() {
    //uncheck all options when next question is loaded
    unCheckAllOptions();

    let currentQuestionData = quizData[currentQuestion];

    questionE.innerText = currentQuestionData.question;
    aE.innerText = currentQuestionData.a;
    bE.innerText = currentQuestionData.b;
    cE.innerText = currentQuestionData.c;
    dE.innerText = currentQuestionData.d;
}

submitE.addEventListener("click", () => {
    setupProgress();

    getSelectedValueAndEvaluate();
    //Check if any option is selected
    const checkIfOptionSelected = checkSelectedStatus();

    if (!checkIfOptionSelected) {
        alert("You need to select at least one option !");
    } else {
        currentActive++;
        console.log(currentActive);
        prev.disabled = false;

        if (currentActive >= circles.length) {
            currentActive = circles.length;
            next.disabled = true;
        }

        setupProgress();

        // compare selected to correct answer and evaluate score
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuiz();
        } else {
            //hide all quiz elements to make space for result information
            quizContainer.style.display = "none";
            resultContainer.style.display = "inline-block";
            resultContainer.innerHTML = `<h2>Your score ${score} </h2>
        <br/>
        <button onclick="location.reload()">Reload</button>`;
        }

        if (currentQuestion == quizData.length - 1)
            submitE.innerText = "Finish Quiz";
    }
});
