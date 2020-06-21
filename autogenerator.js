var NAMES = readTextFile('names.txt');
var CONJUNCTIONS = readTextFile('conjunctions.txt');
var TOBE = new Set(['is', 'are', 'am', 'was', 'were']);
var PRONOUNS = new Set(['it', 'she', 'he', 'they', 'i', 'we', 'you']);

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

// TODO: analyze this
function analyze(sentences) {
    var questionsAndAnswers = [];
    for (var n = 0; n < sentences.length; n++) {
        var sentence = sentences[n];
        var chars = sentence.split(" ");
        if (isValidSentence(chars)) {
            for (var i = 0; i < chars.length; i++) { //'to be' can't stand at the end
                if (TOBE.has(chars[i])) {
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

function writeFile(data) {
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'out.txt';
    hiddenElement.click();
}

