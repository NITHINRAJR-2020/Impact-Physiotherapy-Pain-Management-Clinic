import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, HeartPulse, Bone, Dumbbell, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Activity,
    title: 'Sports Injury Rehab',
    description: 'Return to play with guided recovery programs tailored to your sport.',
    image: '/images/service-sports.jpg',
  },
  {
    icon: HeartPulse,
    title: 'Chronic Pain Care',
    description: 'Long-term strategies that reduce flare-ups and improve quality of life.',
  },
  {
    icon: Bone,
    title: 'Post-Surgical Recovery',
    description: 'Restore range of motion safely after surgery with expert guidance.',
  },
  {
    icon: Dumbbell,
    title: 'Mobility & Prevention',
    description: 'Strength and balance exercises for daily life and fall prevention.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineCardRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconCardRef = useRef<HTMLDivElement>(null);

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
        { x: -300, rotate: -2, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0
      );

      // Service cards staggered entrance
      cardsRef.current.forEach((card, i) => {
        if (card) {
          const directions = [
            { y: -150, opacity: 0 },
            { x: 200, opacity: 0 },
            { x: -100, y: 100, opacity: 0 },
            { y: 150, opacity: 0 },
          ];
          scrollTl.fromTo(
            card,
            directions[i],
            { x: 0, y: 0, opacity: 1, ease: 'none' },
            0.06 + i * 0.04
          );
        }
      });

      // Icon card pop-in
      scrollTl.fromTo(
        iconCardRef.current,
        { scale: 0.2, rotate: -12, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, ease: 'none' },
        0.16
      );

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineCardRef.current,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: 0, opacity: 1 },
            { x: 80, opacity: 0, ease: 'power2.in' },
            0.72 + i * 0.02
          );
        }
      });

      scrollTl.fromTo(
        iconCardRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.9, opacity: 0, ease: 'power2.in' },
        0.78
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full h-screen bg-[#F6FAFD] overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center px-4 lg:px-8 py-16">
        {/* Headline Card (Blue) */}
        <div
          ref={headlineCardRef}
          className="hidden lg:flex absolute left-[6vw] top-[16vh] w-[30vw] h-[68vh] bg-[#1E6AF3] rounded-[32px] flex-col justify-center p-8 medical-card"
        >
          <h2 className="text-[clamp(32px,3vw,48px)] font-bold text-white leading-tight">
            Services that meet you where you are.
          </h2>
          <p className="mt-6 text-white/80 text-base">
            Comprehensive physiotherapy care tailored to your unique needs and goals.
          </p>
        </div>

        {/* Mobile Headline */}
        <div className="lg:hidden absolute top-8 left-6 right-6">
          <h2 className="text-3xl font-bold text-[#0B1C3B]">
            Our Services
          </h2>
          <p className="mt-2 text-[#6B7A99]">
            Comprehensive physiotherapy care
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="lg:ml-[38vw] w-full lg:w-[58vw] grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 lg:mt-0">
          {/* Card A - Sports Injury */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="bg-white rounded-[28px] p-6 medical-card card-hover lg:h-[30vh] flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1E6AF3]/10 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-[#1E6AF3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B1C3B] mb-2">
              {services[0].title}
            </h3>
            <p className="text-[#6B7A99] text-sm flex-grow">
              {services[0].description}
            </p>
            <div className="mt-4 h-24 rounded-xl overflow-hidden">
              <img
                src={services[0].image}
                alt={services[0].title}
                className="w-full h-full object-cover img-medical"
              />
            </div>
          </div>

          {/* Card B - Chronic Pain */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="bg-white rounded-[28px] p-6 medical-card card-hover lg:h-[30vh] flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1E6AF3]/10 flex items-center justify-center mb-4">
              <HeartPulse className="w-6 h-6 text-[#1E6AF3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B1C3B] mb-2">
              {services[1].title}
            </h3>
            <p className="text-[#6B7A99] text-sm flex-grow">
              {services[1].description}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-[#F6FAFD] rounded-full text-xs text-[#6B7A99]">
                Back Pain
              </span>
              <span className="px-3 py-1 bg-[#F6FAFD] rounded-full text-xs text-[#6B7A99]">
                Neck Pain
              </span>
            </div>
          </div>

          {/* Card C - Post-Surgical */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
            className="bg-white rounded-[28px] p-6 medical-card card-hover lg:h-[30vh] flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1E6AF3]/10 flex items-center justify-center mb-4">
              <Bone className="w-6 h-6 text-[#1E6AF3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B1C3B] mb-2">
              {services[2].title}
            </h3>
            <p className="text-[#6B7A99] text-sm flex-grow">
              {services[2].description}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-[#F6FAFD] rounded-full text-xs text-[#6B7A99]">
                Knee Replacement
              </span>
              <span className="px-3 py-1 bg-[#F6FAFD] rounded-full text-xs text-[#6B7A99]">
                Hip Surgery
              </span>
            </div>
          </div>

          {/* Card D - Mobility */}
          <div
            ref={(el) => { cardsRef.current[3] = el; }}
            className="bg-white rounded-[28px] p-6 medical-card card-hover lg:h-[30vh] flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1E6AF3]/10 flex items-center justify-center mb-4">
              <Dumbbell className="w-6 h-6 text-[#1E6AF3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B1C3B] mb-2">
              {services[3].title}
            </h3>
            <p className="text-[#6B7A99] text-sm flex-grow">
              {services[3].description}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-[#F6FAFD] rounded-full text-xs text-[#6B7A99]">
                Balance Training
              </span>
              <span className="px-3 py-1 bg-[#F6FAFD] rounded-full text-xs text-[#6B7A99]">
                Fall Prevention
              </span>
            </div>
          </div>
        </div>

        {/* Icon CTA Card */}
        <div
          ref={iconCardRef}
          className="hidden lg:flex absolute left-[62vw] top-[44vh] w-[12vw] h-[12vw] min-w-[130px] min-h-[130px] max-w-[180px] max-h-[180px] bg-white rounded-[28px] medical-card items-center justify-center cursor-pointer card-hover"
        >
          <div className="w-16 h-16 rounded-full bg-[#1E6AF3] flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
