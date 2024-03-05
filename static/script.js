
// JavaScript to capture and send pen stroke data
document.getElementById('submit').addEventListener('click', function () {
    // Capture the pen stroke data from the canvas
    // Send the data to the server using AJAX or fetch
    inputValue = document.getElementById('inputField').value;
    if (inputValue === ""){
        alert('Please enter the text to be recognized');
        return;
    }
    fetch('/collect_strokes', {
        method: 'POST',
        body: JSON.stringify({ strokesData: StrokeSet , text: inputValue, canvasWidth: canvas.width, canvasHeight: canvas.height}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                //alert('Pen strokes data sent successfully!');
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                points = [];
                StrokeSet = [];
            } else {
                alert('Failed to send pen strokes data.');
            }
        });
    points = [];    
});

document.getElementById('clear').addEventListener('click', function () {
    // Clear the canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(StrokeSet != null){
        StrokeSet = [];
    }
    if(points != null){
        points = [];
    }   
    
    input = document.getElementById('inputField');
    input.value = "";
});
// JavaScript to handle drawing on the canvas
// Use mouse/touch events to capture pen strokes

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let points = [];
let StrokeSet = []
// Move the origin to the bottom-left corner

// Event listeners for mouse/touch events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing1);
canvas.addEventListener('touchmove', draw1);
canvas.addEventListener('touchend', stopDrawing1);

function startDrawing(e) {
    isDrawing = true;
    points = [];
    addPoint(l = 0,e);
    e.preventDefault();
}

function draw(e) {
    if (!isDrawing) return;
    addPoint(l = 0,e);
    drawPoints();
    e.preventDefault();
    
}

function stopDrawing(e) {
    isDrawing = false;
    setlastpoint(1);
    if (points.length > 0) {
        StrokeSet.push(points);
        console.log(StrokeSet)
        points = [];
    }
    e.preventDefault();
}

function startDrawing1(e){
    isDrawing = true;
    points = [];
    addPoint(l = 0,e.touches[0]);
    e.prevetnDefault();
}

function draw1(e){
    if (!isDrawing) return;
    addPoint(l = 0,e.touches[0]);
    drawPoints();
    e.preventDefault();
}

function stopDrawing1(e){
    isDrawing = false;
    setlastpoint(1);
    if (points.length > 0) {
        StrokeSet.push(points);
        console.log(StrokeSet)
        points = [];
    }
    e.preventDefault();
}
function addPoint(l,e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width; 
    const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;    
    points.push({l, x, y });
}


function drawPoints() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (i === 0) {
            ctx.moveTo(p.x, p.y);
    
        } else if (i === points.length - 1){
            //ctx.rect(p.x, p.y, 100, 100)
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }
    ctx.stroke();
}
function setlastpoint(i) {
    if (points.length > 0) {
        points[points.length-1].l = i;
    }
}