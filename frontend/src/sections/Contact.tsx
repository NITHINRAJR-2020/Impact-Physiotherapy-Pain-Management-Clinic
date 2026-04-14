import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, Send, Check, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { appointmentApi, ApiError } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formCardRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contactCardRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await appointmentApi.submit({
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        message: formData.message || undefined,
      });
      setShowSuccess(true);
      setFormData({ name: '', phone: '', date: '', message: '' });
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong. Please try again or call us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-white py-20 lg:py-28"
    >
      <div className="px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Card */}
          <div
            ref={formCardRef}
            className="w-full lg:w-[55vw] bg-[#F6FAFD] rounded-[32px] p-6 lg:p-10 medical-card"
          >
            <h2 className="text-[clamp(28px,3vw,44px)] font-bold text-[#0B1C3B] leading-tight mb-2">
              Book your first visit
            </h2>
            <p className="text-[#6B7A99] text-base mb-8">
              Fill in your details and we'll confirm your appointment within 2 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#1E6AF3]/20 text-[#0B1C3B] placeholder:text-[#6B7A99]/50 focus:outline-none focus:border-[#1E6AF3] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#1E6AF3]/20 text-[#0B1C3B] placeholder:text-[#6B7A99]/50 focus:outline-none focus:border-[#1E6AF3] transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#1E6AF3]/20 text-[#0B1C3B] focus:outline-none focus:border-[#1E6AF3] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B1C3B] mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#1E6AF3]/20 text-[#0B1C3B] placeholder:text-[#6B7A99]/50 focus:outline-none focus:border-[#1E6AF3] transition-colors resize-none"
                  placeholder="Tell us about your condition or any specific requirements..."
                />
              </div>

              {errorMessage && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Request appointment
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Card */}
          <div
            ref={contactCardRef}
            className="w-full lg:w-[35vw] flex flex-col gap-4"
          >
            {/* Contact Info */}
            <div className="bg-[#1E6AF3] rounded-[32px] p-6 lg:p-8 medical-card flex-grow">
              <h3 className="text-xl font-semibold text-white mb-6">
                Get in touch
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Call us</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </a>

                <a
                  href="mailto:hello@impactphysio.in"
                  className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email us</p>
                    <p className="font-medium">hello@impactphysio.in</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">WhatsApp</p>
                    <p className="font-medium">Chat on WhatsApp</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-[#F6FAFD] rounded-[32px] p-6 medical-card">
              <p className="text-sm text-[#6B7A99]">
                <span className="font-medium text-[#0B1C3B]">Same-day appointments</span> available for urgent cases. 
                Walk-ins welcome during working hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Appointment Requested!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for reaching out. We'll confirm your appointment within 2 hours. 
              For urgent inquiries, please call us directly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowSuccess(false)}
              className="btn-primary"
            >
              Got it
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
