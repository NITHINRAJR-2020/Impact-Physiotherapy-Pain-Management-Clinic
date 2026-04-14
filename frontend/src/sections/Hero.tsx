import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image card entrance
      tl.fromTo(
        imageRef.current,
        { x: 200, scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 }
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.6'
      );

      // Subheadline entrance
      tl.fromTo(
        subheadlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Dots entrance
      tl.fromTo(
        dotsRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.22, duration: 0.5 },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(imageRef.current, { opacity: 1, x: 0, scale: 1 });
          },
        },
      });

      // Exit animations (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: -80, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: 50, opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: 150, scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        dotsRef.current,
        { opacity: 0.22 },
        { opacity: 0 },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6FAFD] overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/50 via-transparent to-transparent" />

      {/* Medical cross watermark */}
      <div className="absolute left-[5vw] top-[15vh] opacity-5">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor" className="text-[#1E6AF3]">
          <path d="M40 0h20v40h40v20h-40v40h-20v-40h-40v-20h40z" />
        </svg>
      </div>

      <div className="relative w-full h-full flex items-center px-6 lg:px-12">
        {/* Left content */}
        <div className="w-full lg:w-[45vw] z-10 pt-20">
          <h1
            ref={headlineRef}
            className="text-[clamp(40px,5vw,72px)] font-bold text-[#0B1C3B] leading-[0.95] mb-6"
          >
            Move better.
            <br />
            Feel stronger.
          </h1>

          <p
            ref={subheadlineRef}
            className="text-[clamp(16px,1.2vw,20px)] text-[#6B7A99] leading-relaxed max-w-md mb-8"
          >
            Hands-on physiotherapy and rehabilitation plans built around your goals. 
            Experience 20+ years of expertise at Bangalore's trusted pain management clinic.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <button onClick={scrollToContact} className="btn-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book appointment
            </button>
            <button
              onClick={scrollToServices}
              className="btn-secondary flex items-center gap-2"
            >
              See services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right image card */}
        <div
          ref={imageRef}
          className="hidden lg:block absolute right-[6vw] top-[18vh] w-[38vw] h-[64vh] rounded-[34px] overflow-hidden medical-card"
        >
          <img
            src="/images/hero-patient.jpg"
            alt="Physiotherapy session"
            className="w-full h-full object-cover img-medical"
          />
        </div>

        {/* Dot pattern */}
        <div
          ref={dotsRef}
          className="hidden lg:block absolute left-[48vw] top-[72vh] dot-float"
        >
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#1E6AF3]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
