export const generateId = (): string => {
  return String(Math.random() * Date.now());
};
