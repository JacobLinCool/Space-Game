import { resizeCanvas } from "./canvas";
import game from "./game";

resizeCanvas(4 / 3);

window.g = game();
