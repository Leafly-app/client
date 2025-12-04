export const formatDate = (dateString: string): string => {
  try {
    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }
    if (dateString.includes(" ")) {
      return dateString.split(" ")[0];
    }
    return dateString;
  } catch {
    return dateString;
  }
};
