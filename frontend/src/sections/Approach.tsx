import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Hand, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Assessment',
    description: 'We listen, test, and map your movement patterns to understand the root cause.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Treatment',
    description: 'Hands-on therapy combined with targeted exercises for optimal recovery.',
    icon: Hand,
  },
  {
    number: '03',
    title: 'Maintenance',
    description: 'Keep your progress with a personalized long-term wellness plan.',
    icon: Shield,
  },
];

const Approach = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineCardRef = useRef<HTMLDivElement>(null);
  const stepCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      // Headline card
      scrollTl.fromTo(
        headlineCardRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Step cards staggered from bottom
      stepCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { y: 200, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.1 + i * 0.05
          );
        }
      });

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineCardRef.current,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0, ease: 'power2.in' },
        0.7
      );

      stepCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: 0, opacity: 1 },
            { x: 100, opacity: 0, ease: 'power2.in' },
            0.72 + i * 0.02
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6FAFD] overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center px-4 lg:px-8 py-16">
        {/* Headline Card (Blue) */}
        <div
          ref={headlineCardRef}
          className="hidden lg:flex absolute left-[6vw] top-[16vh] w-[30vw] h-[68vh] bg-[#1E6AF3] rounded-[32px] flex-col justify-center p-8 medical-card"
        >
          <h2 className="text-[clamp(32px,3vw,48px)] font-bold text-white leading-tight">
            How we work
          </h2>
          <p className="mt-6 text-white/80 text-base">
            A clear plan from day one. Our structured approach ensures you receive 
            consistent, effective care at every stage of your recovery.
          </p>
        </div>

        {/* Mobile Headline */}
        <div className="lg:hidden absolute top-8 left-6 right-6">
          <h2 className="text-3xl font-bold text-[#0B1C3B]">
            How We Work
          </h2>
          <p className="mt-2 text-[#6B7A99]">
            A clear plan from day one
          </p>
        </div>

        {/* Step Cards */}
        <div className="w-full lg:ml-[38vw] grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 lg:mt-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepCardsRef.current[i] = el; }}
              className="bg-white rounded-[28px] p-6 medical-card card-hover lg:h-[68vh] flex flex-col"
            >
              {/* Step Number */}
              <div className="text-[clamp(48px,4vw,72px)] font-bold text-[#1E6AF3]/20 leading-none mb-4">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#1E6AF3]/10 flex items-center justify-center mb-4">
                <step.icon className="w-7 h-7 text-[#1E6AF3]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#0B1C3B] mb-3">
                {step.title}
              </h3>
              <p className="text-[#6B7A99] text-sm leading-relaxed flex-grow">
                {step.description}
              </p>

              {/* Decorative line */}
              <div className="mt-6 h-1 bg-gradient-to-r from-[#1E6AF3] to-[#1E6AF3]/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
