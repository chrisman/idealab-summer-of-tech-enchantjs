enchant(); //the magic words that start enchant.js


//Stage Variables
var moveSpeed = 4;
var stgWidth = 320;
var stgHeight = 320;

/**
 *  Three Sprite-type classes
 *  1) Player
 *  2) Gem
 *  3) Bomb
 */

//02 Player Class
Player = Class.create(Sprite, {
    initialize: function() {
		//02 Add Player

        //04 Bind Keys
        
        //05 Mouse Variables
    },

    onenterframe: function() {
        //03 Player Controls
        
        //05 Mouse Update
    }
});

//07 Gem Class
Gem = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 32, 32);
        this.image = game.assets['res/badges.png'];
		//07 Gem initialize
    },

    onenterframe: function() {

        //07 Rotating using scaleX
        
        //09 Collision Check
    }
});

//11 Bomb Class
Bomb = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 32, 32);
        this.image = game.assets['res/thesuck.png'];
        this.x = Math.random() * (stgWidth - 32);
        this.y = Math.random() * (stgHeight - 32); //Account for the bottom part
        if (this.y < 50) { // account for top bar.
            this.y = 50;
        }

        this.frame = [
			0,0,0,0,
			1,1,1,1,
			2,2,2,2,
			1,1,1,1];
    },

    onenterframe: function() {
        if (this.age === 60) {
            game.currentScene.removeChild(this);
        }

        if (this.intersect(player)) {
            player.health--;
            game.currentScene.removeChild(this);
            console.log("ouch!");
        }

    }
});

/**
 *  Two Scene-type classes
 *  1) SceneGameOver
 *  2) SceneGame
 */

SceneGameOver = Class.create(Scene, {
	initialize: function(score) {
		console.log("Game Over!" + score);

		Scene.apply(this);
		this.backgroundColor = 'black';

		finalScoreLabel = new Label('SCORE<br>' + score);
		finalScoreLabel.x = 9;
		finalScoreLabel.y = 32;
		finalScoreLabel.color = 'white';
		finalScoreLabel.font = '16px strong';
		finalScoreLabel.textAlign = 'center';
		this.addChild(finalScoreLabel);

		gameOverLabel = new Label();
		gameOverLabel.text = "Game Over!<br><br>Touch to restart.";
		gameOverLabel.x = 8;
		gameOverLabel.y = 128;
		gameOverLabel.color = 'white';
		gameOverLabel.font = '32px strong';
		gameOverLabel.textAlign = 'center';
		this.addChild(gameOverLabel);

		this.addEventListener('touchend', this.touchToRestart);
	},

	touchToRestart: function() {
		game.replaceScene(new SceneGame(player.score));
	}
});

SceneGame = Class.create(Scene, {
	initialize: function() {
		Scene.apply(this);

		//01 Add Background
        
        //02 Add Player
        
        //07 Add Gem
        
        //08 Score Label
        
        //11 Health Label


		this.addEventListener('touchend', this.handleInput);
        this.addEventListener('enterframe', this.update);
	}, 

	handleInput: function(e) {
		//06 Touch Listener
	},

	update: function() {
		//12 Game Over
		
		//10 Make Bomb Generator
	}
});

/**
 *  One game!
 */

//Begin game code
window.onload = function() {
    game = new Game(stgWidth, stgHeight);
    //Preload images
    //Any resources not preloaded will not appear
    game.preload('res/staff.png', 'res/badges.png');

    game.onload = function() { //Prepares the game
        var scene = new SceneGame();
		game.pushScene(scene);
    }

	game.start(); //Let the game begin!
}
