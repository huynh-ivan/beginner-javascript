//console.log('Cool Beans!'); 

// Select the elements on the page - canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');
console.log(canvas);

const shake = document.querySelector('.shake');
console.log(shake);
const MOVE_AMOUNT = 20; //when something is a true constant that never changes, it's common to use ALL CAPs + snakeCase
// set up our canvas for drawing
//made a variable with the same height & width properties from canvas via destructuring
const {width, height} = canvas; 

//create random starting points

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round'; //ensures smooth drawing
ctx.lineCap = 'round'; //ensures smooth drawing
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); //Start the drawing
ctx.moveTo(x,y); //where the drawer starts, 200px in from the left side, 200px from the right side
ctx.lineTo(x,y); //where the drawer ends; setting it to the same as the start will make an invisible line
ctx.stroke();


// write a draw function

function doDraw({ key }) { // this is another example of destructuing the attributes of an element into actual variables
    //increment hue + 1
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    console.log(key);
    ctx.beginPath(); // start the path
    ctx.moveTo(x,y);
    //move x, y to new location based on the user's key inputs
    switch(key) {
        default:
            break;
        case 'ArrowUp' :
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight' :
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown' :
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft' :
            x -= MOVE_AMOUNT;
            break;

    }
    ctx.lineTo(x,y);
    ctx.stroke();
}

// write a handler for the keys

function handleKey(e) {
    //e.preventDefault(); //there is a default on the window object that causes scrolling when the arrow key is pressed
    if(e.key.includes('Arrow')) {
        console.log(e.key);
    }
    doDraw({ key : e.key }); // an object called 'key' with one property 'e.key' was passed as an argument
}

// clear or shake function

function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function(){
        console.log('shaking done!')
        canvas.classList.remove('shake');
    },
    { once : true }
    )
};

shake.addEventListener('click', clearCanvas);

// listen for arrow keys

window.addEventListener('keydown', handleKey)