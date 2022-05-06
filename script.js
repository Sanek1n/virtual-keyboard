const buttons = {
    '0':{
        'line': 'first',
        'lower-EN': ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
        'upper-EN': ['~','!','@','#','$','%','^','&','*','(',')','_','+','Backspace'],
        'lower-RU': ['ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
        'upper-RU': ['Ё','!','"','№',';','%',':','?','*','(',')','_','+','Backspace'],
        'caps': [1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        'button-size': [1,1,1,1,1,1,1,1,1,1,1,1,1,3],
        'code': ['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace']
    },
    '1':{
        'line': 'second',
        'lower-EN': ['Tab','q','w','e','r','t','y','u','i','o','p',`[`,`]`,`\\`],
        'upper-EN': ['Tab','Q','W','E','R','T','Y','U','I','O','P',`{`,`}`,`|`],
        'lower-RU': ['Tab','й','ц','у','к','е','н','г','ш','щ','з',`х`,`ъ`,`\\`],
        'upper-RU': ['Tab','Й','Ц','У','К','Е','Н','Г','Ш','Щ','З',`Х`,`Х`,`/`],
        'caps': [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        'button-size': [2,1,1,1,1,1,1,1,1,1,1,1,1,1],
        'code': ['Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','Keyi','KeyO','KeyP','BracketLeft','BracketRight','IntlYen']
    },
    '2':{
        'line': 'third',
        'lower-EN': ['Caps Lock','a','s','d','f','g','h','j','k','l',';',`'`,`Enter`],
        'upper-EN': ['Caps Lock','A','S','D','F','G','H','J','K','L',':',`"`,`Enter`],
        'lower-RU': ['Caps Lock','ф','ы','в','а','п','р','о','л','д','ж',`э`,`Enter`],
        'upper-RU': ['Caps Lock','Ф','Ы','В','А','П','Р','О','Л','Д','Ж',`Э`,`Enter`],
        'caps': [0,1,1,1,1,1,1,1,1,1,1,1,0],
        'button-size': [2,1,1,1,1,1,1,1,1,1,1,1,3],
        'code': ['CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter']
    },
    '3':{
        'line': 'fourth',
        'lower-EN': ['Shift','z','x','c','v','b','n','m',',','.','/',`Shift`],
        'upper-EN': ['Shift','Z','X','C','V','B','N','M','<','>','?',`Shift`],
        'lower-RU': ['Shift','я','ч','с','м','и','т','ь','б','ю','.',`Shift`],
        'upper-RU': ['Shift','Я','Ч','С','М','И','Т','Ь','Б','Ю',',',`Shift`],
        'caps': [0,1,1,1,1,1,1,1,1,1,1,0],
        'button-size': [3,1,1,1,1,1,1,1,1,1,1,3],
        'code': ['ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight']
    },
    '4':{
        'line': 'fifth',
        'lower-EN': ['Сtrl','Win','Alt','','Alt','Ctrl'],
        'upper-EN': ['Сtrl','Win','Alt','','Alt','Ctrl'],
        'lower-RU': ['Сtrl','Win','Alt','','Alt','Ctrl'],
        'upper-RU': ['Сtrl','Win','Alt','','Alt','Ctrl'],
        'button-size': [2,1,2,4,2,2],
        'code': ['ControlRight','MetaLeft','AltLeft','Space','AltRight','ControlRight']
    }
  }

const buttonSize = { '1': '', '2': 'medium ', '3': 'big ', '4': 'space '};

addBlocks();
const keyboardBlock = document.querySelector('.keyboard');
addButtons();

function addBlocks() {
    document.body.insertAdjacentHTML('afterbegin', 
    `<div class="main">
    <div class="text-block">
    <textarea class="text-area" autofocus="true" placeholder="C:\\>_*Смена раскладки Ctrl+Shift*"></textarea>
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
            lineBlock.insertAdjacentHTML('beforeend', `<div class="${buttonSize[buttons[i]["button-size"][j]]}button" data-buttonid='${i}:${j}'>
                    <span class="caption">${buttons[i]["lower-EN"][j]}</span></div>`);
        }
    }
}




