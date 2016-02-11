// Hey Monq, Great job on your project! Overall you made something that works
// is cool, and looks great! I left comments in your code for code review:

$(function main () {
  // nice use of constants :)
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
      // instead of an anonymous function here, define a function elsewhere, and call it here
      // for more modular, easier to decipher code.
      // that function could also be factored out into a couple of subfunctions for even more
      // modularity and clarity. This also reduces the need for comments, by using descriptive function
      // names. Your drag funciton could end up looking something like this:
      // drag: dragFunction();

      // function dragFunction(){
      //   var $self = $(this);
      //   var snapped = $self.data('ui-draggable').snapElements;
      //   var snappedTo = getSnappingElements();
      //   checkSnappedTo();
      // }
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
            // this line below is a doozy. Might be good to use some discriptive variables for readability here
            // for example:
            // var rectangleLeft = $self[0].getBoundingClientRect().left ... etc. then:
            // if (rectangleLeft === squareLeft && rectangleTop === squareTop){
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
      // nice factoring out of a function here.
      winScreen();
    }
  }
  // this could be named better. checkForWin maybe?
  function equalsConstant () {
    // in CS they use variable like flag, but we can be more specific here since
    // this is a concrete example. what is it a flag for?
    // can we name it "winner"? or something else more descriptive?
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
  // What are we calculating? Can this be named better?
  function calculate (array) {
    var runningTotal = 0;
    array.forEach(function (id) {
      runningTotal += Number($(id).html());
    });
    return runningTotal;
  }
  // verb function names are best practice. "showWinScreen"
  function winScreen () {
    alert("You got it! Congratulations. You're smart and stuff... o(^_-)O");
  }
});

// All of the function definitions can be factored out of main(); and
// called from inside of main. This is not universally thought of as best
// practice, but to me it makes for clearer code. Try it out some time :)

// Try some OOP JS too! Since you are a stronger student it would have been nice
// to see some prototype patterns, or if you wanted to get fancy,
// the utility pattern advocated by Kyle Simpson 8D
// Once again great job over all. 
