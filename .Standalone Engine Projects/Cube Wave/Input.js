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

    /** Should call after main update loop */
    static updateInput(){
        this.justPressedBits.CopyFrom(this.justPressedBitsProcessing);
        this.justReleasedBits.CopyFrom(this.justReleasedBitsProcessing);
        this.pressedBits.CopyFrom(this.pressedBitsProcessing);
        this.justPressedBitsProcessing.Clear();
        this.justReleasedBitsProcessing.Clear();
    }
}