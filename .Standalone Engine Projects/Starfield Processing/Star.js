import { canvas, context } from "./Core.js";

export class Star{
    constructor(){
        this.init();        
    }
    
    init(){
        this.x = (Math.random() - 0.5) * canvas.width;
        this.y = (Math.random() - 0.5) * canvas.height;
        this.z = Math.random() * canvas.width;

        this.px = this.x;
        this.py = this.y;
        this.pz = this.z;
    }

    map(val, origMin, origMax, newMin, newMax){
        let normalizedVal = (val - origMin) / (origMax - origMin);
        
        let mappedVal = newMin + (newMax - newMin) * normalizedVal;
        
        return mappedVal;
    }

    update(){
        this.z -= 3;

        if(this.z < 0){
            this.init();
        }

        this.sx = this.map(this.x / this.z, 0, 1, 0, canvas.width);
        this.sy = this.map(this.y / this.z, 0, 1, 0, canvas.height);
        
        this.px = this.map(this.x / this.pz, 0, 1, 0, canvas.width);
        this.py = this.map(this.y / this.pz, 0, 1, 0, canvas.height);

        this.pz = this.z;
    }

    draw(){
        context.beginPath();
        context.arc(this.sx + canvas.width / 2, this.sy + canvas.height / 2, this.map(this.z, 0, canvas.width, 4, 0), 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();

        context.beginPath();
        context.moveTo(this.px + canvas.width / 2, this.px + canvas.height / 2);
        context.lineTo(this.sx + canvas.width / 2, this.sy + canvas.height / 2);
        context.strokeStyle = "white";
        context.stroke();
    }
}