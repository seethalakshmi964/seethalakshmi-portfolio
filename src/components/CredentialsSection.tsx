import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Eye, GraduationCap, X } from 'lucide-react';
import { CertificationEntry, EducationEntry } from '../types/portfolio';

interface CredentialsSectionProps {
  certifications: CertificationEntry[];
  education: EducationEntry[];
}

export default function CredentialsSection({
  certifications,
  education,
}: CredentialsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<CertificationEntry | null>(null);

  return (
    <section
      id="credentials"
      className="py-16 sm:py-24 bg-[#F3ECE2]/65 border-b border-[#6B1D2F]/12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#6B1D2F] mb-2">
            Qualifications
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191B] text-balance">
            Certifications & Academic Background
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certifications Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#6B1D2F]/12">
              <Award className="w-5 h-5 text-[#6B1D2F]" aria-hidden="true" />
              <h3 className="font-serif text-2xl font-semibold text-[#23191B]">
                Certifications & Courses
              </h3>
            </div>

            <div className="divide-y divide-[#6B1D2F]/10">
              {certifications.map((cert) => (
                <div key={cert.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <h4 className="font-serif text-xl font-semibold text-[#23191B]">
                      {cert.title}
                    </h4>
                    <span className="text-xs font-medium text-[#6B1D2F] tabular-nums whitespace-nowrap shrink-0">
                      {cert.year}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#6E5A5E] mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6E5A5E]/90 leading-relaxed mb-3">
                    {cert.note}
                  </p>

                  {cert.proofUrl && (
                    cert.proofType === 'pdf' ? (
                      <a
                        href={cert.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B1D2F] hover:text-[#511322] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>View Certificate PDF</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B1D2F] hover:text-[#511322] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>View Certificate</span>
                      </button>
                    )
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#6B1D2F]/12">
              <GraduationCap className="w-5 h-5 text-[#6B1D2F]" aria-hidden="true" />
              <h3 className="font-serif text-2xl font-semibold text-[#23191B]">
                Education
              </h3>
            </div>

            <div className="divide-y divide-[#6B1D2F]/10">
              {education.map((edu) => (
                <div key={edu.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <h4 className="font-serif text-xl font-semibold text-[#23191B]">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-medium text-[#6B1D2F] tabular-nums whitespace-nowrap shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-[#6E5A5E] leading-relaxed">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Image Lightbox */}
      {selectedCert && selectedCert.proofUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 bg-[#23191B]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-[#FAF6F0] border border-[#6B1D2F]/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#6B1D2F]/12 mb-5">
              <div>
                <p className="text-xs font-medium text-[#6B1D2F] mb-1">
                  {selectedCert.issuer} · {selectedCert.year}
                </p>
                <h3
                  id="cert-modal-title"
                  className="font-serif text-2xl font-semibold text-[#23191B]"
                >
                  {selectedCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="w-10 h-10 rounded-lg border border-[#6B1D2F]/15 flex items-center justify-center text-[#23191B] hover:bg-[#F6E6E4] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#6B1D2F]/15 bg-[#FFFDF9] flex items-center justify-center">
              <img
                src={selectedCert.proofUrl}
                alt={`${selectedCert.title} — ${selectedCert.issuer}`}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
