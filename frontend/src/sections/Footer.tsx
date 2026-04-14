import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#0B1C3B] text-white py-12 lg:py-16">
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold font-['Space_Grotesk']">
                Impact
              </span>
              <span className="w-2 h-2 rounded-full bg-[#1E6AF3]"></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Bangalore's trusted physiotherapy and pain management clinic. 
              Helping you move better and feel stronger since 2004.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E6AF3] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E6AF3] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E6AF3] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E6AF3] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('#services')}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#team')}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#conditions')}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Conditions Treated
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#location')}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-white/60 text-sm">Sports Injury Rehab</span>
              </li>
              <li>
                <span className="text-white/60 text-sm">Chronic Pain Care</span>
              </li>
              <li>
                <span className="text-white/60 text-sm">Post-Surgical Recovery</span>
              </li>
              <li>
                <span className="text-white/60 text-sm">Mobility & Prevention</span>
              </li>
              <li>
                <span className="text-white/60 text-sm">Manual Therapy</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-white/60 text-sm">
                771, 16th Main Road
                <br />
                BTM Layout 2nd Stage
                <br />
                Bangalore
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@impactphysio.in"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  hello@impactphysio.in
                </a>
              </li>
              <li className="text-white/60 text-sm">
                Mon-Sat: 9AM-2PM, 5PM-9:30PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {currentYear} Impact Physiotherapy & Pain Management Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-white/40 hover:text-white text-sm transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
