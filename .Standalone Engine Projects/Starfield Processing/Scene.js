import { canvas, context, setInit, setUpdate } from "./Core.js";
import { Star } from "./Star.js";

setInit(init);
setUpdate(update);


let stars = new Array(500);

function init(){
    for(let i = 0; i < stars.length; i++){
        stars[i] = new Star();
    }
}


function update(){
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < stars.length; i++){
        stars[i].update();
        stars[i].draw();
    }
}

