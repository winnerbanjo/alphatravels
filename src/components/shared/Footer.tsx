import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1830] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/flights"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link
                  href="/hotels"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/visa"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Visa Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Partners
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/airlines"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Airlines
                </Link>
              </li>
              <li>
                <Link
                  href="/hotels/partners"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/merchant/register"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/merchant/onboarding"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Agent Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Merchant Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Travel Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Partner Badge & Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
              <Globe className="h-4 w-4 text-white/80" />
              <span className="text-xs font-medium text-white/80">
                Global Partner
              </span>
            </div>
            <p className="text-sm text-white/60 text-center md:text-right">
              © {new Date().getFullYear()} Alpha Travels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
