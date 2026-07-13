import { site } from '@/data/site';

const cardColors = [
  'from-orange-100 to-orange-50 border-orange-200',
  'from-teal-100 to-teal-50 border-teal-200',
  'from-yellow-100 to-yellow-50 border-yellow-200',
  'from-red-100 to-red-50 border-red-200',
  'from-green-100 to-green-50 border-green-200',
  'from-sky-100 to-sky-50 border-sky-200',
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-4xl mb-3 block">🎒</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            What We Offer
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything your child needs to grow, learn, and thrive — all in one warm, loving home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {site.services.map((service, i) => (
            <div
              key={service.name}
              className={`bg-gradient-to-br ${cardColors[i % cardColors.length]} border rounded-3xl p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-extrabold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
