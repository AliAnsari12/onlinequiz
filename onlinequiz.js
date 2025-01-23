const quizzes = [];
const quizForm = document.getElementById("quiz-form");
const quizList = document.getElementById("quiz-list");
const takeQuizSection = document.getElementById("take-quiz");
const quizQuestions = document.getElementById("quiz-questions");
const resultsSection = document.getElementById("results");
const addQuestionButton = document.getElementById("add-question");

let currentQuiz = null;

// Add Question Handler
addQuestionButton.addEventListener("click", () => {
  const container = document.getElementById("questions-container");
  const index = container.children.length + 1;
  const questionHTML = `
    <div class="question-item">
      <label>Question ${index}:</label>
      <input type="text" class="question-text" required>
      <label>Option A:</label>
      <input type="text" class="option" required>
      <label>Option B:</label>
      <input type="text" class="option" required>
      <label>Option C:</label>
      <input type="text" class="option" required>
      <label>Option D:</label>
      <input type="text" class="option" required>
      <label>Correct Option:</label>
      <select class="correct-option">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", questionHTML);
});

// Save Quiz Handler
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("quiz-title").value;
  const questions = [...document.querySelectorAll(".question-item")].map((item) => ({
    text: item.querySelector(".question-text").value,
    options: [...item.querySelectorAll(".option")].map((opt) => opt.value),
    correct: item.querySelector(".correct-option").value,
  }));
  quizzes.push({ title, questions });
  updateQuizList();
  quizForm.reset();
});

// Update Quiz List
function updateQuizList() {
  quizList.innerHTML = quizzes.map(
    (quiz, index) => `<button onclick="startQuiz(${index})">${quiz.title}</button>`
  ).join("");
}

// Start Quiz Handler
function startQuiz(index) {
  currentQuiz = quizzes[index];
  document.getElementById("quiz-title-display").textContent = currentQuiz.title;
  quizQuestions.innerHTML = currentQuiz.questions
    .map(
      (q, i) =>
        `<div>
          <p>${q.text}</p>
          ${q.options.map((opt, j) => `<label><input type="radio" name="q${i}" value="${String.fromCharCode(65 + j)}">${opt}</label>`).join("<br>")}
        </div>`
    )
    .join("<br>");
  takeQuizSection.style.display = "block";
}

// Submit Quiz Handler
document.getElementById("submit-quiz").addEventListener("click", () => {
  const answers = [...document.querySelectorAll("#quiz-questions input:checked")].map((input) => input.value);
  const score = answers.filter((ans, i) => ans === currentQuiz.questions[i].correct).length;
  document.getElementById("score").textContent = `Your score: ${score}/${currentQuiz.questions.length}`;
  takeQuizSection.style.display = "none";
  resultsSection.style.display = "block";
});

// Back Home
document.getElementById("back-home").addEventListener("click", () => {
  resultsSection.style.display = "none";
});
