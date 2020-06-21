var NAMES = readTextFile('names.txt');
var CONJUNCTIONS = readTextFile('conjunctions.txt');
var VERBS = readTextFile('verbs.txt');
var TOBE = new Set(['is', 'are', 'am', 'was', 'were']);
var PRONOUNS = new Set(['it', 'she', 'he', 'they', 'i', 'we', 'you', 'this', 'these', 'those', 'that', 'the']);

var ANSWERS = [];

function readTextFile(file) {
    var allText = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return new Set(allText.split('\n'));
}

function uploadFile() {
    const selectedFile = document.getElementById('input').files[0];
    var fr = new FileReader(); 
    fr.onload = function() { parseText(fr.result); } 
    fr.readAsText(selectedFile); 
}

function parseText(rawText) {
    var cleanSentences = cleanText(rawText);
    var questionsAndAnswers = analyze(cleanSentences);
    createTable(questionsAndAnswers);
    console.log(questionsAndAnswers);
}

function cleanText(rawText) {
    var cleanSentences = [];
    var sentences = rawText.match( /[^\.!\?]+[\.!\?]+/g );
    ANSWERS = sentences;
    sentences.forEach(sentence => {
        var mainPartInSentences = sentence.replace(/".*?"|([\[(])(.+?)([\])])|,.*?,/g, '');
        mainPartInSentences = mainPartInSentences.trim();
        cleanSentences.push(mainPartInSentences.replace(/\s\s+/g, ' '));
    });
    return cleanSentences;
}

// TODO: dev this
function analyze(sentences) {
    var questionsAndAnswers = [];
    for (var n = 0; n < sentences.length; n++) {
        var sentence = sentences[n];
        var chars = sentence.split(" ");
        if (isValidSentence(chars)) {
            for (var i = 0; i < chars.length; i++) { //'to be' can't stand at the end
                if (VERBS.has(chars[i]) || !chars[i].endsWith("ing") && (chars.length > 2 && VERBS.has(chars[i].substring(0, chars[i].length - 2)))) {
                    if (NAMES.has(chars[0])) {
                        questionsAndAnswers.push([generateWhoQuestion(chars, i), ANSWERS[n]]);
                    }    
                } else if (TOBE.has(chars[i])) {
                    if (chars[i+1].endsWith("ing")) {
                        questionsAndAnswers.push([generateIngQuestion(chars, i), ANSWERS[n]]);
                    } else {
                        questionsAndAnswers.push([generateWhatQuestion(chars, i), ANSWERS[n]]);
                    }
                    break;
                }
            }
        }
    }
    return questionsAndAnswers;
}

// only parse if sentence doesn't contain conjunctions, length <= 15, and not start with a pronoun
function isValidSentence(chars) {
    if (chars.length > 30 || PRONOUNS.has(chars[0].toLowerCase()))
        return false;
    if (!CONJUNCTIONS.has(chars[0])) {
        for (let char of chars) {
            if (CONJUNCTIONS.has(char)) {
                return false;        
            }
        }
    }
    return true;
}

// sentence in continuous tense
function generateIngQuestion(chars, tobeIndex) {
    if (!NAMES.has(chars[0]))
        chars[0] = chars[0].toLowerCase();
    var first = chars.slice(0, tobeIndex).join(" ");
    var q = "What " + chars[tobeIndex] + " " + first + " doing?";
    return q;
}

// What question
function generateWhatQuestion(chars, tobeIndex) {
    if (!NAMES.has(chars[0]) && !chars[0].endsWith("'s"))
        chars[0] = chars[0].toLowerCase();
    var first = chars.slice(0, tobeIndex).join(" ");
    var q = "What " + chars[tobeIndex] + " " + first + "?";
    return q;
}

// Who question
function generateWhoQuestion(chars, tobeIndex) {
    var end = chars.slice(tobeIndex, chars.length).join(" "); // remove full stop at the end
    var q = "Who " + end + "?";
    return q;
}

// NOTE: use this to write to a file
function writeFile(data) {
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'out.txt';
    hiddenElement.click();
}


/* UPLOAD QUESTIONS AND ANSWER TO TABLE */
function createTable(data) {
    const table = document.querySelector('#mytable');
    var i = 0;
    for (var qa of data) {
        let tRow = document.createElement('tr');
        // No.
        var tCol1 = document.createElement('td');
        tCol1.textContent = i.toString();
        tRow.appendChild(tCol1);
        i += 1;

        // Question
        var tCol2 = document.createElement('td');
        tCol2.textContent = qa[0];
        tRow.appendChild(tCol2);

        // Your Answer
        var tCol3 = document.createElement('td');
        var tInput = document.createElement('textarea');
        tCol3.appendChild(tInput);
        tRow.appendChild(tCol3);

        // Show Answer
        var tCol4 = document.createElement('td');
        var tButton = document.createElement('button');
        var name = "btn btn-success";
        var arr = tButton.className.split(" ");
        if (arr.indexOf(name) == -1) {
            tButton.className += " " + name;
        }
        var tI = document.createElement('i');
        var Iclass = "far fa-bookmark d-xl-flex justify-content-xl-center align-items-xl-center";
        var Iarr = tI.className.split(" ");
        if (Iarr.indexOf(Iclass) == -1) {
            tI.className += " " + Iclass;
        }
        tButton.appendChild(tI);

        var tAnswer = document.createElement('p'); // answer
        tAnswer.textContent = qa[1];
        tAnswer.style.display = "none";

        tButton.addEventListener('click', function() {
            var ele = this.parentElement.childNodes[1];
            if (ele.style.display == "none") {
                ele.style.display = "block";
            } else {
                ele.style.display = "none";
            }
        }, false);

        tCol4.appendChild(tButton);
        tCol4.appendChild(tAnswer);
        tRow.appendChild(tCol4);

        table.appendChild(tRow);
    }
}
