/* 
https://github.com/nodeca/js-yaml/issues/91#issuecomment-24515639
*/
export const transposeDate = (date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const parseDate = (date) => {
  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth(),
    year: date.getUTCFullYear(),
  };
};

export const parseDisplayDate = (date) => {
  return {
    day: `${date.getUTCDate()}`.padStart(2, '0'),
    month: `${date.getUTCMonth() + 1}`.padStart(2, '0'),
    year: `${date.getUTCFullYear()}`,
  };
};

export const getLongDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    transposeDate(date)
  );
};
