var type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

//Aliases
var Container = PIXI.Container,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache,
    Text = PIXI.Text,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    utils = PIXI.utils,
    Sprite = PIXI.Sprite;

//var TextureCache = PIXI.utils.TextureCache;

utils.sayHello(type);

//Create the renderer
//var renderer = PIXI.autoDetectRenderer(256, 256);

var renderer = autoDetectRenderer(
    256, 256,
    { antialias: false, transparent: true, resolution: 1 }
);

//renderer.view.style.border = "1px dashed black";
//renderer.backgroundColor = 0x061639;
renderer.autoResize = true;
//renderer.resize(512, 512);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

//PIXI.utils.TextureCache["img/player.png"];

// PIXI.loader
//   .add("images/imageOne.png")
//   .add("images/imageTwo.png")
//   .add("images/imageThree.png")
//   .load(setup);

// PIXI.loader
//   .add([
//     "images/imageOne.png",
//     "images/imageTwo.png",
//     "images/imageThree.png"
//   ])
//   .load(setup);

// loader
//     .add("img/player.png")
//     .on("progress", loading)
//     .load(setup);

loader
    .add([
        "img/player.png",
        "img/characters.png"
    ])
    .load(setup);

function loading(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the precentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    //If you gave your files names as the first argument 
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);

}

//Define any variables that are used in more than one function
var playerSprite;

function setup() {

    console.log('loading completed.');

    //Capture the keyboard arrow keys
    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = function () {

        //Change the cat's velocity when the key is pressed
        playerSprite.vx = -5;
        playerSprite.vy = 0;
    };

    //Left arrow key `release` method
    left.release = function () {

        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
        }
    };

    //Up
    up.press = function () {
        playerSprite.vy = -5;
        playerSprite.vx = 0;
    };
    up.release = function () {
        if (!down.isDown && playerSprite.vx === 0) {
            playerSprite.vy = 0;
        }
    };

    //Right
    right.press = function () {
        playerSprite.vx = 5;
        playerSprite.vy = 0;
    };
    right.release = function () {
        if (!left.isDown && playerSprite.vy === 0) {
            playerSprite.vx = 0;
        }
    };

    //Down
    down.press = function () {
        playerSprite.vy = 5;
        playerSprite.vx = 0;
    };
    down.release = function () {
        if (!up.isDown && playerSprite.vx === 0) {
            playerSprite.vy = 0;
        }
    };



    //Create the `tileset` sprite from the texture
    var texture = TextureCache["img/characters.png"];

    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    var rectangle = new Rectangle(192, 128, 24, 32);

    //Tell the texture to use that rectangular section
    texture.frame = rectangle;

    //Create the sprite from the texture
    var rocket = new Sprite(texture);

    //Position the rocket sprite on the canvas
    rocket.x = 32;
    rocket.y = 32;

    //Add the rocket to the stage
    stage.addChild(rocket);

    //Create the `cat` sprite, add it to the stage, and render it
    playerSprite = new Sprite(resources["img/player.png"].texture);
    stage.addChild(playerSprite);
    renderer.render(stage);

    //playerSprite.width = 16;
    //playerSprite.height = 16;

    //playerSprite.scale.x = 0.5;
    //playerSprite.scale.y = 0.5;

    //playerSprite.scale.set(0.5, 0.5);

    //playerSprite.anchor.x = 0.5;
    //playerSprite.anchor.y = 0.5;

    playerSprite.anchor.set(0.5, 0.5)

    playerSprite.rotation = 0.5;

    playerSprite.x = 96;
    playerSprite.y = 96;

    renderer.render(stage);

    playerSprite.position.set(128, 128);

    renderer.render(stage);

    //Initialize the cat's velocity variables
    playerSprite.vx = 0;
    playerSprite.vy = 0;

    var message = new Text("No Lives Worth Saving", { fontFamily: "Calibri Light", fontSize: 32, fill: "white", weight: 100 });

    message.position.set(150, 20);
    stage.addChild(message);


    //Set the game's current state to `play`:
    var state = play;

    //Start the game loop
    gameLoop();

    // var playerSprite = new PIXI.Sprite(
    //     loader.resources["img/player.png"].texture
    // );

    // stage.addChild(playerSprite);
    //stage.removeChild(playerSprite);
    //playerSprite.visible = false;

    // renderer.render(stage);

}

// var texture = PIXI.utils.TextureCache["img/player.png"];
// var sprite = new PIXI.Sprite(texture);

// PIXI.loader
//   .add("img/player.png")
//   .load(setup);


// function setup() {
//   //This code will run when the loader has finished loading the image
//   console.log('setup!');
// }

function gameLoop() {

    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);

    //Update the current game state:
    play();

    //Render the stage to see the animation
    renderer.render(stage);
}

function play() {

    //Use the cat's velocity to make it move
    playerSprite.x += playerSprite.vx;
    playerSprite.y += playerSprite.vy;

    //check for a collision between the cat and the box
    // if (hitTestRectangle(cat, box)) {

    //     //if there's a collision, change the message text
    //     //and tint the box red
    //     message.text = "hit!";
    //     box.tint = 0xff3300;

    // } else {

    //     //if there's no collision, reset the message
    //     //text and the box's color
    //     message.text = "No collision...";
    //     box.tint = 0xccff99;
    // }

    //Move the cat 1 pixel to the right each frame
    //playerSprite.x += 1;

    //Update the cat's velocity
    //playerSprite.vx = 1;
    //playerSprite.vy = 1;

    //Apply the velocity values to the cat's 
    //position to make it move
    //playerSprite.x += playerSprite.vx;
    //playerSprite.y += playerSprite.vy;

    //What if you want to make the cat move in a different direction? To make the cat move to the left, give it a vx value of -1. 
    // To make it move up, give the cat a vy value of -1. To make the cat move faster, give it larger vx and vy values, like 3, 5, -2, or -4.
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //The `downHandler`
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );

    return key;
}

function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};