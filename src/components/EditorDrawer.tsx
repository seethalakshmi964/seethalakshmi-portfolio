import { ChangeEvent, useRef, useState } from 'react';
import { Download, RotateCcw, Upload, X } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface EditorDrawerProps {
  isOpen: boolean;
  data: PortfolioData;
  onClose: () => void;
  onChangeData: (updated: PortfolioData) => void;
  onResetDefaults: () => void;
}

type EditorTab =
  | 'hero'
  | 'about'
  | 'skills'
  | 'disciplines'
  | 'projects'
  | 'credentials'
  | 'contact';

export default function EditorDrawer({
  isOpen,
  data,
  onClose,
  onChangeData,
  onResetDefaults,
}: EditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('hero');
  const importInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'seetha-portfolio-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (typeof reader.result === 'string') {
          const parsed = JSON.parse(reader.result) as PortfolioData;
          if (parsed.hero && parsed.about && parsed.contact) {
            onChangeData(parsed);
          }
        }
      } catch {
        // Ignore malformed JSON imports cleanly
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const tabs: { id: EditorTab; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About & Exp' },
    { id: 'skills', label: 'Skills' },
    { id: 'disciplines', label: 'Disciplines' },
    { id: 'projects', label: 'Projects' },
    { id: 'credentials', label: 'Edu & Certs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit Portfolio Content"
      className="fixed inset-0 z-50 bg-[#23191B]/65 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF6F0] h-full overflow-y-auto border-l border-[#6B1D2F]/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FAF6F0] border-b border-[#6B1D2F]/12 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#23191B]">
              Portfolio Content Editor
            </h2>
            <p className="text-xs text-[#6E5A5E]">
              All edits save automatically in your browser. Export JSON anytime for backup.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="w-10 h-10 rounded-lg border border-[#6B1D2F]/15 flex items-center justify-center text-[#23191B] hover:bg-[#F6E6E4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-[#F3ECE2] border-b border-[#6B1D2F]/12 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#FFFDF9] border border-[#6B1D2F]/20 text-[#23191B] rounded-lg hover:bg-[#F6E6E4]"
            >
              <Download className="w-3.5 h-3.5 text-[#6B1D2F]" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#FFFDF9] border border-[#6B1D2F]/20 text-[#23191B] rounded-lg hover:bg-[#F6E6E4]"
            >
              <Upload className="w-3.5 h-3.5 text-[#6B1D2F]" />
              <span>Import JSON</span>
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportJson}
              className="hidden"
            />
          </div>

          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B1D2F] hover:bg-[#F6E6E4] rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to CV Defaults</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-[#6B1D2F]/10 flex items-center gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#6B1D2F] text-[#FAF6F0]'
                  : 'text-[#6E5A5E] hover:bg-[#F3ECE2] hover:text-[#23191B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Body */}
        <div className="p-6 space-y-6 flex-1">
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B1D2F] mb-1">
                  Hero Kicker
                </label>
                <input
                  type="text"
                  value={data.hero.kicker}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      hero: { ...data.hero, kicker: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FFFDF9] border border-[#6B1D2F]/20 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B1D2F] mb-1">
                  Hero Headline
                </label>
                <textarea
                  rows={2}
                  value={data.hero.headline}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      hero: { ...data.hero, headline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FFFDF9] border border-[#6B1D2F]/20 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B1D2F] mb-1">
                  Hero Subheadline
                </label>
                <textarea
                  rows={4}
                  value={data.hero.subheadline}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      hero: { ...data.hero, subheadline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FFFDF9] border border-[#6B1D2F]/20 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {data.hero.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-xl space-y-2"
                  >
                    <input
                      type="text"
                      value={h.label}
                      onChange={(e) => {
                        const updated = [...data.hero.highlights];
                        updated[idx] = { ...h, label: e.target.value };
                        onChangeData({
                          ...data,
                          hero: { ...data.hero, highlights: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                    />
                    <input
                      type="text"
                      value={h.value}
                      onChange={(e) => {
                        const updated = [...data.hero.highlights];
                        updated[idx] = { ...h, value: e.target.value };
                        onChangeData({
                          ...data,
                          hero: { ...data.hero, highlights: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 text-sm font-medium bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B1D2F] mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.about.sectionTitle}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      about: { ...data.about, sectionTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FFFDF9] border border-[#6B1D2F]/20 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B1D2F] mb-1">
                  Professional Summary
                </label>
                <textarea
                  rows={5}
                  value={data.about.summary}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      about: { ...data.about, summary: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FFFDF9] border border-[#6B1D2F]/20 rounded-lg"
                />
              </div>

              {data.about.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="p-4 bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-xl space-y-3"
                >
                  <p className="text-xs font-semibold text-[#6B1D2F]">
                    Experience #{idx + 1}
                  </p>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...data.about.experience];
                      updated[idx] = { ...exp, role: e.target.value };
                      onChangeData({
                        ...data,
                        about: { ...data.about, experience: updated },
                      });
                    }}
                    className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...data.about.experience];
                        updated[idx] = { ...exp, company: e.target.value };
                        onChangeData({
                          ...data,
                          about: { ...data.about, experience: updated },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const updated = [...data.about.experience];
                        updated[idx] = { ...exp, period: e.target.value };
                        onChangeData({
                          ...data,
                          about: { ...data.about, experience: updated },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                    />
                  </div>
                  <label className="block text-xs text-[#6E5A5E]">
                    Bullet Points (one per line)
                  </label>
                  <textarea
                    rows={6}
                    value={exp.bullets.join('\n')}
                    onChange={(e) => {
                      const updated = [...data.about.experience];
                      updated[idx] = {
                        ...exp,
                        bullets: e.target.value.split('\n').filter(Boolean),
                      };
                      onChangeData({
                        ...data,
                        about: { ...data.about, experience: updated },
                      });
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              {data.skillCategories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="p-4 bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-xl space-y-2"
                >
                  <input
                    type="text"
                    value={cat.title}
                    onChange={(e) => {
                      const updated = [...data.skillCategories];
                      updated[idx] = { ...cat, title: e.target.value };
                      onChangeData({ ...data, skillCategories: updated });
                    }}
                    className="w-full px-3 py-2 text-sm font-medium bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                  <label className="block text-xs text-[#6E5A5E]">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={cat.items.join(', ')}
                    onChange={(e) => {
                      const updated = [...data.skillCategories];
                      updated[idx] = {
                        ...cat,
                        items: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      };
                      onChangeData({ ...data, skillCategories: updated });
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'disciplines' && (
            <div className="space-y-4">
              {data.disciplines.map((disc, idx) => (
                <div
                  key={disc.id}
                  className="p-4 bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#6B1D2F]">
                      {disc.number}. {disc.title}
                    </span>
                    <select
                      value={disc.experienceLevel}
                      onChange={(e) => {
                        const updated = [...data.disciplines];
                        updated[idx] = {
                          ...disc,
                          experienceLevel: e.target.value as typeof disc.experienceLevel,
                        };
                        onChangeData({ ...data, disciplines: updated });
                      }}
                      className="px-2 py-1 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                    >
                      <option value="Client-Tested">Client-Tested</option>
                      <option value="Working Knowledge & Planning">
                        Working Knowledge & Planning
                      </option>
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    value={disc.overview}
                    onChange={(e) => {
                      const updated = [...data.disciplines];
                      updated[idx] = { ...disc, overview: e.target.value };
                      onChangeData({ ...data, disciplines: updated });
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-xl space-y-2.5"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx] = { ...proj, title: e.target.value };
                        onChangeData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-2 text-sm font-medium bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                    />
                    <select
                      value={proj.category}
                      onChange={(e) => {
                        const cat = e.target.value as 'client' | 'sample';
                        const updated = [...data.projects];
                        updated[idx] = {
                          ...proj,
                          category: cat,
                          categoryLabel:
                            cat === 'client' ? 'Client Work' : 'Sample / Self-Initiated',
                        };
                        onChangeData({ ...data, projects: updated });
                      }}
                      className="px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                    >
                      <option value="client">Client Work</option>
                      <option value="sample">Sample / Self-Initiated</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={proj.clientLabel}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[idx] = { ...proj, clientLabel: e.target.value };
                      onChangeData({ ...data, projects: updated });
                    }}
                    placeholder="Client / Brand Label"
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    value={proj.summary}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[idx] = { ...proj, summary: e.target.value };
                      onChangeData({ ...data, projects: updated });
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                  <input
                    type="text"
                    value={proj.resultsNote}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[idx] = { ...proj, resultsNote: e.target.value };
                      onChangeData({ ...data, projects: updated });
                    }}
                    placeholder="Verified Outcomes / Results Note"
                    className="w-full px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#6B1D2F]">Certifications</h3>
                {data.certifications.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="p-4 bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-xl space-y-2"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => {
                          const updated = [...data.certifications];
                          updated[idx] = { ...cert, title: e.target.value };
                          onChangeData({ ...data, certifications: updated });
                        }}
                        className="col-span-2 px-3 py-1.5 text-sm bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                      />
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => {
                          const updated = [...data.certifications];
                          updated[idx] = { ...cert, year: e.target.value };
                          onChangeData({ ...data, certifications: updated });
                        }}
                        className="px-3 py-1.5 text-sm bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                      />
                    </div>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = [...data.certifications];
                        updated[idx] = { ...cert, issuer: e.target.value };
                        onChangeData({ ...data, certifications: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#6B1D2F]">Education</h3>
                {data.education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-4 bg-[#FFFDF9] border border-[#6B1D2F]/15 rounded-xl space-y-2"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...data.education];
                          updated[idx] = { ...edu, degree: e.target.value };
                          onChangeData({ ...data, education: updated });
                        }}
                        className="col-span-2 px-3 py-1.5 text-sm bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                      />
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => {
                          const updated = [...data.education];
                          updated[idx] = { ...edu, period: e.target.value };
                          onChangeData({ ...data, education: updated });
                        }}
                        className="px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                      />
                    </div>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...data.education];
                        updated[idx] = { ...edu, institution: e.target.value };
                        onChangeData({ ...data, education: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#6B1D2F]/15 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              {(
                [
                  { key: 'fullName', label: 'Full Name' },
                  { key: 'title', label: 'Professional Title' },
                  { key: 'city', label: 'City' },
                  { key: 'uaePhone', label: 'UAE Phone' },
                  { key: 'whatsappNumber', label: 'WhatsApp Number' },
                  { key: 'whatsappLink', label: 'WhatsApp URL' },
                  { key: 'email', label: 'Email Address' },
                  { key: 'linkedinUrl', label: 'LinkedIn URL' },
                  { key: 'instagramUrl', label: 'Instagram URL' },
                ] as const
              ).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-[#6B1D2F] mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={data.contact[field.key]}
                    onChange={(e) =>
                      onChangeData({
                        ...data,
                        contact: { ...data.contact, [field.key]: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FFFDF9] border border-[#6B1D2F]/20 rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
