import { useState } from "react";
import Header from "../Components/Header";
import Welcome from "../Components/Welcome";
import HomePage from "../Components/Homepage";
function App() {
  const [start, setStart] = useState(false);

  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
