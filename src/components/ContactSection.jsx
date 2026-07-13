import React, { useState } from 'react';

const ContactSection = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Mock telegram send
    console.log('Sending message to Telegram:', formData);
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-secondary dark:bg-gray-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 dark:opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#8487bf 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10" data-aos="fade-down">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you. Send us a message below.
          </p>
        </div>

        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 rounded-lg bg-secondary dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none transition"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-regular fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-secondary dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary text-gray-900 dark:text-white outline-none transition"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-lg bg-secondary dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary text-gray-900 dark:text-white outline-none transition resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-primary text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transform hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'} <i className="fa-solid fa-paper-plane"></i>
            </button>

            {status === 'success' && (
              <p id="statusMessage" className="text-center text-sm font-semibold mt-2 text-green-500">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
