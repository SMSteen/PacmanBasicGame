//create the levels to populate to world
//2 = brick, 1 = coin, 0 = empty, 3 = exit;
//create level details (pacmans's starting/ending positions, enter/exit points, # of coins
var levels = [
    [
        {
            board: [//level 1, 9X15 board, 61 coins
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,1,2,2,1,2,1,1,1,1,1,2,2,1,2],
                [2,1,2,2,1,2,2,1,2,2,1,2,2,1,2],
                [3,1,1,1,1,2,2,1,2,2,1,1,1,1,3],
                [2,1,2,2,1,2,2,1,2,2,1,2,2,1,2],
                [2,1,2,2,1,1,1,1,1,2,1,2,2,1,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
            ],
            details: {
                x: 0,
                y: 4,
                xStart: 0,
                yStart: 4,
                xEnd: 14,
                yEnd: 4,
                coins: 61     
            }
        }
    ],
    [
        {
            board: [ //level 2, 9x15 board
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,1,1,1,2,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,2,1,1,1,2],
                [2,2,1,2,2,1,2,2,2,1,2,2,1,2,2],
                [3,1,1,1,1,1,2,2,2,1,1,1,1,1,3],
                [2,2,1,2,2,1,2,2,2,1,2,2,1,2,2],
                [2,1,1,1,2,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,2,1,1,1,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
            ],
            details: {//level 2 start position, enter/exit points, 62 coins
                x: 0,
                y: 4,
                xStart: 0,
                yStart: 4,
                xEnd: 14,
                yEnd: 4,
                coins: 62
            }
        }
    ],
    [
        {
            board: [ //level 3, 10x15 board
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
                [2,1,1,1,2,2,2,1,2,2,2,1,1,1,2],
                [2,1,1,1,2,1,1,1,1,1,2,1,1,1,2],
                [2,1,2,2,1,1,2,1,2,2,1,1,2,2,2],
                [2,2,2,1,1,2,2,1,2,1,1,2,2,1,2],
                [2,1,1,1,2,1,1,1,1,1,2,1,1,1,2],
                [2,1,1,1,2,2,2,1,2,2,2,1,1,1,2],
                [3,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]           
            ],
            details: {//level 3 start position, enter/exit points, 74 coins
                x: 0,
                y: 8,
                xStart: 0,
                yStart: 8,
                xEnd: 14,
                yEnd: 1,
                coins: 74
            }
        }
    ]
]

var fruits = [
    {
        cherry: {
            name: "cherry",
            x: 8,
            y: 2,
            xStart: 8,
            yStart: 2,
            xEnd: 14,
            yEnd: 1,
            speed: 1000,
            value: 100
        }
    },
    {
        strawberry: {
            name: "strawberry",
            x: 11,
            y: 4,
            xStart: 11,
            yStart: 4,
            xEnd: 14,
            yEnd: 1,
            speed: 900,
            value: 300
        }
    }
]

// keep track of the level, increment accordingly and update all variables.
var currentLevel = 0;

//create the board, starting at level1; as levels increment, replace world with new level
var world = levels[currentLevel][0].board;

//pacman's position where y=row(world[i]), x=cell(world[i][j])
var pacman = levels[currentLevel][0].details;

// establish coinsEaten counter and score counter
var coinsEaten = 0;
var score = 0;

// initialize the fruit, starting with the cherry
var fruit = fruits[0].cherry;
var speed = fruit.speed;
intervalManager(true, moveFruit, speed);

//show the world
function showWorld(){
    var output = '';
    for(var i=0; i<world.length; i++){//iterate through the array (rows)
        output += "<div class='row'>"; //start the row div
        for (var j=0; j<world[i].length; j++){//iterate through the subarray (cells)
            if(world[i][j] == 2){ //put in bricks, coins, empties
                output += "<div class='brick'></div>";
            } else if(world[i][j] == 1){
                output += "<div class='coin'></div>";
            } else if(world[i][j] == 3){
                output += "<div class='exit'></div>";
            } else {
                output += "<div class='empty'></div>";
            }
        }
        output += "</div>" //end the row div
    }
    document.getElementById('world').innerHTML = output;
}

//show pacman
function showPacman(){
    document.getElementById('pacman').style.top = pacman.y*20+"px";
    document.getElementById('pacman').style.left = pacman.x*20+"px";
}

//show fruit
function showFruit(){
    document.getElementById('fruit').style.top = fruit.y*20+"px";
    document.getElementById('fruit').style.left = fruit.x*20+"px";
}

//update the score
function updateScore(){
    document.getElementById('score').innerHTML = score;
    if (coinsEaten == levels[currentLevel][0].details.coins){
        document.getElementById('complete').style.display = "block";
        document.getElementById('fruit').style.display = "none";
        setTimeout(changeLevel, 6000);
        intervalManager(false);
    }   
}

function changeLevel(){
    //hide level complete msg
    document.getElementById('complete').style.display = "none";
    //go to the next level
    currentLevel++;
    //reset coinsEaten
    coinsEaten = 0;
    //reset the world
    world = levels[currentLevel][0].board;
    showWorld();
    //reset pacman
    pacman = levels[currentLevel][0].details;
    document.getElementById('pacman').style.transform = "rotate("+0+"deg)";
    showPacman();
    //reset the fruit if it was eaten last round
    if(document.getElementById('cherry').style.display == "inline"){//the cherry was eaten
        fruit = fruits[1].strawberry;
        document.getElementById('fruit').style.display = "block";
        document.getElementById('fruit').style.backgroundImage = "url(images/strawberry.png)";
        intervalManager(true, moveFruit, speed);
    }
    showFruit();
}
//when pacman exits one side, enter the other
function exitBoard(exitDir){
    if(exitDir == 37){ //exiting left, move to right side(end)
        pacman.x = pacman.xEnd;
        pacman.y = pacman.yEnd;
    } else if (exitDir == 39){ //exiting right, move to left side (start)
        pacman.x = pacman.xStart;
        pacman.y = pacman.yStart;
    }
    showPacman();
}
              
//when user moves pacman left/right/up/down
document.onkeydown = function(e){
    var exitDir = e.keyCode;
    if(e.keyCode == 37){
        document.getElementById('pacman').style.transform = "rotate("+180+"deg)";
        if(pacman.x == 0 && world[pacman.y][pacman.x] == 3){//if pacman is in a doorway, exit/enter
            exitBoard(exitDir);
        } else if (world[pacman.y][pacman.x-1] != 2){//otherwise, if no barrier, move pacman left
            pacman.x--;
        }
    } else if(e.keyCode == 39){
        document.getElementById('pacman').style.transform = "rotate("+0+"deg)";
        if(pacman.x == 14 && world[pacman.y][pacman.x] == 3){//if pacman is in a doorway, exit/enter
            exitBoard(exitDir);
        } else if (world[pacman.y][pacman.x+1] != 2){//otherwise, if no barrier, move pacman right
            pacman.x++;
        }
    } else if(e.keyCode == 38 && world[pacman.y-1][pacman.x] != 2){//move pacman up
        document.getElementById('pacman').style.transform = "rotate("+-90+"deg)";
        pacman.y--;
    } else if(e.keyCode == 40 && world[pacman.y+1][pacman.x] != 2){ //move pacman down
        document.getElementById('pacman').style.transform = "rotate("+90+"deg)";
        pacman.y++;
    }
    
    if(world[pacman.y][pacman.x] == 1){ //found a coin
        world[pacman.y][pacman.x] = 0; //eat the coin, make block empty
        score += 10; //add 10pts for coin
        coinsEaten++; //update coinsEaten counter
    }

    showPacman();
    showWorld();
    updateScore();
}


function moveFruit(){
    var direction = getDirection();
    if(direction == 37){//random direction left
        if(world[fruit.y][fruit.x-1] == 2){
            //if against a wall, get a new direction
            getDirection();    
        } else{ //move left
            fruit.x--;
        }
    } else if (direction == 38){//random direction right
        if(world[fruit.y][fruit.x+1] == 2){
            //if against a wall, get a new direction
            getDirection();    
        } else{ //move right
            fruit.x++;
        }    
    } else if (direction == 39){//random direction up
        if(world[fruit.y-1][fruit.x] == 2){
            //if against a wall, get a new direction
            getDirection();    
        } else{ //move up
            fruit.y--;
        } 
    } else if (direction == 40){//random direction down
        if(world[fruit.y+1][fruit.x] == 2){
            //if against a wall, get a new direction
            getDirection();    
        } else{ //move down
            fruit.y++;
        } 
    }
    showFruit();
    if(fruit.y == pacman.y && fruit.x == pacman.x){//pacman ate the fruit
        score += fruit.value; //add points for fruit
        intervalManager(false); //clear the fruit from the board
        document.getElementById('fruit').style.display = "none";
        document.getElementById(fruit.name).style.display = "inline";
    }
}

function getDirection(){
    //generate a random # between 37-40 represent left/right/up/down
    return Math.floor(Math.random()*(41-37)+37);
}

// var int = setInterval(moveFruit, fruit.speed);

var intervalID = null;

function intervalManager(flag, moveFruit, speed){
   if(flag)
     intervalID = setInterval(moveFruit, speed);
   else
     clearInterval(intervalID);
}