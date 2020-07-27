





let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let forward = true;



init = function init(){
    noClearRect = true;
}

update = function update(){

    if(Input.IsJustPressed(Input.KEY_SPACE))
        step();
}


function step(){
    let next = index - count;
    if(next < 0 || numbers[next]){
        next = index + count;
        
    }
    numbers[next] = true;
    sequence.push(next);



    context.beginPath();
    let scale = 10;
    let radius = (next - index) / 2 * scale;
    let x = (next + index) / 2;

    context.arc(x * scale, canvas.height / 2, Math.abs(radius), 0, Math.PI, forward);
    context.stroke();
    
    forward = !forward;
    index = next;
    
    count++;
}


draw = function draw(){
    
}