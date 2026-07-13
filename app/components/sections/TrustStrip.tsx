import { site } from '@/data/site';

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {site.trustSignals.map((signal) => (
            <div
              key={signal.label}
              className="flex flex-col items-center text-center gap-1 py-3 px-2 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors"
            >
              <span className="text-3xl">{signal.icon}</span>
              <p className="font-bold text-gray-800 text-sm">{signal.label}</p>
              <p className="text-xs text-gray-500">{signal.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
