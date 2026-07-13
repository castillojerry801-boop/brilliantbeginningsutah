import { site } from '@/data/site';

const cardBgs = [
  'bg-orange-50 border-orange-200',
  'bg-teal-50 border-teal-200',
  'bg-yellow-50 border-yellow-200',
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-4xl mb-3 block">⭐</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            What Parents Are Saying
          </h2>
          <p className="text-gray-500">
            Real reviews from parents in our program.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {site.testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`${cardBgs[i % cardBgs.length]} border rounded-3xl p-6 flex flex-col gap-4`}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-auto">
                <p className="font-bold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
