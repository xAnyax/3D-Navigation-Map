let minimapCanvas;
let minimapWidth = 250;
let minimapHeight = 370;
let minimapScale;

function setup() {
    console.log("Setting up minimap...");
    minimapCanvas = createCanvas(minimapWidth, minimapHeight);
    minimapCanvas.parent('minimap');
    minimapScale = minimapWidth / cols;
    console.log("Minimap setup complete.");
    noLoop();
}

function draw() {
    if (displayPath) {
        minimapCanvas.clear();
        minimapCanvas.noFill();
        minimapCanvas.stroke('blue');
        minimapCanvas.strokeWeight(minimapScale / 4);
        minimapCanvas.beginShape();
        image(img5f, 0, 0, minimapWidth, minimapHeight); 
        image(img6f, 0, 0, minimapWidth, minimapHeight);
        for (let i = 0; i < path.length; i++) {
            minimapCanvas.vertex(path[i].x * minimapScale + minimapScale / 2, path[i].y * minimapScale + minimapScale / 2);
        }
        minimapCanvas.endShape();
    }
    start.show_node('green', controls.view.x, controls.view.y);
	end.show_node('red', controls.view.x, controls.view.y);
}