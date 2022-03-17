
SECTIONS = [$('#technical-experience'), $('#education'), $('#awards'), $('#connect'), $('#more-about-me')]

function animateBlinker() {
    setInterval(() => {
        $('h1.terminal-prompt').toggleClass('prompt-shown');
    }, 750);
}

function animateSections() {
    let i = 0;
    let intervalID = setInterval(() => {
        SECTIONS[i++].addClass('shown');
        if (i === SECTIONS.length) {
            clearInterval(intervalID);
        }
    }, 400);
}

function animateTerminal() {
    const input = $('h1.terminal')
    const output = $('p.terminal')

    // typing 1: "hello world"
    let contents = '$ ';
    let intervalID = setInterval(() => {
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

animateBlinker();
animateTerminal();
