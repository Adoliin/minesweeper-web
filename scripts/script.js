gridDimension = 3;
initGame();
clickedMidBox();
clickedStart(gameStart);
clickedBox0();


$(".test-btn").on("click", function () {
  addBoxesBy2();
  changeTitle("Keep pressing on the middle button to increase difficulty !");
  showInfo("", "dissapear");
  startBtn("dissapear");

  initGame();
  clickedMidBox();
  clickedStart(gameStart);
  clickedBox0()
});

function addBoxesBy2() {

  var container0 = $(".container-0");

  gridDimension = gridDimension + 2;

  container0.css({
    "grid-template-rows": "repeat(" + gridDimension + ", 1fr)",
    "grid-template-columns": "repeat(" + gridDimension + ", 30px)"
  });

  container0.html("");
  for (var i = 1; i <= gridDimension; i++) {
    for (var j = 1; j <= gridDimension; j++) {
      var bNN = 'b' + i + "-" + j;
      container0.append(
        "<div type='button' class='" + bNN + " box0'></div>"
      );
    }
  }

  var mD = Math.floor(gridDimension / 2) + 1;
  var midBox = $(".b" + mD + "-" + mD)[0];
  midBox.classList.add("box-mid");
  midBox.classList.remove("box0");

}

function clickedBox0() {

  $(".box0").on("click", function () {

    if (startedPlaying) {
      var btnNum = this.classList[0];
      if (gridBox[btnNum] == 0) {
        this.classList.add("safeBox");
        gridBox[btnNum] = 2;
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
}

function gameStart() {
  removeRndBoxes();
  showInfo("-", "dissapear");
  startBtn("dissapear");
}

function clickedMidBox() {
  $(".box-mid").on("click", function () {
    if (!statedAddingLvls) {
      removeRndBoxes();
      statedAddingLvls = true;
    }

    if (!startedPlaying) {
      addingLevels();
    }
  });
}

function clickedStart(gameStart) {

  $(document).on("keypress", function (e) {
    var startedAddingLvls = ((lvl > -1 && reachedX) || (lvl > 1 && !reachedX));
    if (e.key == "Enter" && !startedPlaying && startedAddingLvls) {
      startedPlaying = true;
      gameStart();
    }
  });

  $(".start-button").on("click", function () {
    var startedAddingLvls = ((lvl > -1 && reachedX) || (lvl > 1 && !reachedX));
    if (!startedPlaying && startedAddingLvls) {
      startedPlaying = true;
      gameStart();
    }
  });
}

function addingLevels() {

  if (lvl !== 0) {
    showInfo("Press Enter or the start button below to start playing !", "appear");
    startBtn("appear");

  }
  if (lvl === 0) {
    changeTitle("LEVEL 0");
    showInfo("You lost ! Press on the middle button to restart adding levels !", "appear");
    startBtn("dissapear");
    initGame();

  } else if (lvl < levelX) {
    if (reachedX) {
      changeTitle("LEVEL " + lvl);
      lvl--;
    } else {
      changeTitle("LEVEL " + lvl);
      lvl++;
    }
    markRndBox();
  } else if (lvl === levelX) {
    reachedX = true;
    changeTitle("LEVEL X");
    lvl--;
    markRndBox();
  }


}

function removeRndBoxes() {

  var b0 = $(".box0");
  for (i = 0; i < b0.length; i++) {
    b0[i].classList.remove("redBox");
    b0[i].classList.remove("safeBox");
  }
}

function startBtn(cmd) {
  if (cmd === "appear") {
    $(".start-button")[0].classList.add("appearElem");
  } else {
    $(".start-button")[0].classList.remove("appearElem");
  }
}

function changeTitle(msg) {
  $(".title-text").text(msg);
}

function showInfo(msg, cmd) {
  if (cmd === "appear") {
    $(".info-text")[0].classList.add("appearElem");
    $(".info-text").text(msg);
  } else {
    $(".info-text")[0].classList.remove("appearElem");
  }
}

function markRndBox() {
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
    $("." + rndBox)[0].classList.add("redBox");
  }
}

function initGrid() {
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

function isGridFull() {
  for (i = 1; i <= gridDimension; i++) {
    for (j = 1; j <= gridDimension; j++) {
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

function initGame() {
  $(".box0").html("");
  levelX = Math.floor(gridDimension ** 2 / 2);
  gridBox = initGrid();
  lvl = 1;
  reachedX = false;
  startedPlaying = false;

  statedAddingLvls = false;
}

function didItWin() {
  var b0 = $(".box0");
  for (i = 0; i < b0.length; i++) {
    var btnNum = b0[i].classList[0];
    if (gridBox[btnNum] == 0) {
      return false;
    }
  }
  return true;
}

function showSafeBoxes() {
  var b0 = $(".box0");
  for (let i = 0; i < b0.length; i++) {
    var btnNum = b0[i].classList[0];
    if (gridBox[btnNum] == 0 || gridBox[btnNum] == 2) {
      b0[i].classList.add("safeBox");
    }

    if (gridBox[btnNum] == 1) {
      b0[i].classList.add("redBox");
    }
  }
}

function numOfBoxesAround(boxNb) {
  var numAround = 0;

  var spr = boxNb.indexOf('-');
  var ni = boxNb.slice(1,spr);
  var nj = boxNb.slice(spr+1,boxNb.length);
  
  ni = parseInt(ni, 10);
  nj = parseInt(nj, 10);

  for (let i = ni - 1; i <= ni + 1; i++) {
    for (let j = nj - 1; j <= nj + 1; j++) {
      if (!(i == n && j == n)){
        var n = 'b'+i+'-'+j;
        // console.log(n);
        if (gridBox[n] == 1 && n != midBox) {
          numAround++;
        }
      }
    }
  }
  $('.'+boxNb).html(
  "<div class='num-around'>"+numAround+"</div>"
  );
}