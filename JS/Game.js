class Game {
    constructor() {
        //this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
    }
    update(gRef) {
        database.ref("/").update({
            gameState: gRef
        });


    }

    start() {
        player = new Players()
        player.getCount()
        form = new Form()
        form.handlePlayerElements()
        boy = createSprite(width / 2 - 50, height - 200)
        boy.addImage("boy1", boyImg);
        boy.scale = 0.3
        girl = createSprite(width / 2 + 100, height - 210)
        girl.addImage("girl1", girlImg);
        girl.scale = 0.2
        humans = [boy, girl]
        spaceGroup = new Group()
        obstacles = new Group()
        coinGroup = new Group()
        this.addSprites(spaceGroup, 8, spaceGoo, 0.09 )
        this.addSprites(obstacles, 8, UFO, 0.09 )
        this.addSprites(coinGroup, 8, coin, 0.09 )
    }

    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {

        for (var i = 0; i < numberOfSprites; i++) {
            var x, y;

            console.log(positions);
            if (positions.length > 0) {
                x = positions[i].x
                y = positions[i].y
                spriteImage = positions[i].image
            } else {
                //change positions of obstacles
                x = random(width / 2 + 350, width / 2 - 350);
                y = random(-height * 4.5, height - 400);
            }


            var sprite = createSprite(x, y);
            sprite.addImage("sprite", spriteImage);

            sprite.scale = scale;
            spriteGroup.add(sprite);
        }
    }

    getState() {
        var gsRef = database.ref("gameState");
        gsRef.on("value", function (data) {
            gameState = data.val()

        })
    }

    play() {
        this.handleElements()
        this.handleResetButton()
        Players.getPlayersInfo()
        if (allPlayers !== undefined) {
            image(spacePortal, 650, -height * 5, 50, 100)
            var index = 0
            for (var plr in allPlayers) {
                index += 1
                var x = allPlayers[plr].positionX;
                var y = height - allPlayers[plr].positionY;

                humans[index - 1].position.x = x;
                humans[index - 1].position.y = y;

                if (index === player.index) {
                    stroke(10);
                    fill("#4fe0a6");
                    ellipse(x, y, 60, 60);

                    // Changing camera position in y direction
                    camera.position.y = humans[index - 1].position.y;
                }
            }

            this.handlePlayerControls()
            drawSprites()
        }
    }

    handleElements() {
        form.hide();


        // this.resetTitle.html("Reset Game");
        // this.resetTitle.class("resetText");
        // this.resetTitle.position(width/2, 225);

        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 400, 50);
    }

    handleResetButton() {
        this.resetButton.mousePressed(() => {
            database.ref("/").set({
                gameState: 0,
                playerCount: 0,
                players: {}
            })
            window.location.reload()
        })
    }

    handlePlayerControls() {
        if (keyIsDown(UP_ARROW)) {
            player.positionY += 10;
            player.update();
        }

        if (keyIsDown(RIGHT_ARROW)) {
            player.positionX += 5;
            player.update();
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.positionX -= 5;
            player.update();
        }
    }
}