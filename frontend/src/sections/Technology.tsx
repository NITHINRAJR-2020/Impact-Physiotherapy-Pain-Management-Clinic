import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hand, Dumbbell, Zap, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Hand,
    title: 'Manual Therapy',
    description: 'Joint mobilization, soft-tissue work, and movement retraining by expert hands.',
  },
  {
    icon: Dumbbell,
    title: 'Exercise Prescription',
    description: 'Personalized plans with clear progressions tailored to your goals.',
  },
  {
    icon: Zap,
    title: 'Electrotherapy',
    description: 'Advanced modalities including ultrasound and electrical stimulation.',
  },
  {
    icon: Activity,
    title: 'Movement Analysis',
    description: 'Biomechanical assessment to identify and correct movement dysfunctions.',
  },
];

const Technology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Feature cards
      featureCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.16 + i * 0.03
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
            src="/images/tech-equipment.jpg"
            alt="Modern physiotherapy equipment"
            className="w-full h-full object-cover img-medical"
          />
        </div>

        {/* Right Content Card */}
        <div
          ref={contentRef}
          className="w-full lg:absolute lg:left-[44vw] lg:top-[16vh] lg:w-[50vw] lg:h-[68vh] bg-white rounded-[32px] p-6 lg:p-10 medical-card flex flex-col justify-center"
        >
          <h2 className="text-[clamp(28px,3vw,44px)] font-bold text-[#0B1C3B] leading-tight mb-4">
            Modern tools.
            <br />
            Proven methods.
          </h2>

          <p className="text-[#6B7A99] text-base leading-relaxed mb-8">
            We combine manual therapy with evidence-based technology to speed 
            recovery and measure progress. Our clinic is equipped with the latest 
            physiotherapy modalities to ensure you receive the best care.
          </p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                ref={(el) => { featureCardsRef.current[i] = el; }}
                className="p-4 rounded-2xl bg-[#F6FAFD] hover:bg-[#1E6AF3]/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1E6AF3]/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#1E6AF3]" />
                </div>
                <h4 className="font-semibold text-[#0B1C3B] text-sm mb-1">
                  {feature.title}
                </h4>
                <p className="text-[#6B7A99] text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
