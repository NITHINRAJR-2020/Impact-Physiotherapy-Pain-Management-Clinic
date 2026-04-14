import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Dr. Swati Mundra',
    role: 'Senior Physiotherapist',
    qualification: 'BPTh/BPT',
    experience: '16+ years',
    fee: '₹450',
    image: '/images/dr-swati.jpg',
  },
  {
    name: 'Ms. Lakshmi V',
    role: 'Dietitian/Nutritionist',
    qualification: 'M.Sc. Food & Nutrition',
    experience: '19+ years',
    fee: 'Consultation',
    image: '/images/ms-lakshmi.jpg',
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineCardRef = useRef<HTMLDivElement>(null);
  const leadCardRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Lead clinician card
      scrollTl.fromTo(
        leadCardRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Team grid
      scrollTl.fromTo(
        teamGridRef.current,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Thumbnails staggered
      thumbsRef.current.forEach((thumb, i) => {
        if (thumb) {
          scrollTl.fromTo(
            thumb,
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'none' },
            0.14 + i * 0.04
          );
        }
      });

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineCardRef.current,
        { y: 0, opacity: 1 },
        { y: -80, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leadCardRef.current,
        { y: 0, opacity: 1 },
        { y: 80, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        teamGridRef.current,
        { x: 0, opacity: 1 },
        { x: 80, opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full h-screen bg-[#F6FAFD] overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center px-4 lg:px-8 py-16">
        {/* Headline Card (Blue) */}
        <div
          ref={headlineCardRef}
          className="hidden lg:flex absolute left-[6vw] top-[16vh] w-[30vw] h-[68vh] bg-[#1E6AF3] rounded-[32px] flex-col justify-center p-8 medical-card"
        >
          <h2 className="text-[clamp(28px,2.8vw,44px)] font-bold text-white leading-tight">
            Meet the people behind your progress.
          </h2>
          <p className="mt-6 text-white/80 text-base">
            Our experienced team is dedicated to helping you achieve your health goals.
          </p>
        </div>

        {/* Mobile Headline */}
        <div className="lg:hidden absolute top-8 left-6 right-6">
          <h2 className="text-3xl font-bold text-[#0B1C3B]">
            Our Team
          </h2>
          <p className="mt-2 text-[#6B7A99]">
            Meet our experienced professionals
          </p>
        </div>

        {/* Lead Clinician Card */}
        <div
          ref={leadCardRef}
          className="w-full lg:absolute lg:left-[38vw] lg:top-[16vh] lg:w-[32vw] lg:h-[68vh] bg-white rounded-[32px] overflow-hidden medical-card mt-20 lg:mt-0"
        >
          <div className="relative h-64 lg:h-[55%]">
            <img
              src="/images/dr-amit.jpg"
              alt="Dr. Amit K. Shrivastav"
              className="w-full h-full object-cover img-medical"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-[#0B1C3B]">96%</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#0B1C3B]">
              Dr. Amit K. Shrivastav
            </h3>
            <p className="text-[#1E6AF3] font-medium">Lead Physiotherapist</p>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-1 text-sm text-[#6B7A99]">
                <Award className="w-4 h-4" />
                <span>BPTh/BPT</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#6B7A99]">
                <Clock className="w-4 h-4" />
                <span>20+ years</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1E6AF3]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#6B7A99]">Consultation Fee</p>
                  <p className="text-lg font-semibold text-[#0B1C3B]">₹750</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6B7A99]">Timings</p>
                  <p className="text-sm text-[#0B1C3B]">Mon-Sat</p>
                  <p className="text-xs text-[#6B7A99]">9AM-2PM, 5PM-9:30PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div
          ref={teamGridRef}
          className="hidden lg:grid absolute left-[72vw] top-[16vh] w-[22vw] h-[68vh] grid-rows-2 gap-4"
        >
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => { thumbsRef.current[i] = el; }}
              className="bg-white rounded-[28px] overflow-hidden medical-card card-hover"
            >
              <div className="h-24 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover img-medical"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-[#0B1C3B] text-sm">{member.name}</h4>
                <p className="text-xs text-[#1E6AF3]">{member.role}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#6B7A99]">
                  <span>{member.experience}</span>
                  <span>•</span>
                  <span>{member.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Team Cards */}
        <div className="lg:hidden mt-4 space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-[24px] p-4 medical-card flex items-center gap-4"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-xl object-cover img-medical"
              />
              <div>
                <h4 className="font-semibold text-[#0B1C3B]">{member.name}</h4>
                <p className="text-sm text-[#1E6AF3]">{member.role}</p>
                <p className="text-xs text-[#6B7A99]">{member.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
