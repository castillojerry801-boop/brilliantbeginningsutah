import { site } from '@/data/site';

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-teal-50 via-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-4xl mb-3 block">💛</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Why Families Choose Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're not just a daycare — we're an extension of your family. Here's what makes
            Brilliant Beginnings different.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {site.whyUs.map((item) => (
            <div
              key={item.headline}
              className="flex gap-4 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="text-4xl flex-shrink-0 mt-1">{item.icon}</div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-800 mb-1">{item.headline}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div className="mt-12 bg-orange-500 text-white rounded-3xl p-8 text-center">
          <p className="text-lg md:text-xl font-semibold leading-relaxed max-w-2xl mx-auto">
            &ldquo;{site.description}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
