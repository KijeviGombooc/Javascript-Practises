

class Segment extends Sprite{
    constructor(start, length, target = null, angle = 0){
        super();
        this.transform.position = start;
        this.target = target;
        this.end = new vec2();
        this.length = length;
        this.angle = angle;
        this.width = 5;
    }

    getGlobalAngle(){
        if(this.transform.parent == null)
            return this.angle;
        else{
            return this.transform.parent.gameObject.getGlobalAngle() + this.angle;
        }
    }

    lookAt(target = null){
        if(target == null){
            if(this.target == null)
                console.error("lookAt() function must get a vec2 target or Segment must have a transform target!");
            target = this.target.position.clone();
            
        }
        var dir = target.minus(this.transform.position).normalized();
        this.angle = Math.acos(vec2.right.dot(dir));
        if(dir.y < 0)
            this.angle *= -1;
        
        this.transform.position = target.minus(dir.mult(this.length));
    }


    calculateEnd(){
        this.end.x = this.transform.globalPosition.x + this.length * Math.cos(this.getGlobalAngle());
        this.end.y = this.transform.globalPosition.y + this.length * Math.sin(this.getGlobalAngle());
        return this.end.clone();
    }

    draw(){
        this.calculateEnd();
        
        context.beginPath();

        context.lineWidth = this.width;
        context.moveTo(this.transform.globalPosition.x, this.transform.globalPosition.y);
        context.lineTo(this.end.x, this.end.y);

        context.stroke();
    }
}



let segments = [];
let segmentCount = 100;
let segmentLength = 10;


init = function init(){
    for(let i = 0; i < segmentCount; i++){
        if(i == 0)
            segments.push(new Segment(new vec2(), segmentLength));
        else
            segments.push(new Segment(new vec2(), segmentLength, segments[i - 1].transform));
        segments[i].width = ((segmentCount - i + 1) / segmentCount) * 3 + 1;
    }
}


update = function update(){
    let mousePos = new vec2(Input.GetMousePosition().x, Input.GetMousePosition().y);
    for(let i = 0; i < segmentCount; i++){
        if(i == 0)
            segments[i].lookAt(mousePos);
        else
            segments[i].lookAt();
    }
}


draw = function draw(){

}