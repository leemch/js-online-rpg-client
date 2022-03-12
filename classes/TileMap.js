import { getMapData } from "../maps/mapLoader.js";


export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.tileMap1 = this.#image("tibiatiles.png");
        this.players = [];
        this.wall = this.#image("wall.png");
        this.player = this.#image("player.png");
        this.other = this.#image("other.png");
        this.monster = this.#image("vampire.png");
        this.ring = this.#image("ring.png");
        this.mapData = null;
        this.objectData = [];

        this.loadMap(0);
    }


    #image(fileName) {
        const img = new Image();
        img.src = `../sprites/${fileName}`;
        return img;
    }

    //1wall
    //0dots
    //2player
    //3enemy


    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx);
        this.players.forEach(player => {
            player.step();
            //player.draw(ctx);
            ctx.drawImage(this.tileMap1, (player.spr_id * this.tileSize) % (this.tileSize * 5), Math.floor((player.spr_id / 5)) * this.tileSize, this.tileSize, this.tileSize, player.x, player.y, this.tileSize, this.tileSize)
        });
    }

    #setCanvasSize(canvas) {
        if (this.mapData) {
            canvas.height = this.mapData.height * this.tileSize;
            canvas.width = this.mapData.width * this.tileSize;
        }

    }

    #clearCanvas(canvas, ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    #drawMap(ctx) {
        if (this.mapData) {
            for (let j = 0; j < this.mapData.layers.length; j++) {
                const layerData = this.mapData.layers[j];

                if (layerData.type == "tilelayer") {
                    const tileSprites = layerData.data;

                    for (let i = 0; i < tileSprites.length; i++) {
                        const sprite_id = tileSprites[i] - 1;
                        if (sprite_id != -1) {
                            ctx.drawImage(this.tileMap1, (sprite_id * this.tileSize) % (this.tileSize * 5), Math.floor((sprite_id / 5)) * this.tileSize, this.tileSize, this.tileSize, i % 10 * this.tileSize, Math.floor(i / 10) * this.tileSize, this.tileSize, this.tileSize)
                        }
                    }
                }
            }
        }
    }

    loadMap(map_id) {

        getMapData(map_id).then(mapData => {
            this.mapData = mapData;
            console.log(mapData);
        })
    }

    addObject(object) {
        this.objectData.push(object);
    }
}