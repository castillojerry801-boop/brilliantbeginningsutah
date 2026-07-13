import { site } from '@/data/site';

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-xl px-4 py-3 flex gap-3">
      <a
        href={`tel:${site.phone}`}
        className="flex-1 flex items-center justify-center gap-2 bg-teal-500 text-white font-bold py-3 rounded-2xl hover:bg-teal-600 transition-colors text-sm"
      >
        📞 <span>{site.phone}</span>
      </a>
      <a
        href="#enroll"
        className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3 rounded-2xl hover:bg-orange-600 transition-colors text-sm"
      >
        🌟 <span>Schedule Tour</span>
      </a>
    </div>
  );
}
