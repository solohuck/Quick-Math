import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

export function MultiChoiceButton() {
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
      <li>
        <button
          id="A"
          onClick={() => toggleButton("A")}
          style={{
            backgroundColor: isSelected["A"] ? "green" : "grey",
            pointerEvents: isSelected["A"] ? "none" : "auto",
          }}
        >
          <label>A</label>
        </button>
        <br />
        <p>Choice</p>
      </li>
      <li>
        <button
          onClick={() => toggleButton("B")}
          style={{
            backgroundColor: isSelected["B"] ? "green" : "grey",
            pointerEvents: isSelected["B"] ? "none" : "auto",
          }}
        >
          <label>B</label>
        </button>
        <br />
        <p>Choice</p>
      </li>
      <li>
        <button
          onClick={() => toggleButton("C")}
          style={{
            backgroundColor: isSelected["C"] ? "green" : "grey",
            pointerEvents: isSelected["C"] ? "none" : "auto",
          }}
        >
          <label>C</label>
        </button>
        <br />
        <p>Choice</p>
      </li>
      <li>
        <button
          onClick={() => toggleButton("D")}
          style={{
            backgroundColor: isSelected["D"] ? "green" : "grey",
            pointerEvents: isSelected["D"] ? "none" : "auto",
          }}
        >
          <label>D</label>
        </button>
        <br />
        <p>Choice</p>
      </li>
      <SubmitButton />
    </>
  );
}
