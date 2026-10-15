const mazeMap = [
"############",
"#P..Q..Q...#",
"###.####.#.#",
"#Q..Q...#Q.#",
"#.######.#.#",
"#...Q....Q.#",
"#.######.#.#",
"#Q....Q...E#",
"############"
];

const questions = [
{
x: 4, y: 1, level: 1,
title: "🌍 A Formação e Estrutura da Terra",
question: "Qual é a camada mais externa e fina da Terra, onde nós pisamos e construímos nossas casas?",
options: [
"a) Manto",
"b) Núcleo",
"c) Crosta terrestre",
"d) Magma"
],
answer: 2,
hint: 'A crosta é como a "casca" do nosso planeta!',
explanation: "Isso mesmo! A crosta terrestre é a camada mais externa da Terra."
},
{
x: 7, y: 1, level: 1,
title: "🌍 A Formação e Estrutura da Terra",
question: "O que fica bem no meio do nosso planeta e é super quente?",
options: [
"a) Núcleo",
"b) Oceano",
"c) Crosta",
"d) Atmosfera"
],
answer: 0,
hint: "É formado principalmente por ferro e níquel!",
explanation: "Correto! O núcleo é a região mais interna da Terra."
},
{
x: 1, y: 3, level: 2,
title: "🪐 O Sistema Solar",
question: "Qual é a estrela que fica no centro do Sistema Solar e fornece luz e calor para a Terra?",
options: [
"a) Lua",
"b) Sol",
"c) Marte",
"d) Júpiter"
],
answer: 1,
hint: "É a estrela que ilumina os nossos dias!",
explanation: "Acertou! O Sol é a estrela central do Sistema Solar."
},
{
x: 4, y: 3, level: 2,
title: "🪐 O Sistema Solar",
question: "Qual é o maior planeta de todo o Sistema Solar?",
options: [
"a) Marte",
"b) Terra",
"c) Júpiter",
"d) Mercúrio"
],
answer: 2,
hint: "É um gigante gasoso conhecido por sua Grande Mancha Vermelha!",
explanation: "Muito bem! Júpiter é o maior planeta do Sistema Solar."
},
{
x: 9, y: 3, level: 2,
title: "🪐 O Sistema Solar",
question: "Qual planeta é conhecido por ter grandes anéis à sua volta?",
options: [
"a) Saturno",
"b) Vênus",
"c) Netuno",
"d) Mercúrio"
],
answer: 0,
hint: "Seus anéis possuem partículas de gelo e rocha!",
explanation: "Correto! Saturno é famoso por seu impressionante sistema de anéis."
},
{
x: 4, y: 5, level: 3,
title: "🔬 As Células",
question: "Como chamamos a estrutura que protege a célula e controla o que entra e sai dela?",
options: [
"a) Núcleo",
"b) Membrana plasmática",
"c) Citoplasma",
"d) DNA"
],
answer: 1,
hint: "Ela funciona como a portaria da célula!",
explanation: "Isso mesmo! A membrana plasmática controla a entrada e a saída de substâncias."
},
{
x: 9, y: 5, level: 3,
title: "🔬 As Células",
question: "Onde fica guardado o DNA nas células dos animais e das plantas?",
options: [
"a) No núcleo",
"b) Na membrana",
"c) Do lado de fora",
"d) Na água"
],
answer: 0,
hint: "Essa estrutura funciona como um centro de controle da célula!",
explanation: "Muito bem! Nas células animais e vegetais, a maior parte do DNA fica no núcleo."
},
{
x: 1, y: 7, level: 3,
title: "🔬 As Células",
question: "O ser humano é formado por bilhões de células. Por isso, somos seres:",
options: [
"a) Unicelulares",
"b) Pluricelulares",
"c) Procariontes",
"d) Invisíveis"
],
answer: 1,
hint: '"Pluri" significa muitos!',
explanation: "Acertou! Os seres humanos são pluricelulares porque possuem muitas células."
},
{
x: 6, y: 7, level: 3,
title: "🔬 As Células",
question: "Qual alternativa explica corretamente a diferença entre seres unicelulares e pluricelulares?",
options: [
"a) Os dois possuem uma única célula",
"b) Unicelulares têm muitas células",
"c) Pluricelulares têm apenas uma célula",
"d) Unicelulares têm uma célula e pluricelulares têm muitas"
],
answer: 3,
hint: "Pense no significado de 'uni' e 'pluri'!",
explanation: "Perfeito! Unicelulares possuem uma célula; pluricelulares possuem muitas."
}
];

const mazeElement = document.getElementById("maze");
const quizElement = document.getElementById("quiz");
const victoryElement = document.getElementById("victory");

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const progressElement = document.getElementById("progress");
const stageTitle = document.getElementById("stage-title");
const stageDescription = document.getElementById("stage-description");
const statusElement = document.getElementById("status");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const hintText = document.getElementById("hint-text");
const hintButton = document.getElementById("hint");
const continueButton = document.getElementById("continue");

let player = { x: 1, y: 1 };
let score = 0;
let solved = new Set();
let activeQuestion = null;
let answeredCorrectly = false;
let locked = false;
let gameOver = false;

const stageNames = {
1: "🌍 A Formação e Estrutura da Terra",
2: "🪐 O Sistema Solar",
3: "🔬 As Células"
};

function renderMaze() {
mazeElement.innerHTML = "";

mazeMap.forEach((row, y) => {
[...row].forEach((symbol, x) => {
const cell = document.createElement("div");
cell.classList.add("cell");

const question = questions.find(
q => q.x === x && q.y === y
);

if (symbol === "#") {
cell.classList.add("wall");
cell.textContent = "";
} else {
cell.classList.add("path");

if (question) {
cell.classList.add("portal");
if (solved.has(questions.indexOf(question))) {
cell.classList.add("done");
cell.textContent = "✓";
} else {
cell.textContent = "❓";
}
} else if (symbol === "E") {
cell.classList.add("exit");
cell.textContent = "🏁";
}
}

if (player.x === x && player.y === y) {
cell.classList.add("player");
cell.textContent = "👩‍🚀";
}

mazeElement.appendChild(cell);
});
});

updateDashboard();
}

function updateDashboard() {
scoreElement.textContent = score;
progressElement.textContent = `${solved.size} / ${questions.length}`;

const nextQuestion = questions.find(
(_, index) => !solved.has(index)
);

const level = nextQuestion ? nextQuestion.level : 3;
levelElement.textContent = `${level} / 3`;
stageTitle.textContent = stageNames[level];

stageDescription.textContent =
level === 1
? "Explore a Terra e descubra seus segredos!"
: level === 2
? "Viaje pelos planetas e estrelas!"
: "Descubra os segredos da vida microscópica!";
}

function movePlayer(dx, dy) {
if (locked || gameOver) return;

const nx = player.x + dx;
const ny = player.y + dy;

if (
ny < 0 ||
ny >= mazeMap.length ||
nx < 0 ||
nx >= mazeMap[ny].length ||
mazeMap[ny][nx] === "#"
) {
return;
}

player = { x: nx, y: ny };

const questionIndex = questions.findIndex(
q => q.x === nx && q.y === ny
);

if (questionIndex !== -1 && !solved.has(questionIndex)) {
renderMaze();
openQuestion(questionIndex);
return;
}

renderMaze();

if (mazeMap[ny][nx] === "E") {
finishGame();
}
}

function openQuestion(index) {
activeQuestion = index;
answeredCorrectly = false;
locked = true;

const q = questions[index];

quizElement.classList.remove("hidden");
quizElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

document.getElementById("quiz-level").textContent =
`DESAFIO ${index + 1} DE ${questions.length} · FASE ${q.level}`;

questionElement.textContent = q.question;
feedbackElement.textContent = "";
hintText.textContent = "";
hintText.classList.add("hidden");
hintButton.classList.remove("hidden");
continueButton.classList.add("hidden");

answersElement.innerHTML = "";

q.options.forEach((option, i) => {
const button = document.createElement("button");
button.className = "answer";
button.textContent = option;
button.addEventListener("click", () => checkAnswer(i, button));
answersElement.appendChild(button);
});

statusElement.textContent = "DESAFIO";
}

function checkAnswer(selected, button) {
if (answeredCorrectly) return;

const q = questions[activeQuestion];
const answerButtons = answersElement.querySelectorAll("button");

if (selected === q.answer) {
answeredCorrectly = true;
solved.add(activeQuestion);
score += 100;

button.classList.add("correct");
feedbackElement.textContent = "🎉 Resposta correta! +100 pontos!";
feedbackElement.style.color = "#63f2ba";

answerButtons.forEach((answerButton, i) => {
answerButton.disabled = true;
if (i === q.answer) {
answerButton.classList.add("correct");
}
});

continueButton.classList.remove("hidden");
hintButton.classList.add("hidden");
statusElement.textContent = "CORRETO";
renderMaze();
} else {
button.classList.add("wrong");
button.disabled = true;
feedbackElement.textContent =
"Quase! Tente outra alternativa. 🚀";
feedbackElement.style.color = "#ff80b5";
}
}

hintButton.addEventListener("click", () => {
if (activeQuestion === null) return;

hintText.textContent = "💡 Dica: " + questions[activeQuestion].hint;
hintText.classList.remove("hidden");
});

continueButton.addEventListener("click", () => {
quizElement.classList.add("hidden");
activeQuestion = null;
locked = false;
statusElement.textContent = "EXPLORANDO";

renderMaze();

if (solved.size === questions.length) {
finishGame();
}
});

function finishGame() {
gameOver = true;
locked = true;

quizElement.classList.add("hidden");
victoryElement.classList.remove("hidden");
document.getElementById("final-score").textContent = score;
statusElement.textContent = "MISSÃO CUMPRIDA";

victoryElement.scrollIntoView({
behavior: "smooth",
block: "center"
});
}

document.addEventListener("keydown", event => {
const keys = {
ArrowUp: [0, -1],
w: [0, -1],
W: [0, -1],
ArrowDown: [0, 1],
s: [0, 1],
S: [0, 1],
ArrowLeft: [-1, 0],
a: [-1, 0],
A: [-1, 0],
ArrowRight: [1, 0],
d: [1, 0],
D: [1, 0]
};

if (keys[event.key]) {
event.preventDefault();
movePlayer(...keys[event.key]);
}
});

document.querySelectorAll("[data-move]").forEach(button => {
button.addEventListener("click", () => {
const directions = {
up: [0, -1],
down: [0, 1],
left: [-1, 0],
right: [1, 0]
};

movePlayer(...directions[button.dataset.move]);
});
});

function restartGame() {
player = { x: 1, y: 1 };
score = 0;
solved = new Set();
activeQuestion = null;
answeredCorrectly = false;
locked = false;
gameOver = false;

quizElement.classList.add("hidden");
victoryElement.classList.add("hidden");
statusElement.textContent = "EXPLORANDO";

renderMaze();
}

document.getElementById("restart").addEventListener("click", restartGame);
document.getElementById("play-again").addEventListener("click", restartGame);

renderMaze();
