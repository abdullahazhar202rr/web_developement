export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-8">About EloraMate</h1>

      <div className="prose prose-neutral max-w-none">
        <div className="mb-12">
          <img
            src="https://images.pexels.com/photos/1666073/pexels-photo-1666073.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Handmade gifts"
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        </div>

        <div className="space-y-6 text-neutral-600 leading-relaxed">
          <p className="text-lg">
            Welcome to EloraMate, where every gift tells a story and every creation is made
            with love and attention to detail.
          </p>

          <p>
            We specialize in handcrafted gifts perfect for life's most precious moments.
            From elegant wedding favors to beautiful Islamic customized items, we bring
            your special occasions to life with unique, thoughtful creations.
          </p>

          <h2 className="text-2xl font-medium text-neutral-900 mt-8 mb-4">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Custom Gifts</h3>
              <p className="text-sm">
                Personalized gifts for birthdays, anniversaries, and special celebrations.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Beautiful Bouquets</h3>
              <p className="text-sm">
                Handcrafted flower arrangements for any occasion.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Nikah Pens</h3>
              <p className="text-sm">
                Elegant pens for your nikah ceremony, customizable to your style.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Wedding Items</h3>
              <p className="text-sm">
                Complete wedding favor sets and Islamic customized items for your big day.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-medium text-neutral-900 mt-8 mb-4">
            Our Promise
          </h2>

          <p>
            At EloraMate, quality and customer satisfaction are our top priorities. Each
            item is carefully crafted with premium materials and attention to detail. We
            work closely with you to bring your vision to life and create gifts that will
            be cherished for years to come.
          </p>

          <p>
            Whether you're celebrating a wedding, looking for the perfect gift, or planning
            a special event, we're here to make it memorable.
          </p>
        </div>
      </div>
    </div>
  );
}
