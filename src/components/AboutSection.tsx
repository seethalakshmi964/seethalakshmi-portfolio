import { motion } from 'motion/react';
import { AboutConfig } from '../types/portfolio';

interface AboutSectionProps {
  about: AboutConfig;
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-[#6B1D2F]/12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          {/* Left Column: About Me Summary, Portrait & Key Profile Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium text-[#6B1D2F] mb-2">About Me</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191B] leading-tight text-balance">
                {about.sectionTitle}
              </h2>
            </div>

            {about.portraitUrl && (
              <div className="rounded-2xl overflow-hidden border border-[#6B1D2F]/12 bg-[#F3ECE2] relative aspect-[4/3]">
                <img
                  src={about.portraitUrl}
                  alt="Sri Seetha Lakshmi R at desk — Create with Seetha"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                {about.logoUrl && (
                  <div className="absolute bottom-3 right-3 w-14 h-14 rounded-xl overflow-hidden border border-[#6B1D2F]/20 bg-[#FFFDF9] shadow-sm">
                    <img
                      src={about.logoUrl}
                      alt="Create with Seetha monogram logo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            <p className="text-base leading-relaxed text-[#6E5A5E]">{about.summary}</p>

            {/* Unboxed Clean Key-Value Profile Table */}
            <dl className="border-t border-[#6B1D2F]/12 divide-y divide-[#6B1D2F]/10 text-sm">
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#6E5A5E]">Base Location</dt>
                <dd className="font-medium text-[#23191B] text-right">{about.location}</dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#6E5A5E]">Visa Status</dt>
                <dd className="font-medium text-[#23191B] text-right">{about.visaStatus}</dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#6E5A5E]">Availability</dt>
                <dd className="font-medium text-[#6B1D2F] text-right">{about.availability}</dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#6E5A5E]">Work Preference</dt>
                <dd className="font-medium text-[#23191B] text-right">{about.workPreference}</dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#6E5A5E]">Languages</dt>
                <dd className="font-medium text-[#23191B] text-right">
                  {about.languages.join(' · ')}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Professional Experience */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <p className="text-xs font-medium text-[#6B1D2F]">Professional Experience</p>
                {about.logoUrl && !about.portraitUrl && (
                  <img
                    src={about.logoUrl}
                    alt="Create with Seetha logo"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-[#6B1D2F]/15"
                  />
                )}
              </div>

              <div className="space-y-8">
                {about.experience.map((exp) => (
                  <article key={exp.id} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-4 border-b border-[#6B1D2F]/12">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-[#23191B]">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-[#6B1D2F] mt-1">
                          {exp.company} · {exp.type}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6E5A5E] tabular-nums whitespace-nowrap">
                        {exp.period}
                      </p>
                    </div>

                    <ul className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#6E5A5E]">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6B1D2F] shrink-0"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
