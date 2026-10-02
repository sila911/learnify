import React from 'react';

const Logos = () => {
  const logos = [
    { name: "Transistor", src: "https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg" },
    { name: "Reform", src: "https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg" },
    { name: "Tuple", src: "https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg" },
    { name: "SavvyCal", src: "https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg" },
    { name: "Statamic", src: "https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg" }
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800" data-aos="fade-in">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Trusted by innovative teams
        </p>
        <div className="relative w-full overflow-hidden flex gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Gradient overlay fades for premium edge blending */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee shrink-0 gap-12 items-center py-2">
            {logos.map((logo) => (
              <img key={logo.name} className="h-7 md:h-8 dark:invert shrink-0 object-contain" src={logo.src} alt={logo.name} />
            ))}
          </div>
          <div className="flex animate-marquee shrink-0 gap-12 items-center py-2" aria-hidden="true">
            {logos.map((logo) => (
              <img key={`${logo.name}-dup`} className="h-7 md:h-8 dark:invert shrink-0 object-contain" src={logo.src} alt={logo.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
