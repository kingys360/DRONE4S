import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'carbonmap@iitr.ac.in',
      link: 'mailto:carbonmap@iitr.ac.in'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 1332 285311',
      link: 'tel:+911332285311'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'IIT Roorkee, Roorkee, Uttarakhand 247667',
      link: 'https://maps.google.com/?q=IIT+Roorkee'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold tracking-tight text-white"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 max-w-2xl mx-auto"
        >
          Have questions about the project or want to contribute? We'd love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.a
              key={index}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-xl border border-white/10 bg-neutral-900/50 p-6 hover:bg-neutral-900/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-400 mb-1">
                    {info.title}
                  </h3>
                  <p className="text-white">{info.value}</p>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-neutral-900/50 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="h-6 w-6 text-emerald-400" />
            <h3 className="text-xl font-semibold text-white">Send us a Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-neutral-300 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-white placeholder:text-neutral-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-neutral-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-white placeholder:text-neutral-400"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-neutral-300 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-white placeholder:text-neutral-400"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-neutral-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-white placeholder:text-neutral-400 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <Send className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Office Hours</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Monday - Friday</span>
                <span className="text-white">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Saturday</span>
                <span className="text-white">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-1">
                  How is the data collected?
                </h4>
                <p className="text-sm text-neutral-400">
                  We use a combination of IoT sensors, utility meters, and manual surveys to collect
                  comprehensive emissions data across campus.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">
                  Can I access historical data?
                </h4>
                <p className="text-sm text-neutral-400">
                  Yes, historical data is available through the dashboard's analytics section,
                  with records dating back to the project's inception.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">
                  How can I contribute?
                </h4>
                <p className="text-sm text-neutral-400">
                  Students and faculty can contribute by logging their commutes, participating in
                  surveys, and suggesting sustainability initiatives.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Location</h3>
            <div className="aspect-video rounded-lg bg-neutral-950 border border-white/10 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13783.547834469184!2d77.88917!3d29.8655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb36161c2df4b%3A0x38eb56ccf899170c!2sIndian%20Institute%20of%20Technology%20Roorkee!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
