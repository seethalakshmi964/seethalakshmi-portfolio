import { ChangeEvent, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ImagePlus, Play, X } from 'lucide-react';
import { ProjectCaseStudy, ProjectCategory } from '../types/portfolio';
import { readFileForPreview } from '../utils/mediaUpload';

interface ProjectsSectionProps {
  projects: ProjectCaseStudy[];
  onUpdateProjectMedia: (
    projectId: string,
    mediaUrl: string,
    mediaType: 'image' | 'video'
  ) => void;
}

type FilterOption = 'all' | ProjectCategory;

export default function ProjectsSection({
  projects,
  onUpdateProjectMedia,
}: ProjectsSectionProps) {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) ?? null;

  const handleModalMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProject) return;
    const { url, mediaType } = await readFileForPreview(file);
    onUpdateProjectMedia(selectedProject.id, url, mediaType);
    e.target.value = '';
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 bg-[#F3ECE2]/65 border-b border-[#6B1D2F]/12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#6B1D2F] mb-2">
              Selected Case Studies
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191B] text-balance">
              Client Campaigns & Self-Initiated Work
            </h2>
            <p className="text-sm sm:text-base text-[#6E5A5E] mt-3 leading-relaxed">
              Every project clearly distinguishes client engagements from self-initiated
              sample work. Click any case study to inspect objectives, strategy, tools,
              and deliverables.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div
            role="group"
            aria-label="Filter projects by type"
            className="inline-flex items-center gap-1 p-1 bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-xl self-start md:self-auto"
          >
            {(
              [
                { id: 'all', label: 'All Projects' },
                { id: 'client', label: 'Client Work' },
                { id: 'sample', label: 'Sample & Self-Initiated' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFilter(opt.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F] ${
                  filter === opt.id
                    ? 'bg-[#6B1D2F] text-[#FAF6F0]'
                    : 'text-[#6E5A5E] hover:text-[#23191B]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#6B1D2F]/35 transition-colors"
            >
              <div>
                {/* Media Preview Header */}
                <div className="aspect-[16/10] bg-[#F6E6E4]/65 border-b border-[#6B1D2F]/10 relative overflow-hidden">
                  {project.mediaUrl ? (
                    project.mediaType === 'video' ? (
                      <div className="relative w-full h-full bg-[#23191B]">
                        <video
                          src={project.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-[#23191B]/30 flex items-center justify-center">
                          <span className="w-11 h-11 rounded-full bg-[#FAF6F0]/90 text-[#6B1D2F] flex items-center justify-center">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.mediaUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#F6E6E4] via-[#FAF6F0] to-[#F3ECE2]">
                      <div className="text-xs text-[#6E5A5E]">
                        {project.discipline}
                      </div>
                      <p className="text-xs text-[#6E5A5E]/90 leading-relaxed">
                        {project.mediaCaption}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Zero-pill unboxed typographic metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E5A5E] mb-2.5">
                    <span
                      className={`font-medium ${
                        project.category === 'client'
                          ? 'text-[#6B1D2F]'
                          : 'text-[#6E5A5E]'
                      }`}
                    >
                      {project.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.discipline}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#23191B] leading-snug mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#6E5A5E] leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-[#6B1D2F]/10 flex items-center justify-between gap-4">
                <span className="text-xs text-[#6E5A5E] truncate">
                  {project.tools.slice(0, 3).join(' · ')}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B1D2F] hover:text-[#511322] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F] rounded"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 bg-[#23191B]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProjectId(null)}
        >
          <div
            className="bg-[#FAF6F0] border border-[#6B1D2F]/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 lg:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#6B1D2F]/12">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E5A5E] mb-2">
                  <span className="font-semibold text-[#6B1D2F]">
                    {selectedProject.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.clientLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.timeframe}</span>
                </div>
                <h3
                  id="case-study-title"
                  className="font-serif text-3xl font-semibold text-[#23191B]"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                aria-label="Close case study"
                className="w-10 h-10 rounded-lg border border-[#6B1D2F]/15 flex items-center justify-center text-[#23191B] hover:bg-[#F6E6E4] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Project Media Slot inside Modal */}
            <div className="my-6 rounded-xl border border-[#6B1D2F]/15 overflow-hidden bg-[#F3ECE2]">
              {selectedProject.mediaUrl ? (
                selectedProject.mediaType === 'video' ? (
                  <video
                    src={selectedProject.mediaUrl}
                    controls
                    playsInline
                    className="w-full max-h-[380px] bg-[#23191B]"
                  />
                ) : (
                  <img
                    src={selectedProject.mediaUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[380px] object-contain bg-[#F3ECE2]"
                  />
                )
              ) : (
                <div className="p-8 text-center">
                  <p className="font-serif text-xl font-semibold text-[#23191B] mb-1">
                    Project Visual / Campaign Screenshot Slot
                  </p>
                  <p className="text-xs text-[#6E5A5E] mb-4">
                    {selectedProject.mediaCaption}
                  </p>
                </div>
              )}
              <div className="px-4 py-3 bg-[#FFFDF9] border-t border-[#6B1D2F]/12 flex items-center justify-between gap-3">
                <span className="text-xs text-[#6E5A5E]">
                  Attach screenshot, poster, or video preview
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-lg hover:bg-[#511322] transition-colors whitespace-nowrap shrink-0"
                >
                  <ImagePlus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{selectedProject.mediaUrl ? 'Replace Media' : 'Upload Media'}</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleModalMediaUpload}
                className="hidden"
                aria-label="Upload case study media"
              />
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-[#6E5A5E]">
              <div>
                <h4 className="font-serif text-xl font-semibold text-[#23191B] mb-2">
                  Objective
                </h4>
                <p>{selectedProject.objective}</p>
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-[#23191B] mb-2">
                  Execution & Strategy
                </h4>
                <ul className="space-y-2">
                  {selectedProject.strategy.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6B1D2F] shrink-0"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#6B1D2F]/12">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#23191B] mb-2">
                    Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProject.deliverables.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#23191B] mb-2">
                    Tools Used
                  </h4>
                  <p>{selectedProject.tools.join(' · ')}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F6E6E4]/75 border border-[#6B1D2F]/15">
                <p className="text-xs font-semibold text-[#6B1D2F] mb-1">
                  Outcomes & Verification Note
                </p>
                <p className="text-xs sm:text-sm text-[#23191B]">
                  {selectedProject.resultsNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
