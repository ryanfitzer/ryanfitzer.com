/* 
https://github.com/nodeca/js-yaml/issues/91#issuecomment-24515639
*/
export const transposeDate = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const parseDate = (date: Date) => {
  return {
    day: `${date.getDate()}`.padStart(2, '0'),
    month: `${date.getMonth() + 1}`.padStart(2, '0'),
    year: `${date.getFullYear()}`,
  };
};

export const getLongDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(date)
  );
};
