import { getRandomOperation } from "./getRandomOperation";
import { getRandomNumber } from "./getRandomNumber";
import { getSmallRandomNumber } from "./getSmallRandomNumber.js";
import { getQuestion } from "./getQuestion";

export function getAnswer() {
  const operation = getRandomOperation();
  let num1;
  let num2;

  if (operation === "+" || operation === "-") {
    num1 = getRandomNumber();
    num2 = getRandomNumber();
  } else {
    num1 = getSmallRandomNumber();
    num2 = getSmallRandomNumber();
  }

  const answer = getQuestion(num1, num2, operation);

  if (num1 < num2) {
    return [num2, operation, num1, answer];
  } else {
    return [num1, operation, num2, answer];
  }
}
