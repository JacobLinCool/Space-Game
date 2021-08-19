import { Ship } from "./ship.js";
import { draw } from "./draw.js";
import { distance } from "./utils";

class Player {
    constructor({ name = "Player" }) {
        this.name = name;
        this.ships = [new Ship({ player: this })];
        this.token = 200;
        this.points = 0;
    }
}

const player = new Player({ name: "Player" });
const enemies = [];
const bullets = [];
const stones = [];

function game() {
    setInterval(() => {
        update();
        draw({
            player,
            enemies,
            bullets,
            stones,
        });
    }, 1000 / 30);
    keyboardListener();
    return { player, enemies, bullets, stones };
}

function update() {
    const removeShips = [];
    const mOffset = player.ships[0].offset();
    for (let i = 1; i < player.ships.length; i++) {
        if (distance(player.ships[0], player.ships[i]) > 1000) {
            removeShips.push(i);
            console.log(`Ship ${i} has disconnected.`);
            continue;
        }
        const offset = player.ships[i].offset();
        player.ships[i].x += offset.x - mOffset.x;
        player.ships[i].y += offset.y - mOffset.y;
    }
    for (let i = removeShips.length - 1; i >= 0; i--) player.ships.splice(removeShips[i], 1);
    const removeBullets = [];
    for (let i = 1; i < bullets.length; i++) {
        if (distance(bullets[i], player.ships[0]) > 1200) {
            removeBullets.push(i);
            continue;
        }
        const offset = bullets[i].offset();
        bullets[i].x += offset.x - mOffset.x;
        bullets[i].y += offset.y - mOffset.y;
    }
    for (let i = removeBullets.length - 1; i >= 0; i--) bullets.splice(removeBullets[i], 1);
}

function keyboardListener() {
    const keyPress = {};
    window.onkeydown = window.onkeyup = function (event) {
        if (event.type === "keydown") keyPress[event.key] = true;
        else delete keyPress[event.key];
        console.log(keyPress);
        if (keyPress["c"]) {
            saperate();
        }
        if (keyPress["w"] || keyPress["ArrowUp"]) {
            if (keyPress["0"]) {
                for (let i = 0; i < player.ships.length; i++) player.ships[i].speedUp();
            } else {
                let childControl = false;
                for (let i = 1; i < player.ships.length; i++) {
                    if (keyPress[i.toString()]) {
                        childControl = true;
                        player.ships[i].speedUp();
                    }
                }
                if (!childControl) player.ships[0].speedUp();
            }
        }
        if (keyPress["a"] || keyPress["ArrowLeft"]) {
            if (keyPress["0"]) {
                for (let i = 0; i < player.ships.length; i++) player.ships[i].turnLeft();
            } else {
                let childControl = false;
                for (let i = 1; i < player.ships.length; i++) {
                    if (keyPress[i.toString()]) {
                        childControl = true;
                        player.ships[i].turnLeft();
                    }
                }
                if (!childControl) player.ships[0].turnLeft();
            }
        }
        if (keyPress["s"] || keyPress["ArrowDown"]) {
            if (keyPress["0"]) {
                for (let i = 0; i < player.ships.length; i++) player.ships[i].speedDown();
            } else {
                let childControl = false;
                for (let i = 1; i < player.ships.length; i++) {
                    if (keyPress[i.toString()]) {
                        childControl = true;
                        player.ships[i].speedDown();
                    }
                }
                if (!childControl) player.ships[0].speedDown();
            }
        }
        if (keyPress["d"] || keyPress["ArrowRight"]) {
            if (keyPress["0"]) {
                for (let i = 0; i < player.ships.length; i++) player.ships[i].turnRight();
            } else {
                let childControl = false;
                for (let i = 1; i < player.ships.length; i++) {
                    if (keyPress[i.toString()]) {
                        childControl = true;
                        player.ships[i].turnRight();
                    }
                }
                if (!childControl) player.ships[0].turnRight();
            }
        }
        if (keyPress[" "]) {
            if (keyPress["0"]) {
                for (let i = 0; i < player.ships.length; i++) fire(player.ships[i]);
            } else {
                let childControl = false;
                for (let i = 1; i < player.ships.length; i++) {
                    if (keyPress[i.toString()]) {
                        childControl = true;
                        fire(player.ships[i]);
                    }
                }
                if (!childControl) fire(player.ships[0]);
            }
        }
    };
}

function saperate() {
    if (player.ships.length >= 10) return;
    if (player.token < 100) return;
    player.token -= 100;

    const ship = new Ship({ player: player });
    ship.speed = player.ships[0].speed * 0.8;
    ship.head = player.ships[0].head;
    player.ships.push(ship);
}

function fire(ship) {
    if (!ship.attackable) return;
    const bullet = ship.fire();
    bullets.push(bullet);
}

export default game;
