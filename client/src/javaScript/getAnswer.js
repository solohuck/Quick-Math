import { getOperation } from "./getOperation.js";
import { getNumber } from "./getNumber.js";
import { getSmallNumber } from "./getSmallNumber.js";
import { getQuestion } from "./getQuestion.js";

export function getAnswer() {
  const operation = getOperation();
  let num1;
  let num2;

  if (operation === "+" || operation === "-") {
    num1 = getNumber();
    num2 = getNumber();
  } else {
    num1 = getSmallNumber();
    num2 = getSmallNumber();
  }

  const answer = getQuestion(num1, num2, operation);

  if (num1 < num2) {
    return [num2, operation, num1, answer];
  } else {
    return [num1, operation, num2, answer];
  }
}
