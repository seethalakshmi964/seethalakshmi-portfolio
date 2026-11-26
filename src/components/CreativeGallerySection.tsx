import { ChangeEvent, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Film, Image as ImageIcon, Plus, Upload, X } from 'lucide-react';
import { GalleryAsset, GalleryCategory, ProjectCategory } from '../types/portfolio';
import { readFileForPreview } from '../utils/mediaUpload';

interface CreativeGallerySectionProps {
  gallery: GalleryAsset[];
  onUpdateAssetMedia: (
    id: string,
    mediaUrl: string,
    mediaType: 'image' | 'video'
  ) => void;
  onAddGalleryAsset: (asset: GalleryAsset) => void;
}

const CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
  'Posters',
  'Promotional Videos',
  'Reels',
  'AI Creatives',
  'Campaign Screenshots',
];

const INITIAL_VISIBLE_COUNT = 12;

export default function CreativeGallerySection({
  gallery,
  onUpdateAssetMedia,
  onAddGalleryAsset,
}: CreativeGallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryCategory>('All');
  const [typeFilter, setTypeFilter] = useState<'all' | ProjectCategory>('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxAssetId, setLightboxAssetId] = useState<string | null>(null);
  const [targetReplaceId, setTargetReplaceId] = useState<string | null>(null);

  const replaceInputRef = useRef<HTMLInputElement>(null);
  const newAssetInputRef = useRef<HTMLInputElement>(null);

  const [newAssetCategory, setNewAssetCategory] =
    useState<GalleryCategory>('Posters');

  const filteredGallery = gallery.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesType =
      typeFilter === 'all' || item.projectType === typeFilter;
    return matchesCategory && matchesType;
  });

  const visibleGallery = showAll
    ? filteredGallery
    : filteredGallery.slice(0, INITIAL_VISIBLE_COUNT);

  const lightboxAsset =
    gallery.find((item) => item.id === lightboxAssetId) ?? null;

  const triggerReplaceUpload = (assetId: string) => {
    setTargetReplaceId(assetId);
    replaceInputRef.current?.click();
  };

  const handleReplaceFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetReplaceId) return;
    const { url, mediaType } = await readFileForPreview(file);
    onUpdateAssetMedia(targetReplaceId, url, mediaType);
    setTargetReplaceId(null);
    e.target.value = '';
  };

  const handleAddNewFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    for (const file of files) {
      const { url, mediaType } = await readFileForPreview(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const newAsset: GalleryAsset = {
        id: `gal-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: cleanName || 'Uploaded Creative',
        category: newAssetCategory,
        projectType: 'client',
        collectionLabel: 'Custom Upload',
        description: `Uploaded ${newAssetCategory.toLowerCase()} preview.`,
        tools: mediaType === 'video' ? ['CapCut'] : ['Canva'],
        aspectRatio:
          newAssetCategory === 'Reels'
            ? '9:16'
            : newAssetCategory === 'Posters'
            ? '3:4'
            : '16:9',
        mediaUrl: url,
        mediaType,
        createdNote: 'Uploaded asset',
      };
      onAddGalleryAsset(newAsset);
    }

    e.target.value = '';
  };

  const getAspectClass = (ratio: GalleryAsset['aspectRatio']) => {
    switch (ratio) {
      case '9:16':
        return 'aspect-[9/14]';
      case '3:4':
        return 'aspect-[3/4]';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      default:
        return 'aspect-[16/10]';
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 border-b border-[#6B1D2F]/12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#6B1D2F] mb-2">
              Creative Gallery · {gallery.length} Assets
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191B] text-balance">
              Posters, Promotional Videos, Reels, AI Creatives & Screenshots
            </h2>
            <p className="text-sm sm:text-base text-[#6E5A5E] mt-3 leading-relaxed">
              Browse client campaigns (SR Mobiles, Surya&apos;s Craft Shop, SK Dreams Studioz)
              alongside sample creatives (Dubai Real Estate, Salon, Café, Travels) and AI
              promotional videos. Click any piece to preview full-screen.
            </p>
          </div>

          {/* Direct Media Upload Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F3ECE2] p-2 rounded-xl border border-[#6B1D2F]/12 self-start lg:self-auto">
            <label htmlFor="new-asset-category" className="sr-only">
              Category for new upload
            </label>
            <select
              id="new-asset-category"
              value={newAssetCategory}
              onChange={(e) => setNewAssetCategory(e.target.value as GalleryCategory)}
              className="px-3 py-2 text-xs font-medium bg-[#FFFDF9] text-[#23191B] border border-[#6B1D2F]/15 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F]"
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => newAssetInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-lg hover:bg-[#511322] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add Poster / Video</span>
            </button>
            <input
              ref={newAssetInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleAddNewFiles}
              className="hidden"
              aria-label="Upload new creative gallery assets"
            />
          </div>
        </div>

        {/* Category Filter Tabs + Client/Sample Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filter creative gallery by format"
            className="flex items-center gap-1.5 p-1.5 bg-[#F3ECE2] rounded-xl overflow-x-auto"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F] ${
                  activeCategory === category
                    ? 'bg-[#6B1D2F] text-[#FAF6F0]'
                    : 'text-[#6E5A5E] hover:text-[#23191B] hover:bg-[#FAF6F0]/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div
            role="group"
            aria-label="Filter creative gallery by source"
            className="inline-flex items-center gap-1 p-1 bg-[#F3ECE2] rounded-xl self-start md:self-auto"
          >
            {(
              [
                { id: 'all', label: 'All Work' },
                { id: 'client', label: 'Client Work' },
                { id: 'sample', label: 'Sample & AI' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setTypeFilter(opt.id);
                  setShowAll(false);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  typeFilter === opt.id
                    ? 'bg-[#FFFDF9] text-[#6B1D2F] shadow-xs'
                    : 'text-[#6E5A5E] hover:text-[#23191B]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hidden input for replacing individual slot media */}
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleReplaceFile}
          className="hidden"
          aria-label="Upload media for gallery slot"
        />

        {/* Responsive Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {visibleGallery.map((asset, index) => (
            <motion.article
              key={asset.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.35,
                delay: Math.min(index, 6) * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#FFFDF9] border border-[#6B1D2F]/12 rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Media Preview Frame */}
              <div
                className={`relative w-full ${getAspectClass(
                  asset.aspectRatio
                )} bg-[#F6E6E4]/65 border-b border-[#6B1D2F]/10 overflow-hidden`}
              >
                {asset.mediaUrl ? (
                  asset.mediaType === 'video' ? (
                    <video
                      src={asset.mediaUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover bg-[#23191B]"
                    />
                  ) : (
                    <img
                      src={asset.mediaUrl}
                      alt={asset.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                      onClick={() => setLightboxAssetId(asset.id)}
                    />
                  )
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#F6E6E4] via-[#FAF6F0] to-[#F3ECE2]">
                    <div className="flex items-center justify-between text-xs text-[#6E5A5E]">
                      <span>{asset.category}</span>
                      {asset.mediaType === 'video' ? (
                        <Film className="w-4 h-4 text-[#6B1D2F]" aria-hidden="true" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-[#6B1D2F]" aria-hidden="true" />
                      )}
                    </div>

                    <div className="text-center my-auto py-4">
                      <p className="font-serif text-xl font-semibold text-[#23191B] mb-2">
                        {asset.title}
                      </p>
                      <p className="text-xs text-[#6E5A5E] max-w-xs mx-auto leading-relaxed">
                        {asset.createdNote}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => triggerReplaceUpload(asset.id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium bg-[#FFFDF9] text-[#6B1D2F] border border-[#6B1D2F]/25 rounded-lg hover:bg-[#6B1D2F] hover:text-[#FAF6F0] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Upload {asset.mediaType === 'video' ? 'Video' : 'Image'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Metadata Footer */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 text-xs text-[#6E5A5E]">
                  <span className="truncate">
                    {asset.category} ·{' '}
                    <span className={asset.projectType === 'client' ? 'text-[#6B1D2F] font-medium' : ''}>
                      {asset.projectType === 'client' ? 'Client Work' : 'Sample'}
                    </span>
                    {asset.collectionLabel ? ` · ${asset.collectionLabel}` : ''}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#23191B]">
                  {asset.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6E5A5E] leading-relaxed">
                  {asset.description}
                </p>

                <div className="pt-3 border-t border-[#6B1D2F]/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#6E5A5E] truncate">
                    {asset.tools.join(' · ')}
                  </span>

                  <button
                    type="button"
                    onClick={() => setLightboxAssetId(asset.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B1D2F] hover:text-[#511322] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Expand / Collapse All Assets */}
        {filteredGallery.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#FFFDF9] text-[#6B1D2F] border border-[#6B1D2F]/25 rounded-xl hover:bg-[#6B1D2F] hover:text-[#FAF6F0] transition-colors"
            >
              <span>
                {showAll
                  ? 'Show Fewer Creatives'
                  : `View All ${filteredGallery.length} Creatives`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Image & Video Preview */}
      {lightboxAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-[#23191B]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxAssetId(null)}
        >
          <div
            className="bg-[#FAF6F0] border border-[#6B1D2F]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#6B1D2F]/12 mb-6">
              <div>
                <p className="text-xs font-medium text-[#6B1D2F] mb-1">
                  {lightboxAsset.category} ·{' '}
                  {lightboxAsset.projectType === 'client' ? 'Client Work' : 'Sample Creative'}
                  {lightboxAsset.collectionLabel ? ` · ${lightboxAsset.collectionLabel}` : ''}
                </p>
                <h3
                  id="lightbox-title"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191B]"
                >
                  {lightboxAsset.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxAssetId(null)}
                aria-label="Close preview"
                className="w-10 h-10 rounded-lg border border-[#6B1D2F]/15 flex items-center justify-center text-[#23191B] hover:bg-[#F6E6E4] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-[#23191B]/5 border border-[#6B1D2F]/12 mb-6 flex items-center justify-center min-h-[280px]">
              {lightboxAsset.mediaUrl ? (
                lightboxAsset.mediaType === 'video' ? (
                  <video
                    src={lightboxAsset.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[62vh] bg-[#23191B]"
                  />
                ) : (
                  <img
                    src={lightboxAsset.mediaUrl}
                    alt={lightboxAsset.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[62vh] w-auto object-contain"
                  />
                )
              ) : (
                <div className="p-10 text-center space-y-4">
                  <p className="font-serif text-2xl text-[#23191B]">
                    No media uploaded to this slot yet
                  </p>
                  <button
                    type="button"
                    onClick={() => triggerReplaceUpload(lightboxAsset.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#6B1D2F] text-[#FAF6F0] rounded-lg hover:bg-[#511322] transition-colors"
                  >
                    <Upload className="w-4 h-4" aria-hidden="true" />
                    <span>Upload Media Now</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-[#6E5A5E]">
              <p>{lightboxAsset.description}</p>
              <div className="flex items-center gap-4 shrink-0">
                <p className="text-xs font-medium text-[#23191B] whitespace-nowrap">
                  Tools: {lightboxAsset.tools.join(' · ')}
                </p>
                <button
                  type="button"
                  onClick={() => triggerReplaceUpload(lightboxAsset.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B1D2F] hover:underline whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Replace</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
