import { QS, distance } from "./utils";

const ctx = QS("#canvas").getContext("2d");
const { width, height } = QS("#canvas");

function draw({ player, enemies, bullets, stones }) {
    drawBackground();
    drawVisibleArea(player.ships);
    drawPlayerShips(player.ships);
    drawVisibleEnemies(player.ships, enemies);
    drawBullets(player.ships, bullets);
    drawData(player);
}

function drawBackground() {
    ctx.save();
    ctx.fillStyle = "#000";
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
        ctx.arc(p.x, p.y, 100, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.restore();
}

function drawPlayerShips(ships) {
    ctx.save();
    ctx.fillStyle = "#ddd";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "yellow";
    for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        const d = distance(ships[0], ship);
        if (d > 400 && Math.random() < (d - 400) / 200) continue;
        const head = pos({
            x: ship.x + Math.cos((ship.head * Math.PI) / 180) * ship.speed * 30,
            y: ship.y + Math.sin((ship.head * Math.PI) / 180) * ship.speed * 30,
        });
        const lWing = pos({
            x: ship.x + Math.cos(((ship.head + 120) * Math.PI) / 180) * 7.5,
            y: ship.y + Math.sin(((ship.head + 120) * Math.PI) / 180) * 7.5,
        });
        const rWing = pos({
            x: ship.x + Math.cos(((ship.head - 120) * Math.PI) / 180) * 7.5,
            y: ship.y + Math.sin(((ship.head - 120) * Math.PI) / 180) * 7.5,
        });
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(lWing.x, lWing.y);
        ctx.lineTo(rWing.x, rWing.y);
        ctx.closePath();
        if (ships[i].def > 0) ctx.stroke();
        ctx.fill();
    }
    ctx.restore();
}

function drawVisibleEnemies(ships, enemies) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "orange";
    for (let i = 0; i < enemies.length; i++) {
        let seen = false;
        for (let j = 0; j < ships.length; j++) {
            const d = distance(ships[0], ships[j]);
            if (d > 400 && Math.random() < (d - 400) / 200) continue;
            if (distance(enemies[i], ships[j]) < 100) {
                seen = true;
                break;
            }
        }
        if (seen) {
            const p = pos(enemies[i]);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            if (enemies[i].def > 0) ctx.stroke();
            ctx.stroke();
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
            if (distance(bullets[i], ships[j]) < 100) {
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
    ctx.fillText(`Point: ${player.points}`, 10, 10);
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
