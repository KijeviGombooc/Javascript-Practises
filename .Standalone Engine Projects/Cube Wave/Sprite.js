
class Sprite extends GameObject{
    constructor(drawShape = null){
        super();
        /** @type {DrawShape} */ this.drawShape = drawShape;
        this.spriteIndex = Sprite.nextIndex++;
        Sprite.sprites.push(this);
    }

    draw(){
        if(this.drawShape != null)
            this.drawShape.draw(this.transform.globalPosition);
    }  

    static init(){
        Sprite.sprites = [];
        Sprite.nextIndex = 0;
    }

    static drawAll(){
        for(let i = 0; i < Sprite.sprites.length; i++){
            Sprite.sprites[i].draw();
            
        }
    }

    destroy(){
        super.destroy();
        Sprite.nextIndex--;
        let last = Sprite.sprites[Sprite.sprites.length - 1];
        last.spriteIndex = this.spriteIndex;
        Sprite.sprites[this.spriteIndex] = last;
        Sprite.sprites.pop();
    }
    
}


class DrawShape{
    constructor(){
        this.color = "white";
    }
    draw(position){}
}

class Circle extends DrawShape{
    constructor(radius){
        super();
        this.radius = radius;
    }

    draw(position){
        context.beginPath();
        context.arc(position.x, position.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Rectangle extends DrawShape{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }

    draw(position){
        context.fillStyle = this.color;
        context.fillRect(position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);
    }
}