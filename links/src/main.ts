import { Application, Assets, Sprite } from "pixi.js";

/**
 * Main function.
 */
async function main() {
	const app = new Application();
	try {
		await app.init({
			background: "#1099bb",
			resizeTo: window
		});
	} catch(e) {
		console.log("WegGL not supported on this browser, changing to simple mode.");
		return;
	}

	document.getElementById("pixi-container")!.appendChild(app.canvas);

	const texture = await Assets.load("/assets/bunny.png");

	// Create a bunny Sprite
	const bunny = new Sprite(texture);
	bunny.anchor.set(0.5);
	bunny.position.set(app.screen.width / 2, app.screen.height / 2);

	app.stage.addChild(bunny);
	app.ticker.add((time) => {
		bunny.rotation += 0.1 * time.deltaTime;
	});
}

function setupNonSupportedRenderer() {
}

main();
