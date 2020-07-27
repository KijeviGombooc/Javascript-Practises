

class Segment extends Sprite{
    constructor(start, length, angle = 0){
        super();
        this.transform.position = start;
        this.end = new vec2();
        this.length = length;
        this.angle = angle;
    }

    getGlobalAngle(){
        if(this.transform.parent == null)
            return this.angle;
        else{
            return this.transform.parent.gameObject.getGlobalAngle() + this.angle;
        }
    }

    calculateEnd(){
        this.end.x = this.transform.globalPosition.x + this.length * Math.cos(this.getGlobalAngle());
        this.end.y = this.transform.globalPosition.y + this.length * Math.sin(this.getGlobalAngle());
        return this.end.clone();
    }

    draw(){
        this.calculateEnd();
        
        context.beginPath();

        context.lineWidth = 5;
        context.moveTo(this.transform.globalPosition.x, this.transform.globalPosition.y);
        context.lineTo(this.end.x, this.end.y);

        context.stroke();
    }
}



let segments = [];
let noise
let noiseOffset = 0;
let segmentLength = 10;
let segmentCount = 50;

init = function init(){
    noise = new PerlinNoise2D();
    segments.push(new Segment(new vec2(canvas.width / 10, canvas.height / 2), segmentLength));
    for(let i = 1; i < segmentCount; i++){
        segments[i] = new Segment(new vec2(), segmentLength);
        segments[i].transform.parent = segments[i - 1].transform;
    }
}


update = function update(){
    
    for(let i = 0; i < segmentCount; i ++){
        var d = Math.sin(timeSinceStart * 0.001 + i * 50) * delta * 0.1;
        segments[i].angle += d;
    }
    
    //set position to parent's endposition
    for(let i = 1; i < segments.length; i++){
        segments[i].transform.globalPosition = segments[i - 1].calculateEnd();
    }
}


draw = function draw(){

}