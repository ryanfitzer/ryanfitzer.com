export const getLongDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(date)
  );
};
