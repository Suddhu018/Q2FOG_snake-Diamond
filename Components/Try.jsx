import React, { useState, useEffect } from "react";
import Startbtnx from "./Startbtn";

function getRandomPosition(numRows, numCols) {
  return {
    x: Math.floor(Math.random() * numCols),
    y: Math.floor(Math.random() * numRows),
  };
}

function randomDirection() {
  const directions = ["up", "down", "left", "right"];
  return directions[Math.floor(Math.random() * directions.length)];
}

function movePosition(position, direction, numRows, numCols) {
  switch (direction) {
    case "up":
      return { ...position, y: Math.max(0, position.y - 1) };
    case "down":
      return { ...position, y: Math.min(numRows - 1, position.y + 1) };
    case "left":
      return { ...position, x: Math.max(0, position.x - 1) };
    case "right":
      return { ...position, x: Math.min(numCols - 1, position.x + 1) };
    default:
      return position;
  }
}

export default function GamePit() {
  const numCols = 20;
  const numRows = 10;
  const dotSize = 50; // Adjusted for larger cells
  const pitWidth = numCols * dotSize;
  const pitHeight = numRows * dotSize;
  let pos = getRandomPosition(numRows, numCols);
  let pos2 = { x: pos.x + 1, y: pos.y };
  let pos3 = { x: pos2.x + 1, y: pos2.y };
  const [gameRunning, setGameRunning] = useState(false);
  const [snakes, setSnakes] = useState([
    {
      positions: [pos, pos2, pos3],
      direction: randomDirection(),
    },
  ]);
  const [diamonds, setDiamonds] = useState([
    getRandomPosition(numRows, numCols),
  ]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval;
    if (gameRunning) {
      interval = setInterval(() => {
        setSnakes((prevSnakes) => {
          return prevSnakes.map((snake) => {
            const { positions, direction } = snake; // Retain current direction and positions

            // Determine if a direction change should occur
            const smoothTurnChance = Math.random() < 0.2;
            const newDirection = smoothTurnChance
              ? randomDirection() // 20% chance to change direction
              : direction; // Retain the current direction

            // Move the snake smoothly
            const newHead = movePosition(
              positions[0],
              newDirection,
              numRows,
              numCols
            );
            const newPositions = [newHead, ...positions.slice(0, -1)];

            return {
              positions: newPositions,
              direction: newDirection,
            };
          });
        });
      }, 800); // Longer interval for smoother movement
    }
    return () => clearInterval(interval);
  }, [gameRunning]);

  const handleDiamondClick = (index) => {
    if (!gameRunning) return;

    const clickedDiamond = diamonds[index];
    const isDiamondCollected =
      playerPosition.x === clickedDiamond.x &&
      playerPosition.y === clickedDiamond.y;

    if (isDiamondCollected) {
      setScore((prevScore) => prevScore + 10);
      setDiamonds((prevDiamonds) => {
        const newDiamonds = [...prevDiamonds];
        newDiamonds[index] = getRandomPosition(numRows, numCols);
        return newDiamonds;
      });
      let pos = getRandomPosition(numRows, numCols);
      let pos2 = { x: pos.x + 1, y: pos.y };
      let pos3 = { x: pos2.x + 1, y: pos2.y };
      setSnakes((prevSnakes) => [
        ...prevSnakes,
        {
          positions: [pos, pos2, pos3],
          direction: randomDirection(),
        },
      ]);
    }
  };

  const handleSnakeClick = (e) => {
    if (!gameRunning) return;
    const { clientX, clientY } = e;
    const pitRect = e.currentTarget.getBoundingClientRect();

    const clickedPosition = {
      x: Math.floor((clientX - pitRect.left) / dotSize),
      y: Math.floor((clientY - pitRect.top) / dotSize),
    };

    const snakeCollision = snakes.some((snake) => {
      return snake.positions.some((pos) => {
        return pos.x === clickedPosition.x && pos.y === clickedPosition.y;
      });
    });

    if (snakeCollision) {
      if (score == 0) {
        document.getElementById("end").innerHTML = "GAME OVER";
        setGameRunning(!gameRunning);
        let pos = getRandomPosition(numRows, numCols);
        let pos2 = { x: pos.x + 1, y: pos.y };
        let pos3 = { x: pos2.x + 1, y: pos2.y };
        setSnakes([
          {
            positions: [pos, pos2, pos3],
            direction: randomDirection(),
          },
        ]);
      } else {
        setScore((prevScore) => prevScore - 10);
      }
      // Handle collision
    }
  };

  const toggleGame = () => {
    document.getElementById("end").innerHTML = "";
    setGameRunning(!gameRunning);
  };

  const handleMouseMove = (e) => {
    const pitRect = e.currentTarget.getBoundingClientRect();
    const newPlayerPosition = {
      x: Math.floor((e.clientX - pitRect.left) / dotSize),
      y: Math.floor((e.clientY - pitRect.top) / dotSize),
    };
    setPlayerPosition(newPlayerPosition);
  };

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div
        className="bg-slate-800 relative"
        style={{
          width: `${pitWidth}px`,
          height: `${pitHeight}px`,
        }}
        onMouseMove={handleMouseMove}
        onClick={handleSnakeClick}
      >
        {/* Display the pit */}
        {[...Array(numRows)].map((_, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex">
            {[...Array(numCols)].map((_, colIdx) => (
              <div
                key={`dot-${rowIdx}-${colIdx}`}
                className={`w-[${dotSize}px] h-[${dotSize}px] border border-gray-300`}
              ></div>
            ))}
          </div>
        ))}

        {/* Display diamonds */}
        {diamonds.map((diamond, index) => (
          <div
            key={`diamond-${index}`}
            className="bg-blue-500 hover:cursor-pointer"
            style={{
              position: "absolute",
              zIndex: 100,
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              top: `${diamond.y * dotSize}px`,
              left: `${diamond.x * dotSize}px`,
            }}
            onClick={() => handleDiamondClick(index)}
          ></div>
        ))}

        {/* Display snakes */}
        {snakes.map((snake, index) =>
          snake.positions.map((pos, posIndex) => (
            <div
              key={`snake-${index}-${posIndex}`}
              className="bg-red-500"
              style={{
                position: "absolute",
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                top: `${pos.y * dotSize}px`,
                left: `${pos.x * dotSize}px`,
              }}
            ></div>
          ))
        )}

        {/* Display the player (green dot) */}
        <div
          className="bg-green-500 hover:cursor-pointer"
          style={{
            position: "absolute",
            zIndex: 10,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            top: `${playerPosition.y * dotSize}px`,
            left: `${playerPosition.x * dotSize}px`,
          }}
        ></div>
      </div>
      <div id="end" className="text-yellow-500  text-3xl bg-black"></div>
      <div className="flex">
        {/* Control buttons */}
        <button
          className="bg-black text-yellow-500 mt-[50px] w-[100px] h-[50px]"
          onClick={toggleGame}
        >
          {gameRunning ? "Stop" : "Start"}
        </button>

        {/* Display score */}
        <Startbtnx score={score}></Startbtnx>
      </div>
    </div>
  );
}
