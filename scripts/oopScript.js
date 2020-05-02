class NewGame {
    constructor() {
        this.gridDimension = 3
        this.levelX = Math.floor(gridDimension ** 2 / 2);
        this.gridBox = initGrid(gridDimension);
        this.lvl = 1;
        this.reachedX = false;
        this.startedPlaying = false;
        this.statedAddingLvls = false;
    }

    initGame() {
        this.levelX = Math.floor(gridDimension ** 2 / 2);
        this.gridBox = initGrid(gridDimension);
        this.lvl = 1;
        this.reachedX = false;
        this.startedPlaying = false;
        this.statedAddingLvls = false;
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
        midBox = "b" + mD + "-" + mD;
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
    //the suffix 'class' here means the name of the CSS class of each HTML element
    constructor(classCSS) {
        this.startBtn = '.' + classCSS.startBtn;
        this.textTitle = '.' + classCSS.textTitle;
        this.textInfo = '.' + classCSS.textInfo;
        this.normalBox = '.' + classCSS.normalBox;

        this.dangerBox = classCSS.dangerBox;
        this.safeBox = classCSS.safeBox;
        this.makeBoxVisible = classCSS.makeVisible;

    }

    showStartBtn(cmd) {
        if (cmd === "appear") {
            $(this.startBtn)[0].classList.add(this.makeVisible);
        } else {
            $(this.startBtn)[0].classList.remove(this.makeVisible);
        }
    }

    changeTitle(msg) {
        $(this.textTitle).text(msg);
    }

    showInfo(msg, cmd) {
        if (cmd === "appear") {
            $(this.textInfo)[0].classList.add(this.makeVisible);
            $(this.textInfo).text(msg);
        } else {
            $(this.textInfo)[0].classList.remove(this.makeVisible);
        }
    }

    markRndBox(gridBox, isGridFull) {
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

    showSafeBoxes() {
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

