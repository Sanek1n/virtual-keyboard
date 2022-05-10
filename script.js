const buttons = {
    '0':{
        'line': 'first',
        'lower-EN': ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
        'upper-EN': ['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace'],
        'lower-RU': ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
        'upper-RU': ['Ё','!','"','№',';','%',':','?','*','(',')','_','+','Backspace'],
        'caps': [2,0,0,0,0,0,0,0,0,0,0,0,0,0],
        'button-size': [1,1,1,1,1,1,1,1,1,1,1,1,1,3],
        'code': ['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace']
    },
    '1':{
        'line': 'second',
        'lower-EN': ['Tab','q','w','e','r','t','y','u','i','o','p',`[`,`]`,`\\`],
        'upper-EN': ['Tab','Q','W','E','R','T','Y','U','I','O','P',`{`,`}`,`|`],
        'lower-RU': ['Tab','й','ц','у','к','е','н','г','ш','щ','з',`х`,`ъ`,`\\`],
        'upper-RU': ['Tab','Й','Ц','У','К','Е','Н','Г','Ш','Щ','З',`Х`,`Ъ`,`/`],
        'caps': [0,1,1,1,1,1,1,1,1,1,1,2,2,0],
        'button-size': [2,1,1,1,1,1,1,1,1,1,1,1,1,1],
        'code': ['Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash']
    },
    '2':{
        'line': 'third',
        'lower-EN': ['Caps Lock','a','s','d','f','g','h','j','k','l',';',`'`,`Enter`],
        'upper-EN': ['Caps Lock','A','S','D','F','G','H','J','K','L',':',`"`,`Enter`],
        'lower-RU': ['Caps Lock','ф','ы','в','а','п','р','о','л','д','ж',`э`,`Enter`],
        'upper-RU': ['Caps Lock','Ф','Ы','В','А','П','Р','О','Л','Д','Ж',`Э`,`Enter`],
        'caps': [0,1,1,1,1,1,1,1,1,1,2,2,0],
        'button-size': [2,1,1,1,1,1,1,1,1,1,1,1,3],
        'code': ['CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter']
    },
    '3':{
        'line': 'fourth',
        'lower-EN': ['Shift','z','x','c','v','b','n','m',',','.','/',`Shift`],
        'upper-EN': ['Shift','Z','X','C','V','B','N','M','<','>','?',`Shift`],
        'lower-RU': ['Shift','я','ч','с','м','и','т','ь','б','ю','.',`Shift`],
        'upper-RU': ['Shift','Я','Ч','С','М','И','Т','Ь','Б','Ю',',',`Shift`],
        'caps': [0,1,1,1,1,1,1,1,2,2,0,0],
        'button-size': [3,1,1,1,1,1,1,1,1,1,1,2],
        'code': ['ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash', 'ShiftRight']
    },
    '4':{
        'line': 'fifth',
        'lower-EN': ['Сtrl','Alt','','Alt','Ctrl','◄','▼','▲','►'],
        'upper-EN': ['Сtrl','Alt','','Alt','Ctrl','◄','▼','▲','►'],
        'lower-RU': ['Сtrl','Alt','','Alt','Ctrl','◄','▼','▲','►'],
        'upper-RU': ['Сtrl','Alt','','Alt','Ctrl','◄','▼','▲','►'],
        'caps': [0,0,0,0,0,0,0,0,0],
        'button-size': [2,2,4,2,2,1,1,1,1],
        'code': ['ControlLeft','AltLeft','Space','AltRight','ControlRight','ArrowLeft','ArrowDown','ArrowUp','ArrowRight']
    }
  }

 
const buttonSize = { '1': '', '2': 'medium ', '3': 'big ', '4': 'space '};
let layout = 'lower-EN';
let arrKeys = [];
let isCaps = false;

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


addBlocks();
const keyboardBlock = document.querySelector('.keyboard');
const outputBlock = document.querySelector('.text-area');
addButtons();

addButtonsListener();

function addBlocks() {
    document.body.insertAdjacentHTML('afterbegin', 
    `<div class="main">
    <div class="text-block">
    <textarea class="text-area" autofocus="true" disabled  placeholder="*Windows keyboard* /To change the language press the left Ctrl+Shift/"></textarea>
    </div>
    <div class="keyboard"></div>
    </div>`);
}


function addButtons() {
    let lineBlock;
    for (let i = 0; i < Object.keys(buttons).length; i++) {
        keyboardBlock.insertAdjacentHTML('beforeend', `<div class="line ${buttons[i]["line"]}"></div>`);
        lineBlock = document.querySelector(`.${buttons[i]["line"]}`);
        for (let j = 0; j < buttons[i]["button-size"].length; j++) {
            lineBlock.insertAdjacentHTML('beforeend', `<button class="button ${buttonSize[buttons[i]["button-size"][j]]}" 
            data-placeid='${i}:${j}' data-code='${buttons[i]["code"][j]}'>${buttons[i]["lower-EN"][j]}</button>`);
        }
    }
}

function addButtonsListener() {
    const buttonsArray = document.querySelectorAll('.button');
    buttonsArray.forEach((element) => {
        element.addEventListener('click', buttonClick);
    });

    document.addEventListener('keydown', buttonPress);
    document.addEventListener('keyup', buttonRelease);
 
}

function buttonClick() {
    let rowId = this.dataset.placeid.slice(0, this.dataset.placeid.indexOf(':',0));
    let colId = this.dataset.placeid.slice(this.dataset.placeid.indexOf(':',0) + 1,this.dataset.placeid.length);
    let buttonElement = this;
    this.classList.add('push');
    
    switch (buttons[rowId]['code'][colId]) {
        case ('Space'):
            outputBlock.value += ' ';
            break;

        case ('Backspace'):
            outputBlock.value = outputBlock.value.substring(0, outputBlock.value.length - 1);
            break;

        case ('Enter'):
            outputBlock.value += "\n";
            break;
        
        case ('CapsLock'):
            if (layout.slice(0,5) == 'lower') {
                layout = 'upper-' + layout.slice(-2);
                isCaps = true;
                buttonElement.classList.add('on');
            } else {
                layout = 'lower-' + layout.slice(-2);
                isCaps = false;
                buttonElement.classList.remove('on');
            }
            changeCaps();
            break;
        case ('Tab'):
            outputBlock.value += '      ';
            break;
        case ('ShiftLeft'):
            break;
        case ('ShiftRight'):
            break;
        case ('ControlRight'):
            break;
        case ('ControlLeft'):
            break;
        case ('AltRight'):
            break;
        case ('AltLeft'):
            break;
        default:
                outputBlock.value += buttonElement.textContent;
    }

    buttonElement.addEventListener("transitionend", () => {
        buttonElement.classList.remove('push');
    });
    buttonElement.blur();
}



function buttonPress() {
    
    let buttonElement = document.querySelector(`[data-code="${event.code}"]`);
    if (!isFinite(buttonElement)) {
        buttonElement.classList.add('push');
        arrKeys.push(event.code);
        switch (event.code) {
            case ('Space'):
                outputBlock.value += ' ';
                break;

            case ('CapsLock'):
                if (layout.slice(0,5) == 'lower') {
                    layout = 'upper-' + layout.slice(-2);
                    isCaps = true;
                    buttonElement.classList.add('on');
                } else {
                    layout = 'lower-' + layout.slice(-2);
                    isCaps = false;
                    buttonElement.classList.remove('on');
                }
                changeCaps();
                break;
            case ('ShiftLeft'):
                if (!event.repeat) {
                    if (layout.slice(0,5) == 'lower') {
                        layout = 'upper-' + layout.slice(-2);
                    } else {
                        layout = 'lower-' + layout.slice(-2);
                    }
                    changeShift();
                }
                break;
            case ('ShiftRight'):
                if (!event.repeat) {
                    if (layout.slice(0,5) == 'lower') {
                        layout = 'upper-' + layout.slice(-2);
                    } else {
                        layout = 'lower-' + layout.slice(-2);
                    }
                    changeShift();
                }
                break;
            case ('Enter'):
                outputBlock.value += "\n";
                break;
            case ('ControlLeft'):
                break;
            case ('ControlRight'):
                break;
            case ('Enter'):
                break;
            case ('ControlRight'):
                break;
            case ('AltRight'):
                break;
            case ('AltLeft'):
                break;
            case ('Tab'):
                event.preventDefault();
                outputBlock.value += '      ';
                break;
            case ('Backspace'):
                outputBlock.value = outputBlock.value.substring(0, outputBlock.value.length - 1);
                break;
            default:
                if (layout.slice(0,5) !== 'lower') {
                    outputBlock.value += buttonElement.textContent.toUpperCase();
                } else {
                    outputBlock.value += buttonElement.textContent.toLowerCase();
                }
        }
}
}

function buttonRelease() {
    let buttonElement = document.querySelector(`[data-code="${event.code}"]`);
 
    switch (event.code) {
        case ('ShiftLeft'):
                if (layout.slice(0,5) == 'lower') {
                    layout = 'upper-' + layout.slice(-2);
                } else {
                    layout = 'lower-' + layout.slice(-2);
                }
                changeShift()
            break;
        case ('ShiftRight'):
            if (layout.slice(0,5) == 'lower') {
                layout = 'upper-' + layout.slice(-2);
            } else {
                layout = 'lower-' + layout.slice(-2);
            }
            changeShift()
            break;
    }
    
    if (arrKeys.includes('ShiftLeft') && arrKeys.includes('ControlLeft')) {
            if (layout.slice(-2) == 'EN') {
                layout = layout.slice(0, layout.indexOf('-',0) + 1) + 'RU';
                changeShift();
            } else {
                layout = layout.slice(0, layout.indexOf('-',0) + 1) + 'EN';
                changeShift();
            }
    }
    arrKeys = [];
    if (!isFinite(buttonElement)) {
        buttonElement.classList.remove('push');
    }
    

}

function changeCaps() {
    let buttonElements;
    for (let i = 0; i < Object.keys(buttons).length; i++) {
        for (let j = 0; j < buttons[i]["caps"].length; j++) {
            if (buttons[i]["caps"][j] == 1) {
                buttonElements = document.querySelector(`[data-placeid="${i}:${j}"]`);
                buttonElements.textContent = buttons[i][layout][j];
            } else if (buttons[i]["caps"][j] == 2 && layout.slice(-2) === "RU") {
                buttonElements = document.querySelector(`[data-placeid="${i}:${j}"]`);
                buttonElements.textContent = buttons[i][layout][j];
            }
    }
}
}

function changeShift() {
    let buttonElements;
    for (let i = 0; i < Object.keys(buttons).length; i++) {
        for (let j = 0; j < buttons[i]["caps"].length; j++) {
                buttonElements = document.querySelector(`[data-placeid="${i}:${j}"]`);
                buttonElements.textContent = buttons[i][layout][j];
    }
}
}

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        layout = localStorage.getItem('lang');
        changeShift();
    }
}

function setLocalStorage () {
    localStorage.setItem('lang', layout);
}