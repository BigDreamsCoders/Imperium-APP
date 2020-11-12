import { format } from 'timeago.js';

export const localeFunc = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['just now', 'justo ahora'],
    ['%s seconds ago', 'hace %s segundos'],
    ['1 minute ago', 'hace 1 minuto'],
    ['%s minutes ago', 'hace %s minutos'],
    ['1 hour ago', 'hace 1 hora'],
    ['%s hours ago', 'hace %s horas'],
    ['1 day ago', 'hace 1 día'],
    ['%s days ago', 'hace %s días'],
    ['1 week ago', 'hace 1 semana'],
    ['%s weeks ago', 'hace %s semanas'],
    ['1 month ago', 'hace 1 mes'],
    ['%s months ago', 'hace %s meses'],
    ['1 year ago', 'hace 1 día'],
    ['%s years ago', 'hace %s años'],
  ][index];
};
