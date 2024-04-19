export function getRandomOperation() {
  const operationArray = ["+", "-", "/", "*"];

  return operationArray[Math.floor(Math.random() * operationArray.length)];
}
