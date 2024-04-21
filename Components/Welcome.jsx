import backgroundImage from "../public/snakeLoad.webp";
export default function Welcome(props) {
  function start_game() {
    props.handlesetgameOne();
  }
  return (
    <div className="relative flex w-[75%] h-[90%]">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover blur"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <p className="text-yellow-100 text-2xl underline">
          Instructions to play the game
        </p>
        <div>
          <p className="text-yellow-100 text-xl">
            1.Press start button to start the game.
          </p>
          <p className="text-yellow-100 text-xl">
            2.Diamonds are represented by blue dots placed randomly within the
            pit.
          </p>
          <p className="text-yellow-100 text-xl">
            3. If diamonds are selected then total score will go up by +10 and
            another diamond will appear randomly.
          </p>
          <p className="text-yellow-100 text-xl">
            4. If snakes are clicked then total score will go down by -10.
          </p>
          <p className="text-yellow-100 text-xl">
            5. With each selected diamonds the level will increase and 1 more
            snake will be added to the pit.
          </p>
          <p className="text-yellow-100 text-xl">
            6. If the total score is 0 after starting the game the game will end
            automatically.
          </p>
        </div>
        <button
          onClick={start_game}
          className=" bg-black text-yellow-500 mt-6 p-4 rounded-xl hover:bg-slate-700"
        >
          MOVE TO ARENA
        </button>
      </div>
    </div>
  );
}
