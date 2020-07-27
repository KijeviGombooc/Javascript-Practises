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
        //#region Update loop
        for(let i = GameObject.gameObjects.length - 1; i >= 0; i--){
            //TODO: implement collision checking
            GameObject.gameObjects[i].update();
        }
        //#endregion
        
        //#region Timed functions
        for(let i = timedFunctions.length - 1; i >= 0; i--){
            timedFunctions[i].time -= delta;
            if(timedFunctions[i].time <= 0){
                timedFunctions[i].func();
                timedFunctions.splice(i, 1);
            }
        }
        //#endregion
        
        //#region Destroy loop
        for(let i = 0; i < GameObject.toBeDestroyed.length; i++){
            GameObject.toBeDestroyed[i].destroyImmediate();
        }
        GameObject.toBeDestroyed.length = 0;
        //#endregion
    }
}