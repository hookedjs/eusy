export const Sleep = (ms: number) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
};
