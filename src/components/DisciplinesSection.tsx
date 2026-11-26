import { ChangeEvent, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ImagePlus, ArrowUpRight } from 'lucide-react';
import { DisciplineDetail, DisciplineId } from '../types/portfolio';
import { readFileForPreview } from '../utils/mediaUpload';

interface DisciplinesSectionProps {
  disciplines: DisciplineDetail[];
  onUpdateDisciplineMedia: (id: DisciplineId, mediaUrl: string) => void;
}

export default function DisciplinesSection({
  disciplines,
  onUpdateDisciplineMedia,
}: DisciplinesSectionProps) {
  const [activeId, setActiveId] = useState<DisciplineId>(disciplines[0]?.id ?? 'meta-ads');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeDiscipline =
    disciplines.find((d) => d.id === activeId) ?? disciplines[0];

  const handleUploadSample = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeDiscipline) return;
    const { url, mediaType } = await readFileForPreview(file);
    if (mediaType === 'image') {
      onUpdateDisciplineMedia(activeDiscipline.id, url);
    }
    e.target.value = '';
  };

  return (
    <section id="disciplines" className="py-16 sm:py-24 border-b border-[#6B1D2F]/12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#6B1D2F] mb-2">
              Channel Specialisations
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191B] text-balance">
              Dedicated Practice Across Five Core Digital Channels
            </h2>
          </div>

          <p className="text-sm text-[#6E5A5E] max-w-md">
            Select a discipline to inspect workflows, tools, deliverables, and campaign visual
            slots—or jump directly from the overview below.
          </p>
        </div>

        {/* Interactive Discipline Selector Tabs */}
        <div
          role="tablist"
          aria-label="Digital Marketing Disciplines"
          className="flex items-center gap-1.5 p-1.5 bg-[#F3ECE2] rounded-xl overflow-x-auto mb-8"
        >
          {disciplines.map((d) => {
            const isSelected = d.id === activeDiscipline.id;
            return (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveId(d.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F] ${
                  isSelected
                    ? 'bg-[#6B1D2F] text-[#FAF6F0]'
                    : 'text-[#6E5A5E] hover:text-[#23191B] hover:bg-[#FAF6F0]/60'
                }`}
              >
                {d.number}. {d.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active Discipline Spotlight Card */}
        {activeDiscipline && (
          <motion.div
            key={activeDiscipline.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E5A5E] mb-3">
                    <span className="font-medium text-[#6B1D2F]">
                      {activeDiscipline.number}. {activeDiscipline.title}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeDiscipline.experienceLevel}</span>
                  </div>

                  <h3 className="font-serif text-3xl font-semibold text-[#23191B] mb-4">
                    {activeDiscipline.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[#6E5A5E]">
                    {activeDiscipline.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#6B1D2F]/10">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#23191B] mb-3">
                      Key Workflows
                    </h4>
                    <ul className="space-y-2 text-sm text-[#6E5A5E]">
                      {activeDiscipline.keyWorkflows.map((flow) => (
                        <li key={flow} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1 h-1 rounded-full bg-[#6B1D2F] shrink-0"
                          />
                          <span>{flow}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#23191B] mb-3">
                      Deliverables & Tools
                    </h4>
                    <ul className="space-y-2 text-sm text-[#6E5A5E] mb-4">
                      {activeDiscipline.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1 h-1 rounded-full bg-[#6B1D2F] shrink-0"
                          />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#6E5A5E] pt-3 border-t border-[#6B1D2F]/10">
                      <span className="font-medium text-[#23191B]">Tools: </span>
                      {activeDiscipline.tools.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Sample Screenshot / Visual Proof Slot */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="flex-1 min-h-[260px] rounded-xl bg-[#F6E6E4]/70 border border-[#6B1D2F]/15 overflow-hidden flex flex-col justify-between">
                  {activeDiscipline.sampleMediaUrl ? (
                    <div className="relative h-full min-h-[280px]">
                      <img
                        src={activeDiscipline.sampleMediaUrl}
                        alt={`${activeDiscipline.title} campaign sample`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
                      <div className="text-xs text-[#6E5A5E]">
                        {activeDiscipline.title} Proof Slot
                      </div>
                      <div className="my-6 space-y-2">
                        <p className="font-serif text-xl font-semibold text-[#23191B]">
                          Campaign / Sample Visual
                        </p>
                        <p className="text-xs text-[#6E5A5E] max-w-xs mx-auto leading-relaxed">
                          {activeDiscipline.sampleMediaCaption}
                        </p>
                      </div>
                      <div />
                    </div>
                  )}

                  <div className="p-4 bg-[#FFFDF9] border-t border-[#6B1D2F]/12 flex items-center justify-between gap-3">
                    <span className="text-xs text-[#6E5A5E] truncate">
                      {activeDiscipline.sampleMediaUrl ? 'Visual uploaded' : 'Awaiting screenshot'}
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-lg hover:bg-[#511322] transition-colors whitespace-nowrap shrink-0"
                    >
                      <ImagePlus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{activeDiscipline.sampleMediaUrl ? 'Replace' : 'Upload Visual'}</span>
                    </button>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadSample}
                  className="hidden"
                  aria-label={`Upload visual for ${activeDiscipline.title}`}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Complete 5-Discipline Quick Reference Index (All 5 visible on page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {disciplines.map((d) => {
            const isSelected = d.id === activeDiscipline?.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F] ${
                  isSelected
                    ? 'bg-[#F6E6E4] border-[#6B1D2F]/40'
                    : 'bg-[#FFFDF9] border-[#6B1D2F]/12 hover:border-[#6B1D2F]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6E5A5E] mb-2">
                    <span className="tabular-nums">{d.number}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6B1D2F]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#23191B]">
                    {d.title}
                  </h3>
                </div>
                <p className="text-xs text-[#6E5A5E]">{d.experienceLevel}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
