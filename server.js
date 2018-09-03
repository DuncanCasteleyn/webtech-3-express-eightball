var answers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", " You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes", " Signs point to yes.", "Reply hazy, try again", "Ask again later.", "Better not tell you now.", "Cannot predict now.",
    " Concentrate and ask again.", "Don't count on it.", "Don't count on it.", "My sources say no", "Outlook not so good.", "Very doubtful."]

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');



// Show the search form
app.get('/8ball', (req, res) => {
    res.render('8ball.ejs', {})
})

// Post data
app.post('/8ball', (req, res) => {
    var question = req.body.question
    if(localStorage.getItem(question) !== null) {
        var answer = localStorage.getItem(question);
    } else {
        var answer = shuffle(answers)[0];
    }
    localStorage.setItem(question, answer)
    res.redirect('/result?q=' + question + '&a=' + answer)
})

// Show the search form
app.get('/result', (req, res) => {
    var answer = req.param("a", "No question was asked so there's no answer")
    var question = req.param("q", "No question")
    res.render('result.ejs', { answer, question })
})

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}