import { QS, distance } from "./utils";
import config from "./config";

const ctx = QS("#canvas").getContext("2d");
const { width, height } = QS("#canvas");

function draw({ player, enemies, bullets, stones, drones, background }) {
    drawBackground();
    drawVisibleArea(player.ships);
    drawStars(background.stars);
    drawPlayerShips(player.ships);
    drawVisibleEnemies(player.ships, enemies);
    drawBullets(player.ships, bullets);
    drawData(player);
}

function drawBackground() {
    ctx.save();
    ctx.fillStyle = config.background.color;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}

function drawVisibleArea(ships) {
    ctx.save();
    ctx.fillStyle = "#333";
    for (let i = 0; i < ships.length; i++) {
        const d = distance(ships[0], ships[i]);
        if (d > 400 && Math.random() < (d - 400) / 200) continue;
        const p = pos(ships[i]);
        ctx.beginPath();
        ctx.arc(p.x, p.y, config.ship.visible, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.restore();
}

function drawStars(stars) {
    ctx.save();
    stars.forEach(({ x, y, color }) => {
        ctx.fillStyle = color;
        const p = pos({ x, y });
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.restore();
}

function drawPlayerShips(ships) {
    ctx.save();
    ctx.fillStyle = "#87cefa";
    ctx.lineWidth = 3;
    for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        const d = distance(ships[0], ship);
        if (d > 400 && Math.random() < (d - 400) / 200) continue;
        const head = pos({
            x: ship.x + Math.cos((ship.head * Math.PI) / 180) * ship.speed * 20 * config.ship.size,
            y: ship.y + Math.sin((ship.head * Math.PI) / 180) * ship.speed * 20 * config.ship.size,
        });
        const lWing = pos({
            x: ship.x + Math.cos(((ship.head + 120) * Math.PI) / 180) * 7.5 * config.ship.size,
            y: ship.y + Math.sin(((ship.head + 120) * Math.PI) / 180) * 7.5 * config.ship.size,
        });
        const rWing = pos({
            x: ship.x + Math.cos(((ship.head - 120) * Math.PI) / 180) * 7.5 * config.ship.size,
            y: ship.y + Math.sin(((ship.head - 120) * Math.PI) / 180) * 7.5 * config.ship.size,
        });
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(lWing.x, lWing.y);
        ctx.lineTo(rWing.x, rWing.y);
        ctx.closePath();
        ctx.strokeStyle = ctx.fillStyle;
        if (ships[i].def > 0) ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.fill();
    }
    ctx.restore();
}

function drawVisibleEnemies(ships, enemies) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    for (let i = 0; i < enemies.length; i++) {
        let seen = false;
        for (let j = 0; j < ships.length; j++) {
            const d = distance(ships[0], ships[j]);
            if (d > 400 && Math.random() < (d - 400) / 200) continue;
            if (distance(enemies[i], ships[j]) < config.ship.visible) {
                seen = true;
                break;
            }
        }
        if (seen) {
            const head = pos({
                x: enemies[i].x + Math.cos((enemies[i].head * Math.PI) / 180) * enemies[i].speed * 30 * config.ship.size,
                y: enemies[i].y + Math.sin((enemies[i].head * Math.PI) / 180) * enemies[i].speed * 30 * config.ship.size,
            });
            const lWing = pos({
                x: enemies[i].x + Math.cos(((enemies[i].head + 120) * Math.PI) / 180) * 7.5 * config.ship.size,
                y: enemies[i].y + Math.sin(((enemies[i].head + 120) * Math.PI) / 180) * 7.5 * config.ship.size,
            });
            const rWing = pos({
                x: enemies[i].x + Math.cos(((enemies[i].head - 120) * Math.PI) / 180) * 7.5 * config.ship.size,
                y: enemies[i].y + Math.sin(((enemies[i].head - 120) * Math.PI) / 180) * 7.5 * config.ship.size,
            });
            ctx.beginPath();
            ctx.moveTo(head.x, head.y);
            ctx.lineTo(lWing.x, lWing.y);
            ctx.lineTo(rWing.x, rWing.y);
            ctx.closePath();
            ctx.strokeStyle = ctx.fillStyle;
            if (enemies[i].def > 0) ctx.strokeStyle = "orange";
            ctx.stroke();
            ctx.fill();
        }
    }
    ctx.restore();
}

function drawBullets(ships, bullets) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    for (let i = 0; i < bullets.length; i++) {
        let seen = false;
        for (let j = 0; j < ships.length; j++) {
            const d = distance(ships[0], ships[j]);
            if (d > 400 && Math.random() < (d - 400) / 200) continue;
            if (distance(bullets[i], ships[j]) < config.ship.visible) {
                seen = true;
                break;
            }
        }
        if (seen) {
            const head = pos(bullets[i]);
            const tail = pos({
                x: bullets[i].x + Math.cos(((bullets[i].head + 180) * Math.PI) / 180) * 10,
                y: bullets[i].y + Math.sin(((bullets[i].head + 180) * Math.PI) / 180) * 10,
            });
            ctx.beginPath();
            ctx.moveTo(head.x, head.y);
            ctx.lineTo(tail.x, tail.y);
            ctx.stroke();
        }
    }
    ctx.restore();
}

function drawData(player) {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.font = "36px Arial";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText(`Point: ${player.point}`, 10, 10);
    ctx.textAlign = "right";
    ctx.fillText(`Token: ${player.token}`, width - 10, 10);
    ctx.fillText(`Ship: ${player.ships.length} / 10`, width - 10, 10 + 50);
    ctx.restore();
}

function pos({ x = 0, y = 0 }) {
    return {
        x: x + width / 2,
        y: height / 2 - y,
    };
}

export { draw };
