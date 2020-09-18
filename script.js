// //assign quiz questions and answers
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const scoreDiv = document.getElementById("scoreContainer");
const highscore = document.getElementById("highscore");
const scoresBtn = document.getElementById("scoresBtn");

var questions = [{
	question: "1. How do you write 'Hello World' in an alert box?",
	choiceA: "msgBox('Hello World');",
	choiceB: "alertBox('Hello World');",
	choiceC: "alert('Hello World');",
	correctAnswer: "C"
},
{
	question: "2. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
	choiceA: "undefined",
	choiceB: "0",
	choiceC: "prints nothing",
	correctAnswer: "A"
}, {
	question: "3. What would be the result of 2+4+'6'?",
	choiceA: "246",
	choiceB: "12",
	choiceC: "66",
	correctAnswer: "C"
}, {
	question: "4. How can a value be appended to an array?",
	choiceA: "arr(length).value;",
	choiceB: "arr[arr.length]=value;",
	choiceC: "arr[]=add(value);",
	correctAnswer: "B"
}, {
	question: "5. What will the code below output to the console? console.log(1 +  +'2' + '2');",
	choiceA: "'32'",
	choiceB: "'122'",
	choiceC: "'13'",
	correctAnswer: "A"
}];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
const questionTime = 5; // 5s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
};

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
};

// counter render

function renderCounter(){
    count <= 61
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--

        if(count<= -1){
            clearInterval(TIMER);
            scoreRender();
        }
};

    


// checkAnwer

function checkAnswer(answer){
    if( answer === questions[runningQuestion].correctAnswer){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    
       
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }

};

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
    count -= 10;
   if(count<=0){
       clearInterval(TIMER);
       scoreRender();
   }
    
};

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    var recScore = localStorage.setItem("scorePerCent", JSON.stringify(scorePerCent));
    
    // choose the image based on the scorePerCent
  
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
};

