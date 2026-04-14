import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Conditions', href: '#conditions' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 nav-blur shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1">
            <span className={`text-xl font-bold font-['Space_Grotesk'] ${isScrolled ? 'text-[#0B1C3B]' : 'text-[#0B1C3B]'}`}>
              Impact
            </span>
            <span className="w-2 h-2 rounded-full bg-[#1E6AF3]"></span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-[#1E6AF3] ${
                  isScrolled ? 'text-[#0B1C3B]' : 'text-[#0B1C3B]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-sm font-medium text-[#0B1C3B] hover:text-[#1E6AF3] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary text-sm py-3 px-6"
            >
              Book appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0B1C3B]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#1E6AF3] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-semibold text-white hover:text-white/80 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-8 bg-white text-[#1E6AF3] px-8 py-4 rounded-full font-semibold"
          >
            Book appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
