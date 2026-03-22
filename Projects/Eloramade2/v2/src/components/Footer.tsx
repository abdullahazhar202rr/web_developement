import { Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-light tracking-wider text-neutral-900 mb-4">
              EloraMate
            </h3>
            <p className="text-neutral-600 text-sm">
              Handcrafted gifts for your special moments. Wedding favors, Islamic gifts, and custom bouquets.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-neutral-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <a href="/" className="hover:text-neutral-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-neutral-900 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-neutral-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-neutral-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-neutral-900 mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/eloramate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-600">
          <p>&copy; 2024 EloraMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
