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