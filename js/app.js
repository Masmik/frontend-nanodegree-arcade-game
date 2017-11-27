//Enemy rendering location
var rows = [65, 145, 225];

// Enemies our player must avoid
var Enemy = function (y) {
    this.y = y;
    var min = 0;
    var max = 500;
    this.x = Math.floor(Math.random() * (max - min + 1)) + min;
    this.speed = Math.floor((Math.random() * 50) + 150);

    //Loading the enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = Math.round(this.x + this.speed * dt * 1.25);

    if (this.x >= 500) {
        this.x = 0;
        this.y = getEnemyRow();
    }
};

//Random choice row for the enemy from the rows arrow
function getEnemyRow() {
    return rows[Math.floor(Math.random() * rows.length)];
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function () {
    this.x = 200;
    this.y = 385;
    this.sprite = 'images/char-boy.png';
};

//Player update & collision function
Player.prototype.update = function () {
    if (this.y < 50) {
        this.reset();
    }

    //Detected Collision
    var collisionFactor = 20;
    allEnemies.forEach(function (enemy) {
        if (this.x - enemy.x < 0) {
            return;
        }

        if (enemy.y === this.y && (this.x - enemy.x) < collisionFactor) {
            console.log("thisX", this.x);
            console.log("player.x - enemy.x", player.x - enemy.x);
            this.reset();
        }
    }.bind(this));
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput realisation
Player.prototype.handleInput = function (key) {

    if (key === 'left' && this.x >= 100) {
        this.x -= 100;
    } else if (key === 'right' && this.x <= 300) {
        this.x += 100;
    } else if (key === 'up' && this.y > 50) {
        this.y -= 80;
        console.log(player.y);
    } else if (key === 'down' && this.y < 360) {
        this.y += 80;
    }
};

//Moving the hero to the starting position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 385;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var enemy1 = new Enemy(rows[0]);
var enemy2 = new Enemy(rows[1]);
var enemy3 = new Enemy(rows[2]);

var allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);
});


