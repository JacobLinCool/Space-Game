import { zzfx } from "zzfx";

const z = undefined;
function fire() {
    zzfx(0.5, z, 2e3, z, 0.05, 0, z, 1.11, -17, z, 197, 0.01, z, 0.2, z, z, z, z, 0.16);
}

function saperate() {
    zzfx(1, z, 18, 0.01, 0.01, 0.21, 1, 0.49, 9.9, z, z, z, z, z, z, z, 0.04, 0.95, 0.02);
}

function noise(n = 0.4) {
    zzfx(n, z, 60, z, 0.01, 0, 4, 0.55, 62, 89, -88, 0.06, z, z, 173, 0.6, z, z, 0.05);
}

function disconnected() {
    zzfx(2.03, z, 413, z, z, 0.24, 2, 0.12, z, z, z, z, 0.11, z, 317, 0.1, 0.13, z, z, 0.01);
}

function speed(f = 200, v = 0.04) {
    zzfx(v, z, f, z, 0.02, 0.01, z, 1.72, z, -86, 118, 0.03, z, z, -5.2, z, z, z, 0.13);
}

function rotate() {
    zzfx(0.03, z, 10, 0.06, z, 0, 2, 2.3, z, z, 621, z, z, z, z, z, z, z, 0.21, 0.26);
}

function explosion() {
    zzfx(0.6, z, 372, 0.02, 0.02, 0.5, 4, 2.29, 0.2, z, z, z, z, 0.6, z, 0.6, z, 0.7, 0.04, 0.19);
}

function defend() {
    zzfx(2, z, 180, 0.05, 0.03, 0.04, z, 2.42, 0.6, z, z, z, z, z, z, z, 0.15, 0.39, 0.04);
}

function gameover() {
    zzfx(1.99, z, 171, 0.02, 0.01, 0.08, 4, 2.39, 14, z, z, z, z, 0.3, z, 0.1, 0.16, z, 0.1);
}

export default { fire, saperate, noise, disconnected, speed, rotate, explosion, defend, gameover };
