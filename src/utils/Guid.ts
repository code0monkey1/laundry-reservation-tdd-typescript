export function generateGuid(): string {
  // Implementation for generating a GUID goes here
  // You can use external libraries or built-in functions to generate GUIDs
  // Example: return uuid.v4();
  // For simplicity, let's assume the GUID generation is already implemented
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}