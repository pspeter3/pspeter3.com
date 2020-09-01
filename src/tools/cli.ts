export const exec = (main: () => Promise<void>): Promise<void> =>
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
