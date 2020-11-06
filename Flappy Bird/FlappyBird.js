



class Bird extends Sprite{
    constructor(radius = 10){
        super();
        this.started = false;
        this.radius = radius;
        this.velocity = new vec2();
        this.gravity = 1000;
        this.jumpPower = 300;
    }

    update(){
        this.applyGravity();
        if(Input.IsJustPressed(Input.KEY_SPACE) || Input.IsButtonJustPressed(0)){
            this.started = true;
            this.jump();   
        }
        this.move();
    }

    jump(){
        this.velocity.y = -this.jumpPower;
    }
    
    applyGravity(){
        if(this.started)
            this.velocity.y += delta * this.gravity;
    }
    
    move(){
        this.transform.position.add(this.velocity.mult(delta));
    }

    draw(){
        context.beginPath();
        context.arc(this.transform.position.x, this.transform.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Pipe extends Sprite{

    static pipes = [];
    static speed = 100;

    constructor(width, holeTop, holeHeight){
        
        super();
        this.passed = false;
        Pipe.pipes.push(this);
        this.started = false;
        //this.transform.position.x = canvas.width;
        this.transform.position.y = 0;
        this.width = width;
        this.holeTop = holeTop;
        this.holeHeight = holeHeight;
    }

    get getUpperRect(){
        return new Rect(this.transform.position.x, this.transform.position.y, this.width, this.holeTop);
    }

    get getLowerRect(){
        return new Rect(this.transform.position.x, this.transform.position.y + this.holeTop + this.holeHeight, this.width, canvas.height - (this.holeTop + this.holeHeight));
    }

    checkBirdInside(bird){
        let b = bird.transform.position;
        /**@type {Rect} */ let ur = this.getUpperRect;
        /**@type {Rect} */ let lr = this.getLowerRect;
        if(ur.x < b.x && ur.x + ur.w > b.x){
            if(Math.abs(ur.y - b.y) <= bird.radius){
                lost = true;
                return;
            }
            if(Math.abs(ur.y + ur.h - b.y) <= bird.radius){
                lost = true;
                return;
            }
        }
        if(ur.y < b.y && ur.y + ur.h > b.y){
            if(Math.abs(ur.x - b.x) <= bird.radius){
                lost = true;
                return;
            }
            if(Math.abs(ur.x + ur.w - b.x) <= bird.radius){
                lost = true;
                return;
            }
        }

        if(lr.x < b.x && lr.x + lr.w > b.x){
            if(!this.passed){
                this.passed = true;
                score++;
            }
            if(Math.abs(lr.y - b.y) <= bird.radius){
                lost = true;
                return;
            }
            if(Math.abs(lr.y + lr.h - b.y) <= bird.radius){
                lost = true;
                return;
            }
        }
        if(lr.y < b.y && lr.y + lr.h > b.y){
            if(Math.abs(lr.x - b.x) <= bird.radius){
                lost = true;
                return;
            }
            if(Math.abs(lr.x + lr.w - b.x) <= bird.radius){
                lost = true;
                return;
            }
        }

    }

    draw(){
        let ur = this.getUpperRect;
        let lr = this.getLowerRect;

        context.fillStyle = this.color;
        context.fillRect(ur.x, ur.y, ur.w, ur.h);
        context.fillRect(lr.x, lr.y, lr.w, lr.h);
    }

    update(){
        if(Input.IsJustPressed(Input.KEY_SPACE) || Input.IsButtonJustPressed(0)){
            this.started = true;
        }

        if(this.started){
            this.transform.position.x -= Pipe.speed * delta;
            
            if(this.transform.position.x + this.width < 0)
            {
                this.transform.position.x = canvas.width;// + Math.random() * 50;
                this.holeTop = 250 + Math.random() * 150;
                this.passed = false;
                //this.destroy();
            }
        }
    }

    destroy(){
        super.destroy();
        for(let i = 0; i < Pipe.pipes.length; i++){
            if(Pipe.pipes[i] == this){
                Pipe.pipes.splice(i, 1);
            }
        }
    }
}


/**@type {Bird} */ let bird = null;
let lost = false;
let score = 0;

init = function init(){
    startNewGame();    
}

function startNewGame(){
    timeScale = 1;
    score = 0;
    lost = false;

    for(let i = Pipe.pipes.length - 1; i >= 0; i--){
        Pipe.pipes[i].destroy();
    }

    if(bird != null)
        bird.destroy();

    bird = new Bird(16);
    bird.transform.position = new vec2(canvas.width / 2, canvas.height / 2);

   
    let holeHeight = 100;

    for(let i = 0; i < 2; i++){
        let p = new Pipe(50, canvas.height / 2.0 - holeHeight / 2 + (Math.random()-0.5) * 2 * holeHeight * 2, holeHeight);
        p.transform.position.x = canvas.width + canvas.width * i * 0.5;
    }
}

update = function update(){
    if(lost){
        timeScale = 0;
        if(Input.IsJustPressed(Input.KEY_SPACE) || Input.IsButtonJustPressed(0)){
            startNewGame();
        }
    }
    else{
        if(bird.transform.position.y + bird.radius >= canvas.height ||
            bird.transform.position.y - bird.radius < 0)
            lost = true;
    
        for(let i = 0; i < Pipe.pipes.length; i++){
            /**@type {Pipe} */ let p = Pipe.pipes[i];
            p.checkBirdInside(bird);
        }
    }
}

draw = function draw(){
    if(bird == null || !bird.started){
        drawText("Press 'Space' or left click to start!");
        drawText("Press 'Space' or left click to  jump!", 0, 60);
        drawText("Dodge walls!", 0, 90);

    }
    if(lost){
        drawText("You lost!");
        drawText("Press 'Space' or left click to restart!", 0, 60);
    }
    drawText(score, canvas.width - 50);
}