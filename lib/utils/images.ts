import { hsl } from 'd3-color';
import { DateTime } from 'luxon';

import { Holiday } from '../types';
import { Topic } from './constants';

const compareDates = (a: DateTime, b: DateTime) => (a < b ? -1 : a > b ? 1 : 0);

const getNewYearsEve = (dateTime: DateTime) =>
  DateTime.fromObject({ year: dateTime.year, month: 12, day: 31 });

const getBirthday = (dateTime: DateTime) =>
  DateTime.fromObject({ year: dateTime.year, month: 4, day: 9 });

const getHalloween = (dateTime: DateTime) =>
  DateTime.fromObject({ year: dateTime.year, month: 10, day: 31 });

const getChristmas = (dateTime: DateTime) =>
  DateTime.fromObject({ year: dateTime.year, month: 12, day: 25 });

const getThanksGiving = (dateTime: DateTime) =>
  getNthTargetDayOfMonth({
    year: dateTime.year,
    month: 11,
    day: 4,
    n: 4,
  });

// this logic lovingly inspired by
// https://github.com/amaidah/luxon-business-days/blob/master/src/holidays.js
function getNthTargetDayOfMonth({ n, day, month, year }) {
  const firstDayOfMonth = DateTime.fromObject({
    day: 1,
    month,
    year,
  });

  // is target day before or after first day
  const offsetThreshold = firstDayOfMonth.weekday - day;
  let offsetFromTargetDay = null;
  if (offsetThreshold > 0) {
    // get to target day if target is after first day
    offsetFromTargetDay = 7 - offsetThreshold;
  } else {
    // reverse threshold to get to target from first day
    offsetFromTargetDay = offsetThreshold * -1;
  }

  const firstOccurenceOfTargetDay = firstDayOfMonth.plus({
    days: offsetFromTargetDay,
  });

  const nthDay = firstOccurenceOfTargetDay.plus({
    days: (n - 1) * 7,
  });

  return nthDay;
}

export const nameFromKey = (prefix: string, key: string) => `${prefix}_${key.toLowerCase()}.png`;

const getWeekday = (dateStr: string) => DateTime.fromISO(dateStr).weekday;

const NUM_POETIC = 7;
export const resolveTopic = (topic: Topic, releasedAt: string): string => {
  // choose one of the poetic images by day number
  if (topic === Topic.Poetic) return `poetic${(getWeekday(releasedAt) % NUM_POETIC) + 1}`;

  return topic;
};

export const getBackground = (releasedAt: string): string => {
  // basically, the background can be a color OR a special image
  // if it's a holiday, return the holiday key
  // and if it's a normal day, derive the HSL value, making sure to skip the holidays
  // in the calculation

  const now = DateTime.fromISO(releasedAt).startOf('day');

  const birthdayOffset = compareDates(now, getBirthday(now));
  if (birthdayOffset === 0) return Holiday.Birthday;

  const halloweenOffset = compareDates(now, getHalloween(now));
  if (halloweenOffset === 0) return Holiday.Halloween;

  const thanksgivingOffset = compareDates(now, getThanksGiving(now));
  if (thanksgivingOffset === 0) return Holiday.Thanksgiving;

  const christmasOffset = compareDates(now, getChristmas(now));
  if (christmasOffset === 0) return Holiday.Christmas;

  const newYearsEveOffset = compareDates(now, getNewYearsEve(now));
  if (newYearsEveOffset === 0) return Holiday.NewYearsEve;

  // sum how many holidays the current date is _after_
  const offset = [
    birthdayOffset,
    halloweenOffset,
    thanksgivingOffset,
    christmasOffset,
    newYearsEveOffset,
  ]
    .filter((offset) => offset >= 0)
    .reduce((memo, offset) => memo + offset, 0);

  // adjust the ordinal day by this offset, so it goes from 1-360
  const day = now.ordinal - offset;

  // idk, hue math
  const hue = 359 - ((day + 119) % 360);

  // return as hex
  return hsl(hue, 1, 0.9).formatHex();
};
