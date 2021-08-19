class Bullet {
    constructor(attacker) {
        this.attacker = attacker;
        this.atk = attacker.atk;

        this.x = attacker.x;
        this.y = attacker.y;
        this.speed = attacker.speed + 6;
        this.head = attacker.head;
    }

    offset() {
        return {
            x: Math.cos((this.head * Math.PI) / 180) * this.speed,
            y: Math.sin((this.head * Math.PI) / 180) * this.speed,
        };
    }
}

export { Bullet };
