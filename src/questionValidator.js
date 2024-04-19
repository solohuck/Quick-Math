export function questionValidator(num1, num2, answer, incorrectAnswersArray) {
  let isQuestionValid;

  if (
    Number.isInteger(answer) &&
    incorrectAnswersArray.length === 3 &&
    num1 > 1 &&
    num2 > 1 &&
    num1 !== num2
  ) {
    isQuestionValid = true;
  } else {
    isQuestionValid = false;
  }

  return isQuestionValid;
}
