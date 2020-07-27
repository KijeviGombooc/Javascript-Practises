
class Tile extends Sprite{
    constructor(size){
        super();
        this.size = size;
        this.type = " ";
    }

    draw(){
        context.strokeStyle = this.color;
        context.lineWidth = canvas.width / 40;
        switch (this.type) {
            case "x":
            case "X":
                let left = this.transform.position.x - 0.5 * this.size;
                let right = this.transform.position.x + 0.5 * this.size;
                let top = this.transform.position.y - 0.5 * this.size;
                let bot = this.transform.position.y + 0.5 * this.size;
        
                context.beginPath();
                context.moveTo(left, top);
                context.lineTo(right, bot);
                context.moveTo(left, bot);
                context.lineTo(right, top);
                context.stroke();
                break;
            case "o":
            case "O":
                context.beginPath();
                context.arc(this.transform.position.x, this.transform.position.y,
                    this.size / 2, 0, 2 * Math.PI);
                context.stroke();
                break;
            default:
                break;
        }
    }
}

let tiles = [];
let p1 = "X";
let p2 = "O";
let currentPlayer;
let counter = 0;
let tileSize;
let won = false;
let endText = "";
let fontSize = 22;
let fontType = "Times New Roman";
let fontColor = "yellow";


init = function init(){
    currentPlayer = p1;
    tileSize = canvas.width / 3;
    
    for(let j = 0; j < 3; j++){
        tiles.push([]);
        for(let i = 0; i < 3; i++){
            let tile = new Tile(tileSize * 0.7);
            tile.transform.position = new vec2( i * tileSize + tileSize / 2, j * tileSize + tileSize / 2);
            tile.type = " ";
            tiles[j].push(tile);
        }
    }
}

update = function update(){
    if(!won && Input.IsButtonJustPressed(0)){
        let xy = Input.GetMousePosition();

        if(xy.x >= canvas.width || xy.x < 0 || xy.y >= canvas.height || xy.y < 0)
            return;
        
        let i = Math.floor(xy.x / tileSize);
        let j = Math.floor(xy.y / tileSize);

        if(tiles[j][i].type != " ")
            return;
        tiles[j][i].type = currentPlayer;

        checkEndGame(i, j);
        if(won)
            endText = `Player ${currentPlayer} won! Press space to play again.`;
        else if(++counter >= 9)
            endText = "It's a tie! Press space to play again.";
            

        currentPlayer = currentPlayer == p1 ? p2 : p1;
    }
    if(Input.IsJustPressed(Input.KEY_SPACE))
        restart();
}

function restart(){
    for(let j = 0; j < 3; j++){
        for(let i = 0; i < 3; i++){
            tiles[j][i].type = " ";
        }
    }
    won = false;
    counter = 0;
    endText = "";
}

function checkEndGame(columnIndex, rowIndex){

    //check row
    let score = 0;
    for(i = 0; i < 3; i++){
        let tile = tiles[rowIndex][i];
        if(tile.type == currentPlayer)
            score++;
    }
    if(score >= 3){
        won = true;
        return;
    }

    //check column
    score = 0;
    for(j = 0; j < 3; j++){
        let tile = tiles[j][columnIndex];
        if(tile.type == currentPlayer)
            score++;
    }
    if(score >= 3){
        won = true;
        return;
    }

    //if its a side-middle tile, we return cause then its not part of cross
    if(rowIndex == 1 || columnIndex == 1)
        return;
        
    //if the indexes are same, its one part of cross, if they are different its the other
    score = 0;
    if(rowIndex == columnIndex){
        for(let ij = 0; ij < 3; ij++){
            let tile = tiles[ij][ij];
            if(tile.type == currentPlayer)
                score++;
        }
    }
    else{
        for(let i = 0, j = 2; i < 3; i++, j--){
            let tile = tiles[j][i];
            if(tile.type == currentPlayer)
                score++;
        }
    }
    if(score >= 3){
        won = true;
        return;
    }
}

draw = function draw(){
    context.beginPath();
    context.moveTo(10, tileSize);
    context.lineTo(3 * tileSize - 10, tileSize);
    context.moveTo(10, 2 * tileSize);
    context.lineTo(3 * tileSize - 10, 2 *tileSize);

    context.moveTo(tileSize, 10);
    context.lineTo(tileSize, 3 * tileSize - 10);
    context.moveTo(2 * tileSize, 10);
    context.lineTo(2 * tileSize, 3 * tileSize - 10);
    context.stroke();

    context.font = `${fontSize}px ${fontType}`;
    context.fillStyle = fontColor;
    context.fillText(endText, 5, fontSize, 1000);
}