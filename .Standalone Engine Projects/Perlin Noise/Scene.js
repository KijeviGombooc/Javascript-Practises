/** @type {ImageData} */ let img;
/** @type {noise} */ let noise;
let scale = 1;
let offset = new vec2();
let speed = 10;
let sprintMult = 5;
let actualSpeed = speed;
let zoomSpeed = 0.001;
let actualZoomSpeed = zoomSpeed;
let drawHints = true;


init = function init(){
    
    
    noise = new PerlinNoise2D();
    img = context.createImageData(canvas.width, canvas.height);

    setImgData(offset.x, offset.y, scale);
}

function setImgData(){
    for(let y = 0; y < img.height; y++)
        for(let x = 0; x < img.width; x++){
    
            let n = noise.getNoise(x - img.width / 2, y - img.height / 2);
            let val = 255 * (n + 1) / 2;
    
            img.data[y * (img.width * 4) + x * 4 + 0] = val;
            img.data[y * (img.width * 4) + x * 4 + 1] = val;
            img.data[y * (img.width * 4) + x * 4 + 2] = val;
            img.data[y * (img.width * 4) + x * 4 + 3] = 255;
        }
}

update = function update(){
    if(Input.IsPressed(Input.KEY_SHIFT)){
        actualSpeed = speed * sprintMult;
        actualZoomSpeed = zoomSpeed * sprintMult;
    }
    else{
        actualSpeed = speed;
        actualZoomSpeed = zoomSpeed;
    }

    noise.scale.x += Input.GetMouseWheelValue() * actualZoomSpeed;
    noise.scale.y += Input.GetMouseWheelValue() * actualZoomSpeed;

    if(Input.IsPressed(Input.KEY_A))
        noise.offset.x -= actualSpeed;
    if(Input.IsPressed(Input.KEY_D))
        noise.offset.x += actualSpeed;
    if(Input.IsPressed(Input.KEY_W))
        noise.offset.y -= actualSpeed;
    if(Input.IsPressed(Input.KEY_S))
        noise.offset.y += actualSpeed;

    if(Input.IsJustPressed(Input.KEY_H)){
        drawHints = !drawHints;
    }

    setImgData();

    console.log(1 / delta);
    
}

draw = function draw(){
    context.putImageData(img, 0, 0);


    if(drawHints){
        let textSize = 40;
        context.fillStyle = "#00FF00";
        context.font = `${textSize}px Times New Roman`;
        context.fillText("Use AWSD to move.", 0, textSize, 1000);
        context.fillText("Use mouse scroll to zoom.", 0, 2 * textSize, 1000);
        context.fillText("Use SHIFT to speed those up.", 0, 3 * textSize, 1000);
        context.fillText("Use SHIFT to speed those up.", 0, 3 * textSize, 1000);
        context.fillText("Press H to toggle these hints.", 0, 4 * textSize, 1000);
    }
}