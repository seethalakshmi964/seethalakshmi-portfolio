import { ChangeEvent, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Download, PencilLine, Upload } from 'lucide-react';
import { ContactInfo, HeroConfig } from '../types/portfolio';
import { readFileForPreview } from '../utils/mediaUpload';

interface HeroProps {
  hero: HeroConfig;
  contact: ContactInfo;
  onOpenEditor: () => void;
  onUpdatePortrait: (url: string) => void;
}

export default function Hero({
  hero,
  contact,
  onOpenEditor,
  onUpdatePortrait,
}: HeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePortraitChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url, mediaType } = await readFileForPreview(file);
    if (mediaType === 'image') {
      onUpdatePortrait(url);
    }
    e.target.value = '';
  };

  return (
    <section id="top" className="relative overflow-hidden border-b border-[#6B1D2F]/12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-16">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-xs sm:text-sm font-medium text-[#6B1D2F] tracking-wide mb-4">
              {hero.kicker}
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#23191B] text-balance mb-6">
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#6E5A5E] max-w-2xl mb-8">
              {hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-xl hover:bg-[#511322] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B1D2F]"
              >
                <span>{hero.primaryCtaLabel}</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={contact.cvFilePath}
                download={contact.cvFileName}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#FFFDF9] text-[#23191B] border border-[#6B1D2F]/20 rounded-xl hover:bg-[#F6E6E4] hover:border-[#6B1D2F]/40 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F]"
              >
                <Download className="w-4 h-4 text-[#6B1D2F]" aria-hidden="true" />
                <span>{hero.secondaryCtaLabel}</span>
              </a>

              <button
                type="button"
                onClick={onOpenEditor}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#6B1D2F] hover:bg-[#F6E6E4]/70 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F]"
              >
                <PencilLine className="w-4 h-4" aria-hidden="true" />
                <span>Edit Portfolio</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Editorial Portrait / Profile Crest */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="relative w-full min-h-[360px] lg:h-full rounded-2xl bg-[#F3ECE2] border border-[#6B1D2F]/15 overflow-hidden flex flex-col justify-between">
              {hero.portraitUrl ? (
                <div className="relative w-full h-full min-h-[380px]">
                  <img
                    src={hero.portraitUrl}
                    alt={`${contact.fullName} — ${contact.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#23191B]/85 via-[#23191B]/45 to-transparent p-6 text-[#FAF6F0]">
                    <p className="font-serif text-2xl font-semibold">{contact.fullName}</p>
                    <p className="text-xs text-[#F6E6E4] mt-1">
                      {contact.title} · {contact.city}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 sm:p-10 flex flex-col justify-between h-full bg-gradient-to-br from-[#F6E6E4] via-[#FAF6F0] to-[#F3ECE2]">
                  <div className="flex items-center justify-between text-xs text-[#6E5A5E]">
                    <span>Create with Seetha</span>
                    <span>{contact.city}</span>
                  </div>

                  <div className="my-10 text-center">
                    <div className="mx-auto w-28 h-28 rounded-full bg-[#6B1D2F] text-[#FAF6F0] flex items-center justify-center font-serif text-4xl font-semibold tracking-wider mb-5">
                      SL
                    </div>
                    <p className="font-serif text-2xl font-semibold text-[#23191B]">
                      {contact.fullName}
                    </p>
                    <p className="text-sm text-[#6E5A5E] mt-1">{contact.title}</p>
                    <p className="text-xs text-[#6E5A5E]/85 mt-3 max-w-xs mx-auto">
                      {hero.portraitCaption}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#6B1D2F]/12 flex items-center justify-between gap-3">
                    <span className="text-xs text-[#6E5A5E]">Portrait Slot (3:4 / 1:1)</span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#FFFDF9] text-[#6B1D2F] border border-[#6B1D2F]/25 rounded-lg hover:bg-[#6B1D2F] hover:text-[#FAF6F0] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                </div>
              )}

              {hero.portraitUrl && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#FAF6F0]/90 text-[#23191B] rounded-lg hover:bg-[#FAF6F0] transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#6B1D2F]" aria-hidden="true" />
                  <span>Replace Photo</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePortraitChange}
                className="hidden"
                aria-label="Upload portrait photograph"
              />
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Highlights Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-[#6B1D2F]/12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {hero.highlights.map((item) => (
            <div key={item.label} className="bg-[#FFFDF9] border border-[#6B1D2F]/10 rounded-xl p-4 sm:p-5">
              <p className="text-xs font-medium text-[#6E5A5E] mb-1">{item.label}</p>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-[#23191B] tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Editorial Marquee Divider */}
      <div className="bg-[#6B1D2F] text-[#FAF6F0] py-3 overflow-hidden border-t border-[#6B1D2F]">
        <div className="animate-marquee text-xs sm:text-sm font-medium tracking-wide">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8 whitespace-nowrap">
              <span>Digital Marketing Executive · Dubai, UAE</span>
              <span aria-hidden="true">·</span>
              <span>Meta Ads Manager</span>
              <span aria-hidden="true">·</span>
              <span>Social Media Strategy & Calendars</span>
              <span aria-hidden="true">·</span>
              <span>SEO, GA4 & Search Console</span>
              <span aria-hidden="true">·</span>
              <span>Email Campaign Planning</span>
              <span aria-hidden="true">·</span>
              <span>ManyChat Instagram Automation</span>
              <span aria-hidden="true">·</span>
              <span>AI-Powered Reels & Creative Production</span>
              <span aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
