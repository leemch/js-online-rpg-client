import Npc from "./Npc.js";

export default class OtherPlayer extends Npc {
    constructor(id, x, y) {
        super(id, x, y, 808);
    }


    move(direction) {
        super.move(direction);
    }


    draw() {

    }
}