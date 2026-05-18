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
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <img key={logo.name} className="h-8 dark:invert" src={logo.src} alt={logo.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
