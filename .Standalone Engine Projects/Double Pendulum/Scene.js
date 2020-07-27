











class Pendulum extends Sprite{
    constructor(radius, mass){
        super();
        this.angle = 0;
        this.radius = radius;
        this.mass = mass;
        this.x = 0;
        this.y = 0;
        this.acceleration = 0;
        this.velocity = 0;
    }

    draw(){
        
        this.x = this.transform.position.x + this.radius * Math.sin(this.angle);
        this.y = this.transform.position.y + this.radius * Math.cos(this.angle);
        
        context.beginPath();
        context.moveTo(this.transform.position.x, this.transform.position.y);
        context.lineTo(this.x, this.y);
        context.stroke();

        context.beginPath();
        context.arc(this.x, this.y, this.mass, 0, 2 * Math.PI);
        context.fill();
    }

}



/** @type {Pendulum} */ let p1;
/** @type {Pendulum} */ let p2;
/** @type {OffscreenCanvas} */ let offscreenCanvas;
/** @type {CanvasRenderingContext2D} */ let offscreenContext;
let g = 1;

init = function init(){

    offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    offscreenContext = offscreenCanvas.getContext("2d");
    offscreenContext.clearRect(0, 0, offscreenContext.width, offscreenContext.height);

    p1 = new Pendulum(100, 10);
    p1.acceleration = 0;
    p1.velocity = 0;
    p1.angle = Math.PI / 6;
    p1.transform.position = new vec2(canvas.width * 0.5, canvas.height * 0.5);

    p2 = new Pendulum(100, 10);
    p2.acceleration = 0;
    p1.angle = -Math.PI / 6;

    p2.transform.position = new vec2(canvas.width * 0.5, canvas.height * 0.5);
}

update = function update(){
    let num1 = -g * (2 * p1.mass + p2.mass) * Math.sin(p1.angle);
    let num2 = -p2.mass * g * Math.sin(p1.angle - 2* p2.angle);
    let num3 = -2 * Math.sin(p1.angle - p2.angle) * p2.mass;
    let num4 = p2.velocity * p2.velocity * p2.radius + p1.velocity * p1.velocity * p1.radius * Math.cos(p1.angle - p2.angle);
    let den = p1.radius * (2 * p1.mass + p2.mass - p2.mass * Math.cos(2 * p1.angle - 2* p2.angle));
    
    p1.acceleration = (num1 + num2 + num3 * num4) / den;
    

    num1 = 2 * Math.sin(p1.angle - p2.angle);
    num2 = p1.velocity * p1.velocity * p1.radius * (p1.mass + p2.mass);
    num3 = g * (p1.mass + p2.mass) * Math.cos(p1.angle);
    num4 = p2.velocity * p2.velocity * p2.radius * p2.mass * Math.cos(p1.angle - p2.angle);
    den = p2.radius * (2 * p1.mass + p2.mass - p2.mass * Math.cos(2 * p1.angle - 2* p2.angle));

    p2.acceleration = (num1 * (num2 + num3 + num4)) / den;




    p1.velocity += p1.acceleration * delta;
    p2.velocity += p2.acceleration * delta;
    p1.angle += p1.velocity * delta;
    p2.angle -= p2.velocity * delta;

    p2.transform.position.x = p1.x;
    p2.transform.position.y = p1.y;
}



predraw = function predraw(){
    offscreenContext.fillStyle = "blue";
    offscreenContext.fillRect(Math.round(p1.x), Math.round(p1.y), 1, 1);
    offscreenContext.fillStyle = "green";
    offscreenContext.fillRect(Math.round(p2.x), Math.round(p2.y), 1, 1);
    context.drawImage(offscreenCanvas, 0, 0);
}

draw = function draw(){
    
}