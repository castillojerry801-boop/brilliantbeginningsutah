import Image from 'next/image';
import { site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌈</span>
              <span className="text-white font-extrabold">{site.name}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{site.tagline}</p>
            <p className="text-xs text-gray-500 mt-3">{site.licenseNote}</p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold mb-3">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${site.phone}`} className="hover:text-orange-400 transition-colors">
                  📞 {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-orange-400 transition-colors text-xs whitespace-nowrap">
                  ✉️ {site.email}
                </a>
              </li>
              <li className="text-gray-400">📍 {site.address}</li>
            </ul>
          </div>

          {/* Hours & Ages */}
          <div>
            <p className="text-white font-bold mb-3">Program Info</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>⏰ {site.hours}</li>
              <li>👶 Ages: {site.ageRange}</li>
              <li>🍎 Meals included</li>
              <li>⚠️ Limited spaces — call today</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-bold mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#faq" className="hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="#enroll" className="hover:text-orange-400 transition-colors">Schedule a Tour</a></li>
              {site.social.facebook && (
                <li>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Facebook Page
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <p>In-home childcare in Clinton, UT · Serving Davis County families</p>
          </div>
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-gray-500">Powered by</span>
            <Image
              src="/cg-logo.jpeg"
              alt="Common Ground Workshop"
              width={28}
              height={28}
              className="rounded-full invert"
            />
            <span className="text-gray-400 font-semibold">Common Ground Workshop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
