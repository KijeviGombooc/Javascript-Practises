/** @type {HTMLCanvasElement} */ export let canvas;
/** @type {CanvasRenderingContext2D} */ export let context;
window.onload = start;

let init;
let update;

export function setInit(functionPointer){
    init = functionPointer;
}
export function setUpdate(functionPointer){
    update = functionPointer;
}



function start(){
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "#333333";
    body.style.color = "white";

    canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "black";
    canvas.width = 800;
    canvas.height = 600;

    body.appendChild(canvas);

    context = canvas.getContext("2d");

    
    
    if(init == undefined || update == undefined)
    {
        console.error("init or update is undefined!");
        return;
    }


    init();

    requestAnimationFrame(function loop(){
        update();
        requestAnimationFrame(loop);
    });
}