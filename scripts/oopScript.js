class NewGame {
    initGame() {
        this.levelX = Math.floor(this.gridDimension ** 2 / 2);
        this.gridBox = this.initGrid(this.gridDimension).gridBox;
        this.middleBoxij = this.initGrid(this.gridDimension).middleBoxij;
        this.lvl = 1;
        this.reachedX = false;
        this.startedPlaying = false;
        this.staredAddingLvls = false;
    }

    constructor() {
        this.gridDimension = 3;
        this.initGame();
    }



    initGrid(gridDimension) {
        var gridBox = {};
        for (var i = 1; i <= gridDimension; i++) {
            for (var j = 1; j <= gridDimension; j++) {
                var bNN = 'b' + i + "-" + j;
                gridBox[bNN] = 0;
            }
        }
        var mD = Math.floor(gridDimension / 2) + 1;
        var middleBoxij = "b" + mD + "-" + mD;
        gridBox[middleBoxij] = 1;
        return {
            gridBox: gridBox,
            middleBoxij: middleBoxij,
        };
    }

    isGridFull(gridDimension,gridBox) {
        for (var i = 1; i <= gridDimension; i++) {
            for (var j = 1; j <= gridDimension; j++) {
                if (gridBox['b' + i + "-" + j] == 0) {
                    break;
                }
            }
            if (gridBox['b' + i + "-" + j] == 0) {
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

class VisualandText {
    //the classCSS is an object containing all the CSS classes names
    constructor(classCSS) {
        this.startBtn = '.' + classCSS.startBtn;
        this.textTitle = '.' + classCSS.textTitle;
        this.textInfo = '.' + classCSS.textInfo;
        this.normalBox = '.' + classCSS.normalBox;
        this.midlleBox = '.' + classCSS.midlleBox;
        this.numberOfMines = '.' + classCSS.numberOfMines;
        this.boxesContainer = '.' + classCSS.boxesContainer;
        this.addLevelsButton = '.' + classCSS.addLevelsButton;

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

        while (!ok && !isGridFull(gridDimension,gridBox)) {
            var rndRow = Math.floor(Math.random() * gridDimension) + 1;
            var rndCol = Math.floor(Math.random() * gridDimension) + 1;
            var rndBox = "b" + rndRow + "-" + rndCol;
            ok = (gridBox[rndBox] !== 1);
        }
        if (isGridFull(gridDimension,gridBox)) {
            console.log("Grid is full!");
        } else {
            gridBox[rndBox]++;
            $("." + rndBox)[0].classList.add(this.dangerBox);
        }
    }

    removeRndBoxes() {
        var b0 = $(this.normalBox);
        for (let i = 0; i < b0.length; i++) {
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

classCSS = {
    startBtn : 'start-button',
    textTitle : 'title-text',
    textInfo : 'info-text',
    normalBox : 'box0',
    midlleBox : 'box-mid',
    numberOfMines : 'mine-number',
    boxesContainer : 'container-0',
    addLevelsButton : 'test-btn',
    dangerBox : 'redBox',
    safeBox : 'safeBox',
    makeBoxVisible : 'appearElem',
}
let graphics = new VisualandText(classCSS);
let thisGame = new NewGame();

clickedMiddleBox();
clickedStart();
clickedNormalBox();




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
        graphics.showStartBtn("dissapear");
    }
}

function clickedMiddleBox() {
    $(graphics.midlleBox).on("click", function () {
        console.log('!')
        if (!thisGame.startedAddingLvls) {
            graphics.removeRndBoxes();
            thisGame.statedAddingLvls = true;
        }

        if (!thisGame.startedPlaying) {
            addingLevels();
        }
    });

    function addingLevels() {

        if (thisGame.lvl !== 0) {
            graphics.showInfo("Press Enter or the start button below to start playing !", "appear");
            graphics.showStartBtn("appear");

        }
        if (thisGame.lvl === 0) {
            graphics.changeTitle("LEVEL 0");
            graphics.showInfo("You lost ! Press on the middle button to restart adding levels !", "appear");
            graphics.showStartBtn("dissapear");
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
}

function clickedNormalBox() {

    $(graphics.normalBox).on("click", function () {

        if (thisGame.startedPlaying) {
            var btnNum = this.classList[0];
            if (thisGame.gridBox[btnNum] == 0) {
                this.classList.add(graphics.safeBox);
                thisGame.gridBox[btnNum] = 2;
                numOfBoxesAround(btnNum);

            } else if (thisGame.gridBox[btnNum] == 1) {
                graphics.changeTitle("YOU LOST !");
                graphics.showSafeBoxes();
                thisGame.initGame();
                graphics.showInfo("Press on the middle button to restart adding levels !", "appear");
            }
            if (thisGame.didItWin()) {
                graphics.changeTitle("YOU WON !");
                graphics.showInfo("Press on the middle button to restart adding levels !", "appear");
                thisGame.initGame();
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
                    if (thisGame.gridBox[n] == 1 && n != thisGame.middleBoxij) {
                        numAround++;
                    }
                }
            }
        }
        $('.' + boxNb).html(
            "<div class='" + graphics.numberOfMines + "'>" + numAround + "</div>"
        );
    }

}

$(graphics.addLevelsButton).on("click", function () {
    addBoxesBy2();
    graphics.changeTitle("Keep pressing on the middle button to increase difficulty !");
    graphics.showInfo("", "dissapear");
    graphics.showStartBtn("dissapear");

    thisGame.initGame();
    clickedMiddleBox();
    clickedStart();
    clickedNormalBox()

    function addBoxesBy2() {

        var container0 = $(graphics.boxesContainer);
    
        thisGame.gridDimension = thisGame.gridDimension + 2;
    
        container0.css({
            "grid-template-rows": "repeat(" + thisGame.gridDimension + ", 1fr)",
            "grid-template-columns": "repeat(" + thisGame.gridDimension + ", 30px)"
        });
    
        container0.html("");
        for (var i = 1; i <= thisGame.gridDimension; i++) {
            for (var j = 1; j <= thisGame.gridDimension; j++) {
                var bNN = 'b' + i + "-" + j;
                container0.append(
                    "<div type='button' class='" + bNN + " box0'></div>"
                );
            }
        }
    
        var mD = Math.floor(thisGame.gridDimension / 2) + 1;
        var midBox = $(".b" + mD + "-" + mD)[0];
        midBox.classList.add("box-mid");
        midBox.classList.remove("box0");
    
    }
});