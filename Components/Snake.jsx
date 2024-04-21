import React, { useEffect, useState } from "react";

// Constants for the game
const GRID_SIZE = 20;
const CELL_SIZE = 20; // Size of each cell in pixels
const INITIAL_POSITION = { x: GRID_SIZE, y: GRID_SIZE };
const DIRECTIONS = [
  { x: 0, y: -1 }, // up
  { x: 0, y: 1 }, // down
  { x: -1, y: 0 }, // left
  { x: 1, y: 0 }, // right
];

const randomDirection = () => {
  const index = Math.floor(Math.random() * DIRECTIONS.length);
  return DIRECTIONS[index];
};

const Snake = () => {
  const [snake, setSnake] = useState([INITIAL_POSITION]);
  const [direction, setDirection] = useState(randomDirection());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      // Check for boundary collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return;
      }

      setSnake([newHead, ...snake.slice(0, -1)]);
    };

    const interval = setInterval(moveSnake, 300); // Snake speed
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    const changeDirectionRandomly = () => {
      if (Math.random() < 0.1) {
        setDirection(randomDirection());
      }
    };

    const interval = setInterval(changeDirectionRandomly, 500); // Change direction speed
    return () => clearInterval(interval);
  }, []);

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnakePart = snake.some((part) => part.x === x && part.y === y);
        row.push(
          <div
            key={`cell-${x}-${y}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: isSnakePart ? "green" : "lightgray",
              border: "1px solid #ccc",
            }}
          />
        );
      }
      grid.push(
        <div key={`row-${y}`} style={{ display: "flex" }}>
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <div>
      {gameOver ? (
        <div>
          <h2>Game Over</h2>
          <p>The snake hit the boundary.</p>
        </div>
      ) : (
        <div>{renderGrid()}</div>
      )}
    </div>
  );
};

export default Snake;
