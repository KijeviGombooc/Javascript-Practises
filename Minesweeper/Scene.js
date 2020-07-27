



class Tile extends Sprite {
    constructor(size) {
        super();
        this.value = 0;
        this.showType = "hidden"
        this.size = size;
    }

    draw() {
        if (this.showType == "hidden" || this.showType == "unknown" || this.showType == "flag") {
            context.fillStyle = "#808080";
            context.fillRect(this.transform.position.x - this.size / 2, this.transform.position.y - this.size / 2, this.size, this.size);
        }
        else if (this.showType == "value") {
            context.fillStyle = "#AAAAAA";
            context.fillRect(this.transform.position.x - this.size / 2, this.transform.position.y - this.size / 2, this.size, this.size);

            context.fillStyle = this.getValueColor();
            let fontSize = this.size * 0.6;
            context.font = `${fontSize}px Arial Black`;
            context.textAlign = "center";
            context.textBaseline = "middle";
            if(this.value == -1)
                context.fillText("#", this.transform.position.x, this.transform.position.y + fontSize * 0.1);
            else
                context.fillText(this.value, this.transform.position.x, this.transform.position.y + fontSize * 0.1);
        }

        if(this.showType == "flag"){
            context.fillStyle = "yellow";
            let fontSize = this.size * 0.6;
            context.font = `${fontSize}px Arial Black`;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("F", this.transform.position.x, this.transform.position.y + fontSize * 0.1);
        }
        else if(this.showType == "unknown"){
            context.fillStyle = "black";
            let fontSize = this.size * 0.6;
            context.font = `${fontSize}px Arial Black`;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("?", this.transform.position.x, this.transform.position.y + fontSize * 0.1);
        }
    }

    getValueColor() {
        switch (this.value) {
            case -1:
                return "black";
            case 0:
                return "#00000000";
            case 1:
                return "blue";
            case 2:
                return "green";
            case 3:
                return "red";
            case 4:
                return "darkblue";
            case 5:
                return "darkred";
            case 6:
                return "darkcyan";
            case 7:
                return "black";
            case 8:
                return "grey";
            default:
                break;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let grid = [];
let randomLocations = [];
let started = false;
let running = true;
let lost  = false;
let revealedCounter = 0;

let gridWidth = 10;
let gridHeight = 10;
let tileSize
let bombCount = 10;


init = function init() {
    for(let i = 0; i < GameObject.gameObjects.length; i++){
        GameObject.gameObjects[i].destroy();
    }
    grid = [];
    randomLocations = [];
    started = false;
    running = true;
    lost = false;
    revealedCounter = 0;

    tileSize = canvas.height / gridHeight;;

    for (let y = 0; y < gridHeight; y++) {
        grid.push([]);
        for (let x = 0; x < gridWidth; x++) {
            randomLocations.push(new vec2(x, y));
            let tile = new Tile(tileSize * 0.9);
            tile.transform.position = new vec2(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            grid[y].push(tile);
        }
    }
}


function initGridValues(bombCount, startPos){
    if(bombCount >= gridWidth * gridHeight)
    {
        console.error("Too many bombs for this place dude");
        return;
    }

    shuffleArray(randomLocations);

    for(let i = 0; i < bombCount; i++){
        let randomCoord = randomLocations[i];
        if(randomCoord.x == startPos.x && randomCoord.y == startPos.y)
            continue;
        updateNeighbours(randomCoord.x, randomCoord.y);
        grid[randomCoord.y][randomCoord.x].value = -1;
    }
}

function updateNeighbours(xPos, yPos){
    if(this.value >= 0)
        return;
    foreachNeighbour(xPos, yPos, (x, y)=>{
        let tile = grid[y][x];
        if(tile.value >= 0){
            tile.value++;
        }
    });
}


function getGridCoord(mouseCoord){
    if(mouseCoord.x < 0 || mouseCoord.x >= canvas.width 
        || mouseCoord.y < 0 || mouseCoord.y >= canvas.height)
        return null;
    
    return new vec2(Math.floor(mouseCoord.x / tileSize), Math.floor(mouseCoord.y / tileSize));
}


update = function update() {
    if(Input.IsJustPressed(Input.KEY_ESCAPE)){
        init();
    }

    if(!running)
        return;
    
    if(Input.IsButtonJustPressed(0)){


        let mousePos = Input.GetMousePosition();
        let coord = getGridCoord(mousePos);
        
        if(coord != null){

            if(!started){
                initGridValues(bombCount, coord);
                started = true;
            }


            if(grid[coord.y][coord.x].value == -1){
                revealAll();
                lost = true;
                running = false;
                return;
            }

            revealAt(coord.x, coord.y);
        }
    }
    else if(Input.IsButtonJustPressed(1)){
        let mousePos = Input.GetMousePosition();
        let coord = getGridCoord(mousePos);

        if(coord != null){
            let tile = grid[coord.y][coord.x];

            switch (tile.showType) {
                case "hidden":
                    tile.showType = "flag";
                    break;
                case "flag":
                    tile.showType = "unknown";
                    break;
                case "unknown":
                    tile.showType = "hidden";
                    break;
                default:
                    break;
            }

        }
            
    }
}

function revealAll(){
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            grid[y][x].showType = "value";
        }
    }
}


function foreachNeighbour(xPos, yPos, func){
    for(let y = yPos - 1; y <= yPos + 1; y++){
        for(let x = xPos - 1; x <= xPos + 1; x++){
            let isCenter = (x == xPos && y == yPos);
            let notPartOfGrid = x < 0 || y < 0 || x >= gridWidth || y >= gridHeight;

            if(!isCenter && !notPartOfGrid){
                func(x, y);
            }
        }
    }
}

function revealAt(xPos, yPos){
    
    if(grid[yPos][xPos].showType != "hidden")
    return;
    
    grid[yPos][xPos].showType = "value";
    if(++revealedCounter >= gridWidth * gridHeight - bombCount){
        running = false;
    }

    if(grid[yPos][xPos].value == 0){
        foreachNeighbour(xPos, yPos, (x, y)=>{
            revealAt(x, y);
        })
    }
}





draw = function draw() {
    if(!running){
        context.fillStyle = "#FFFF0088";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "120px Arial Black";
        if(lost)
            context.fillText("You lost!", canvas.width / 2, canvas.height / 2);
        else
           context.fillText("You Won!", canvas.width / 2, canvas.height / 2);
    }
}