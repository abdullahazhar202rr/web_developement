import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-500 to-pink-600 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/90 to-pink-600/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions, suggestions, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-6">
                <MapPin className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600">
                123 Gift Street, Celebration City,<br />
                GF 12345, Country
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-6">
                <Phone className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600">
                Customer Service:<br />
                <a href="tel:+1234567890" className="text-rose-500 hover:underline">+1 (234) 567-890</a>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-6">
                <Mail className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600">
                General Inquiries:<br />
                <a href="mailto:info@eloramade.com" className="text-rose-500 hover:underline">info@eloramade.com</a>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-emerald-50 rounded-lg p-6 text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    
                    <Input
                      label="Email Address"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  
                  <Input
                    label="Subject"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : <Send size={16} />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
              <div className="rounded-lg overflow-hidden shadow-md h-96 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986613799748!3d40.69714941954754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1610567881962!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Eloramade Store Location"
                ></iframe>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Store Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Monday - Friday:</div>
                  <div>9:00 AM - 6:00 PM</div>
                  <div>Saturday:</div>
                  <div>10:00 AM - 5:00 PM</div>
                  <div>Sunday:</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our products and services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              { q: 'How long does shipping take?', a: 'Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for faster delivery.' },
              { q: 'Can I customize my gift?', a: 'Yes! Many of our products offer personalization options. Look for the "Customize" option on product pages.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day return policy for most items. Personalized items cannot be returned unless damaged or defective.' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.' },
            ].map((faq, index) => (
              <div key={index} className="mb-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;