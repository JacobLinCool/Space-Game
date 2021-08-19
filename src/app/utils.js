function QS(query) {
    return document.querySelector(query);
}

function QSA(query) {
    return document.querySelectorAll(query);
}

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export { QS, QSA, distance };
