import { zzfx } from "zzfx";

function fire() {
    zzfx(...[0.5, , 2e3, , 0.05, 0, , 1.11, -17, , 197, 0.01, , 0.2, , , , , 0.16]);
}

function saperate() {
    zzfx(...[1, , 18, 0.01, 0.01, 0.21, 1, 0.49, 9.9, , , , , , , , 0.04, 0.95, 0.02]);
}

function noise(n = 0.4) {
    zzfx(...[n, , 60, , 0.01, 0, 4, 0.55, 62, 89, -88, 0.06, , , 173, 0.6, , , 0.05]);
}

function disconnected() {
    zzfx(...[2.03, , 413, , , 0.24, 2, 0.12, , , , , 0.11, , 317, 0.1, 0.13, , , 0.01]);
}

function speed(f = 200, v = 0.04) {
    zzfx(...[v, , f, , 0.02, 0.01, , 1.72, , -86, 118, 0.03, , , -5.2, , , , 0.13]);
}

function rotate() {
    zzfx(...[0.03, , 10, 0.06, , 0, 2, 2.3, , , 621, , , , , , , , 0.21, 0.26]);
}

export default { fire, saperate, noise, disconnected, speed, rotate };
