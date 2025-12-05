// Konvertiert Date zu "YYYY-MM-DD" für URL
export const formatDateForUrl = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Parst "YYYY-MM-DD" String zu Date
export const parseDateFromUrl = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};
