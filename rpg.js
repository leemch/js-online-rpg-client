import TileMap from "./classes/TileMap.js";
import Player from "./classes/Player.js";
import Actor from "./classes/Actor.js";
import Npc from "./classes/Npc.js";



var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 32;

const tileMap = new TileMap(tileSize);

let player = null;
   


function gameLoop() {
	
	tileMap.draw(canvas, ctx);
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
//gameLoop();
//setInterval(gameLoop, 1000 / 60);

var leftButton = document.getElementById("left");
leftButton.onclick = () => socket.emit('move', "left");

var rightButton = document.getElementById("right");
rightButton.onclick = () => socket.emit('move', "right");

var downButton = document.getElementById("down");
downButton.onclick = () => socket.emit('move', "down");

var upButton = document.getElementById("up");
upButton.onclick = () => socket.emit('move', "up");

form.addEventListener('submit', function (e) {
	e.preventDefault();
	if (input.value) {
		socket.emit('chat message', input.value);
		input.value = '';
	}
});

socket.on("chat message", function (msg) {
	var item = document.createElement('li');
	item.textContent = msg;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});

socket.on("send characters", function (characters) {
	
	player = new Player(-1, 0, 0, 1507);
	tileMap.players.push(player);
	for(let id in characters) {
		tileMap.players.push(new Npc(id, characters[id].x * 32, characters[id].y * 32, 2277));
	}
	console.log(tileMap.players);
	//for(const key in characters) {
	//	tileMap.players.push(new Player(key, characters[key].x, characters[key].y, 3971));
	//}
});

socket.on("user joined", function({id, userData}) {
	tileMap.players.push(new Npc(id, userData.x * 32, userData.y * 32, 2277));
});

socket.on("user disconnected", function(id) {
	console.log(id);
	let indexToRemove = tileMap.players.findIndex(player => id == player.id);
	console.log(tileMap.players);
	if(indexToRemove != -1) {
		tileMap.players.splice(indexToRemove, 1);
		console.log("removed player id: " + id)
	}
});

socket.on("move player", function (direction) {
	//let playerToMove = tileMap.players.find(player => data.id == player.id);
	//if(playerToMove) {
	//	playerToMove.x = data.x;
	//	playerToMove.y = data.y;
	//}
	player.move(direction);

	//console.log(data.x, data.y)
});

socket.on("move player done", function ({x, y}) {
	player.moving = false;
	
	//console.log(data.x, data.y)
});

socket.on("move other player", function ({id, direction}) {
	console.log(id, direction);
	tileMap.players.find(player => id == player.id).moveQueue.push(direction);
});

socket.on("send map", function (map) {
	//messages.innerHTML = '';
	//map.forEach(row => {
	//	var item = document.createElement('li');
	//	item.textContent = row;
	//	messages.appendChild(item);
	//});

	//window.scrollTo(0, document.body.scrollHeight);
});





