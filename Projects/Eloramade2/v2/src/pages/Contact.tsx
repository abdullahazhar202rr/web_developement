import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-neutral-600 mb-8">
            Have a question or special request? We'd love to hear from you. Reach out
            through any of the channels below or send us a message.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">Phone</h3>
                <p className="text-neutral-600">+92 300 1234567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">Email</h3>
                <p className="text-neutral-600">hello@eloramate.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">Location</h3>
                <p className="text-neutral-600">Lahore, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/eloramate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg p-8">
          <h2 className="text-2xl font-light text-neutral-900 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" type="text" required />
            <Input label="Email" type="email" required />
            <Input label="Phone" type="tel" required />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
