import fs, { readFileSync } from 'fs'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true
    })
);

app.get('/', (req, res) => {
    res.send("abcd")
})

app.post('/addquestion', (req, res) => {
    var obj = req.body;
    var data = readFileSync('questions.json')
    var questions = JSON.parse(data);
    if (obj.difficulty == 'easy') {
        questions['easy'].push(obj);
    } else if (obj.difficulty == 'medium') {
        questions['medium'].push(obj);
    } else if (obj.difficulty == 'hard') {
        questions['hard'].push(obj);
    }
    var datatobewritten = JSON.stringify(questions);
    fs.writeFile('questions.json', datatobewritten, cb);
    function cb(err) {
        console.log(err);
    }
    res.send({ Message: "Success" })
})

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
function findSubsetWithSum(numbers, targetSum) {
    let subset = [];

    function backtrack(index, currentSum) {
        if (currentSum === targetSum) {
            // If the current subset has the target sum, set it as the result
            subset = numbers.slice(0, index);
            return true;
        }

        for (let i = index; i < numbers.length; i++) {
            // Include the current element in the subset
            if (backtrack(i + 1, currentSum + parseInt(numbers[i].marks))) {
                return true;
            }
            // Exclude the current element from the subset
            // (This step is necessary to explore all possible combinations)
            // backtrack(i + 1, currentSum);
        }

        return false;
    }

    // Start the backtracking process
    backtrack(0, 0);

    return subset;
}
/*
const numbers = [1, 3, 2, 5, 4, 9];
const targetSum = 9;
 
const result = findSubsetWithSum(numbers, targetSum);
console.log(`Subset with sum ${targetSum}: [${result}]`);
*/
app.post('/generatepaper', (req, res) => {
    // var obj = req.body;
    var obj = {};
    obj.easyPercentage = parseInt(req.body.easy);
    obj.mediumPercentage = parseInt(req.body.medium);
    obj.hardPercentage = parseInt(req.body.hard);
    obj.marks = parseInt(req.body.marks);
    var data = readFileSync('questions.json')
    var questions = JSON.parse(data);
    var easyquestions = questions.easy;
    var mediumquestions = questions.medium;
    var hardquestions = questions.hard;
    shuffleArray(easyquestions)
    shuffleArray(mediumquestions)
    shuffleArray(hardquestions)
    console.log("asdf")
    var marksForEasy = (obj.easyPercentage * obj.marks) / 100;
    var marksForMedium = (obj.mediumPercentage * obj.marks) / 100;
    var marksForHard = (obj.hardPercentage * obj.marks) / 100;
    var result = {};
    result.easyQuestion = findSubsetWithSum(easyquestions, marksForEasy);
    result.mediumQuestion = findSubsetWithSum(mediumquestions, marksForMedium);
    result.hardQuestion = findSubsetWithSum(hardquestions, marksForHard);
    console.log(result);
    res.send(result);
})
/*var data = readFileSync('questions.json')
var questions = JSON.parse(data);
console.log(questions);
questions['dg'].push("77");
console.log(questions);
var datatobewritten = JSON.stringify(questions);
fs.writeFile('questions.json', datatobewritten, cb);
function cb(err) {
    console.log(err);
}
*/

app.listen(5000, () => {
    console.log("Server Running at 5000");
})