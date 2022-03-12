export default class Entity {
    constructor(id, x, y, spr_id = 0) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.spr_id = spr_id;
        this.counter_max = 15;
        this.counter = this.counter_max;
    }

    step() {
        
    }

    draw(ctx) {
        
    }
}