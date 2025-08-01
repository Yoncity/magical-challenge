export const getArg = (key: string): string | undefined => {
  const arg = process.argv.find((a) => a.startsWith(`--${key}=`));
  return arg?.split("=")[1];
};