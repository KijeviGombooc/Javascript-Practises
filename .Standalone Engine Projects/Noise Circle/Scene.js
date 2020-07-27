let twoPi = Math.PI * 2;
let segmentCount = 100;
let step = twoPi / segmentCount;
let minRadius = 180;
let maxRadius = 220;

let vertices = [];
let radiuses = [];
let coords = [];

init = function init(){
    generateNewShape();
}

update = function update(){
    updateShape();
}

function generateNewShape(){
    vertices.length = 0;
    radiuses.length = 0;
    coords.length = 0;

    for(let i = 0; i < twoPi; i += step){
        
        let r = minRadius + Math.random() * (maxRadius - minRadius);
        radiuses.push(r);
        let coord = new vec2(Math.cos(i), Math.sin(i));
        coords.push(coord);
        vertices.push(new vec2(
            r * coord.x + canvas.width / 2,
            r * coord.y + canvas.height / 2
        ));
    }
}

function updateShape(){
    for(let i = 0; i < vertices.length; i++){


        let plusChance = Math.random() < (radiuses[i] - minRadius) / (maxRadius - minRadius);

        plusChance = Math.random() < 0.48 ? Math.random < 0.7 : plusChance;

        radiuses[i] += plusChance ? -2 : 2;
        vertices[i].x = radiuses[i] * coords[i].x + canvas.width / 2;
        vertices[i].y = radiuses[i] * coords[i].y + canvas.height / 2;
    }
}


draw = function draw(){
    context.beginPath();

    let lastIndex = vertices.length - 1;
    if(vertices.length > 1){
        context.moveTo(vertices[lastIndex].x, vertices[lastIndex].y);
        context.lineTo(vertices[0].x, vertices[0].y);
    }
    for(let i = 0; i < lastIndex; i++){
        context.moveTo(vertices[i].x, vertices[i].y);
        context.lineTo(vertices[i+1].x, vertices[i+1].y);
    }
    
    context.stroke();
}