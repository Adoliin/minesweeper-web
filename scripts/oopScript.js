let thisGame = new NewGame();
let graphics = new Visual_TextAndInfo();


class NewGame {
    constructor() {
        this.gridDimension = 3
        this.levelX = Math.floor(gridDimension ** 2 / 2);
        this.gridBox = initGrid(gridDimension);
        this.lvl = 1;
        this.reachedX = false;
        this.startedPlaying = false;
        this.startedAddingLvls = false;
    }

    initGame() {
        this.levelX = Math.floor(gridDimension ** 2 / 2);
        this.gridBox = initGrid(gridDimension);
        this.lvl = 1;
        this.reachedX = false;
        this.startedPlaying = false;
        this.staredAddingLvls = false;
    }

    initGrid(gridDimension) {
        gridBox = {};
        for (var i = 1; i <= gridDimension; i++) {
            for (var j = 1; j <= gridDimension; j++) {
                var bNN = 'b' + i + "-" + j;
                gridBox[bNN] = 0;
            }
        }
        var mD = Math.floor(gridDimension / 2) + 1;
        middleBoxij = "b" + mD + "-" + mD;
        gridBox[midBox] = 1;
        return gridBox;
    }

    isGridFull(gridDimension) {
        for (i = 1; i <= gridDimension; i++) {
            for (j = 1; j <= gridDimension; j++) {
                if (this.gridBox['b' + i + "-" + j] == 0) {
                    break;
                }
            }
            if (this.gridBox['b' + i + "-" + j] == 0) {
                return false;
            }
        }
        return true;
    }

    didItWin(normalBox) {
        var b0 = $(normalBox);
        for (i = 0; i < b0.length; i++) {
            var btnNum = b0[i].classList[0];
            if (this.gridBox[btnNum] == 0) {
                return false;
            }
        }
        return true;
    }
}

class Visual_TextAndInfo {
    //the classCSS is an object containing all the CSS classes names
    constructor(classCSS) {
        this.startBtn = '.' + classCSS.startBtn;
        this.textTitle = '.' + classCSS.textTitle;
        this.textInfo = '.' + classCSS.textInfo;
        this.normalBox = '.' + classCSS.normalBox;
        this.midlleBox = '.' + classCSS.midlleBox;

        this.dangerBox = classCSS.dangerBox;
        this.safeBox = classCSS.safeBox;
        this.makeBoxVisible = classCSS.makeBoxVisible;

    }

    showStartBtn(cmd) {
        if (cmd === "appear") {
            $(this.startBtn)[0].classList.add(this.makeBoxVisible);
        } else {
            $(this.startBtn)[0].classList.remove(this.makeBoxVisible);
        }
    }

    changeTitle(msg) {
        $(this.textTitle).text(msg);
    }

    showInfo(msg, cmd) {
        if (cmd === "appear") {
            $(this.textInfo)[0].classList.add(this.makeBoxVisible);
            $(this.textInfo).text(msg);
        } else {
            $(this.textInfo)[0].classList.remove(this.makeBoxVisible);
        }
    }

    markRndBox(gridBox, isGridFull, gridDimension) {
        var ok = false;

        while (!ok && !isGridFull()) {
            var rndRow = Math.floor(Math.random() * gridDimension) + 1;
            var rndCol = Math.floor(Math.random() * gridDimension) + 1;
            var rndBox = "b" + rndRow + "-" + rndCol;
            ok = (gridBox[rndBox] !== 1);
        }
        if (isGridFull()) {
            console.log("Grid is full!");
        } else {
            gridBox[rndBox]++;
            $("." + rndBox)[0].classList.add(this.dangerBox);
        }
    }

    removeRndBoxes() {
        var b0 = $(this.normalBox);
        for (i = 0; i < b0.length; i++) {
            b0[i].classList.remove(this.dangerBox);
            b0[i].classList.remove(this.safeBox);
        }
    }

    showSafeBoxes(gridBox) {
        var b0 = $(this.normalBox);
        for (let i = 0; i < b0.length; i++) {
            var btnNum = b0[i].classList[0];
            if (gridBox[btnNum] == 0 || gridBox[btnNum] == 2) {
                b0[i].classList.add(this.safeBox);
            }

            if (gridBox[btnNum] == 1) {
                b0[i].classList.add(this.dangerBox);
            }
        }
    }

}


function addingLevels(thisGame, graphics) {

    if (thisGame.lvl !== 0) {
        graphics.showInfo("Press Enter or the start button below to start playing !", "appear");
        graphics.showStartBtn("appear");

    }
    if (thisGame.lvl === 0) {
        graphics.changeTitle("LEVEL 0");
        graphics.showInfo("You lost ! Press on the middle button to restart adding levels !", "appear");
        graphics.startBtn("dissapear");
        thisGame.initGame();

    } else if (thisGame.lvl < thisGame.levelX) {
        if (thisGame.reachedX) {
            graphics.changeTitle("LEVEL " + thisGame.lvl);
            thisGame.lvl--;
        } else {
            graphics.changeTitle("LEVEL " + thisGame.lvl);
            thisGame.lvl++;
        }
        graphics.markRndBox(thisGame.gridBox, thisGame.isGridFull, thisGame.gridDimension);
    } else if (thisGame.lvl === thisGame.levelX) {
        thisGame.reachedX = true;
        graphics.changeTitle("LEVEL X");
        thisGame.lvl--;
        graphics.markRndBox(thisGame.gridBox, thisGame.isGridFull, thisGame.gridDimension);
    }
}

function clickedStart() {

    $(document).on("keypress", function (e) {
        var conditionToStart = ((thisGame.lvl > -1 && thisGame.reachedX) || (thisGame.lvl > 1 && !thisGame.reachedX));
        if (e.key == "Enter" && !thisGame.startedPlaying && conditionToStart) {
            thisGame.startedPlaying = true;
            gameStart();
        }
    });

    $(".start-button").on("click", function () {
        var conditionToStart = ((thisGame.lvl > -1 && thisGame.reachedX) || (lvl > 1 && !thisGame.reachedX));
        if (!thisGame.startedPlaying && conditionToStart) {
            thisGame.startedPlaying = true;
            gameStart();
        }
    });

    function gameStart() {
        graphics.removeRndBoxes();
        graphics.showInfo("-", "dissapear");
        graphics.startBtn("dissapear");
    }
}

function clickedMiddleBox() {
    $(thisGame.middleBox).on("click", function () {
        if (!thisGame.startedAddingLvls) {
            graphics.removeRndBoxes();
            thisGame.statedAddingLvls = true;
        }

        if (!thisGame.startedPlaying) {
            addingLevels();
        }
    });
}


// thisGame.
// graphics.

function clickedNormalBox() {

    $(graphics.normalBox).on("click", function () {

        if (thisGame.startedPlaying) {
            var btnNum = this.classList[0];
            if (thisGame.gridBox[btnNum] == 0) {
                this.classList.add(graphics.safeBox);
                thisGame.gridBox[btnNum] = 2;
                numOfBoxesAround(btnNum);

            } else if (gridBox[btnNum] == 1) {
                changeTitle("YOU LOST !");
                showSafeBoxes();
                initGame();
                showInfo("Press on the middle button to restart adding levels !", "appear");
            }
            if (didItWin()) {
                changeTitle("YOU WON !");
                showInfo("Press on the middle button to restart adding levels !", "appear");
                initGame();
            }
        }
    });

    function numOfBoxesAround(boxNb) {
        var numAround = 0;

        var spr = boxNb.indexOf('-');
        var ni = boxNb.slice(1, spr);
        var nj = boxNb.slice(spr + 1, boxNb.length);

        ni = parseInt(ni, 10);
        nj = parseInt(nj, 10);

        for (let i = ni - 1; i <= ni + 1; i++) {
            for (let j = nj - 1; j <= nj + 1; j++) {
                if (!(i == n && j == n)) {
                    var n = 'b' + i + '-' + j;
                    // console.log(n);
                    if (thisGame.gridBox[n] == 1 && n != midBox) {
                        numAround++;
                    }
                }
            }
        }
        $('.' + boxNb).html(
            "<div class='num-around'>" + numAround + "</div>"
        );
    }

}