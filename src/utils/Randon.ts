export function getRandomMachineNumber(): number {
  return Math.floor(Math.random() * 25) + 1;
}

export function generateRandomPin(): number {
  return Math.floor(Math.random() * 90000) + 10000;
}