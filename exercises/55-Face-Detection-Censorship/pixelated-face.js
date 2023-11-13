// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.

console.log('works!')
const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = `#ffc600`;
ctx.lineWidth = `2`;
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector({ fastMode: true});
const optionsInputs = document.querySelectorAll('.controls input[type="range"]');');
optionsInputs.forEach(input => input.addEventListener('input', handleOption))


function handleOption(e){
    const { value, name } = e.currentTarget;
    options[name] = parseFloat(value);
}

const options = {
    SIZE: 10, 
    SCALE: 1.35
}
// console.log(faceDetector);

//write a function to ppopulate video

async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height : 720 }});
    video.srcObject = stream;
    await video.play();

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
    // console.log(canvas.width, canvas.height)
    //size the canvas to be the  same size as video
}

async function detect() {
    const faces = await faceDetector.detect(video);
    // console.log(faces.length);
    faces.forEach(drawFace);
    faces.forEach(censor);
    //ask the browser when the next animation frame and tell it to run detect

    requestAnimationFrame(detect);
}

function drawFace(face) {
    const { width , height, top, left } = face.boundingBox;
    // console.log({width , height, top, left});
    ctx.strokeStyle = `#ffc600`;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.strokeRect(left, top, width, height);
   
}

function censor({boundingBox : face}) {
    // draw the small face
    // faceCtx.drawImage(video, 0, 0);
    faceCtx.imageSmoothingEnabled = false;
    faceCtx.clearRect(0,0, faceCanvas.width, faceCanvas.height);
    faceCtx.drawImage(
        // five source args
        video,  // where does the source come from
        face.x, 
        face.y, 
        face.width,
        face.height, 
        //4 draw args
        face.x,
        face.y,
        options.SIZE,
        options.SIZE
    );
    // take smaall face back out and draw it out at normal size

    const width = face.width * options.SCALE;
    const height = face.height * options.SCALE;
    
    faceCtx.drawImage(
        faceCanvas,
        face.x,
        face.y,
        options.SIZE,
        options.SIZE,
        //Drawing ARgs
        face.x - (width - face.width) / 2,
        face.y - (width - face.height) / 2,
        width,
        height
    );
}



populateVideo().then(detect);