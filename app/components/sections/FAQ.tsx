'use client';

import { useState } from 'react';
import { site } from '@/data/site';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-4xl mb-3 block">❓</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Have more questions? Call us at{' '}
            <a href={`tel:${site.phone}`} className="text-orange-500 font-bold hover:underline">
              {site.phone}
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {site.faq.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-gray-50 hover:bg-orange-50 transition-colors"
              >
                <span className="font-bold text-gray-800 pr-4">{item.question}</span>
                <span className="text-orange-500 text-xl flex-shrink-0 transition-transform" style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  ＋
                </span>
              </button>
              {open === i && (
                <div className="px-6 py-4 bg-white text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
