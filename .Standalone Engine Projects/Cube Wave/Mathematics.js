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