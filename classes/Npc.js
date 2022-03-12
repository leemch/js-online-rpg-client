import Actor from "./Actor.js";


export default class Npc extends Actor {
    constructor(id, x, y, spr_id) {
        super(id, x, y, spr_id);
        this.moveQueue = [];
        this.directionSprites = {
            "down": 2277,
            "up": 2280,
            "left": 2286,
            "right": 2283
        }
    }


    move(direction) {
        super.move(direction);
    }

    tick() {
        if (!this.moving) {
            if (this.moveQueue.length > 0) {
                this.move(this.moveQueue.shift());
            }
        }
    }

    draw() {

    }
}