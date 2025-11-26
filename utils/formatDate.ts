export const formatDate = (dateString: string): string => {
  try {
    return dateString.split("T")[0];
  } catch {
    return dateString;
  }
};
