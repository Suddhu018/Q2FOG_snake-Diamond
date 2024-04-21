import React, { useState } from "react";
import backgroundImage from "../public/homeback.webp"; // Import your image file
import Header from "./Header";
import Welcome from "./Welcome";
import GamePit from "./GamePit";
function HomePage() {
  const [gameOn, setgameOn] = useState(false);
  function handlesetgameOne() {
    setgameOn(!gameOn);
  }
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col  items-center w-[100%]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      {!gameOn ? <Welcome handlesetgameOne={handlesetgameOne} /> : <GamePit />}
    </div>
  );
}

export default HomePage;
