import { site } from '@/data/site';

export default function ServiceArea() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-4xl mb-3 block">📍</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Serving Your Community
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Based in Clinton, UT — conveniently located for families throughout North Davis County and Weber County.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Map placeholder */}
          <div className="bg-teal-100 rounded-3xl h-64 flex flex-col items-center justify-center gap-3 border-2 border-teal-200">
            <span className="text-5xl">🗺️</span>
            <p className="font-bold text-teal-700">1783 N 810 W</p>
            <p className="text-teal-600 text-sm">Clinton, UT 84015</p>
            <a
              href="https://maps.google.com/?q=1783+N+810+W+Clinton+UT+84015"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-teal-500 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-teal-600 transition-colors"
            >
              Get Directions
            </a>
          </div>

          {/* Cities list */}
          <div>
            <p className="font-extrabold text-gray-700 mb-4 text-lg">Cities & Neighborhoods We Serve:</p>
            <div className="flex flex-wrap gap-3">
              {site.serviceArea.map((city) => (
                <span
                  key={city}
                  className="bg-white border border-orange-200 text-orange-600 font-semibold text-sm px-4 py-2 rounded-full shadow-sm"
                >
                  📌 {city}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Not sure if you&apos;re in our area? Give us a call — we&apos;d love to help.
            </p>
            <a
              href={`tel:${site.phone}`}
              className="mt-3 inline-block text-orange-500 font-bold hover:underline"
            >
              📞 {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
