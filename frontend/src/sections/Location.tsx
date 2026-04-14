import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Navigation, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0% - 30%)
      // Info card
      scrollTl.fromTo(
        infoCardRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Map card
      scrollTl.fromTo(
        mapCardRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        infoCardRef.current,
        { y: 0, opacity: 1 },
        { y: -60, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        mapCardRef.current,
        { y: 0, opacity: 1 },
        { y: 60, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openDirections = () => {
    const address = '771, 16th Main Road, BTM Layout 2nd Stage, Bangalore';
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative w-full h-screen bg-[#F6FAFD] overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center px-4 lg:px-8 py-16">
        {/* Info Card (Blue) */}
        <div
          ref={infoCardRef}
          className="w-full lg:absolute lg:left-[6vw] lg:top-[16vh] lg:w-[30vw] lg:h-[68vh] bg-[#1E6AF3] rounded-[32px] p-6 lg:p-8 medical-card flex flex-col justify-center"
        >
          <h2 className="text-[clamp(28px,2.8vw,44px)] font-bold text-white leading-tight mb-6">
            Visit us
          </h2>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Address</p>
                <p className="text-white/80 text-sm mt-1">
                  771, 16th Main Road
                  <br />
                  BTM Layout 2nd Stage
                  <br />
                  Bangalore
                </p>
              </div>
            </div>

            {/* Landmark */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Landmark</p>
                <p className="text-white/80 text-sm mt-1">
                  Next to Amma's Bakery
                  <br />
                  & opposite Swadisth Aahar
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Working Hours</p>
                <p className="text-white/80 text-sm mt-1">
                  Mon - Saturday
                  <br />
                  9:00 AM - 2:00 PM
                  <br />
                  5:00 PM - 9:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={openDirections}
            className="mt-8 bg-white text-[#1E6AF3] px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Get directions
          </button>
        </div>

        {/* Map Card */}
        <div
          ref={mapCardRef}
          className="hidden lg:block absolute left-[38vw] top-[16vh] w-[56vw] h-[68vh] bg-white rounded-[32px] overflow-hidden medical-card"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9!2d77.607!3d12.916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzU3LjYiTiA3N8KwMzYnMjUuMiJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Impact Physiotherapy Location"
          />
        </div>
      </div>
    </section>
  );
};

export default Location;
