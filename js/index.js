
let SECTIONS = [
    $('#education'),
    $('#technical-experience'),
    $('#projects'),
    $('#connect'),
    $('#more-about-me'),
    $('#credits')
]
let DO_ANIMATION = true;

function animateBlinker() {
    if (!DO_ANIMATION) { return; }
    let intervalID = setInterval(() => {
        if (!DO_ANIMATION) {clearInterval(intervalID);return;}
        $('h1.terminal-prompt').toggleClass('prompt-shown');
    }, 750);
}

function animateSections() {
    if (!DO_ANIMATION) { return; }
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let shuffled = SECTIONS
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
    let i = 0;
    let intervalID = setInterval(() => {
        if (!DO_ANIMATION) {clearInterval(intervalID);return;}
        shuffled[i++].addClass('shown');
        if (i === SECTIONS.length) {
            clearInterval(intervalID);
            $('#skip-animation-button').addClass('hidden');
        }
    }, 400);
}

function animateTerminal() {
    if (!DO_ANIMATION) { return; }
    const input = $('#hello-world h2.terminal')
    const output = $('#hello-world p.terminal')

    // typing 1: "hello world"
    let contents = '$ ';
    let intervalID = setInterval(() => {
        if (!DO_ANIMATION) { clearInterval(intervalID); return; }
        if (contents === '$ hello world') {
            input.removeClass('terminal-prompt');
            input.removeClass('prompt-shown');
            setTimeout(() => {
                output.html('Welcome to my website!<br>Process finished with exit code HELLO');
            }, 300);
            setTimeout(animateSections, 500);
            clearInterval(intervalID);
        }
        let newLength = contents.length + 1;
        contents = '$ hello world'.slice(0, newLength);
        console.log(contents);
        input.html(contents);
    }, 250);
}

function skipAnimation() {
    DO_ANIMATION = false;
    let input = $('#hello-world h2.terminal');
    input.html('$ hello world')
    input.removeClass('terminal-prompt');
    input.removeClass('prompt-shown');
    $('#hello-world p.terminal').html('Welcome to my website!<br>Process finished with exit code HELLO');
    for (let section of SECTIONS) {
        section.addClass('shown');
    }
    $('#skip-animation-button').addClass('hidden');
    display_word('programmer');
}

animateBlinker();
animateTerminal();

/* Text Scrambler */

const ROWS = 8;
const COLS = 28;
const SCRAMBLER_WORDS = [
    'programmer',
    'coder',
    'developer',
    'innovator',
    'researcher',
    'engineer',
    'scientist',
    'creator',
    'designer',
    'chemist',
    'teacher',
    'musician',
    'gamer'
]

let scrambler = $('#text-scrambler');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

function randomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
}

function init_scrambler() {
    let innerHTML = '';
    for (let i = 0; i < ROWS; i++) {
        innerHTML += `<p>${randomString(COLS)}</p>`;
    }
    scrambler.html(innerHTML);
}

function display_word(word) {
    let row = Math.floor(Math.random() * (ROWS - 2)) + 1;
    let col = Math.floor(Math.random() * (COLS - word.length - 2)) + 1;

    let innerHTML = '';
    for (let i = 0; i < ROWS; i++) {
        if (i !== row) {
            innerHTML += `<p>${randomString(COLS)}</p>`;
        } else {
            innerHTML += `<p>${randomString(col)}<span>${word}</span>${randomString(COLS - word.length - col)}</p>`;
        }
    }

    let iterations = 0;
    let intervalID = setInterval(() => {
        if (iterations === 10) {
            scrambler.html(innerHTML);
            clearInterval(intervalID);
        } else {
            init_scrambler();
            ++iterations;
        }
    }, 50);
}

init_scrambler();
setInterval(() => {
    if (Math.random() < 0.0001) {
        display_word('made by danlliu');
    }
    display_word(SCRAMBLER_WORDS[Math.floor(Math.random() * SCRAMBLER_WORDS.length)]);
}, 5000)
