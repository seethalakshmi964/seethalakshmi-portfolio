import { FormEvent, useState } from 'react';
import {
  ArrowUpRight,
  Download,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  PencilLine,
  Phone,
} from 'lucide-react';
import { ContactInfo } from '../types/portfolio';

interface ContactSectionProps {
  contact: ContactInfo;
  onOpenEditor: () => void;
}

export default function ContactSection({
  contact,
  onOpenEditor,
}: ContactSectionProps) {
  const [senderName, setSenderName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSendViaEmail = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Digital Marketing Opportunity${company ? ` — ${company}` : ''}`
    );
    const body = encodeURIComponent(
      `Hello Seetha,\n\n${message || 'I would like to connect regarding a Digital Marketing role in the UAE.'}\n\nBest regards,\n${senderName || 'Hiring Team'}${company ? `\n${company}` : ''}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Seetha, ${senderName ? `this is ${senderName}` : 'reaching out'}${
        company ? ` from ${company}` : ''
      }. ${message || 'I viewed your Digital Marketing portfolio and would like to connect.'}`
    );
    window.location.href = `${contact.whatsappLink}?text=${text}`;
  };

  return (
    <footer id="contact" className="bg-[#23191B] text-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Channels & CV Download */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs font-medium text-[#ECD4D0] mb-2">
                Contact & Availability
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FAF6F0] leading-tight text-balance">
                Available for Digital Marketing Executive Roles in Dubai & Across the UAE
              </h2>
              <p className="text-sm sm:text-base text-[#FAF6F0]/75 mt-4 leading-relaxed max-w-lg">
                UAE Residence Visa · Immediate Joiner · Open to On-site & Hybrid teams.
                Reach out directly via LinkedIn, Instagram, Email, WhatsApp, or phone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#FAF6F0]/5 border border-[#FAF6F0]/12 hover:bg-[#FAF6F0]/10 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Linkedin className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#FAF6F0]/65">LinkedIn</p>
                    <p className="text-sm font-medium truncate">{contact.linkedinDisplay}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
              </a>

              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#FAF6F0]/5 border border-[#FAF6F0]/12 hover:bg-[#FAF6F0]/10 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Instagram className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#FAF6F0]/65">Instagram</p>
                    <p className="text-sm font-medium truncate">{contact.instagramHandle}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="p-4 rounded-xl bg-[#FAF6F0]/5 border border-[#FAF6F0]/12 hover:bg-[#FAF6F0]/10 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#FAF6F0]/65">Email</p>
                    <p className="text-sm font-medium truncate">{contact.email}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
              </a>

              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#FAF6F0]/5 border border-[#FAF6F0]/12 hover:bg-[#FAF6F0]/10 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MessageCircle className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#FAF6F0]/65">WhatsApp</p>
                    <p className="text-sm font-medium tabular-nums truncate">
                      {contact.whatsappNumber}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ECD4D0] shrink-0" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={contact.cvFilePath}
                download={contact.cvFileName}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-xl hover:bg-[#511322] transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Full CV (PDF)</span>
              </a>

              <a
                href={`tel:${contact.uaePhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-[#FAF6F0]/20 text-[#FAF6F0] rounded-xl hover:bg-[#FAF6F0]/10 transition-colors tabular-nums whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#ECD4D0]" aria-hidden="true" />
                <span>{contact.uaePhone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Inquiry Composer */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSendViaEmail}
              className="bg-[#FAF6F0]/5 border border-[#FAF6F0]/12 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#FAF6F0]">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/70 mt-1">
                  Compose an inquiry to launch directly in your email client or WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#ECD4D0] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Amina Hassan"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#23191B] border border-[#FAF6F0]/20 text-[#FAF6F0] placeholder:text-[#FAF6F0]/40 focus:outline-none focus:border-[#ECD4D0]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-medium text-[#ECD4D0] mb-1.5"
                  >
                    Company / Brand
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Dubai Retail Group"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#23191B] border border-[#FAF6F0]/20 text-[#FAF6F0] placeholder:text-[#FAF6F0]/40 focus:outline-none focus:border-[#ECD4D0]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#ECD4D0] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, interview availability, or project scope..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#23191B] border border-[#FAF6F0]/20 text-[#FAF6F0] placeholder:text-[#FAF6F0]/40 focus:outline-none focus:border-[#ECD4D0]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#FAF6F0] text-[#23191B] rounded-lg hover:bg-[#F6E6E4] transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 text-[#6B1D2F]" aria-hidden="true" />
                  <span>Send via Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-lg hover:bg-[#511322] transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Message on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Quiet Footer Bottom Row */}
        <div className="mt-14 pt-8 border-t border-[#FAF6F0]/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF6F0]/65">
          <p>
            © {new Date().getFullYear()} {contact.fullName} · {contact.title} ·{' '}
            {contact.city}
          </p>

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ECD4D0] hover:text-[#FAF6F0] transition-colors"
          >
            <PencilLine className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Edit Portfolio Content</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
