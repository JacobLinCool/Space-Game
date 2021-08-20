import { Ship } from "./ship.js";
import { Drone } from "./drone.js";
import { draw } from "./draw.js";
import { distance } from "./utils";
import sound from "./sound.js";
import background from "./background.js";

class Player {
    constructor({ name = "Player" }) {
        this.name = name;
        this.ships = [new Ship({ player: this })];
        this.token = 200;
        this.point = 0;
    }
}

const player = new Player({ name: "Player" });
const enemies = [];
const bullets = [];
const drones = [];
const stones = [];
let gameInterval = null;

function game() {
    gameInterval = setInterval(() => {
        update();
        draw({
            player,
            enemies,
            bullets,
            stones,
            drones,
            background,
        });
    }, 1000 / 30);
    keyboardListener();
    return { player, enemies, bullets, stones, drones, background, spawn };
}

function update() {
    const removeShips = [];
    const mOffset = player.ships[0].offset();
    sound.speed(player.ships[0].speed * 400, 0.08);
    for (let i = 1; i < player.ships.length; i++) {
        const d = distance(player.ships[0], player.ships[i]);
        if (d > 1000) {
            removeShips.push(i);
            console.log(`Ship ${i} has disconnected.`);
            sound.disconnected();
            continue;
        }
        if (d > 400 && Math.random() > 0.5) sound.noise(0.4 * ((1200 - d) / 800));
        sound.speed(player.ships[i].speed * 400);
        const offset = player.ships[i].offset();
        player.ships[i].x += offset.x - mOffset.x;
        player.ships[i].y += offset.y - mOffset.y;
    }
    for (let i = removeShips.length - 1; i >= 0; i--) player.ships.splice(removeShips[i], 1);
    const removeBullets = [];
    for (let i = 0; i < bullets.length; i++) {
        if (distance(bullets[i], player.ships[0]) > 1200) {
            removeBullets.push(i);
            continue;
        }
        const offset = bullets[i].offset();
        bullets[i].x += offset.x - mOffset.x;
        bullets[i].y += offset.y - mOffset.y;
    }
    for (let i = removeBullets.length - 1; i >= 0; i--) bullets.splice(removeBullets[i], 1);

    enemiesUpdate();

    checkHit();

    if (player.ships[0].hp < 0) {
        sound.gameover();
        clearInterval(gameInterval);
        return;
    }
    background.update(player.ships[0]);
    // drones.forEach((d, i) => {
    //     if (distance(d, d.ship) > 600) {
    //         sound.disconnected();
    //         drones.splice(i, 1);
    //         return;
    //     }
    //     if (d > 300 && Math.random() > 0.7) sound.noise(0.2 * ((800 - d) / 500));
    //     d.update();
    // });
}

function enemiesUpdate() {
    const mOffset = player.ships[0].offset();
    const remove = [];
    for (let i = 0; i < enemies.length; i++) {
        if (distance(enemies[i], player.ships[0]) > 2000) {
            remove.push(i);
            continue;
        }
        const offset = enemies[i].offset();
        enemies[i].x += offset.x - mOffset.x;
        enemies[i].y += offset.y - mOffset.y;
    }
    for (let i = remove.length - 1; i >= 0; i--) enemies.splice(remove[i], 1);
    enemies.forEach((enemy) => {
        let nearest = { x: player.ships[0].x, y: player.ships[0].y };
        // find nearst ship
        player.ships.forEach((ship) => {
            if (distance(enemy, ship) < distance(enemy, nearest)) nearest = ship;
        });
        if (distance(enemy, nearest) <= 120) {
            fire(enemy);
            const v = { x: enemy.x - nearest.x, y: enemy.y - nearest.y };
            const m = {
                x: Math.cos((enemy.head + 90) * (Math.PI / 180)),
                y: Math.sin((enemy.head + 90) * (Math.PI / 180)),
            };
            const d = v.x * m.x + v.y * m.y;
            if (d < 0) enemy.turnLeft();
            else if (d > 0) enemy.turnRight();
        }
    });

    while (enemies.length < 30) spawn();
}

function keyboardListener() {
    const keyPress = {};
    window.onkeydown = window.onkeyup = function (event) {
        if (event.type === "keydown") keyPress[event.key] = true;
        else delete keyPress[event.key];

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
            sound.rotate();
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
            sound.rotate();
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
        if (keyPress["v"]) {
            if (keyPress["0"]) {
                for (let i = 0; i < player.ships.length; i++) drones.push(player.ships[i].drone());
            } else {
                let childControl = false;
                for (let i = 1; i < player.ships.length; i++) {
                    if (keyPress[i.toString()]) {
                        childControl = true;
                        drones.push(player.ships[i].drone());
                    }
                }
                if (!childControl) drones.push(player.ships[0].drone());
            }
        }
    };
}

function saperate() {
    if (player.ships.length >= 10) return;
    if (player.token < 100) return;
    player.token -= 100;

    sound.saperate();
    const ship = new Ship({ player: player });
    ship.speed = player.ships[0].speed * 0.8;
    ship.head = player.ships[0].head;
    player.ships.push(ship);
}

function fire(ship) {
    if (!ship.attackable) return;
    sound.fire();
    const bullet = ship.fire();
    bullets.push(bullet);
}

function spawn() {
    const randD = Math.random() * 360 * (Math.PI / 180);
    const randR = 1000 * (Math.random() * 1 + 1);
    const z = {
        x: Math.cos(randD) * randR,
        y: Math.sin(randD) * randR,
    };

    const ship = new Ship({ player: null, x: z.x, y: z.y, speed: Math.random() * 1 + 0.5 });
    ship.head = randD + 180;
    enemies.push(ship);
}

function checkHit() {
    const used = [];
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        if (bullet.attacker.player && bullet.attacker.player.name === "Player") {
            enemies.forEach((enemy, j) => {
                if (distance(bullet, enemy) < 9) {
                    used.push(i);
                    if (enemy.def > 0) {
                        sound.defend();
                        enemy.def -= bullet.damage;
                    } else {
                        sound.explosion();
                        enemy.hp -= bullet.damage;
                        if (enemy.hp <= 0) {
                            enemies.splice(j, 1);
                            player.token += (enemy.lv + 1) * 20;
                            player.point += (enemy.lv + 1) * 100 + parseInt(enemy.lv / 5) * 500;
                        }
                    }
                    console.log("Hit", enemy);
                }
            });
        } else {
            player.ships.forEach((ship, j) => {
                if (distance(bullet, ship) < 9) {
                    used.push(i);
                    if (ship.def > 0) {
                        sound.defend();
                        ship.def -= bullet.damage;
                    } else {
                        sound.explosion();
                        ship.hp -= bullet.damage;
                        if (ship.hp <= 0) player.ships.splice(j, 1);
                    }
                    console.log("Hit", ship);
                }
            });
        }
    }
    for (let i = used.length - 1; i >= 0; i--) bullets.splice(used[i], 1);
}

export default game;
