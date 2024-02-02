import React, { useState, useEffect } from "react";

export function Answers({ correctAnswer }) {
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  const getIncorrectAnswers = () => {
    const addOrSubArray = ["+", "-"];

    // new Set() only takes in unique values so dups will be discarded before being added to an array
    const newIncorrectAnswersSet = new Set();

    for (let i = 0; i < 3; i++) {
      const optionOperation = addOrSubArray[i % addOrSubArray.length];
      const randomNumber = Math.floor(Math.random() * 10) + 1;

      switch (optionOperation) {
        case "+":
          newIncorrectAnswersSet.add(correctAnswer + randomNumber);
          break;
        case "-":
          newIncorrectAnswersSet.add(correctAnswer - randomNumber);
          break;
        default:
          break;
      }
    }

    const newIncorrectAnswers = Array.from(newIncorrectAnswersSet);

    if (newIncorrectAnswers.length < 3) {
      getIncorrectAnswers();
    } else {
      setIncorrectAnswers(newIncorrectAnswers);
    }
  };

  const displayAnswers = () => {
    const possibleAnswers = [correctAnswer, ...incorrectAnswers];

    setAllPossibleAnswers(possibleAnswers.sort((a, b) => 0.5 - Math.random()));
  };

  useEffect(() => {
    if (correctAnswer !== null) {
      getIncorrectAnswers;
    }
  }, [correctAnswer]);

  useEffect(() => {
    displayAnswers();
  }, [incorrectAnswers, correctAnswer]);

  return (
    <>
      <p>Incorrect answer: {allPossibleAnswers.join(",")}</p>
    </>
  );
}
