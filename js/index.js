
const SECTIONS = [$('#technical-experience'), $('#education'), $('#awards'), $('#connect'), $('#more-about-me')]
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
    let i = 0;
    let intervalID = setInterval(() => {
        if (!DO_ANIMATION) {clearInterval(intervalID);return;}
        SECTIONS[i++].addClass('shown');
        if (i === SECTIONS.length) {
            clearInterval(intervalID);
            $('#skip-animation-button').addClass('hidden');
        }
    }, 400);
}

function animateTerminal() {
    if (!DO_ANIMATION) { return; }
    const input = $('h2.terminal')
    const output = $('p.terminal')

    // typing 1: "hello world"
    let contents = '$ ';
    let intervalID = setInterval(() => {
        if (!DO_ANIMATION) { clearInterval(intervalID); return; }
        if (contents === '$ hello world') {
            input.removeClass('terminal-prompt');
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
    $('h2.terminal').html('$ hello world')
    $('p.terminal').html('Welcome to my website!<br>Process finished with exit code HELLO');
    for (let section of SECTIONS) {
        section.addClass('shown');
    }
}

animateBlinker();
animateTerminal();
