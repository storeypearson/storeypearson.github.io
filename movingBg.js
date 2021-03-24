//import * as PIXI from "https://cdn.skypack.dev/pixi.js";
//import SimplexNoise from "https://cdn.skypack.dev/pixi.js";
//import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur";

const width = window.innerWidth;
const height = window.innerHeight;

const res = 15;
const cols = 1 + width / res;
const rows = 1 + height / res;

const app = new PIXI.Application({
  width: width,
  height: height,
  resolution: 1,
  autoDensity: false,
  backgroundColor: 0xffbe0b
});
document.body.appendChild(app.view);

const simplex = new SimplexNoise();

const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

const graphics1 = new PIXI.Graphics();
app.stage.addChild(graphics1);

const graphics2 = new PIXI.Graphics();
app.stage.addChild(graphics2);

let inc = 0.025;

let zOff = 0;

const blurFilter = new KawaseBlurFilter(20, 10, true);
const noise = new PIXI.filters.NoiseFilter(0.2);

app.stage.filters = [blurFilter, noise];

const container = new PIXI.Container();
app.stage.addChild(container);
container.mask = graphics;

const container1 = new PIXI.Container();
app.stage.addChild(container1);
container1.mask = graphics1;

const container2 = new PIXI.Container();
app.stage.addChild(container2);
container2.mask = graphics2;

const fill = new PIXI.Graphics();
container.addChild(fill);
fill.beginFill(0xfb5607);
fill.drawRect(0, 0, width, height);

const fill1 = new PIXI.Graphics();
container1.addChild(fill1);
fill1.beginFill(0xff006e);
fill1.drawRect(0, 0, width, height);

const fill2 = new PIXI.Graphics();
container2.addChild(fill2);
fill2.beginFill(0x3a86ff);
fill2.drawRect(0, 0, width, height);

fill.alpha = 1;
fill1.alpha = 1;
fill2.alpha = 1;

let cutoff = 0;

if (window.innerWidth < 700) {
  cutoff = -0.125;
}

const canvas = app.renderer.view;

function render() {
  noise.seed = Math.random();
  let xOff = 0;
  let xOff1 = 1000;
  let xOff2 = 2000;

  graphics.clear();
  graphics1.clear();
  graphics2.clear();

  graphics.beginFill(0x000000);
  graphics1.beginFill(0x000000);
  graphics2.beginFill(0x000000);

  for (let i = 0; i < cols; i++) {
    xOff += inc;
    xOff1 += inc;
    xOff2 += inc;
    let yOff = 0;
    let yOff1 = 1000;
    let yOff2 = 2000;
    for (let j = 0; j < rows; j++) {
      const noise = simplex.noise3D(xOff, yOff, zOff);
      const noise1 = simplex.noise3D(xOff1, yOff1, zOff);
      const noise2 = simplex.noise3D(xOff2, yOff2, zOff);

      if (noise > cutoff) {
        graphics.drawRect(i * res, j * res, res, res);
      }

      if (noise1 > cutoff) {
        graphics1.drawRect(i * res, j * res, res, res);
      }

      if (noise2 > cutoff) {
        graphics2.drawRect(i * res, j * res, res, res);
      }

      yOff += inc;
      yOff1 += inc;
      yOff2 += inc;
    }
  }

  zOff += 0.005;

  graphics.endFill();
  graphics1.endFill();
  graphics2.endFill();
}

app.ticker.add(() => {
  render();
});
