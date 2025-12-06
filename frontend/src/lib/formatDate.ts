// Konvertiert Date zu "YYYY-MM-DD" für URL
export const formatDateForUrl = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Parst "YYYY-MM-DD" String zu Date
export const parseDateFromUrl = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};
