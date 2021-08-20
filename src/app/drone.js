class Drone {
    constructor({ ship }) {
        this.ship = ship;
        this.maxHp = 10;
        this.hp = 10;
        this.def = 1;

        this.center = [ship.x, ship.y];
        this.r = 0;
        this.head = 0;
        this.speed = 3;
        this.x = this.center[0];
        this.y = this.center[1];
    }

    update() {
        this.r += this.speed;
        this.head += this.speed / Math.PI;
        this.x = this.center[0] + this.r * Math.cos(this.head);
        this.y = this.center[1] + this.r * Math.sin(this.head);
    }
}

export { Drone };
