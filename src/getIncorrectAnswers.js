export function getIncorrectAnswers(correctAnswer) {
  const addOrSubArray = ["+", "-"];
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

  return Array.from(newIncorrectAnswersSet);
}
