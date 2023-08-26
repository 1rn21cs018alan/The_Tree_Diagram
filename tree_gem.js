let screen = [];

function logScreen(mode = 1) {
    console.log();
    if (mode === 1) {
        for (let i = 0; i < screen.length; i++) {
            let a = '';
            for (let j = 0; j < screen[i].length; j++) {
                if (screen[i][j] === 1) {
                    a += '⬜';
                } else {
                    a += '⬛';
                }
            }
            console.log(a);
        }
    } else {
        let a = '';
        for (let j = 0; j < screen[screen.length - 2].length; j++) {
            if (screen[screen.length - 2][j] === 1) {
                a += '⬜';
            } else {
                a += '⬛';
            }
        }
        console.log(a);
        a = '';
        for (let j = 0; j < screen[screen.length - 1].length; j++) {
            if (screen[screen.length - 1][j] === 1) {
                a += '⬜';
            } else {
                a += '⬛';
            }
        }
        console.log(a);
    }
    console.log();
}

function extract() {
    let branch = [];
    for (let i = 0; i < screen[screen.length - 1].length; i++) {
        if (i % 2 === 0) {
            branch.push(screen[screen.length - 1][i]);
        }
    }
    return branch;
}

function blit(level) {
    screen.push(new Array(level.length * 2 + 1).fill(0));
    screen.push(new Array(level.length * 2 + 1).fill(0));
    for (let i = 0; i < level.length; i++) {
        if (level[i] === 1) {
            screen[screen.length - 1][2 * i + 1] = 1;
            screen[screen.length - 2][2 * i + 1] = 1;
        }
    }
}

function randDel(branchPath) {
    let trigger = 10;
    for (let i = 0; i < branchPath.length; i++) {
        if (branchPath[i] === 1) {
            let chance = 100 * Math.random();
            if (chance < trigger) {
                branchPath[i] = -1;
            }
        }
    }
}

function randBranch(branchPath) {
    let trigger = 50;
    let valid = [];
    for (let i = 0; i < branchPath.length; i++) {
        if (branchPath[i] === -1) {
            if (i > 0 && branchPath[i - 1] === 1) { // branch to right
                valid.push(i);
            }
            if (i < branchPath.length - 1 && branchPath[i + 1] === 1) { // branch to left
                valid.push(-i);
            }
        }
    }
    for (let i = 0; i < valid.length; i++) {
        let chance = 100 * Math.random();
        if (chance < trigger) {
            if (valid[i] > 0) { // right branch
                screen[screen.length - 1][2 * valid[i]] = 1;
                screen[screen.length - 1][2 * valid[i] + 1] = 1;
                branchPath[valid[i]] = 1;
            } else if (branchPath[-valid[i]] !== 1) { // left branch
                screen[screen.length - 1][-2 * valid[i] + 1] = 1;
                screen[screen.length - 1][-2 * valid[i] + 2] = 1;
                branchPath[-valid[i]] = 1;
            }
        }
    }
}

function main() {
    // let n = parseInt(prompt("Enter maximum no of branches"));
    // let loopCount = parseInt(prompt("Enter no of levels"));
    let n=1
    let loopCount=1
    const canvas = document.getElementById('canvas1');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let branchPath = new Array(n).fill(-1);
    branchPath[Math.floor(n / 2)] = 1;
    blit(branchPath);
    logScreen();
    for (let i = 0; i < loopCount; i++) {
        randDel(branchPath);
        blit(branchPath);
        randBranch(branchPath);
    }
    logScreen();
}

function drawGradientLine(startX, startY, endX, endY, width) {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(1, 'transparent');

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = gradient;
    context.lineWidth = width;
    context.stroke();
}

main();
draw_Left_Branch(200,100,50);
function draw_Left_Branch(x,y,width,color='blue')
{
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    const radius=width/2

    let gradient = context.createRadialGradient(x-radius, y, 0, x-radius, y, width);
    gradient.addColorStop(0.2, 'transparent'); //inner Color
    gradient.addColorStop(0.5, color);         // Center color
    gradient.addColorStop(0.8, 'transparent');  // Outer color

    
    context.beginPath();
    context.arc(x-radius, y, radius, 0, Math.PI/2, false);
    context.strokeStyle = gradient;
    context.lineWidth = 20;
    context.stroke();

    gradient = context.createRadialGradient(x-radius, y+width, 0, x-radius, y+width, width);      
    gradient.addColorStop(0.2, 'transparent'); //inner Color
    gradient.addColorStop(0.5, color);         // Center color
    gradient.addColorStop(0.8, 'transparent');  // Outer color

    context.beginPath();
    context.arc(x-radius, y+width, radius, Math.PI,Math.PI*3/2, false);
    context.strokeStyle = gradient;
    context.lineWidth = 20;
    context.stroke();
}