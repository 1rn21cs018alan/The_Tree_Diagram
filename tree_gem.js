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


function draw_Line(X, Y, width,color='blue') {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    // context.globalCompositeOperation = 'lighter';

    const gradient = context.createLinearGradient(X-width/2, Y, X+width/2, Y);
    custom_gradient(gradient,color);

    context.beginPath();
    context.moveTo(X, Y);
    context.lineTo(X, Y+width);
    context.strokeStyle = gradient;
    context.lineWidth = 0.4*width;
    context.stroke();
}


// draw_Left_Branch(200,100,50);
// draw_Right_Branch(200,100,50);
// draw_Line(200,100,50);
// draw_Stop(200,100,50);
function draw_Left_Branch(x,y,width,color='blue')
{
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    const radius=width/2
    // context.globalCompositeOperation = 'lighter';

    let gradient = context.createRadialGradient(x-radius, y, 0, x-radius, y, width);
    custom_gradient(gradient,color);

    
    context.beginPath();
    context.arc(x-radius, y, radius, 0, Math.PI/2, false);
    context.strokeStyle = gradient;
    context.lineWidth = 0.4*width;
    context.stroke();
    
    gradient = context.createRadialGradient(x-radius, y+width, 0, x-radius, y+width, width); 
    custom_gradient(gradient,color);
    
    context.beginPath();
    context.arc(x-radius, y+width, radius, Math.PI,Math.PI*3/2, false);
    context.strokeStyle = gradient;
    context.lineWidth =0.4*width;
    context.stroke();
}
function draw_Right_Branch(x,y,width,color='blue')
{
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    const radius=width/2
    // context.globalCompositeOperation = 'lighter';

    let gradient = context.createRadialGradient(x+radius, y, 0, x+radius, y, width);
    custom_gradient(gradient,color);
    
    
    context.beginPath();
    context.arc(x+radius, y, radius, Math.PI/2, Math.PI, false);
    context.strokeStyle = gradient;
    context.lineWidth = width*0.4;
    context.stroke();
    
    gradient = context.createRadialGradient(x+radius, y+width, 0, x+radius, y+width, width);      
    custom_gradient(gradient,color);

    context.beginPath();
    context.arc(x+radius, y+width, radius, Math.PI*3/2, 0,false);
    context.strokeStyle = gradient;
    context.lineWidth = width*0.4;
    context.stroke();
}

function draw_Stop(x, y, width,color='blue') {
    const radius=width/2;
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');

    // Create a radial gradient
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    if(color!='white'){
        gradient.addColorStop(0.2, color);        // Inner color
        gradient.addColorStop(1, 'transparent'); // Outer color
    }
    else{
        gradient.addColorStop(0.01, 'white');        // Inner color
        gradient.addColorStop(0.5, 'transparent'); // Outer color
    }

    // Draw the circle with the gradient fill
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
}


function draw_screen(n,loopCount)
{
    const canvas = document.getElementById('canvas1');
    const block_width=Math.round(canvas.width/(n+1));
    const color='blue'
    for(let i=0;i<screen.length;i+=2)
    {
        let level=[screen[i]];
        level.push(screen[i+1]);
        // console.log((level[0].length));
        for(let j=2;j<level[0].length-2;j+=2)
        {
            if(level[1][j]==1)
            {
                if( level[0][j+1]==1)
                {
                    draw_Left_Branch(block_width*(j/2+0.75),block_width*(i+1),block_width,color);
                    // console.log("flag1");
                }
                else{
                    draw_Right_Branch(block_width*(j/2-0.25),block_width*(1+i),block_width,color);
                    // console.log("flag2");
                }
            }
            // console.log("flag3");
        }
        for(let j=1;j<level[0].length-1;j+=2)
        {
            if(level[1][j]==1 && level[0][j]==1)
            {
                draw_Line(block_width*(j/2+0.25),block_width*i,block_width,color);
                draw_Line(block_width*(j/2+0.25),block_width*(i+1),block_width,color);
            }
            // console.log("flag3");
        }
        for(let j=1;j<level[0].length-1;j+=2)
        {
            if(level[0][j]==0 && i>0 && screen[i-1][j]==1)
            {
                draw_Stop(block_width*(j/2+0.25),block_width*i,block_width,color);
            }
            // console.log("flag3");
        }
        // console.log("flag4");
        if(i==screen.length-2)
        {
            for(let j=1;j<level[0].length-1;j+=2)
            {
                if(level[1][j]==1)
                {
                    draw_Stop(block_width*(j/2+0.25),block_width*(i+2),block_width,color);
                }
            }
        }
        for(let j=2;j<level[0].length-2;j+=2)
        {
            if(level[1][j]==1)
            {
                if( level[0][j+1]==1)
                {
                    draw_Left_Branch(block_width*(j/2+0.75),block_width*(i+1),block_width,'white');
                    // console.log("flag1");
                }
                else{
                    draw_Right_Branch(block_width*(j/2-0.25),block_width*(1+i),block_width,'white');
                    // console.log("flag2");
                }
            }
            // console.log("flag3");
        }
        for(let j=1;j<level[0].length-1;j+=2)
        {
            if(level[1][j]==1 && level[0][j]==1)
            {
                draw_Line(block_width*(j/2+0.25),block_width*i,block_width,'white');
                draw_Line(block_width*(j/2+0.25),block_width*(i+1),block_width,'white');
            }
            // console.log("flag3");
        }
        for(let j=1;j<level[0].length-1;j+=2)
        {
            if(level[0][j]==0 && i>0 && screen[i-1][j]==1)
            {
                draw_Stop(block_width*(j/2+0.25),block_width*i,block_width,'white');
            }
            // console.log("flag3");
        }
        // console.log("flag4");
        if(i==screen.length-2)
        {
            for(let j=1;j<level[0].length-1;j+=2)
            {
                if(level[1][j]==1)
                {
                    draw_Stop(block_width*(j/2+0.25),block_width*(i+2),block_width,'white');
                }
            }
        }
    }
    console.log("done");
}


function checkClear(){
    for(let i=0;i<screen[0].length;i++)
        if(screen[screen.length-1][i]==1)
            return false;
    return true;
}


function custom_gradient(obj,color){  
    if(color!='white'){
        obj.addColorStop(0.2, 'transparent'); //inner Color
        obj.addColorStop(0.5, color);         // Center color
        obj.addColorStop(0.8, 'transparent');  // Outer color
    }
    else{
        obj.addColorStop(0.45, 'transparent'); //inner Color
        obj.addColorStop(0.5, 'white');         // Center color
        obj.addColorStop(0.55, 'transparent');  // Outer color
    }

}



function pull_wall(n){
    const canvas2 = document.getElementById('canvas2');
    const context2 = canvas2.getContext('2d');
    const block_width=Math.round(canvas2.width/(n+1));
    console.log(block_width);
    // let DropBy=canvas2.height/10;
    // while(DropBy<canvas2.height/3)
    // {
    //     setTimeout(function() {
    //         context2.globalCompositeOperation = 'destination-out';
    //         context2.clearRect(0, 0, canvas2.width, DropBy);
    //         context2.globalCompositeOperation = 'source-over';
    //     }, 2000);
    //     DropBy+=canvas2.height/1000;
    // }
    let lineHeight = block_width/10; // Height of each line
    if(lineHeight<3)
        lineHeight+=-lineHeight+3
    const totalLines = Math.ceil(canvas2.height / lineHeight); // Total number of lines

    const canvas4 = document.getElementById('canvas3');
    const context4 = canvas4.getContext('2d');

    // Define the object's properties
    const objectWidth = block_width;
    const objectHeight = block_width;
    const objectColor = 'red';

    // Function to draw the object
    function drawObject(offscreen_context,x, y,width,color='blue') {
        const radius=width/2;
        // Create a radial gradient
        let gradient = offscreen_context.createRadialGradient(x, y, 0, x, y, radius);
        if(color!='white'){
            gradient.addColorStop(0.2, color);        // Inner color
            gradient.addColorStop(1, 'transparent'); // Outer color
        }
        else{
            gradient.addColorStop(0.01, 'white');        // Inner color
            gradient.addColorStop(0.5, 'transparent'); // Outer color
        }

        // Draw the circle with the gradient fill
        offscreen_context.beginPath();
        offscreen_context.arc(x, y, radius, 0, Math.PI * 2);
        offscreen_context.fillStyle = gradient;
        offscreen_context.fill();
    }

    // Create an off-screen canvas to draw the object as an image
    const offscreen_canvas = document.createElement('canvas');
    offscreen_canvas.width = objectWidth;
    offscreen_canvas.height = objectHeight;
    const offscreen_context = offscreen_canvas.getContext('2d');
    drawObject(offscreen_context,block_width/2,block_width/2,block_width,'blue');
    drawObject(offscreen_context,block_width/2,block_width/2,block_width,'white');
    // offscreen_context.fillStyle = objectColor;
    // offscreen_context.fillRect(0, 0, objectWidth, objectHeight);

    // Create an image pattern from the off-screen canvas
    const objectPattern = context4.createPattern(offscreen_canvas, 'no-repeat');
    
    // Function to draw object using the pattern
    function drawObjectUsingPattern(x, y) {
        context4.drawImage(offscreen_canvas,x,y)
    }
    


    function animateCanvas() {
        let currentLine = 0;
        function clearNextLine() {
            context2.clearRect(0, currentLine * lineHeight, canvas2.width, lineHeight);
            currentLine++;
            
            context4.clearRect(0, 0, canvas4.width, canvas4.height);
        
            // Use the pattern to draw the object at different locations
            rownum=Math.ceil(currentLine/7);
            if(rownum<1)
                drawObjectUsingPattern((screen[0].length/2-0.5)*block_width/2, currentLine * lineHeight-block_width/2);
            for(let i=1;rownum<screen.length && i<screen[rownum].length && rownum>0;i+=2){
                if(screen[rownum-1][i]==1)
                    drawObjectUsingPattern((i-0.5)*block_width/2, currentLine * lineHeight-block_width/2);
            }
            // drawObjectUsingPattern(100+block_width/2, currentLine * lineHeight-block_width/2);
            if (rownum==screen.length)
                context4.clearRect(0, 0, canvas4.width, canvas4.height);;
                
            // Request the next animation frame
            if (currentLine < totalLines) {
                setTimeout(clearNextLine, 50); // Adjust the delay as needed
            }
            // requestAnimationFrame(animate);
        }

        clearNextLine();
    }
    animateCanvas();
}


function main() {
    let n = parseInt(prompt("Enter maximum no of branches"));
    let loopCount = parseInt(prompt("Enter no of levels"));
    // let n=7
    // let loopCount=7
    const canvas = document.getElementById('canvas1');
    canvas.width = window.innerWidth;
    // canvas.width = 900;
    console.log(window.innerWidth)
    let height=Math.round(canvas.width/(n+1))*(2*loopCount+3)
    canvas.height = height;
    const overlay = document.getElementById('canvas2');
    overlay.width=canvas.width;
    overlay.height=canvas.height;
    const overlay2 = document.getElementById('canvas3');
    overlay2.width=canvas.width;
    overlay2.height=canvas.height;
    const context = overlay.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, overlay.width, overlay.height);
    let fullTree=false
    do{
        screen=[]
        fullTree=false
        let branchPath = new Array(n).fill(-1);
        branchPath[Math.floor(n / 2)] = 1;
        blit(branchPath);
        logScreen();
        for (let i = 0; i < loopCount; i++) {
            randDel(branchPath);
            blit(branchPath);
            randBranch(branchPath);
            fullTree=fullTree|checkClear();
        }
        logScreen();
    }while(fullTree);
    draw_screen(n,loopCount);
    pull_wall(n);
}
main();