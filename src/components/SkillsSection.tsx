import { motion } from 'motion/react';
import { SkillCategory } from '../types/portfolio';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 sm:py-24 bg-[#F3ECE2]/65 border-b border-[#6B1D2F]/12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#6B1D2F] mb-2">Core Capabilities</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191B] text-balance">
            Digital Marketing Skills & Platform Stack
          </h2>
          <p className="text-sm sm:text-base text-[#6E5A5E] mt-3 leading-relaxed">
            Organised across strategy, paid acquisition, organic search analytics, automation,
            short-form creative production, and AI-enabled marketing workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-3 pb-3 mb-4 border-b border-[#6B1D2F]/10">
                  <h3 className="font-serif text-2xl font-semibold text-[#23191B]">
                    {category.title}
                  </h3>
                  <span className="text-xs text-[#6E5A5E] tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm text-[#23191B]">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1 h-1 rounded-full bg-[#6B1D2F]/70 shrink-0"
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
