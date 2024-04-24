document.querySelector("#avoid-start").addEventListener("click", function (e) {
  const btnStart = document.getElementById("avoid-start")
  btnStart.style.display = btnStart.style.display === "none" ? "block" : "none"

  // blocked.style.pointerEvents = blocked.style.pointerEvents === "none" ? "all" : "none"
  requestAnimationFrame( gameLoop )
})


document.querySelector("#avoid-restart").addEventListener("click", function (e) {
  refreshGame()
})

let scoreBlock;
let score = 0;

const config = {
	step: 0,
	maxStep: 6,
	sizeCell: 16,
	sizeBerry: 16 / 4
}

const snake = {
	x: 160,
	y: 160,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3
}

let berry = {
	x: 0,
	y: 0
} 


let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

let isPaused = false

function gameLoop() {
	if (isPaused) {
        return;
    }

  requestAnimationFrame( gameLoop );
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawSnake();
}

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();

	// todo бордер
	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	let green = "#006400"
	let lightGreen = "#00FF00"

	snake.tails.forEach( function(el, index){
		if (index == 0) {
			context.beginPath();
			context.fillStyle = lightGreen;
			context.arc( el.x + (config.sizeCell / 2), el.y + (config.sizeCell / 2), config.sizeCell / 1.5, 0, 2 * Math.PI,)
			context.fill()
		} else {
			context.fillStyle = green;
			context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );
		}
		

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			incScore();
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				refreshGame();
			}

		}

	} );
}

function collisionBorder() {
  if (snake.x < 0) {
		// snake.x = canvas.width - config.sizeCell;
		refreshGame()
	} else if ( snake.x >= canvas.width ) {
		// snake.x = 0;
		refreshGame()
	}

	if (snake.y < 0) {
		// snake.y = canvas.height - config.sizeCell;
		refreshGame()
	} else if ( snake.y >= canvas.height ) {
		// snake.y = 0;
		refreshGame()
	}
}

function refreshGame() {
	score = 0;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}

let red = "#ff0000"

function drawBerry() {
  context.beginPath();
	context.fillStyle = red
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}

function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell
}

function incScore() {
	score++;
	drawScore()
}

function drawScore() {
	scoreBlock.innerHTML = score
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW" && snake.dy === 0) {
		snake.dy = -config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyA" && snake.dx === 0) {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
	} else if ( e.code == "KeyS" && snake.dy === 0) {
		snake.dy = config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyD" && snake.dx === 0) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
});

document.addEventListener("keydown", function (e) {
	if (e.code === "ArrowLeft" && snake.dx === 0) {
	  	snake.dx = -config.sizeCell
	  	snake.dy = 0;
	} else if (e.code === "ArrowUp" && snake.dy === 0) {
	  	snake.dy = -config.sizeCell
	  	snake.dx = 0;
	} else if (e.code === "ArrowRight" && snake.dx === 0) {
	  	snake.dx = config.sizeCell
	  	snake.dy = 0;
	} else if (e.code === "ArrowDown" && snake.dy === 0) {
	  	snake.dy = config.sizeCell
	  	snake.dx = 0;
	}
});

document.addEventListener("keydown", function (e) {
    if (e.code == "Space") {
        isPaused = !isPaused
        if (isPaused) {
            drawPause()
        } else {
            clearPause()
			requestAnimationFrame( gameLoop )
        } 
    }


});

function drawPause() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = "bold 48px Arial"
    context.textAlign = "center"
	context.fillStyle = "#FF0000"
    context.fillText("Pause", canvas.width / 2, canvas.height / 2)
}

function clearPause() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}
