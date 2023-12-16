// MazeGenerator.ts
const MazeGenerator = (width: number, height: number): number[][] => {
  const maze: number[][] = [];

  // Initialize maze with walls
  for (let row = 0; row < height; row++) {
    maze[row] = [];
    for (let col = 0; col < width; col++) {
      maze[row][col] = 1; // 1 represents a wall
    }
  }

  const directions = [
    { row: 0, col: 1 }, // right
    { row: 1, col: 0 }, // down
    { row: 0, col: -1 }, // left
    { row: -1, col: 0 }, // up
  ];

  const getRandomDirection = () => {
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  };

  const isValid = (row: number, col: number) => {
    return row >= 0 && row < height && col >= 0 && col < width && maze[row][col] === 1;
  };

  const generateMaze = (row: number, col: number) => {
    maze[row][col] = 0; // 0 represents a path

    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const direction of shuffledDirections) {
      const newRow = row + 2 * direction.row;
      const newCol = col + 2 * direction.col;

      if (isValid(newRow, newCol)) {
        maze[row + direction.row][col + direction.col] = 0;
        generateMaze(newRow, newCol);
      }
    }
  };

  // Start maze generation from a random cell
  const startRow = Math.floor(Math.random() * (height - 1) / 2) * 2 + 1;
  const startCol = Math.floor(Math.random() * (width - 1) / 2) * 2 + 1;
  generateMaze(startRow, startCol);

  return maze;
};

export default MazeGenerator;
