import { Gift, Truck, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: Gift,
    title: 'Handcrafted with Love',
    description: 'Every product is carefully crafted by skilled artisans',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'We deliver across Pakistan with care and precision',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Safe and easy payment through JazzCash, Easypaisa & NayaPay',
  },
  {
    icon: Heart,
    title: 'Customization',
    description: 'Personalize your gifts with names, dates & messages',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium tracking-widest text-sm mb-3 uppercase">
            Why EloraMate
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Crafted for Special Moments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-background hover:shadow-soft transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
