(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board();
    this.snake = this.board.snake;
    this.speed = 150;
		this.applesLeft = 0;
		this.mode = 0;
    this.score = 0; //score or stage
    this.renderBoard();
  }

  View.prototype.start = function (mode) {
		this.bindKeys();
		this.mode = mode;
		
		if (this.mode > 0) {
			$("#game-type").html("Level: <div id='stat'></div>");
			$("#level-apples").removeClass("hidden");
			this.stage = this.mode;
			this.board.levelMode = true;
		} else {
			$("#game-type").html("Score: <div id='stat'></div>");
			$("#level-apples").addClass("hidden");
		}

    var view = this;
    this.interval = setInterval(function () {
      view.step();
    }, this.speed);
  }

  View.prototype.step = function () {
    this.snake.move();
    
		if (this.board.grid[this.board.food[0]][this.board.food[1]] === "wall") {
			this.board.food = this.board.generateFood();
		}
		if (this.mode === 0 && this.snake.segments.length <= 20) this.checkSpeed();
    if (this.snake.gameover) this.endGame();
		
    this.updateScore();
    this.renderBoard();
  }

  View.prototype.bindKeys = function () {
    var snake = this.snake;
    var view = this;

    $(document).on("keydown", function () {
      event.preventDefault();
			
			var key = event.which;
			
			if (key === 37) {
				if (snake.segments.length <= 2) {
					snake.turn("W");
				} else if (snake.dir != "E") {
					snake.turn("W");
				}
			} else if (key === 38) {
				if (snake.segments.length <= 2) {
					snake.turn("N");
				} else if (snake.dir != "S") {
					snake.turn("N");
				}
			} else if (key === 39) {
				if (snake.segments.length <= 2) {
					snake.turn("E");
				} else if (snake.dir != "W") {
					snake.turn("E");
				}
			} else if (key === 40) {
				if (snake.segments.length <= 2) {
					snake.turn("S");
				} else if (snake.dir != "N") {
					snake.turn("S");
				}
			}
    });
  }

  View.prototype.checkSpeed = function () {
    var that = this;
    var changeSpeed = function (newSpeed) {
      that.stop();
      that.speed = newSpeed;
      that.start();
    }

    if (this.snake.segments.length === 10 && this.speed != 125) {
      changeSpeed(125);
    } else if (this.snake.segments.length === 15 && this.speed != 100) {
      changeSpeed(100);
    } else if (this.snake.segments.length === 20 && this.speed != 90) {
      changeSpeed(90);
    }
  }

  View.prototype.updateScore = function () {
    var that = this;
		
		var changeStage = function () {
      that.stop();
			that.mode += 1;
			
			if (that.mode === 2) {
				that.snake.pos = [SnakeGame.Board.CENTER[0] + 5, SnakeGame.Board.CENTER[1] + 5];
				that.snake.segments = [this.pos];
	      that.board.level += 1;
	      that.start(that.mode);
				that.snake.dir = null;
				that.snake.apples = 0;
				that.speed = 125;
				
			} else if (that.mode === 3) {
				that.snake.segments = [this.pos];
	      that.board.level += 1;
				that.snake.pos = SnakeGame.Board.CENTER;
				that.start(that.mode);
				that.snake.dir = null;
				that.snake.apples = 0;
				that.speed = 100;
			} else if (that.mode === 4) {
				that.endGame();
			}
			
    }
		
		if (this.mode > 0) {
			this.score = this.board.level;
			this.applesLeft = 8 - (this.snake.apples);
			if (this.applesLeft === 0 && this.mode != 4) changeStage();
		} else {
			this.score = (this.snake.segments.length - 1) * 10;
		}
    
  }

  View.prototype.stop = function () {
    clearInterval(this.interval);
    $(document).unbind("keydown");
  }

  View.prototype.endGame = function () {
    this.stop();
    var $section = this.$el.find(".game-status");
		$('#instructions').remove();
		$('.game-status').removeClass("hidden");
		$('#gameover').addClass("show");
		$('.start').prop('disabled', false)
		
		if (this.score === 3 && this.applesLeft === 0) {
			$('#gameover').html("<h1>VICTORY</h1");
		} else if (this.score < 10 && this.score > 0)	{
			$('#gameover').html("<h1>Gameover!</h1");
		} else {
			$('#gameover').html("<h1>Gameover!</h1><h2>Rank: <strong id='rank'></strong></h2>")
			
			if (this.score < 30) {
				$("strong#rank").html('Peasant Snake');
			} else if (this.score < 100) {
				$("strong#rank").html('Common Snake');
			} else if (this.score < 150) {
				$("strong#rank").html('Decent Snake');
			} else if (this.score < 250) {
				$("strong#rank").html('Master Snake');
			} else if (this.score > 250) {
				$("strong#rank").html('King of Snakes');
			}
		
		}
  }

  View.prototype.renderBoard = function () {
    this.board.constructBoard();
    var $el = this.$el.find(".board");
		var dimensions = SnakeGame.Board.DIMS;
		
    $el.empty();
    $("div#stat").html(this.score);
		if (this.mode > 0){
			$("#appleReq").html(this.applesLeft);
		}

		for (var i = 0; i < dimensions; i++){
			for (var j = 0; j < dimensions; j++) {
				if (this.board.grid[i][j] === "segment") {
					$el.append("<div class='snake'>");
				} else if (this.board.grid[i][j] === "player") {
					$el.append("<div class='snake head'>");
				} else if (this.board.grid[i][j] === "apple") {
					$el.append("<div class='apple'>");
				} else if (this.board.grid[i][j] === "wall") {
					$el.append("<div class='wall'>");
				} else {
					$el.append("<div class='space'>");
				}
			}
		}
  }
})(this);