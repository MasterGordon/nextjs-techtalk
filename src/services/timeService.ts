const getTime = async (): Promise<string> => {
  const response = await fetch("/api/time");
  const data = await response.json();
  return data.time;
};

export const timeService = {
  getTime,
};
