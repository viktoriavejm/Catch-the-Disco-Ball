/***********************************
 * INIT
 * **********************************/
let player = document.getElementById('player');
let randomPic = document.getElementById('random');
let Sammel = document.getElementById('bildSammel');
let spriteImg = document.getElementById('spriteImg');
let surface = document.getElementById('surface');
let img = `<img src="./img/sammel.png"  >`

document.getElementById('startButton').style.display = 'grid'

let surfW = surface.clientWidth;
let surfH = surface.clientHeight;

let info = document.getElementById('info');
let stopButton = document.getElementById('stopGame');
let win = document.getElementById('winn');

let startButton = document.getElementById('startButton');
let debug_output = document.getElementById('debug_output');

let countdown1 = document.getElementById('countdown');
// let scoreBoard = document.getElementById('score');
let score = 0;

// let Highscore20Sek = 0;
// let Highscore40Sek = 0;
// let Highscore60Sek = 0;

let gameCounter = 0;
let allTimeGameCounter = 0

localStorage.setItem("Medientechnik_Sammelspiel_GameCounter", allTimeGameCounter)



// Scale the surface to 95% of the screen width
let surface_scale = 0.70 * (window.innerWidth / surface.clientWidth)
surface.style.transform = `scale(${surface_scale})`;


let find = new Audio('./Sounds/ball.mp3');

function playSound() {
    find.play()
}

let lose = new Audio('./Sounds/fall.mp3')

let yay = new Audio('./Sounds/yay.mp3')




/***********************************
 * GAME CONFIG
 * **********************************/
let spriteImgNumber = 0; // current animation part of sprite image
let gameSpeed = 24; // game loop refresh rate (pictures per second)
let characterSpeed = 6; // move offset in PX



/***********************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;
let letterF = false;
let Shift = false;
let spaceBar = false;
let strg = false;
let W = false;
let A = false;
let S = false;
let D = false;
let X = false;

function keydown_detected(e) {
    //console.log(e);
    //console.log(e.keyCode);
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37) { // leftArrow
        leftArrow = true;
    }
    if (e.keyCode == 38) { //upArrow
        upArrow = true;
    }
    if (e.keyCode == 39) { // rightArrow
        rightArrow = true;
    }
    if (e.keyCode == 40) { // downArrow
        downArrow = true;
    }
    if (e.keyCode == 70) {
        letterF = true;
    }
    if (e.keyCode == 16) {
        Shift = true;
    }
    if (e.keyCode == 32) {
        spaceBar = true;
    }
    if (e.keyCode == 17) {
        strg = true;
    }
    if (e.keyCode == 87) {
        W = true;
    }
    if (e.keyCode == 65) {
        A = true;
    }
    if (e.keyCode == 83) {
        S = true;
    }
    if (e.keyCode == 68) {
        D = true;
    }
    if (e.keyCode == 88) {
        X = true;
    }
}
function keyup_detected(e) {
    //console.log(e);
    //console.log(e.keyCode)
    // console.log(e.keyCode)
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37) { // leftArrow
        leftArrow = false;
    }
    if (e.keyCode == 38) { //upArrow
        upArrow = false;
    }
    if (e.keyCode == 39) { // rightArrow
        rightArrow = false;
    }
    if (e.keyCode == 40) { // downArrow
        downArrow = false;
    }
    if (e.keyCode == 70) {
        letterF = false;
    }
    if (e.keyCode == 16) {
        Shift = false;
    }
    if (e.keyCode == 32) {
        spaceBar = false;
    }
    if (e.keyCode == 17) {
        strg = false;
    }
    if (e.keyCode == 87) {
        W = false;
    }
    if (e.keyCode == 65) {
        A = false;
    }
    if (e.keyCode == 83) {
        S = false;
    }
    if (e.keyCode == 68) {
        D = false;
    }
    if (e.keyCode == 88) {
        X = false;
    }
}





/***********************************
 * GAME LOOP
 * **********************************/
function startGame() {
 
    

    countdown()
    player.style.left = '350px'; // starting position
    player.style.top = '180px'; // starting position
    player.style.opacity = '1'; // show player
    // randomPic.style.left = '250px'; // starting position
    // randomPic.style.top = '100px'; // starting position
    // randomPic.style.opacity = '1'; // show player


    spriteImg.style.right = '0px'; // starting animation

    startButton.innerHTML = 'STARTED';
    startButton.removeAttribute('onclick');

    stopButton.style.display = 'grid'

    randomPic.style.display = 'block'
    countdown1.style.display = 'grid'
    

    placeToken()
    
    if (gameCounter == 0){
        gameLoop();
        if (localStorage.getItem('Medientechnik_Sammelspiel_GameCounter') == 0) {
            if (localStorage.getItem('Zeit') == 20) {
                let Highscore20Sek = score;
                localStorage.setItem('Medientechnik_Sammelspiel_Highscore_20Sek', Highscore20Sek)
            }else if (localStorage.getItem('Zeit') == 40) {
                let Highscore40Sek = score;
                localStorage.setItem('Medientechnik_Sammelspiel_Highscore_40Sek', Highscore40Sek)
            }else{
                let Highscore60Sek = score;
                localStorage.setItem('Medientechnik_Sammelspiel_Highscore_60Sek', Highscore60Sek)
            }
        }
        
    }

    gameCounter++;

}



function gameLoop() {

    counter = 1;
    if (leftArrow || A) {
        movePlayer((-1) * characterSpeed, 0, -1);
        animatePlayer(counter);

    }
    if (rightArrow || D) {
        movePlayer(characterSpeed, 0, 1)
        animatePlayer(counter);

    }
    if (upArrow || W) {
        movePlayer(0, (-1) * characterSpeed, 0);
        animatePlayer(counter);

    }
    if (downArrow || S) {
        movePlayer(0, characterSpeed, 0);
        animatePlayer(counter);

    }
    if (spaceBar) {
        counter = 3;
        movePlayer(1, 0, 0)
        animatePlayer(counter)

    }
    EdgeCheck()
    if (isColliding(player, randomPic, 0)) {
        randomPic.innerHTML = '';
        score++;
        placeToken()
        find.currentTime = 0;
        playSound()

    }
    setTimeout(gameLoop, 1000 / gameSpeed); // async recursion

}



/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: move left || 1: move right || 0: no change)
 */
function movePlayer(dx, dy, dr) {

    // current position
    let x = parseFloat(player.style.left);
    let y = parseFloat(player.style.top);

    // calc new position
    x += dx;
    y += dy;

    // assign new position
    player.style.left = x + 'px';
    player.style.top = y + 'px';

    // handle direction
    if (dr != 0) {
        player.style.transform = `scaleX(${dr})`;
    }

    // output in debugger box
    debug_output.innerHTML = `x: ${x} | y: ${y} | direction: ${dr} | animation: ${spriteImgNumber}`;
}



/***********************************
 * ANIMATE PLAYER
 * **********************************/

let counter;
let jump = 36.6;
let attack = 27.;

function animatePlayer(id) {


    if (id == 1) {
        spriteImg.style.bottom = '90px'
        if (spriteImgNumber < 5) { // switch to next sprite position
            spriteImgNumber++;
            let x = parseFloat(spriteImg.style.right);
            x += jump; // ANPASSEN!
            spriteImg.style.right = x + "px";
        }
        else { // animation loop finished: back to start animation
            spriteImg.style.right = "0px";
            spriteImgNumber = 0;
        }
    } else if (id == 3) {
        spriteImg.style.bottom = '242px'
        if (spriteImgNumber < 5) { // switch to next sprite position
            spriteImgNumber++;
            let x = parseFloat(spriteImg.style.right);
            x += attack; // ANPASSEN!
            spriteImg.style.right = x + "px";
        }
        else { // animation loop finished: back to start animation
            spriteImg.style.right = "0px";
            spriteImgNumber = 0;
        }
    }




}

function showInfo() {
    document.getElementById('INFO').innerHTML = `<h2>Anleitung: Stickman </h2>
    <p>Das Spiel funktioniert so indem man in einer bestimmten 
    Zeit so viel wie möglich Discokugeln einsammelt, 
    pro Kugel ein Punkt. Nachdem die Zeit abgelaufen 
    ist erhältst du deinen Score. Die Steuerung funktioniert 
    mit WASD und mit den Pfeiltasten. Du kannst das Spiel 
    beenden und ein neues starten. Und vielleicht ist 
    dieser Score ja dein nächster Highscore ;) Viel Spass beim spielen!</p>
                                                <div id="Oke" onclick="OK()">OK</div> `
}

function OK() {
    document.getElementById('INFO').style.display = ' none'
    document.getElementById('dashboard').style.display = ' grid'
    // scoreBoard.style.display = 'none'
    startButton.style.display = 'grid'
    info.style.display = 'grid'

}

OK()

function EdgeCheck() {
    let height = surface.clientHeight;
    let width = surface.clientWidth;

    let px = player.offsetLeft;
    let py = player.offsetTop;

    if (px >= width - 40) {
        px = width - width;

    } else if (px <= 0) {
        px = width - 40;
    }


    if (py >= height - 40) {
        py = height - height + 50;

    } else if (py <= 48) {
        py = height - 40;

    }
    player.style.left = px + 'px';
    player.style.top = py + 'px';


}

function stop() {
    score = 0;
    startGame()
    player.style.display = 'inline'
    randomPic.style.display = 'block'
    win.style.display = 'none'
    countdown1.style.color = 'white'

}

function showInfoAgain() {
    showInfo()
    document.getElementById('INFO').style.display = 'grid'
}



function countdown() {
    let counter = localStorage.getItem('Medientechnik_Sammelspiel_Time');
    if(counter == 'undefined'){
        // alert('Bitte wähle einen Gamemode!');
        player.innerHTML = ''
        player.style.display = 'none'
        randomPic.style.display = 'none'
        
        countdown1.style.display = 'none'
        win.style.display = 'inline'
        win.innerHTML = `<p>Bitte wählen Sie einen Gamemode</p>
                        `
    }else{
        const interval = setInterval(() => {
            countdown1.innerHTML = counter;
            counter--;

            randomPic.style.display = 'block'
    
            if (counter <= 4) {
                countdown1.style.color = 'red'
            }
    
            if (counter < 0) {
                clearInterval(interval);
                win.style.display = 'inline'
                
                player.style.display = 'none'
                randomPic.style.display = 'none'
                
                
                document.getElementById('winn').innerHTML = `Your Score is ${score}  !!`

                let HighscoreListe20 = JSON.parse( localStorage['Medientechnik_Sammelspiel_List20'] ?? '[]' );
                let HighscoreListe40 = JSON.parse( localStorage['Medientechnik_Sammelspiel_List40'] ?? '[]' );
                let HighscoreListe60 = JSON.parse( localStorage['Medientechnik_Sammelspiel_List60'] ?? '[]' );

                
                
               
                console.log(localStorage.getItem('Medientechnik_Sammelspiel_Time'))

                    if (localStorage.getItem('Medientechnik_Sammelspiel_Time') == 20) {
                        if (localStorage.getItem('Medientechnik_Sammelspiel_Highscore_20Sek') < score) {
                            Highscore20Sek = score;

                            let newHighscore20 = {
                                'playername': localStorage.getItem('Medientechnik_Sammelspiel_Playername'),
                                'highscore': Highscore20Sek
                            }
                            HighscoreListe20.push(newHighscore20);
                            localStorage['Medientechnik_Sammelspiel_List20'] = JSON.stringify(HighscoreListe20);
                            win.innerHTML += `<br> New Highscore!`
                            yay.play()
                            localStorage.setItem('Medientechnik_Sammelspiel_Highscore_20Sek', Highscore20Sek)
                        }else{
                            lose.currentTime = 0;
                            lose.play()
                        }
                    }else if (localStorage.getItem('Medientechnik_Sammelspiel_Time') == 40) {
                        if (localStorage.getItem('Medientechnik_Sammelspiel_Highscore_40Sek') < score) {
                            Highscore40Sek = score;

                            let newHighscore40 = {
                                'playername': localStorage.getItem('Medientechnik_Sammelspiel_Playername'),
                                'highscore': Highscore40Sek
                            }

                            HighscoreListe40.push(newHighscore40);
                            localStorage['Medientechnik_Sammelspiel_List40'] = JSON.stringify(HighscoreListe40);
                            win.innerHTML += `<br> New Highscore!`
                            yay.play()
                            localStorage.setItem('Medientechnik_Sammelspiel_Highscore_40Sek', Highscore40Sek)
                        }else{
                            lose.currentTime = 0;
                            lose.play()
                        }
                    }else{
                        if (localStorage.getItem('Medientechnik_Sammelspiel_Highscore_60Sek') < score) {
                            Highscore60Sek = score;

                            let newHighscore60 = {
                                'playername': localStorage.getItem('Medientechnik_Sammelspiel_Playername'),
                                'highscore': Highscore60Sek
                            }
            
                            HighscoreListe60.push(newHighscore60);
                            localStorage['Medientechnik_Sammelspiel_List60'] = JSON.stringify(HighscoreListe60);
                            win.innerHTML += `<br> New Highscore!`
                            yay.play()
                            localStorage.setItem('Medientechnik_Sammelspiel_Highscore_60Sek', Highscore60Sek)
                        }else{
                            lose.currentTime = 0;
                            lose.play()
                        }
                    }
                

                countdown1.style.display = 'none'
            }
        }, 1000);
    }
    
}

function RandomNumber(id) {
    let random = Math.random();
    random = random * id;
    random = Math.ceil(random);

    // console.log(random)

    return random;
}

function placeToken() {
    let x = RandomNumber(surface.clientWidth);
    let y = RandomNumber(surface.clientHeight);

    randomPic.innerHTML = img;

    if (y <= 50) {
        y += 70;
    }

    if (y >= 354) {
        y -= 70;
    }

    if (x <= 6) {
        x += 50;
    } else if (x >= 758) {
        x -= 50;
    }


    randomPic.style.left = x + "px";
    randomPic.style.top = y + "px";
    randomPic.style.opacity = 1
}



/**

 * Checks intersection between two html elements

 * @param {HTMLElement} div1 - Reference to first html element
 * @param {HTMLElement} div2 - Reference to second html element
 * @param {number} tolerance - Integer to change accuracy of collission (0: default, negative number: detect later, positive number: detect earlier)
 * @returns {boolean} - true or false depending on collision

 */


function isColliding(div1, div2, tolerance = 0) {
    let d1OffsetTop = div1.offsetTop;
    let d1OffsetLeft = div1.offsetLeft;
    let d1Height = div1.clientHeight;
    let d1Width = div1.clientWidth;
    let d1Top = d1OffsetTop + d1Height;
    let d1Left = d1OffsetLeft + d1Width;

    let d2OffsetTop = div2.offsetTop;
    let d2OffsetLeft = div2.offsetLeft;
    let d2Height = div2.clientHeight;
    let d2Width = div2.clientWidth;
    let d2Top = d2OffsetTop + d2Height;
    let d2Left = d2OffsetLeft + d2Width;

    let distanceTop = d2OffsetTop - d1Top;
    let distanceBottom = d1OffsetTop - d2Top;
    let distanceLeft = d2OffsetLeft - d1Left;
    let distanceRight = d1OffsetLeft - d2Left;

    return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);

};




