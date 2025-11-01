function getArgs(): [string, string] {
	const input = Deno.args[0];
	const output = Deno.args[1];
	if (!input || !output) {
		console.error(
			"Expected two arguments: deno run GenerateIndexHtml.ts <template.html> <output.html>",
		);
		Deno.exit(1);
	}
	return [input, output];
}

async function main() {
	const [input, output] = getArgs();

	const inputContent = await Deno.readTextFile(input);

	const outputContent = inputContent.replaceAll(
		/LINK\(([^\n]+) --- ([^\n]+) --- ([^\n]+) --- ([^\n]+) --- ([^\n]+) --- ([^\n]+)\)/gm,
		`<a class="button-82-pushable" role="button" href="$2">
	<span class="button-82-shadow" style="--hueDeg: $5"></span>
	<span class="button-82-edge" style="--hueDeg2: $6"></span>
	<span class="button-82-front text" style="$4">
		<div class="button-82-front-internal">
			<div class="icon-holder">
				<i class="$3" style="color: white;"></i>
			</div>
			<div style="display: flex; flex-direction: column;">
				<span class="main-text">$1</span>
				<span class="sub-text">$2</span>
			</div>
		</div>
	</span>
</a>`,
	);

	await Deno.writeTextFile(output, outputContent);
}

if (import.meta.main) {
	main();
}
