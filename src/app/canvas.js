import { QS } from "./utils.js";

async function resizeCanvas(ratio) {
    const canvas = QS("#canvas");
    const box = QS("#box");
    const maxWidth = +getComputedStyle(box).width.replace("px", "");
    const maxHeight = +getComputedStyle(box).height.replace("px", "");
    if (maxWidth / maxHeight > ratio) {
        canvas.style.height = maxHeight + "px";
        canvas.style.width = maxHeight * ratio + "px";
    } else {
        canvas.style.width = maxWidth + "px";
        canvas.style.height = maxWidth * (1 / ratio) + "px";
    }
}

export { resizeCanvas };
