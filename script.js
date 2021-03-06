//target all the areas within the index.html
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resultsButton = document.getElementById('results-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizTimer = document.querySelector("span");
const images = document.querySelector(".images");
const intro = document.querySelector(".header");
const introContainer = document.getElementById("intro-container");
const introParagraph = document.querySelector("introP");
const results = document.querySelector("your-results");
const rightAnswers = document.querySelector("right right-answer");
const wrongAnswers = document.querySelector("wrong wrong-answers");


//created variables. shuffleQuestions and currentQuestionIndex will be used to suffle and place the questions within the 4 answer buttons.

let shuffledQuestions, currentQuestionIndex;
let timer;
let timerCount;
let right = 0;
let wrong = 0;

//event listener for starting the game, next question, and results
startButton.addEventListener('click', startGame);
resultsButton.addEventListener('click', resultsPage);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//function to call the timer
function timeCounter() {

    // Sets timer
  timer = setInterval(function() {
    timerCount--;
    quizTimer.textContent = timerCount;
    // if (timerCount >= 0) {
    //   yourResults();
    // }
    // // Tests if time has run out
    if (timerCount === 0) {
    //   Clears interval
      clearInterval(timer);
    //   yourResults();
    }
  }, 1000);
}

//starts the game
function startGame() {
  timerCount = 30;
  startButton.classList.add('hide');
  resultsButton.classList.add('hide');
  introContainer.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  timeCounter();
  
  if(timerCount === 0) {
    resultsPage();
  }
  setNextQuestion();
}

//sets next question. when clicked, questions are shuffled and placed in the index and printed onto screen.
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//ignore this test.
// function rightOrWrong() {
    
//     if(answer.correct) {
//         button.dataset.correct = answer.correct;
//         right++;
//     } else {
//         wrong--
//     }
// }


//shows the question on to the screen. this is where the right and wrong will be calculated
function showQuestion(question) {
  questionElement.innerText = question.question;
  images.innerHTML = `<img src="${question.imgSrc}">`;
//   images.innerHTML = "<img src=" + questions.imgSrc + ">";
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      right++;
    } else {
        wrong--;
    }

    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

//function to show results on alert when results button is pressed. Also, when results is pressed, button goes in to hiding.

function resultsPage() {
    resultsButton.classList.add('hide');
    alert("Your Correct: " + right + " Your Wrong: " + wrong);
    // results.innterText = "Your Results";

}

// when resetState is ran, it will restart the timer and program itself.
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    resultsButton.innterText = "End";
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    resultsButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}


function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}


//array of questions 
const questions = [
    {
      question: 'What is the first ship Luffy has accuired?',
      imgSrc: "Assets/pictures/sunnyGoMary.gif",
      answers: [
        { text: 'Sunny Go Mary', correct: true },
        { text: 'Victory Hunter', correct: false },
        { text: 'The Baratle', correct: false}, 
        { text: 'Polar Tang', correct: false}
      ]
    },
    {
      question: 'What is the town where Luffy is from?',
      imgSrc: "Assets/pictures/LuffysHome.gif",
      answers: [
        { text: 'Shells Town', correct: false },
        { text: 'Shimotsuki Village', correct: false },
        { text: 'Foosha Village', correct: true },
        { text: 'Baratie', correct: false }
      ]
    },
    {
      question: `Pick the one that is NOT Luffy's Gear 4?`,
      imgSrc: "Assets/pictures/gear4.gif",
      answers: [
        { text: 'Snakeman', correct: false },
        { text: 'Baloon', correct: true },
        { text: 'Tankman', correct: false },
        { text: 'Boundman', correct: false }
      ]
    },
]
