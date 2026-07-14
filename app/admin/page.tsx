'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { getHolidaysForYear, dateKey } from '@/lib/holidays';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  description: string | null;
  type: 'activity' | 'closure';
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function AdminPage() {
  const router = useRouter();
  const now = new Date();

  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [tab, setTab] = useState<'activities' | 'closure'>('activities');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [closureReason, setClosureReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setUserEmail(session.user.email ?? '');
        setAuthChecked(true);
      }
    });
  }, [router]);

  const loadEvents = useCallback(async () => {
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
    setEvents((data || []) as CalendarEvent[]);
    setLoading(false);
  }, [year, month]);

  useEffect(() => {
    if (authChecked) loadEvents();
  }, [authChecked, loadEvents]);

  function prevMonth() {
    setSelectedDay(null);
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    setSelectedDay(null);
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  function selectDay(day: number) {
    setSelectedDay(prev => prev === day ? null : day);
    setTab('activities');
    setNewTitle('');
    setNewDesc('');
    setClosureReason('');
    setSaveError('');
  }

  async function signOut() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  async function addActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !newTitle.trim()) return;
    setSaving(true);
    setSaveError('');
    const supabase = getSupabase();
    const { error } = await supabase.from('calendar_events').insert({
      date: dateKey(new Date(year, month, selectedDay)),
      title: newTitle.trim(),
      description: newDesc.trim() || null,
      type: 'activity',
    });
    if (error) { setSaveError(error.message); }
    else { setNewTitle(''); setNewDesc(''); await loadEvents(); }
    setSaving(false);
  }

  async function markClosed(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !closureReason.trim()) return;
    setSaving(true);
    setSaveError('');
    const supabase = getSupabase();
    const { error } = await supabase.from('calendar_events').insert({
      date: dateKey(new Date(year, month, selectedDay)),
      title: closureReason.trim(),
      description: null,
      type: 'closure',
    });
    if (error) { setSaveError(error.message); }
    else { setClosureReason(''); await loadEvents(); }
    setSaving(false);
  }

  async function deleteEvent(id: string) {
    const supabase = getSupabase();
    await supabase.from('calendar_events').delete().eq('id', id);
    await loadEvents();
  }

  const holidays = getHolidaysForYear(year);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;

  function getDayKey(day: number) { return dateKey(new Date(year, month, day)); }
  function isWeekend(day: number) { const d = new Date(year, month, day).getDay(); return d === 0 || d === 6; }

  const selectedKey = selectedDay ? getDayKey(selectedDay) : null;
  const selectedActivities = selectedKey ? events.filter(e => e.date === selectedKey && e.type === 'activity') : [];
  const selectedClosure = selectedKey ? events.find(e => e.date === selectedKey && e.type === 'closure') : null;
  const selectedHoliday = selectedKey ? holidays[selectedKey] : null;
  const selectedIsWeekend = selectedDay ? isWeekend(selectedDay) : false;
  const selectedHardClosed = selectedIsWeekend || !!selectedHoliday;

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Checking credentials…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌈</span>
          <div>
            <p className="font-extrabold text-orange-500 text-sm leading-tight">Brilliant Beginnings</p>
            <p className="text-[10px] text-gray-400">Calendar Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/calendar" className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors">
            View public calendar →
          </Link>
          <span className="text-xs text-gray-400 hidden sm:block">{userEmail}</span>
          <button
            onClick={signOut}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-gray-900">Calendar Editor</h1>
          <p className="text-sm text-gray-400 mt-0.5">Click any weekday to add activities or mark the day closed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between bg-orange-500 px-5 py-3.5">
              <button onClick={prevMonth} className="text-white hover:text-orange-200 font-bold text-2xl w-8 h-8 flex items-center justify-center transition-colors" aria-label="Previous month">‹</button>
              <h2 className="text-white font-extrabold text-lg">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="text-white hover:text-orange-200 font-bold text-2xl w-8 h-8 flex items-center justify-center transition-colors" aria-label="Next month">›</button>
            </div>

            <div className="grid grid-cols-7 bg-orange-50 border-b border-orange-100">
              {DAYS.map(d => (
                <div key={d} className="py-2 text-center text-[10px] font-bold text-orange-400 uppercase tracking-wider">{d}</div>
              ))}
            </div>

            {loading ? (
              <div className="py-14 text-center">
                <div className="inline-block w-5 h-5 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-7 border-l border-t border-gray-100">
                {Array.from({ length: totalCells }, (_, i) => {
                  const day = i - firstDay + 1;
                  const inMonth = day >= 1 && day <= daysInMonth;

                  if (!inMonth) {
                    return <div key={i} className="border-r border-b border-gray-100 bg-gray-50 min-h-[80px]" />;
                  }

                  const weekend = isWeekend(day);
                  const key = getDayKey(day);
                  const holiday = holidays[key] || null;
                  const hardClosed = weekend || !!holiday;
                  const closure = events.find(e => e.date === key && e.type === 'closure');
                  const dayActivities = events.filter(e => e.date === key && e.type === 'activity');
                  const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={i}
                      onClick={() => !hardClosed && selectDay(day)}
                      disabled={hardClosed}
                      className={`border-r border-b border-gray-100 min-h-[80px] p-2 text-left w-full transition-colors ${
                        hardClosed
                          ? 'bg-gray-50 cursor-default'
                          : isSelected
                            ? 'bg-orange-50 ring-2 ring-inset ring-orange-400'
                            : closure
                              ? 'bg-rose-50 hover:bg-rose-100 cursor-pointer'
                              : 'bg-white hover:bg-orange-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                          isToday ? 'bg-orange-500 text-white'
                          : hardClosed ? 'text-gray-300'
                          : 'text-gray-600'
                        }`}>{day}</span>
                        {holiday && <span className="text-[8px] font-semibold text-rose-400 leading-tight text-right max-w-[60px]">{holiday}</span>}
                        {weekend && !holiday && <span className="text-[8px] text-gray-300">Closed</span>}
                        {closure && !hardClosed && <span className="text-[8px] font-semibold text-rose-500 leading-tight text-right max-w-[60px]">{closure.title}</span>}
                      </div>
                      {!hardClosed && !closure && dayActivities.map(e => (
                        <span key={e.id} className="block text-[9px] font-semibold text-teal-700 bg-teal-50 rounded px-1 py-0.5 mb-0.5 leading-snug truncate">
                          {e.title}
                        </span>
                      ))}
                      {!hardClosed && !closure && dayActivities.length === 0 && (
                        <span className="block text-[9px] text-gray-300 mt-1">+ add</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="lg:col-span-1">
            {!selectedDay ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-gray-400">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-sm font-medium">Select a day</p>
                <p className="text-xs mt-1">Click any weekday to add activities or mark it closed.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Panel header */}
                <div className={`px-4 py-3 ${selectedHardClosed ? 'bg-gray-400' : selectedClosure ? 'bg-rose-500' : 'bg-orange-500'}`}>
                  <p className="text-white font-extrabold text-sm">
                    {DAY_NAMES[new Date(year, month, selectedDay).getDay()]}, {MONTHS[month]} {selectedDay}
                  </p>
                  <p className="text-white/75 text-xs mt-0.5">
                    {selectedHoliday
                      ? `Closed — ${selectedHoliday}`
                      : selectedIsWeekend
                        ? 'Closed — Weekend'
                        : selectedClosure
                          ? `Closed — ${selectedClosure.title}`
                          : 'Open 5:00 AM – 5:30 PM'}
                  </p>
                </div>

                {selectedHardClosed ? (
                  <div className="p-4 text-center text-gray-400 text-xs">
                    This day is permanently closed.
                  </div>
                ) : (
                  <>
                    {/* Tabs */}
                    <div className="flex border-b border-gray-100">
                      <button
                        onClick={() => setTab('activities')}
                        className={`flex-1 py-2.5 text-xs font-bold transition-colors ${
                          tab === 'activities'
                            ? 'text-orange-500 border-b-2 border-orange-500'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        Activities
                      </button>
                      <button
                        onClick={() => setTab('closure')}
                        className={`flex-1 py-2.5 text-xs font-bold transition-colors ${
                          tab === 'closure'
                            ? 'text-rose-500 border-b-2 border-rose-500'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        Day Off
                      </button>
                    </div>

                    <div className="p-4">
                      {/* Activities tab */}
                      {tab === 'activities' && (
                        <>
                          {selectedActivities.length > 0 && (
                            <ul className="space-y-2 mb-4">
                              {selectedActivities.map(ev => (
                                <li key={ev.id} className="flex items-start justify-between gap-2 bg-teal-50 rounded-lg px-3 py-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-teal-800 leading-snug">{ev.title}</p>
                                    {ev.description && (
                                      <p className="text-[10px] text-teal-600 mt-0.5 leading-snug">{ev.description}</p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => deleteEvent(ev.id)}
                                    className="text-red-400 hover:text-red-600 text-xs font-bold flex-shrink-0 transition-colors"
                                    aria-label="Delete"
                                  >
                                    ✕
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}

                          <form onSubmit={addActivity} className="space-y-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Add Activity</p>
                            <input
                              type="text"
                              value={newTitle}
                              onChange={e => setNewTitle(e.target.value)}
                              required
                              placeholder="e.g. Swimming, Pizza Lunch, Field Trip"
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            <textarea
                              value={newDesc}
                              onChange={e => setNewDesc(e.target.value)}
                              placeholder="Details (optional)"
                              rows={2}
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                            />
                            {saveError && <p className="text-[10px] text-red-500">{saveError}</p>}
                            <button
                              type="submit"
                              disabled={saving || !newTitle.trim()}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {saving ? 'Saving…' : '+ Add Activity'}
                            </button>
                          </form>
                        </>
                      )}

                      {/* Day Off tab */}
                      {tab === 'closure' && (
                        <>
                          {selectedClosure ? (
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2 bg-rose-50 border border-rose-100 rounded-lg px-3 py-3">
                                <div>
                                  <p className="text-xs font-bold text-rose-700">Marked as Closed</p>
                                  <p className="text-xs text-rose-500 mt-0.5">{selectedClosure.title}</p>
                                </div>
                                <button
                                  onClick={() => deleteEvent(selectedClosure.id)}
                                  className="text-red-400 hover:text-red-600 text-xs font-bold flex-shrink-0 transition-colors"
                                  aria-label="Remove closure"
                                >
                                  ✕
                                </button>
                              </div>
                              <p className="text-[10px] text-gray-400 text-center">Remove the closure above to re-open this day.</p>
                            </div>
                          ) : (
                            <form onSubmit={markClosed} className="space-y-3">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mark Day Closed</p>
                              <input
                                type="text"
                                value={closureReason}
                                onChange={e => setClosureReason(e.target.value)}
                                required
                                placeholder="Reason (e.g. State Holiday, Staff Training)"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                              />
                              {saveError && <p className="text-[10px] text-red-500">{saveError}</p>}
                              <button
                                type="submit"
                                disabled={saving || !closureReason.trim()}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {saving ? 'Saving…' : 'Mark as Closed'}
                              </button>
                              <p className="text-[10px] text-gray-400 text-center">Parents will see this day as closed on the calendar.</p>
                            </form>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
