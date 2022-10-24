export const calculatePercentage = (value: number, total: number): number => (value / total * 100);

export const getRemainingPollDays = (endDate: Date | undefined): number | undefined => {
  const msPerDay = 24 * 60 * 60 * 1000;

  const now = new Date();

  const difference = endDate ? Math.round(Math.abs(Number(endDate)- Number(now)) / msPerDay) : undefined;

  return difference;
};