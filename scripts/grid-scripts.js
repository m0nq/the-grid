$(function main () {
  // grid width and height
  var GRIDWIDTH = 402;
  var GRIDHEIGHT = 402;

  // id locations of each position to sum
  var rows = [
    ["#topLeft", "#topCenter", "#topRight"],
    ["#middleLeft", "#middleCenter", "#middleRight"],
    ["#bottomLeft", "#bottomCenter", "#bottomRight"]
  ];
  var columns = [
    ["#topLeft", "#middleLeft", "#bottomLeft"],
    ["#topCenter", "#middleCenter", "#bottomCenter"],
    ["#topRight", "#middleRight", "#bottomRight"]
  ];
  var diagonals = [
    ["#topLeft", "#middleCenter", "#bottomRight"],
    ["#topRight", "#middleCenter", "#bottomLeft"]
  ];

  // constant summed value of an nxn grid
  var GRIDCONSTANT = 3 * ((Math.pow(3, 2) + 1)/2);

  initializegridCells();
  
  // make each grid gridCell.
  $('.gridCell').draggable({
    snap: "#" + $(this).attr('id'),
    snapTolerance: 200,
    cancel: "#grid"
    });
});

// draw the numeral objects in a random pile on the right side of the page (no where less than the window divided in half, & 150px or greater)
  
// initialize gridCell objects on the page.
function initializegridCells() {

  for (var i = 0; i < 9; i++) {
    // draw an individual canvas element
    // create a div
    var $div = $('<div>');

    // set it's class attribute to draggable
    // add an indexed id of the cooresponding numeral value
    $div.attr('class', 'draggable').attr('id', (i + 1)).html(i + 1);

    // set its html value to the index
    // $div.html(i + 1);

    // place within the document.
    $('body').append($div);

    // place element randomly within a specified region
    randomPlacement("#" + (i + 1));
  }

  // do the html swapping here
  $('.draggable').draggable({
    cursor: 'move',
    snap: true,
    snapMode: "inner",
    stop: stop,
    start: start
  });
}

// String -> Void
// calculate the location vector muliplied by a random scalar
function randomPlacement (id) {
  var randomtop = Math.floor(Math.random() * (window.innerHeight/2 - 650));
  var randomleft = (468/2) + Math.floor(Math.random() * (window.innerWidth/24 + 500));
  
  $(id).css({
    "margin-top": randomtop,
    "margin-left": randomleft
  });
}

// $eventObject, $UIObject -> Void
// determines what the cell should do once stopped on a grid element
function stop ($event, $ui) {
  // when player places (stops) an object
      // replace the value from the draggable gridCell.

      // get the number value associated with ui draggable object, convert it to a number
      
      // update the object dropped on with the numberValue

      // check to see if each row, column, and centered diagonal adds up to (the constant, or the same number)
      // gridSums();
}

// $eventObject, $UIObject -> Void
// determines what the cell should do once it moves off a grid element
function start ($event, $ui) {
      // when player moves an object out of an already snapped element
      // set the value of the gridCell to zero.

      // set gridCell value
    }

// get gridCell value function

// check the sums of the grid