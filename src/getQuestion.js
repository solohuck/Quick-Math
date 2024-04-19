export function getQuestion(num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 < num2 ? num2 - num1 : num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 < num2 ? num2 / num1 : num1 / num2;
    default:
      return 0;
  }
}
