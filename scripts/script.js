gridBox = initGrid();
levelX = Math.floor(9 / 2);
lvl = 1;
reachedX = false;


$(document).on("keypress", function(e) {
  if (e.key == "Enter") {
    console.log(e.key);
  }
});


$(".box-mid").on("click", addingLevels);



function addingLevels() {

  if (lvl === 0) {
    changeTitle("LEVEL 0");
    showInfo("You lost ! Press on the middle button to restart adding levels !");
    startBtn("dissapear");
  } else if (lvl < levelX) {
    if (reachedX) {
      changeTitle("LEVEL " + lvl);
      lvl--;
    } else {
      changeTitle("LEVEL " + lvl);
      lvl++;
    }
  } else if (lvl === levelX) {
    reachedX = true;
    changeTitle("LEVEL X");
    lvl--;
  }
  if (lvl !== 0) {
    showInfo("Press any keyboard key or the start button bellow to start playing !");
    startBtn("appear");
  }

  markRndBox();
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

function showInfo(msg) {
  $(".info-text").text(msg);
}

function markRndBox() {
  var ok = false;

  while (!ok && !isGridFull()) {
    var rndRow = Math.floor(Math.random() * 3) + 1;
    var rndCol = Math.floor(Math.random() * 3) + 1;
    var rndBox = "b" + rndRow + rndCol;
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
  var gridBox = {
    b11: 0,
    b12: 0,
    b13: 0,
    b21: 0,
    b22: 1,
    b23: 0,
    b31: 0,
    b32: 0,
    b33: 0,
  }
  return gridBox;
}

function isGridFull() {
  for (i = 1; i < 4; i++) {
    for (j = 1; j < 4; j++) {
      if (gridBox['b' + i + j] == 0) {
        break;
      }
    }
    if (gridBox['b' + i + j] == 0) {
      return false;
    }
  }
  return true;
}