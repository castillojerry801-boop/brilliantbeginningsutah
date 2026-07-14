'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/app/components/sections/Navbar';
import Footer from '@/app/components/sections/Footer';
import { getHolidaysForYear, dateKey } from '@/lib/holidays';

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type CalendarEvent = { id: string; date: string; title: string; description: string | null; type: 'activity' | 'closure' };

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function CalendarPage() {
  const now = new Date();
  const todayKey = dateKey(now);
  const todayDow = now.getDay();
  const isWeekendToday = todayDow === 0 || todayDow === 6;

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const holidays = getHolidaysForYear(year);
  const todayHoliday = holidays[todayKey] || null;
  const isOpenToday = !isWeekendToday && !todayHoliday;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const supabase = getSupabase();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const start = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      const end = `${year}-${String(month + 1).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;
      const { data } = await supabase
        .from('calendar_events')
        .select('*')
        .gte('date', start)
        .lte('date', end)
        .order('date');
      if (!cancelled) {
        setEvents(data || []);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [year, month]);

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;

  function getDayKey(day: number) { return dateKey(new Date(year, month, day)); }
  function isWeekend(day: number) { const d = new Date(year, month, day).getDay(); return d === 0 || d === 6; }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* Branded header */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white px-4 pt-10 pb-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-2">Brilliant Beginnings Childcare</p>
            <h1 className="text-4xl font-extrabold tracking-tight">Activity Calendar</h1>
            <p className="mt-2 text-orange-100 text-sm">See what&apos;s happening every day — field trips, lunches, activities &amp; more.</p>

            {/* Hours bar */}
            <div className="mt-6 inline-flex items-center gap-6 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3 text-sm font-semibold">
              <span>⏰ Mon–Fri</span>
              <span className="w-px h-4 bg-white/30" />
              <span>5:00 AM – 5:30 PM</span>
              <span className="w-px h-4 bg-white/30" />
              <span>📞 (801) 513-7750</span>
            </div>
          </div>
        </div>

        {/* Today status pill — floats over the header/calendar seam */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="-mt-6 mb-6 flex justify-center">
            {isOpenToday ? (
              <div className="inline-flex items-center gap-2 bg-teal-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Open Today · {DAYS_FULL[todayDow]}, {MONTHS[now.getMonth()]} {now.getDate()}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-gray-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-md">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                Closed Today{todayHoliday ? ` · ${todayHoliday}` : ' · Weekend'}
              </div>
            )}
          </div>

          {/* Calendar card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6">

            {/* Month navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-full hover:bg-orange-50 text-gray-400 hover:text-orange-500 font-bold text-xl flex items-center justify-center transition-colors"
                aria-label="Previous month"
              >
                ‹
              </button>
              <h2 className="text-gray-900 font-extrabold text-lg tracking-wide">
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-full hover:bg-orange-50 text-gray-400 hover:text-orange-500 font-bold text-xl flex items-center justify-center transition-colors"
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {DAYS_SHORT.map((d, i) => (
                <div
                  key={d}
                  className={`py-2.5 text-center text-[11px] font-bold uppercase tracking-widest ${
                    i === 0 || i === 6 ? 'text-gray-300' : 'text-gray-400'
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block w-6 h-6 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-7 border-l border-t border-gray-100">
                {Array.from({ length: totalCells }, (_, i) => {
                  const day = i - firstDay + 1;
                  const inMonth = day >= 1 && day <= daysInMonth;

                  if (!inMonth) {
                    return <div key={i} className="border-r border-b border-gray-50 bg-gray-50/60 min-h-[90px]" />;
                  }

                  const weekend = isWeekend(day);
                  const key = getDayKey(day);
                  const holiday = holidays[key] || null;
                  const closure = events.find(e => e.date === key && e.type === 'closure');
                  const closed = weekend || !!holiday || !!closure;
                  const closedLabel = holiday || (closure ? closure.title : null);
                  const dayActivities = events.filter(e => e.date === key && e.type === 'activity');
                  const isToday = key === todayKey;

                  return (
                    <div
                      key={i}
                      className={`border-r border-b border-gray-100 min-h-[90px] p-2 transition-colors ${
                        isToday
                          ? 'bg-orange-50 ring-2 ring-inset ring-orange-300'
                          : (holiday || closure)
                            ? 'bg-rose-50/60'
                            : weekend
                              ? 'bg-gray-50/80'
                              : 'bg-white'
                      }`}
                    >
                      {/* Date row */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center ${
                            isToday
                              ? 'bg-orange-500 text-white shadow-sm'
                              : closed
                                ? 'text-gray-300'
                                : 'text-gray-700'
                          }`}
                        >
                          {day}
                        </span>

                        {isToday && (
                          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-wide">Today</span>
                        )}
                        {closedLabel && !isToday && (
                          <span className="text-[9px] font-semibold text-rose-400 leading-tight text-right max-w-[66px]">
                            {closedLabel}
                          </span>
                        )}
                        {weekend && !closedLabel && !isToday && (
                          <span className="text-[9px] text-gray-300 font-medium">Closed</span>
                        )}
                      </div>

                      {/* Events */}
                      {!closed && dayActivities.map(e => (
                        <div key={e.id} className="mt-1">
                          <div className="flex items-start gap-1">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                            <span className="text-[11px] font-semibold text-teal-800 leading-snug">
                              {e.title}
                            </span>
                          </div>
                          {e.description && (
                            <p className="text-[10px] text-gray-400 mt-0.5 pl-2.5 leading-snug line-clamp-2">
                              {e.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info footer */}
          <div className="mb-10 rounded-2xl bg-white border border-gray-100 shadow-sm px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>Scheduled activity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-rose-100 border border-rose-200" />
                <span>Holiday — Closed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>Today</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Questions? Call <a href="tel:8015137750" className="text-orange-500 font-bold hover:underline">(801) 513-7750</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
