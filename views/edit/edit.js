// DOMS ELEMENTS  ---------------------------------------------------------
const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
const dom_createEditButton = document.getElementById("createEditButton");

// DATA  ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

let questionToEdit = null;

// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

//  LOCAL STORAGE ---------------------------------------------------------
function saveQuestions() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

function loadQuestions() {
  let questionsStorage = JSON.parse(localStorage.getItem("questions"));
  if (questionsStorage !== null) {
    questions = questionsStorage;
  }
}

//  EDIT ---------------------------------------------------------

function renderQuestions() {
  // Remove the card container and create a new one
  dom_questions_container = document.getElementById("questions-container");
  dom_questions_container.remove();
  dom_questions_container = document.createElement("div");
  dom_questions_container.id = "questions-container";
  dom_questions_view.appendChild(dom_questions_container);

  // 2 - For all questions,  create a new div (class : item), and append it the container
  for (let index = 0; index < questions.length; index++) {
    let question = questions[index];

    let card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;
    dom_questions_container.appendChild(card);

    let questionInfos = document.createElement("div");
    questionInfos.className = "question-info";
    card.appendChild(questionInfos);

    let title = document.createElement("h3");
    title.className = "title";
    title.textContent = question.title;
    questionInfos.appendChild(title);

    let anA = document.createElement('p');
    anA.className = "A";
    anA.textContent = question.choiceA;
    if (anA.className == question.correct){
      anA.style.fontWeight = 'bold';
      anA.style.color = '#66bb6a';


    }
    questionInfos.appendChild(anA);
    let anB = document.createElement('p');
    anB.className = "B";
    anB.textContent = question.choiceB;
    if (anB.className == question.correct){
      anB.style.fontWeight = 'bold';
      anB.style.color = '#66bb6a';

    }
    questionInfos.appendChild(anB);
    let anC = document.createElement('p');
    anC.className = "C";
    anC.textContent = question.choiceC;
    if (anC.className == question.correct){
      anC.style.fontWeight = 'bold';
      anC.style.color = '#66bb6a';

    }
    questionInfos.appendChild(anC);
    let anD = document.createElement('p');
    anD.className = "D";
    anD.textContent = question.choiceD;
    if (anD.className == question.correct){
      anD.style.color = '#66bb6a';
      anD.style.fontWeight = 'bold';

    }
    questionInfos.appendChild(anD);

    questionInfos.appendChild(anA);
    questionInfos.appendChild(anB);
    questionInfos.appendChild(anC);
    questionInfos.appendChild(anD);

    // Create spams for title and author
    let actions = document.createElement("div");
    actions.className = "actions";
    card.appendChild(actions);

    let editAction = document.createElement("img");
    editAction.src = "../../img/edit.svg";
    editAction.addEventListener("click", editQuestion);
    actions.appendChild(editAction);

    let trashAction = document.createElement("img");
    trashAction.src = "../../img/trash.png";
    trashAction.addEventListener("click", removeQuestion);
    actions.appendChild(trashAction);
  }
}

function editQuestion(event) {
  //  Get the question index
  questionToEdit = event.target.parentElement.parentElement.dataset.index;

  // update the dialog with question informatin
  let question = questions[questionToEdit];
  document.getElementById("title").value = question.title;
  document.getElementById("choiceA").value = question.choiceA;
  document.getElementById("choiceB").value = question.choiceB;
  document.getElementById("choiceC").value = question.choiceC;
  document.getElementById("choiceD").value = question.choiceD;
  document.getElementById("correct").value = question.correct;

  // Show the dialog
  dom_createEditButton.textContent = "EDIT";
  show(dom_questions_dialog);
}

function removeQuestion(event) {
  //  Get index
  let index = event.target.parentElement.parentElement.dataset.index;

  // Remove question
  questions.splice(index, 1);

  // Save to local storage
  saveQuestions();

  // Update the view
  renderQuestions();
}

function onAddQuestion() {
  show(dom_questions_dialog);
}

function onCancel(e) {
  dom_createEditButton.textContent = "CREATE";
  hide(dom_questions_dialog);
}

function onCreate() {
  hide(dom_questions_dialog);

  if (questionToEdit !== null) {
    let editQuestion = questions[questionToEdit];
    editQuestion.title = document.getElementById("title").value;
    editQuestion.correct = document.getElementById("correct").value;
    editQuestion.choiceA = document.getElementById("choiceA").value;
    editQuestion.choiceB = document.getElementById("choiceB").value;
    editQuestion.choiceC = document.getElementById("choiceC").value;
    editQuestion.choiceD = document.getElementById("choiceD").value;
  } else {
    let newQuestion = {};
    newQuestion.title = document.getElementById("title").value;
    newQuestion.correct = document.getElementById("correct").value;
    newQuestion.choiceA = document.getElementById("choiceA").value;
    newQuestion.choiceB = document.getElementById("choiceB").value;
    newQuestion.choiceC = document.getElementById("choiceC").value;
    newQuestion.choiceD = document.getElementById("choiceD").value;
    questions.push(newQuestion);
  }

  // 2- Save question
  saveQuestions();

  // 3 - Update the view
  renderQuestions();
}

// MAIN  ---------------------------------------------------------

loadQuestions();

renderQuestions();
