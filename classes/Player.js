import Actor from "./Actor.js";

export default class Player extends Actor {
    constructor(id, x, y, spr_id) {
        super(id, x, y, spr_id);
        this.directionSprites = {
            "down": 1507,
            "up": 1510,
            "left": 1516,
            "right": 1513
        }

        document.addEventListener("keypress", this.#keydown)
    }


    move(direction) {
        super.move(direction);
    }

    tick() {

    }

    draw(ctx) {

    }

    onStopMoving() {

    }

    onStartMoving() {
        super.onStartMoving();
    }

    #keydown = (event) => {
        // up
        if (event.keyCode == 38) { this.move("up") }
        //left
        if (event.keyCode == 37) { this.move("left") }
        //down
        if (event.keyCode == 40) { this.move("down") }
        //right
        if (event.keyCode == 39) { this.move("right") }
    }
}