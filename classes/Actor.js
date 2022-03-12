import Entity from "./Entity.js";



export default class Actor extends Entity {
    constructor(id, x, y, spr_id) {
        super(id, x, y, spr_id);
        this.vel_x = 0;
        this.vel_y = 0;
        this.direction = "down";
        this.frame = 0;
        this.moving = false;
        this.speed = 4;
        this.directionSprites = {
            "down": 0,
            "up": 0,
            "left": 0,
            "right": 0
        };
        this.animCounter = 60;
    }


    move(direction) {
        if (this.moving == false) {
            this.moving = true;
            this.onStartMoving();
            console.log(direction);
            this.direction = direction;
            switch (direction) {
                case "up":
                    this.vel_y = -this.speed;
                    break;

                case "down":
                    this.vel_y = this.speed;
                    break;

                case "left":
                    this.vel_x = -this.speed;
                    break;

                case "right":
                    this.vel_x = this.speed;
                    break;
            }
        }
    }

    step() {

        if (this.counter == 0) {

            this.x += this.vel_x;
            this.y += this.vel_y;

            if (this.moving) {
                this.onMoving();
            }

            if (this.vel_x != 0) {
                if (this.x % 32 == 0) {
                    this.vel_x = 0;
                    this.onStopMoving();
                }
            } else if (this.vel_y != 0) {
                if (this.y % 32 == 0) {
                    this.vel_y = 0;
                    this.onStopMoving();
                }
            }




            this.tick();
            this.counter = this.counter_max;
        } else {
            this.counter--;
        }
    }

    tick() {

    }

    draw() {

    }

    onStartMoving() {

    }

    onStopMoving() {
        this.moving = false;
    }

    onMoving() {
        this.spr_id = this.directionSprites[this.direction] + this.frame;
        if (this.frame == 2) {
            this.frame = 0;
        } else {
            this.frame++;
        }
    }
}