import { distance } from "./utils";

const stars = [];

class Star {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

function addStar(ship) {
    const randD = Math.random() * 360 * (Math.PI / 180);
    const randR = 1000 * (Math.random() * 2 + 1);
    const z = {
        x: Math.cos(randD) * randR,
        y: Math.sin(randD) * randR,
    };
    stars.push(new Star(z.x, z.y, `rgb(${Math.random() * 64 + 159},${Math.random() * 64 + 159},${Math.random() * 64 + 159})`));
}

function update(ship) {
    const offset = ship.offset();
    stars.forEach((star, i) => {
        if (distance(star, { x: 0, y: 0 }) < 2000) {
            star.x -= offset.x * 3;
            star.y -= offset.y * 3;
        } else {
            stars.splice(i, 1);
        }
    });
    if (stars.length < 50) addStar(ship);
}

export default { stars, addStar, update };
