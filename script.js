$(document).ready(() => {
	let CELL_SIZE = parseInt($("#cell-size").val());
	let SEED = parseInt($("#seed").val()) || Math.floor(Math.random() * 999999);
	let X_OFFSET = parseFloat($("#x-offset").val());
	let Y_OFFSET = parseFloat($("#y-offset").val());
	let Z_VALUE = parseFloat($("#z-value").val());
	let ZOOM = parseFloat($("#zoom").val());
	let THRESHOLD = parseFloat($("#threshold").val());
	let COLOR1 = $("#color-1").val();
	let COLOR2 = $("#color-2").val();

	const generatePerlin = (z) => {
		updateConfig();
		// logConfig();

		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");

		for (let x = 0; x < canvas.width; x += CELL_SIZE) {
			for (let y = 0; y < canvas.height; y += CELL_SIZE) {
				const perlin = PerlinNoise.noise(x / ZOOM + SEED + X_OFFSET, y / ZOOM + SEED + Y_OFFSET, Z_VALUE);

				ctx.fillStyle = perlin < THRESHOLD ? COLOR1 : COLOR2;
				ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
			}
		}
	}

	const updateConfig = () => {
		CELL_SIZE = parseInt($("#cell-size").val());
		SEED = parseInt($("#seed").val()) || Math.floor(Math.random() * 999999);
		X_OFFSET = parseFloat($("#x-offset").val());
		Y_OFFSET = parseFloat($("#y-offset").val());
		Z_VALUE = parseFloat($("#z-value").val());
		ZOOM = parseFloat($("#zoom").val());
		THRESHOLD = parseFloat($("#threshold").val());
		COLOR1 = $("#color-1").val();
		COLOR2 = $("#color-2").val();
		// Z_VALUE = z;
	}

	const logConfig = () => {
		console.log(`
		[${typeof CELL_SIZE}] CELL_SIZE (#cell-size): ${CELL_SIZE} (${$("#cell-size").val()})
		[${typeof SEED}] SEED (#seed): ${SEED} (${$("#seed").val()})
		[${typeof X_OFFSET}] X_OFFSET (#x-offset): ${X_OFFSET} (${$("#x-offset").val()})
		[${typeof Y_OFFSET}] Y_OFFSET (#y-offset): ${Y_OFFSET} (${$("#y-offset").val()})
		[${typeof Z_VALUE}] Z_VALUE (#z-value): ${Z_VALUE} (${$("#z-value").val()})
		[${typeof ZOOM}] ZOOM (#zoom): ${ZOOM} (${$("#zoom").val()})
		[${typeof THRESHOLD}] THRESHOLD (#threshold): ${THRESHOLD} (${$("#threshold").val()})
		[${typeof COLOR1}] COLOR1 (#color-1): ${COLOR1} (${$("#color-1").val()})
		[${typeof COLOR2}] COLOR2 (#color-2): ${COLOR2} (${$("#color-2").val()})
		`.replace(/\t/g, ""));
	}

	// logConfig();

	// let z = 0;
	// setInterval(() => {
	// 	z += 0.05;
	// 	generatePerlin();
	// }, 25);

	$(".submit").click((e) => {
		e.preventDefault();
		generatePerlin();
	});

	$("form > .form").change((e) => {
		console.log("changed", e.target.id, e.target.value);
		generatePerlin();
	});
});