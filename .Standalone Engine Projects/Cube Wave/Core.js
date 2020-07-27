 /** @type {HTMLCanvasElement} */ let canvas;
/** @type {CanvasRenderingContext2D} */ let context;


/** Is called at the start of window, only once */ let init;
/** Is always called before GameObject updates */ let update;
/** Is always called after GameObject draws */ let draw;
let physicsLoop;


let timeScale = 1;
let timeAtStart;
let timeSinceStart;
let delta = 0.001;
let unscaledDelta = 0;


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


let timedFunctions = [];

function timedFunction(func, time){
    timedFunctions.push(
        {
            "func" : func,
            "time" : time
        }
    );
}


window.onload = function start(){
    
    //#region Canvas init
    let body = this.document.getElementsByTagName("body")[0];
    
    canvas = this.document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.backgroundColor = "#505050";
    context = canvas.getContext("2d");
    
    body.appendChild(canvas);
    //#endregion
    
    if(init == undefined || update == undefined || draw == undefined){
        this.console.error("Init, Update or Draw is undefined!");
        return;
    }
    
    GameObject.init();
    Sprite.init();
    Input.init();
    init();

    timeAtStart = (new Date()).getTime();
    timeSinceStart = 0;
    unscaledDelta = 0;
    delta = 0.001;

    requestAnimationFrame(
        
        function loop(){
            requestAnimationFrame(loop);

            context.clearRect(0, 0, canvas.width, canvas.height);
            
            Input.updateInput();
            update();
            GameObject.updateAll();
            Sprite.drawAll();
            draw();

            unscaledDelta = (new Date() - (timeAtStart + timeSinceStart)) / 1000;
            delta = timeScale * unscaledDelta;
            timeSinceStart = new Date() - timeAtStart;
        }
    );
}