



class Bird extends Sprite{
    constructor(radius = 10){
        super();
        this.radius = radius;
        this.velocity = new vec2();
        this.gravity = 1000;
        this.jumpPower = 300;
    }

    update(){
        this.applyGravity();
        if(Input.IsJustPressed(Input.KEY_SPACE))
            this.jump();   
        this.move();
    }

    jump(){
        this.velocity.y = -this.jumpPower;
    }
    
    applyGravity(){
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
        Pipe.pipes.push(this);
        this.transform.position.x = canvas.width;
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

    draw(){
        let ur = this.getUpperRect;
        let lr = this.getLowerRect;

        context.fillStyle = this.color;
        context.fillRect(ur.x, ur.y, ur.w, ur.h);
        context.fillRect(lr.x, lr.y, lr.w, lr.h);
    }

    update(){
        this.transform.position.x -= Pipe.speed * delta;
        
        ((this.transform.position.x + this.width) < 0)
        {
            console.log(this.transform.position.x);
            this.destroy();
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


/**@type {Bird} */ let bird;
let lost = false;


init = function init(){
    bird = new Bird(16);
    bird.transform.position = new vec2(canvas.width / 2, canvas.height / 2);

    let p = new Pipe(50, 300, 100);
}

update = function update(){
    if(bird.transform.position.y + bird.radius >= canvas.height ||
        bird.transform.position.y - bird.radius < 0)
        lost = true;
}

draw = function draw(){
    if(lost){
        drawText("You lost!");
    }
}