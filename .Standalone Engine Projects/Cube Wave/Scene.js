function map(value, origMin, origMax, newMin, newMax){
    return newMin + (newMax - newMin) * ((value - origMin) / (origMax - origMin));
}


let imgData
let updateTime = 5;
let timer = updateTime;

let points = [];

let depth = 16;
let seed = 5123;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

init = function init(){
    imgData = context.createImageData(canvas.width, canvas.height);

    for(let i = 0; i < 75; i++){
        points[i] = new vec2(random() * canvas.width, random() * canvas.height);
    }
    fillImageWithNoise(imgData, getPlainNoiseAt);
}

update = function update(){
}


draw = function draw(){
    context.putImageData(imgData, 0, 0);
    
    for(p of points){
        context.fillStyle = "red";
        //context.fillRect(p.x - 5, p.y - 5, 10, 10);
    }
}

let average = 0;
let min = Infinity;
let max = 0;

function fillImageWithNoise(img, noiseFunction){
    for(let x = 0; x < img.width; x++){
        for(let y = 0; y < img.height; y++){
            let i = x + y * img.width;
            let greyColor = getWorleyNoiseAt(x, y);
            if(greyColor > max) max = greyColor;
            if(greyColor < min) min = greyColor;
            average += greyColor;
            img.data[i * 4] = greyColor;
            img.data[i * 4 + 1] = greyColor;
            img.data[i * 4 + 2] = greyColor;
            img.data[i * 4 + 3] = 255;
        }
    }
    average /= img.width * img.height;
}


function getPlainNoiseAt(x, y){
    return Math.random() < 0.5 ? 0 : 255;
}

function getWorleyNoiseAt(x, y){
    let dists = new Array(points.length);
    for(let i = 0; i < dists.length; i++){
        dists[i] = Math.sqrt(Math.pow(points[i].x-x, 2) + Math.pow(points[i].y-y, 2));
    }
    
    for(let i = 0; i < dists.length; i++){
        for(let j = i + 1; j < dists.length; j++){
            if(dists[i] > dists[j]){
                let tmp = dists[i];
                dists[i] = dists[j];
                dists[j] = tmp;
            }
        }
    }
    
    let n = 0;
    let noise = 0;
    for(let i = 0; i < depth; i++){
        let strength = 1 - ( i / depth);

        noise += strength * dists[i] / canvas.width * 255;
    }

    return map(noise, 0, 100 * (depth + 2) / 2, 255, 0);
}