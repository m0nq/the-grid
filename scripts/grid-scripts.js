$(function main () {
  debugger;
  // grid width and height
  var GRIDWIDTH = 402;
  var GRIDHEIGHT = 402;

  // constant summed value of an nxn grid
  var GRIDCONSTANT = 3 * ((Math.pow(3, 2) + 1)/2);

  initializeCells();
  
  // make each grid cell droppable.
  $('.droppable').droppable({
    tolerance: "pointer",
    // when player places an object
    // replace the value from the draggable cell.
    drop: function drop ($event, $ui) {
      // get the number value associated with ui draggable object, convert it to a number.
      $(this).html(Number($ui.attr('id')));

      // check to see if each row, column, and centered diagonal adds up to (the constant, or the same number)
      gridSums();
    }
  });
});

// draw the numeral objects in a random pile on the right side of the page (no where less than the window divided in half, & 150px or greater)
  
// initialize cell objects on the page.
function initializeCells() {

  for (var i = 0; i < 9; i++) {
    // draw an individual canvas element
    // create a div
    var $div = $('<div>');

    // set it's class attribute to draggable
    $div.attr('class', 'draggable');

    // add an indexed id of the cooresponding numeral value
    $div.attr('id', (i + 1));

    // set its html value to the index
    $div.html(i + 1);

    // place within the document.
    $('body').append($div);
  }
   
  $('.draggable').draggable({
    snap: true,
    snapMode: "inner",
    snapTolerance: 20
  });
}

// when player moves an object out of an already snapped element
  // set the value of the droppable cell to zero.

// set cell value function

// get cell value function

// check the sums of the grid