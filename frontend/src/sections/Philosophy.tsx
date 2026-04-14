import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '94%', label: 'Patients report reduced pain within 6 visits' },
  { value: '20+', label: 'Years of combined clinical experience' },
  { value: '6k+', label: 'Treatments delivered annually' },
];

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0% - 30%)
      // Left image
      scrollTl.fromTo(
        imageRef.current,
        { x: -400, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right content card
      scrollTl.fromTo(
        contentRef.current,
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Body text
      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
      );

      // Stats
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          scrollTl.fromTo(
            stat,
            { y: 40, scale: 0.96, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, ease: 'none' },
            0.18 + i * 0.04
          );
        }
      });

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: 100, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6FAFD] overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center px-4 lg:px-8 py-16">
        {/* Left Image Card */}
        <div
          ref={imageRef}
          className="hidden lg:block absolute left-[6vw] top-[16vh] w-[34vw] h-[68vh] rounded-[32px] overflow-hidden medical-card"
        >
          <img
            src="/images/philosophy-therapy.jpg"
            alt="Physiotherapy treatment"
            className="w-full h-full object-cover img-medical"
          />
        </div>

        {/* Right Content Card */}
        <div
          ref={contentRef}
          className="w-full lg:absolute lg:left-[44vw] lg:top-[16vh] lg:w-[50vw] lg:h-[68vh] bg-white rounded-[32px] p-8 lg:p-12 medical-card flex flex-col justify-center"
        >
          <h2
            ref={headlineRef}
            className="text-[clamp(28px,3vw,44px)] font-bold text-[#0B1C3B] leading-tight mb-6"
          >
            Why physiotherapy
            <br />
            matters
          </h2>

          <p
            ref={bodyRef}
            className="text-[#6B7A99] text-base lg:text-lg leading-relaxed mb-10"
          >
            We don't just treat symptoms. We identify the root cause, rebuild 
            movement patterns, and give you a plan you can stick to—so results last. 
            Our approach combines evidence-based techniques with personalized care 
            to help you achieve lasting recovery.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => { statsRef.current[i] = el; }}
                className="text-center lg:text-left"
              >
                <div className="text-[clamp(24px,2.5vw,40px)] font-bold text-[#1E6AF3]">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-[#6B7A99] mt-1 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
