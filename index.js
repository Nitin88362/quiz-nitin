const questions = [
    {
      question: "Number of primitive data types in Java are",
      answers: [
        { text: "6", correct: false },
        { text: "7", correct: false },
        { text: "8", correct: true },
        { text: "9", correct: false },
      ],
    },
    {
      question: "What is the size of float and double in java",
      answers: [
        { text: "32 and 64", correct: true },
        { text: "32 and 64", correct: false },
        { text: "64 and 64", correct: false},
        { text: "64 and 32", correct: false },
      ],
    },
    {
      question: "Automatic type conversion is possible in which of the possible cases",
      answers: [
        { text: "Byte to int", correct: false },
        { text: "int to long", correct: true },
        { text: "Long to int", correct: false },
        { text: "Short to int", correct: false },
      ],
    },
    {
      question: "Select the valid statement.",
      answers: [
        { text: "char[] ch = new char(5)", correct: false },
        { text: "char[] ch = new char[5]", correct: true },
        { text: "char[] ch = new char()", correct: false },
        { text: "char[] ch = new char[]", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answersButton = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreElement = document.getElementById("score");
  const restartButton = document.getElementById("restart-btn");
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    resultContainer.style.display = "none";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answersButton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answersButton.firstChild) {
      answersButton.removeChild(answersButton.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answersButton.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  restartButton.addEventListener("click", startQuiz);
  
  startQuiz();
  