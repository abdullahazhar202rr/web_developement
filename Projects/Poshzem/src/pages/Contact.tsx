import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary-400" />,
      title: 'Email',
      content: 'abdullahazhar202rr@gmail.com',
      link: 'mailto:abdullahazhar202rr@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6 text-primary-400" />,
      title: 'Phone',
      content: '03140632577',
      link: 'tel:03140632577',
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-400" />,
      title: 'Address',
      content: 'Chak no. 202 RB Bhaiwala Faisalabad',
      link: '#',
    },
    {
      icon: <Clock className="w-6 h-6 text-primary-400" />,
      title: 'Business Hours',
      content: 'Monday to Friday, 9 AM to 6 PM',
      link: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      name: 'Instagram',
      handle: '@poshzem_',
      link: 'https://www.instagram.com/poshzem_/',
      color: 'hover:text-pink-500',
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      name: 'Facebook',
      handle: 'facebook.com/poshzem',
      link: 'https://facebook.com/poshzem',
      color: 'hover:text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-950 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Get in touch with our team for any questions or support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary-950 mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-950 mb-1">{info.title}</h3>
                      {info.link !== '#' ? (
                        <a 
                          href={info.link}
                          className="text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-primary-950 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 bg-gray-100 px-4 py-3 rounded-xl transition-colors ${social.color} hover:bg-gray-200`}
                    >
                      {social.icon}
                      <div>
                        <p className="font-medium text-gray-900">{social.name}</p>
                        <p className="text-sm text-gray-600">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-primary-950 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-950 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-950 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about PoshZem
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'What are your shipping options?',
                answer: 'We offer fast and reliable shipping across Pakistan. Standard delivery takes 3-5 business days, and express delivery is available for urgent orders.',
              },
              {
                question: 'Do you offer returns or exchanges?',
                answer: 'Yes, we have a 30-day return policy for unworn items in original condition. Please contact our customer service team to initiate a return.',
              },
              {
                question: 'How can I track my order?',
                answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to monitor your package\'s progress.',
              },
              {
                question: 'Are your products authentic?',
                answer: 'Absolutely! We guarantee the authenticity of all our products. Each item comes with proper certification and warranty.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary-950 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}