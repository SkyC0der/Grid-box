
const directions = [
  function moveRight([y, x]) { return [y, x + 1]; },
  function moveLeft([y, x]) { return [y, x - 1]; },

  function moveUp([y, x]) { return [y - 1, x]; },
  function moveUpRight([y, x]) { return [y - 1, x + 1]; },
  function moveUpLeft([y, x]) { return [y - 1, x - 1]; },

  function moveDown([y, x]) { return [y + 1, x]; },
  function moveDownRight([y, x]) { return [y + 1, x + 1]; },
  function moveDownLeft([y, x]) { return [y + 1, x - 1]; }
];

function endPointFor(currentPoint, [validPoints, ...restPoints], nextPointFor) {
  if (!validPoints) {
    return currentPoint;
  }

  const nextPoint = nextPointFor(currentPoint);
  const isValid = validPoints.some(validPoint => {
    return nextPoint[0] === validPoint[0] && nextPoint[1] === validPoint[1];
  });

  if (!isValid) {
    return null;
  }

  return endPointFor(nextPoint, restPoints, nextPointFor);
}

function hasLettersFor(word, grid) {
  return word.split('').every(letter => letter in grid);
}

function findWord(word, grid) {
  if (!hasLettersFor(word, grid)) {
    return;
  }

  const [startPoints, ...restPoints] = word
    .split('')
    .map(letter => grid[letter]);

  for (const start of startPoints) {
    for (const nextPointFor of directions) {
      const end = endPointFor(start, restPoints, nextPointFor);

      if (end) {
        return { start, end };
      }
    }
  }

  return;
}

function toPoints(grid) {
  return grid.reduce((points, gridRow, rowIndex) => {
    return gridRow.split('').reduce((points, letter, columnIndex) => {
      points[letter] = points[letter] || [];
      points[letter].push([rowIndex + 1, columnIndex + 1]);
      return points;
    }, points);
  }, {});
}

class Index {
  constructor(grid) {
    this.grid = grid;
    this.gridAsPoints = toPoints(grid);
  }

  find(words) {
    return words.reduce((results, word) => {
      results[word] = findWord(word, this.gridAsPoints);
      return results;
    }, {});
  }
}

module.exports = Index
