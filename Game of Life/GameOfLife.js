

class Grid{
    constructor(width, height){
        this.width = width
        this.height = height

        this.data = new Array(width * height);

        for(let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                this.data[y * width + x] = Math.random() < 0.5 ? 1 : 0;
            }
        }
    }

    getValueAt(x, y){
        return this.data[y * this.width + x];
    }

    setValueAt(x, y, value){
        this.data[y * this.width + x] = value;
    }
}



class Tile extends Sprite{
    constructor(size){
        super();
        this.value = 0;
        this.size = size;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillStyle = this.color;
        context.arc(this.transform.position.x, this.transform.position.y, this.size / 2, 0, 2 * Math.PI);
        if(this.value == 0)
            context.stroke();
        else
            context.fill();
    }
}





/** @type {Grid} */ var grid;
/** @type {Grid} */ var gridProcessed;
let gridWidth = 20;
let gridHeight = 20;
var tiles = [];


init = function init(){
    grid = new Grid(gridWidth, gridHeight);
    gridProcessed = new Grid(gridWidth, gridHeight);
    var canvasSize = canvas.width < canvas.height ? canvas.width : canvas.height;
    var gridSize = grid.width < grid.height ? grid.width : grid.height;

    var tileSize = canvasSize / gridSize;

    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            let tile = new Tile(tileSize * 0.7);
            tile.transform.position = new vec2(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
            tiles.push(tile);
        }
    }
}

function checkTiles(){

    //set value of each tile into processing grid based on actual grid
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            let aliveNeighbours = getNeighbourAliveCount(x, y);
            let gridVal = grid.getValueAt(x, y);

            if((aliveNeighbours < 2 || aliveNeighbours > 3) && gridVal == 1)
                gridVal = 0;
            else if(aliveNeighbours == 3 && gridVal == 0)
                gridVal = 1;
            
            gridProcessed.setValueAt(x, y, gridVal);
        }
    }

    //set grid data to the processed grid data
    for(let i = 0; i < gridProcessed.data.length; i++){
        grid.data[i] = gridProcessed.data[i];
    }


    //set tile values to grid values
    for(let y = 0; y < grid.height; y++){
        for(let x = 0; x < grid.width; x++){
            tiles[y * grid.width + x].value = grid.getValueAt(x, y);
        }
    }    
}

function showValues(){
    
}

function getNeighbourAliveCount(xPos, yPos){
    let aliveCount = 0;
    for(let y = yPos - 1; y <= yPos + 1; y++){
        for(let x = xPos - 1; x <= xPos + 1; x++){
            if(x == xPos && y == yPos)
                continue;
            
            if(y < 0 || y >=  grid.height || x < 0 || x >= grid.width)
                continue;       
            aliveCount += grid.getValueAt(x, y);
            }
        }
    return aliveCount;
}

let paused = true;
let timePassed = 0;
let limit = 0.1;
update = function update(){
    if(timePassed >= limit){
        timePassed = 0,
        checkTiles();
    }
    timePassed += delta;
}

draw = function draw(){
}