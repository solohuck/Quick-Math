import { useState, useEffect } from "react";
import { MultiChoiceButtons } from "./MultiChoiceButtons";
import { Timer } from "./Timer";
import { Question } from "./Question";

import "./App.css";

function App() {
  const [isSelected, setIsSelected] = useState([]);

  function toggleButton(id) {
    setIsSelected((prevSelection) => {
      const updatedSelection = { ...prevSelection, [id]: !prevSelection[id] };

      if (updatedSelection[id]) {
        Object.keys(updatedSelection).forEach((buttonId) => {
          if (buttonId !== id) {
            updatedSelection[buttonId] = false;
          }
        });
      }

      return updatedSelection;
    });
  }

  return (
    <>
      <div>
        <Timer />
        <Question />

        <ul style={{ listStyleType: "none" }}>
          <MultiChoiceButtons
            toggleButton={toggleButton}
            isSelected={isSelected}
          />
        </ul>
      </div>
    </>
  );
}

export default App;
