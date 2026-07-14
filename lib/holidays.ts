function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month - 1, 1).getDay();
  const offset = (weekday - first + 7) % 7;
  return new Date(year, month - 1, 1 + offset + (n - 1) * 7);
}

function lastWeekday(year: number, month: number, weekday: number): Date {
  const last = new Date(year, month, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return new Date(year, month - 1, last.getDate() - offset);
}

function observed(d: Date): Date {
  const dow = d.getDay();
  if (dow === 6) return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
  if (dow === 0) return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  return new Date(d);
}

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getHolidaysForYear(year: number): Record<string, string> {
  const raw = [
    { date: new Date(year, 0, 1), name: "New Year's Day" },
    { date: lastWeekday(year, 5, 1), name: 'Memorial Day' },
    { date: new Date(year, 6, 4), name: 'Independence Day' },
    { date: nthWeekday(year, 9, 1, 1), name: 'Labor Day' },
    { date: nthWeekday(year, 11, 4, 4), name: 'Thanksgiving' },
    { date: new Date(year, 11, 25), name: 'Christmas Day' },
  ];

  const result: Record<string, string> = {};

  for (const h of raw) {
    const obs = observed(h.date);
    if (obs.getFullYear() === year) {
      const isShifted = obs.getTime() !== h.date.getTime();
      result[dateKey(obs)] = isShifted ? `${h.name} (Observed)` : h.name;
    }
  }

  // Dec 31 observed for next year's New Year's Day
  const nextNY = observed(new Date(year + 1, 0, 1));
  if (nextNY.getFullYear() === year) {
    result[dateKey(nextNY)] = "New Year's Day (Observed)";
  }

  return result;
}
