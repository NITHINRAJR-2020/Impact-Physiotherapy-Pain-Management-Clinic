import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const conditions = [
  'Back Pain',
  'Neck Pain',
  'Knee Issues',
  'Shoulder Strain',
  'Sports Injuries',
  'Post-Surgical Rehab',
  'Arthritis',
  'Balance & Falls',
];

const testimonials = [
  {
    quote: 'I was back to running in 8 weeks—without the fear of re-injury. The team at Impact Physiotherapy truly understands sports recovery.',
    author: 'Ramesh K.',
    role: 'Marathon Runner',
  },
  {
    quote: 'Finally, a plan that didn\'t just mask the pain. Dr. Shrivastav identified the root cause and helped me recover completely.',
    author: 'Anjali M.',
    role: 'IT Professional',
  },
  {
    quote: 'After my knee replacement, I was worried about recovery. But the post-surgical rehab program was excellent. I can walk pain-free now.',
    author: 'Venkat R.',
    role: 'Retired Teacher',
  },
];

const Conditions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Flowing section - elements animate as they enter viewport
      gsap.fromTo(
        headlineRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        chipsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chipsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        testimonialsRef.current?.children || [],
        { y: 30, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="conditions"
      className="relative w-full bg-[#F6FAFD] py-20 lg:py-28"
    >
      <div className="px-6 lg:px-12">
        {/* Top Section - Headline + Image */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Headline Card */}
          <div
            ref={headlineRef}
            className="w-full lg:w-[40vw] bg-[#1E6AF3] rounded-[32px] p-8 medical-card flex flex-col justify-center min-h-[280px]"
          >
            <h2 className="text-[clamp(28px,3vw,44px)] font-bold text-white leading-tight">
              Conditions we treat
            </h2>
            <p className="mt-4 text-white/80 text-base">
              From acute injuries to chronic conditions, we provide specialized 
              care for a wide range of musculoskeletal issues.
            </p>
          </div>

          {/* Image Card */}
          <div
            ref={imageRef}
            className="w-full lg:w-[50vw] rounded-[32px] overflow-hidden medical-card min-h-[280px]"
          >
            <img
              src="/images/conditions-patient.jpg"
              alt="Happy patient"
              className="w-full h-full object-cover img-medical"
            />
          </div>
        </div>

        {/* Condition Chips */}
        <div ref={chipsRef} className="flex flex-wrap gap-3 mb-16">
          {conditions.map((condition) => (
            <span
              key={condition}
              className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-[#0B1C3B] medical-card hover:bg-[#1E6AF3] hover:text-white transition-colors cursor-default"
            >
              {condition}
            </span>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-semibold text-[#0B1C3B] mb-8">
            What our patients say
          </h3>
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-[28px] p-6 medical-card card-hover"
              >
                <Quote className="w-8 h-8 text-[#1E6AF3]/30 mb-4" />
                <p className="text-[#0B1C3B] text-base leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E6AF3]/10 flex items-center justify-center">
                    <span className="text-[#1E6AF3] font-semibold text-sm">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0B1C3B] text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-[#6B7A99]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conditions;
