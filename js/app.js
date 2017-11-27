// Enemies our player must avoid
var rows = [60, 145, 225];

var Enemy = function (y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = y;
    var min = 0;
    var max = 500;
    this.x = Math.floor(Math.random() * (max - min + 1)) + min;
    this.speed = Math.floor((Math.random() * 50) + 150);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // dt *= 2;

    this.x = Math.round(this.x + this.speed * dt * 1.25);

    if (this.x >= 500) {
        this.x = 0;
        this.y = getEnemyRow();
    }
};

function getEnemyRow() {
    return rows[Math.floor(Math.random() * rows.length)];
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.y < 40) {
        player.reset();
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x >= 100) {
        this.x -= 100;
    } else if (key === 'right' && this.x <= 300) {
        this.x += 100;
    } else if (key === 'up' && this.y > 80) {
        this.y -= 80;
    } else if (key === 'down' && this.y < 360) {
        this.y += 80;
    }
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
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
