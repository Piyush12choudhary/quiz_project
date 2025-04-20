const questions = [
    {
      question: "What is a variable in programming used for?",
      options: ["Displaying output", "Storing and manipulating data", "Creating graphics", "Managing files"],
      answer: "Storing and manipulating data"
    },
    {
      question: "In programming, what is a function or method primarily used for?",
      options: ["Declaring variables", "Declaring variables", "Reusing code for a specific task", "Printing output"],
      answer: "Reusing code for a specific task"
    },
    {
      question: "What is the primary purpose of a compiler in programming?",
      options: ["To execute the program", "To translate high-level code into machine code", "To debug the program", "To write program documentation"],
      answer: "To translate high-level code into machine code"
    },
    {
      question: "When is Republic Day celebrated?",
      options: ["15 August", "26 January", "2 October", "5 September"],
      answer: "26 January"
    },
    {
      question: "How many states are there in India?",
      options: ["28", "29", "30", "27"],
      answer: "28"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  let timer;
  
  function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("total-q").textContent = questions.length;
    loadQuestion();
    startTimer();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz(false);
      }
    }, 1000);
  }
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("q-count").textContent = currentQuestion + 1;
    document.getElementById("question").textContent = q.question;
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    q.options.forEach(option => {
      const div = document.createElement("div");
      div.className = "option";
      div.textContent = option;
      div.onclick = () => selectAnswer(div, q.answer);
      optionsContainer.appendChild(div);
    });
  }
  
  function selectAnswer(selected, correct) {
    const options = document.querySelectorAll(".option");
    options.forEach(opt => {
      opt.classList.add("disabled");
      if (opt.textContent === correct) opt.classList.add("correct");
      if (opt === selected && opt.textContent !== correct) opt.classList.add("wrong");
    });
    if (selected.textContent === correct) score++;
  }
  
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      clearInterval(timer);
      endQuiz(true);
    }
  }
  
  function prevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }
  
  function endQuiz(completedInTime) {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    if (completedInTime) {
      document.getElementById("end-message").textContent = "✅ You finished the quiz!";
    } else {
      document.getElementById("end-message").textContent = "⛔ Oops! Time is up!";
    }
    document.getElementById("final-score").textContent = `Your Score: ${score} / ${questions.length}`;
  }
  