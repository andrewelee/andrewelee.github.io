(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var Snake = SnakeGame.Snake = function (board) {
		this.board = board;
		this.dir = "N";
		this.pos = [SnakeGame.Board.DIMS/2, SnakeGame.Board.DIMS/2];
		this.segments = [this.pos];
		this.gameover = false;
		this.apples = 0;
	}
	
	Snake.prototype.move = function () {
		if (this.dir === "N") {
			this.pos = [this.pos[0] - 1, this.pos[1]];
		} else if (this.dir === "E") {
			this.pos = [this.pos[0], this.pos[1] + 1];
		} else if (this.dir === "S") {
			this.pos = [this.pos[0] + 1, this.pos[1]];
		} else if (this.dir === "W") {
			this.pos = [this.pos[0], this.pos[1] - 1];
		}
		
		this.checkMove();
	}
	
	Snake.prototype.turn = function (newDir) {
		this.dir = newDir;
	}
	
	Snake.prototype.checkMove = function () {
		
		if (this.pos[0] === this.board.food[0] && this.pos[1] === this.board.food[1]){
			this.eatFood();
		}
		else if (!this.board.boundaries() || this.collideSelf()) {
			//Check if hitting wall or self
			this.gameover = true;
		}
		else {
			this.segments.pop();
			this.segments.unshift(this.pos);
		}
	}
	
	Snake.prototype.eatFood = function () {
		if (this.board.level === 3) {
			this.segments.unshift(this.board.food, this.board.food);
		} else {
			this.segments.unshift(this.board.food)
		}
		this.apples += 1;
		this.board.food = this.board.generateFood();
	}
	
	Snake.prototype.collideSelf = function () {
		var player = this.pos;
		var segments = this.segments.slice(1);
		
		if (segments.length > 2) {
			for (var i = 1; i < segments.length; i++) {
				if (player[0] === segments[i][0] && player[1] === segments[i][1]) {
					return true;
				}
			}
		}
		
		return false;
	}
	
})(this);