import { Bullet } from "./bullet";
import { Drone } from "./drone";

class Ship {
    constructor({ player = null, lv = 0, speed = 0.5, x = 0, y = 0 }) {
        this.player = player;
        this.lv = lv;
        let { hp, atk, def, storage, cost } = shipAbility(this.lv);
        this.maxHp = hp;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.storage = storage;
        this.resource = 0;
        this.cost = cost;

        this.x = x;
        this.y = y;
        this.head = 90;
        this.speed = speed;

        this.attackable = true;
        this.attackDelay = 250;
    }

    upgrade() {
        if (this.player.token >= this.cost) {
            this.player.token -= this.cost;
            this.lv++;
            let { hp, atk, def, storage, cost } = shipAbility(this.lv);
            this.maxHp = hp;
            this.atk = atk;
            this.def = def;
            this.storage = storage;
            this.cost = cost;
            return true;
        } else {
            return false;
        }
    }
    speedUp() {
        if (this.speed < 2) this.speed += 0.05;
        this.speed = Math.min(this.speed, 2);
    }
    speedDown() {
        if (this.speed > 0) this.speed -= 0.05;
        this.speed = Math.max(this.speed, 0);
    }
    turnLeft() {
        this.head += 3;
    }
    turnRight() {
        this.head -= 3;
    }
    fire() {
        if (!this.attackable) return;
        this.attackable = false;
        setTimeout(() => {
            this.attackable = true;
        }, this.attackDelay);
        return new Bullet(this);
    }
    offset() {
        return {
            x: Math.cos((this.head * Math.PI) / 180) * this.speed,
            y: Math.sin((this.head * Math.PI) / 180) * this.speed,
        };
    }
    drone() {
        if (this.player.token >= 50) {
            this.player.token -= 50;
            return new Drone(this);
        }
    }
}

function shipAbility(lv = 0) {
    return {
        hp: 100 + lv * 10,
        atk: 25 + lv * 5,
        def: 50 + parseInt(lv / 5) * 20,
        storage: 25 + parseInt(lv / 5) * 10,
        cost: 100 + (lv + 1) * 20 + parseInt((lv + 1) / 5) * 100,
    };
}

export { Ship };
