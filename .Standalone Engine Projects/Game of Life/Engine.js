/** Assuming 32 bit numbers */
class BitArray{
    constructor(size){
        this.size = size;
        this.numCount = Math.ceil(size / 32);
        
        this.data = new Array(this.numCount);
        for(let i = 0; i < this.numCount; i++){
            this.data[i] = 0;
        }
    }

    Set(index, value){
        if(index >= this.size || index < 0){
            console.error("Index is out of bounds!");
            return;
        }

        let numIndex = Math.floor(index / 32);
        let bitIndexInNum = index % 32;
        
        if(value){  //should be a boolean
            this.data[numIndex] |= 1 << bitIndexInNum;
        }
        else{
            this.data[numIndex] &= ~(1 << bitIndexInNum);
        }

    }

    Get(index){
        if(index >= this.size || index < 0){
            console.error("Index is out of bounds!");
            return false;
        }
        
        let numIndex = Math.floor(index / 32);
        let bitIndexInNum = index % 32;

        return ((this.data[numIndex] >> bitIndexInNum) & 1) != 0;
    }


    CopyFrom(other){
        if(this.size != other.size){
            console.error("Can't copy from different sized BitArray!");
            return;
        }

        for(let i = 0; i < this.numCount; i++){
            this.data[i] = other.data[i];
        }
    }

    Clear(){
        for(let i = 0; i < this.numCount; i++){
            this.data[i] = 0;
        }
    }
}


class Input{
    
/*     0	That key has no keycode
3	break
8	backspace / delete
9	tab
12	clear
    13	enter
16	shift
17	ctrl
18	alt
19	pause/break
20	caps lock
21	hangul
25	hanja
27	escape
28	conversion
29	non-conversion
    32	spacebar
33	page up
34	page down
35	end
36	home
    37	left arrow
    38	up arrow
    39	right arrow
    40	down arrow
41	select
42	print
43	execute
44	Print Screen
45	insert
46	delete
47	help */

    static KEY_ENTER = 13;

    static KEY_SPACE = 32;

    static KEY_LEFT = 37;
    static KEY_UP = 38;
    static KEY_RIGHT = 39;
    static KEY_DOWN = 40;

    static KEY_0 = 48;
    static KEY_1 = 49;
    static KEY_2 = 50;
    static KEY_3 = 51;
    static KEY_4 = 52;
    static KEY_5 = 53;
    static KEY_6 = 54;
    static KEY_7 = 55;
    static KEY_8 = 56;
    static KEY_9 = 57;

    static KEY_A = 65;
    static KEY_B = 66;
    static KEY_C = 67;
    static KEY_D = 68;
    static KEY_E = 69;
    static KEY_F = 70;
    static KEY_G = 71;
    static KEY_H = 72;
    static KEY_I = 73;
    static KEY_J = 74;
    static KEY_K = 75;
    static KEY_L = 76;
    static KEY_M = 77;
    static KEY_N = 78;
    static KEY_O = 79;
    static KEY_P = 80;
    static KEY_Q = 81;
    static KEY_R = 82;
    static KEY_S = 83;
    static KEY_T = 84;
    static KEY_U = 85;
    static KEY_V = 86;
    static KEY_W = 87;
    static KEY_X = 88;
    static KEY_Y = 89;
    static KEY_Z = 90;

    static justPressedBits = new BitArray(256);
    static justReleasedBits = new BitArray(256);
    static pressedBits = new BitArray(256);
    
    static justPressedBitsProcessing = new BitArray(256);
    static justReleasedBitsProcessing = new BitArray(256);
    static pressedBitsProcessing = new BitArray(256);
    

    static justPressedButtonBits = new BitArray(16);
    static justReleasedButtonBits = new BitArray(16);
    static pressedButtonBits = new BitArray(16);
    
    static justPressedButtonBitsProcessing = new BitArray(16);
    static justReleasedButtonBitsProcessing = new BitArray(16);
    static pressedButtonBitsProcessing = new BitArray(16);

    static mouseX = 0;
    static mouseY = 0;

    static init(){
        document.addEventListener("keydown", event =>{
            if(!event.repeat)
                this.justPressedBitsProcessing.Set(event.keyCode, true);
                this.justPressedBits.Set(event.keyCode, true);
            this.pressedBitsProcessing.Set(event.keyCode, true);
        })
        document.addEventListener("keyup", event =>{
            this.pressedBitsProcessing.Set(event.keyCode, false);
            this.justReleasedBitsProcessing.Set(event.keyCode, true);
        })

        document.addEventListener("mousedown", event =>{
            this.justPressedButtonBitsProcessing.Set(event.button, true);
            this.justPressedButtonBits.Set(event.button, true);
            this.pressedButtonBitsProcessing.Set(event.button, true);
        })

        document.addEventListener("mouseup", event =>{
            this.pressedButtonBitsProcessing.Set(event.button, false);
            this.justReleasedButtonBitsProcessing.Set(event.button, true);
        })

        document.addEventListener("mousemove", event =>{
            let rect = canvas.getBoundingClientRect();
            
            this.mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
            this.mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        })
    }

    static IsPressed(key){
        return this.pressedBits.Get(key);
    }

    static IsJustReleased(key){
        return this.justReleasedBits.Get(key);
    }

    static IsJustPressed(key){
        return this.justPressedBits.Get(key);
    }

    static IsButtonPressed(key){
        return this.pressedButtonBits.Get(key);
    }

    static IsButtonJustReleased(key){
        return this.justReleasedButtonBits.Get(key);
    }

    static IsButtonJustPressed(key){
        return this.justPressedButtonBits.Get(key);
    }

    static GetMousePosition(){
        return {"x" : this.mouseX, "y" : this.mouseY};
    }

    /** Should call after main update loop */
    static updateInput(){
        this.justPressedBits.CopyFrom(this.justPressedBitsProcessing);
        this.justReleasedBits.CopyFrom(this.justReleasedBitsProcessing);
        this.pressedBits.CopyFrom(this.pressedBitsProcessing);
        this.justPressedBitsProcessing.Clear();
        this.justReleasedBitsProcessing.Clear();

        this.justPressedButtonBits.CopyFrom(this.justPressedButtonBitsProcessing);
        this.justReleasedButtonBits.CopyFrom(this.justReleasedButtonBitsProcessing);
        this.pressedButtonBits.CopyFrom(this.pressedButtonBitsProcessing);
        this.justPressedButtonBitsProcessing.Clear();
        this.justReleasedButtonBitsProcessing.Clear();
    }
}

class vec2{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    plus(other){
        return new vec2(this.x + other.x, this.y + other.y);
    }

    minus(other){
        return new vec2(this.x - other.x, this.y - other.y);
    }

    mult(num){
        return new vec2(this.x * num, this.y * num);
    }

    per(num){
        return new vec2(this.x / num, this.y / num);
    }

    dot(other){
        return this.x * other.x + this.y * other.y;
    }

    cross(other){
        return this.x * other.y - this.y * other.x;
    }

    length(){
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared(){
        return this.dot(this);
    }

    normalized(){
        let l = this.length();
        if(l == 0)
            return vec2.zero;
        else
            return this.per(this.length());
    }

    clone(){
        return new vec2(this.x, this.y);
    }

    static get left(){
        return new vec2(-1, 0);
    }

    static get right(){
        return new vec2(1, 0);
    }

    static get up(){
        return new vec2(0, -1);
    }

    static get down(){
        return new vec2(0, 1);
    }

    static get one(){
        return new vec2(1, 1);
    }

    static get zero(){
        return new vec2(0, 0);
    }
}

class Transform{
    constructor(){
        this.position = new vec2();
        /** @type {Transform} */ this.dontUseParentTransform = null;
        this.children = [];
    }

    /**@param {Transform} parentTransform */
    set parent(parentTransform){
        if(this.parent != null){
            this.position = this.position.plus(this.dontUseParentTransform.globalPosition);
            
            let index = this.parent.children.indexOf(this);
            if(index > -1)
                this.parent.children.splice(index, 1);
            else
                console.error("Something went very wrong");
        }
        if(parentTransform != null)
            parentTransform.children.push(this);
        this.dontUseParentTransform = parentTransform;
    }

    get parent(){
        return this.dontUseParentTransform;
    }

    get globalPosition(){
        if(this.dontUseParentTransform == null)
            return this.position;
        else
            return this.position.plus(this.dontUseParentTransform.globalPosition);
    }
}

class GameObject{
    constructor(x = 0, y = 0){
        this.transform = new Transform();
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.index = GameObject.nextIndex++;
        this.destroyed = false;
        GameObject.gameObjects.push(this);
    }

    static init(){
        GameObject.gameObjects = [];
        GameObject.toBeDestroyed = [];
        GameObject.nextIndex = 0;
    }

    update(){}
    draw(){}

    destroy(){
        if(this.destroyed)
            return;
        for (const child of this.transform.children) {
            child.parent = null;
        }
        this.destroyed = true;
        
        GameObject.toBeDestroyed.push(this);
    }
    
    /** Can cause unexpected behaviour and errors, use destroy() instead! */
    destroyImmediate(){
        GameObject.nextIndex--;
        let last = GameObject.gameObjects[GameObject.gameObjects.length - 1];
        last.index = this.index;
        GameObject.gameObjects[this.index] = last;
        GameObject.gameObjects.pop();
    }

    static updateAll(){
        for(let i = GameObject.gameObjects.length - 1; i >= 0; i--){
            GameObject.gameObjects[i].update();
        }
        
        for(let i = timedFunctions.length - 1; i >= 0; i--){
            timedFunctions[i].time -= delta;
            if(timedFunctions[i].time <= 0){
                timedFunctions[i].func();
                timedFunctions.splice(i, 1);
            }
        }
        
        for(let i = 0; i < GameObject.toBeDestroyed.length; i++){
            GameObject.toBeDestroyed[i].destroyImmediate();
        }
        GameObject.toBeDestroyed.length = 0;
    }
}


class Sprite extends GameObject{
    constructor(){
        super();
        this.spriteIndex = Sprite.nextIndex++;
        this.color = "white";
        Sprite.sprites.push(this);
    }

    draw(){
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

class CircleSprite extends Sprite{
    constructor(radius){
        super();
        this.radius = radius;
    }

    draw(position){
        context.beginPath();
        context.arc(this.transform.position.x, this.transform.position.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}

class RectangleSprite extends Sprite{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }

    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.transform.position.x - this.width / 2, this.transform.position.y - this.height / 2, this.width, this.height);
    }
}

/** @type {HTMLCanvasElement} */ let canvas;
/** @type {CanvasRenderingContext2D} */ let context;


/** Is called at the start of window, only once */ let init;
/** Is always called before GameObject updates */ let update;
/** Is always called after GameObject draws */ let draw;

let timeScale = 1;
let timeAtStart;
let timeSinceStart;
let delta = 0.001;
let unscaledDelta = 0;


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


let timedFunctions = [];

function timedFunction(func, time){
    timedFunctions.push(
        {
            "func" : func,
            "time" : time
        }
    );
}

window.onload = function start(){
    
    //#region Canvas init
    let body = this.document.getElementsByTagName("body")[0];
    
    canvas = this.document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 600;
    canvas.style.backgroundColor = "#505050";
    context = canvas.getContext("2d");
    
    body.appendChild(canvas);
    //#endregion
    
    if(init == undefined || update == undefined || draw == undefined){
        this.console.error("Init, Update or Draw is undefined!");
        return;
    }
    
    GameObject.init();
    Sprite.init();
    Input.init();
    init();

    timeAtStart = (new Date()).getTime();
    timeSinceStart = 0;
    unscaledDelta = 0;
    delta = 0.001;

    requestAnimationFrame(
        
        function loop(){
            requestAnimationFrame(loop);

            context.clearRect(0, 0, canvas.width, canvas.height);
            
            Input.updateInput();
            update();
            GameObject.updateAll();
            Sprite.drawAll();
            draw();

            unscaledDelta = (new Date() - (timeAtStart + timeSinceStart)) / 1000;
            delta = timeScale * unscaledDelta;
            timeSinceStart = new Date() - timeAtStart;
        }
    );
}