import { site } from '@/data/site';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center py-14 bg-white">
      {/* Background logo with white fill around it */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/bbc-logo-clean.jpeg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
        }}
      />
      {/* Blue-to-green tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-teal-500/65 to-green-500/70" />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-6 shadow">
          <span>🏠</span>
          <span>In-Home Daycare · Clinton, UT</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md leading-tight mb-4">
          {site.tagline}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-white/90 mb-2">
          {site.name}
        </p>
        <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto">
          Licensed in-home childcare in Clinton, UT. Serving families with children {site.ageRange}.
          Open Monday–Friday, 5:00 AM – 5:30 PM.
        </p>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['✅ Licensed Provider', '🏥 CPR Certified', '🍎 Meals Included', '⏰ Open 5 AM'].map((t) => (
            <span key={t} className="bg-white/80 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#enroll"
            className="bg-white text-orange-500 font-extrabold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            🌟 {site.cta}
          </a>
          <a
            href={`tel:${site.phone}`}
            className="bg-orange-600 text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-orange-700 hover:scale-105 transition-all"
          >
            📞 {site.phone}
          </a>
        </div>

        {/* Limited space notice */}
        <p className="mt-8 text-white/90 font-semibold text-sm animate-pulse">
          ⚠️ Limited spaces available — contact us today!
        </p>
      </div>
    </section>
  );
}
