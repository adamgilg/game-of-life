var canvas, ctx;
// Storage for the cells
var gridStorage = [];

function initialize() {
  canvas = document.getElementById('grid');
  ctx = canvas.getContext('2d');
  console.log(canvas, ctx);
  drawGrid();
  canvas.addEventListener('mousedown', clickHandler, false);
};

function drawGrid() {
  // Create the grid with the outer loop
  for (i = 0; i < canvas.width; i += 10) {
    var row = [];

    ctx.beginPath();
    ctx.moveTo(0.5 + i, 0);
    ctx.lineTo(0.5 + i, canvas.height);

    ctx.moveTo(0, 0.5 + i);
    ctx.lineTo(canvas.width, 0.5 + i);

    ctx.stroke();

    // Create the individual cells in nested arrays
    for (j = 0; j < canvas.width; j += 10) {
      row.push({x: i, y: j, live: false});
    }

    gridStorage.push(row);
  }
};

function modifyCellDisplay(cell) {
  if (cell.live) {
    // + 0.75 and + 0.5 to keep in line with grid line shifts
    ctx.fillRect(cell.x + 0.75, cell.y + 0.5, 10, 10);
  } else {
    ctx.clearRect(cell.x + 0.75, cell.y + 0.5, 9.5, 9.5);
  }
};

function getMousePosition(e) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

};

function findCell(coords) {
  // Use the coordinates / 10 to find the row and column indices
  var x = Math.floor(coords.x / 10);
  var y = Math.floor(coords.y / 10);

  // Access the cell directly in the nested arrays
  var cell = gridStorage[x][y];
  return cell;
};


function toggleCellLive(cell) {
  cell.live = !cell.live;
};

function findNeighbors(cell) {
  var left = { x: cell.x - 10, y: cell.y };
  var right = { x: cell.x + 10, y: cell.y };
  var top = { x: cell.x, y: cell.y + 10 };
  var bottom = { x: cell.x, y: cell.y - 10 };

  return [left, right, top, bottom];
};

function toggleNeighbors(neighbors) {
  neighbors.forEach(function(cellCoords) {
    var cell = findCell(cellCoords);

    toggleCellLive(cell);
    modifyCellDisplay(cell);
  });
};

function clickHandler(e) {
  var coords = getMousePosition(e);
  var cell = findCell(coords);

  toggleCellLive(cell);
  modifyCellDisplay(cell);
  toggleNeighbors(cell);
};