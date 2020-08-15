
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Q.Which is considered as the most ancient part of the world by historians?", ["A.Gangetic Valley ", "B.Southern part of Vindhya Mountain","C.North Western Indian Valley", "D.North Eastern part of India"], "B.Southern part of Vindhya Mountain"),
    new Question("Q.The State that comprises more number of Buddhist Viharas is", ["A.Karnataka", "B.Bihar", "C.Jharkhand", "D.Odisha"], "B.Bihar"),
    new Question("Q.The reign of Chandragupta Mauriya", ["A. B.C. 298-273", "B. B.C. 324-299","C. B.C. 261-236", "D. B.C. 280-255"], "B. B.C. 324-299"),
    new Question("Q.The person who established British rule in India", ["A.Robert Clive", "B.Duplex", "C.Mirjafer", "D.Hestings"], "A.Robert Clive"),
    new Question("Q.The official language of Pallavas was", ["A.Tamil", "B.Pali", "C.Sanskrit", "D.Kharosti"], "C.Sanskrit")
    
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();