$(function main () {
  // grid width and height
  var GRIDWIDTH = 402;
  var GRIDHEIGHT = 402;

  // 
  var cellContent;

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
    'snap': "#" + $(this).attr('id'),
    'snapTolerance': 2000,
    'cancel': ".gridCell"
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
      $('#outside').append($div);

      // place element randomly within a specified region
      randomPlacement("#" + (i + 1));
    }

    // do the html swapping here
    $('.draggable').draggable({
      'cursor': 'move',
      'snap': '.gridCell',
      'snapMode': "inner",
      drag: function () {
        
        var $self = $(this);

        /* Get the possible snap targets: */
        var snapped = $self.data('ui-draggable').snapElements;
     
        /* Pull out only the snap targets that are "snapping": */
        var snappedTo = snapped.map(function(element) {
          return element.snapping ? element.item : null;
        });

        snappedTo.forEach(function (snappedElement) {

          if (snappedElement) {
            if ($self[0].getBoundingClientRect().left === snappedElement.getBoundingClientRect().left && $self[0].getBoundingClientRect().top === snappedElement.getBoundingClientRect().top) {
              // replace the value from the draggable gridCell.
              snappedElement.innerText = $self[0].innerText; 
              gridSums();
            }
          }
        });
      }
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

  // Void -> Void
  // check the sums of the grid
  function gridSums () {
    
    var topRow;
    var middleRow;
    var bottomRow;
    var leftColumn;
    var centerColumn;
    var rightColumn;
    var diagonal1;
    var diaongal2;

    topRow = calculate(rows[0]);

    middleRow = calculate(rows[1]);

    bottomRow = calculate(rows[2]);

    leftColumn = calculate(columns[0]);
    
    centerColumn = calculate(columns[1]);

    rightColumn = calculate(columns[2]);

    diagonal1 = calculate(diagonals[0]);

    diagonal2 = calculate(diagonals[1]);

    // if they all equal each other, than the player wins
    if (equalsConstant(topRow, middleRow, bottomRow, leftColumn, centerColumn, rightColumn, diagonal1, diagonal2)) {

      winScreen();
    }
  }

  function equalsConstant () {
    var flag = false;
    var i = 0;
    var argLen = arguments.length;

    while (i < argLen) {
      if (arguments[i] !== GRIDCONSTANT) {
        return false;
      } else {
        flag = true;
        i++;
      }
    }
    return flag;
  }

  // Array -> Number
  function calculate (array) {
    var runningTotal = 0;
    array.forEach(function (id) {
      runningTotal += Number($(id).html());
    });
    return runningTotal;
  }

  function winScreen () {
    alert("You got it! Congratulations. You're smart and stuff... o(^_-)O");
  }
});