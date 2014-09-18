(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var Board = SnakeGame.Board = function () {
		this.snake = new SnakeGame.Snake(this);
		this.food = this.generateFood();
		this.levelMode = false;
		this.level = 1;
	}
	
	Board.DIMS = 20;
	Board.CENTER = [Board.DIMS/2, Board.DIMS/2];
	
	Board.prototype.generateFood = function () {
		var randomPos = function () {
			return [Math.floor(Math.random() * Board.DIMS),
							Math.floor(Math.random() * Board.DIMS)];
		}
		
		var pos = randomPos();
		while (this.applePlacement(pos)) { pos = randomPos(); }
		
		return pos;
	}
	
	Board.prototype.constructBoard = function () {
		this.grid = this.createGrid();
		if (this.levelMode === true) {
			this.generateLevel(this.level);
		} else {
			this.placeSnake();
			this.placeFood();
		}
		
	}
	
	Board.prototype.createGrid = function () {
		var grid = [];

		for (var i = 0; i < Board.DIMS; i++) {
			grid[i] = [];

			for (var j = 0; j < Board.DIMS; j++) {
				grid[i][j] = null;
			}
		}
		
		return grid;
	}
	
	Board.prototype.placeSnake = function () {
		var grid = this.grid;
		
		this.snake.segments.forEach(function (pos, index) {
			grid[pos[0]][pos[1]] = (index === 0) ? "player" : "segment";
		});
	}
	
	Board.prototype.placeFood = function () {
		var pos = this.food;
		
		if(this.grid[pos[0]][pos[1]] === "wall"){
			this.food = generateFood();
		}
		
		this.grid[pos[0]][pos[1]] = "apple";
	}
	
	Board.prototype.boundaries = function () {
		
		if (this.snake.pos[0] >= 0 && this.snake.pos[0] < Board.DIMS
			&& this.snake.pos[1] >= 0 && this.snake.pos[1] < Board.DIMS
		) {
			if (this.levelMode === true) {
				if (this.grid[this.snake.pos[0]][this.snake.pos[1]] === "wall") {
					return false;
				}
			}
			
			return true; 
		}
	}
	
	Board.prototype.applePlacement = function (pos) {
		var apple = pos;
		var segments = this.snake.segments;
		
		for (var i = 1; i < segments.length; i++) {
			if (apple[0] === segments[i][0] && apple[1] === segments[i][1] || 
				this.grid[apple[0]][apple[1]] === "wall") {
				return true;
			}
		}
		
		return false;
	}
	
	Board.prototype.generateLevel = function (level) {
		if (level === 1) {
			this.grid[3][3] = "wall";
			this.grid[3][4] = "wall";
			this.grid[4][3] = "wall";
			this.grid[4][4] = "wall";
			
			this.grid[3][15] = "wall";
			this.grid[3][16] = "wall";
			this.grid[4][15] = "wall";
			this.grid[4][16] = "wall";
			
			this.grid[15][3] = "wall";
			this.grid[15][4] = "wall";
			this.grid[16][3] = "wall";
			this.grid[16][4] = "wall";
			
			this.grid[15][15] = "wall";
			this.grid[15][16] = "wall";
			this.grid[16][15] = "wall";
			this.grid[16][16] = "wall";
		}
		
		if (level === 2) {
			
			for (var i = 3; i < 17; i++) {
				this.grid[10][i] = "wall";
			}
			for (var i = 3; i < 17; i++) {
				this.grid[9][i] = "wall";
			}
			
			for (var i = 3; i < 17; i++) {
				this.grid[i][9] = "wall";
			}
			for (var i = 3; i < 17; i++) {
				this.grid[i][10] = "wall";
			}
		}
		
		if (level === 3) {
			
			this.grid[3][3] = "wall";
			this.grid[3][4] = "wall";
			this.grid[3][5] = "wall";
			this.grid[4][3] = "wall";
			this.grid[4][4] = "wall";
			this.grid[4][5] = "wall";
			this.grid[5][3] = "wall";
			this.grid[5][4] = "wall";
			this.grid[5][5] = "wall";
			
			this.grid[3][14] = "wall";
			this.grid[3][15] = "wall";
			this.grid[3][16] = "wall";
			this.grid[4][14] = "wall";
			this.grid[4][15] = "wall";
			this.grid[4][16] = "wall";
			this.grid[5][14] = "wall";
			this.grid[5][15] = "wall";
			this.grid[5][16] = "wall";
			
			for (var i = 5; i < 15; i++) {
				this.grid[13][i] = "wall";
			}
		}
		
		this.placeSnake();
		this.placeFood();
	}
	
})(this);