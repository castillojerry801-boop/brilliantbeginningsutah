'use client';

import { useState } from 'react';
import { site } from '@/data/site';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    startDate: '',
    message: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setState('success');
      setForm({ parentName: '', childName: '', childAge: '', phone: '', email: '', startDate: '', message: '' });
    } catch {
      setState('error');
    }
  }

  return (
    <section id="enroll" className="py-20 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-4xl mb-3 block">📋</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Schedule a Tour or Ask a Question
          </h2>
          <p className="text-white/80 mb-3">
            Fill out the form below or give us a call.
          </p>
          <a href="tel:+18015137750" className="inline-flex items-center gap-2 font-extrabold text-white text-lg">
            <span>📞</span><span>(801) 513-7750</span>
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl">
          {state === 'success' ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-2">We Got Your Message!</h3>
              <p className="text-gray-600">
                Thanks for reaching out! We&apos;ll contact you within 24 hours to schedule your tour
                or answer your questions.
              </p>
              <button
                onClick={() => setState('idle')}
                className="mt-6 bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Parent / Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="parentName"
                    value={form.parentName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Child&apos;s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="childName"
                    value={form.childName}
                    onChange={handleChange}
                    placeholder="Child's first name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Child&apos;s Age / Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="childAge"
                    value={form.childAge}
                    onChange={handleChange}
                    placeholder="e.g. 18 months or 01/15/2023"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Desired Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(801) 555-0100"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@email.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Questions or Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your child, your schedule needs, or any questions you have..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              {state === 'error' && (
                <p className="text-red-500 text-sm font-semibold">
                  Something went wrong. Please call us directly at {site.phone}.
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'loading'}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-extrabold text-lg py-4 rounded-2xl transition-colors shadow-md"
              >
                {state === 'loading' ? '⏳ Sending...' : '🌟 Send My Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
