export function getOperation() {
  const operationArray = ["+", "-", "/", "*"];

  return operationArray[Math.floor(Math.random() * operationArray.length)];
}
