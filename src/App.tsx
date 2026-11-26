import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import DisciplinesSection from './components/DisciplinesSection';
import ProjectsSection from './components/ProjectsSection';
import CreativeGallerySection from './components/CreativeGallerySection';
import CredentialsSection from './components/CredentialsSection';
import ContactSection from './components/ContactSection';
import EditorDrawer from './components/EditorDrawer';
import { DEFAULT_PORTFOLIO_DATA } from './data/portfolioData';
import { DisciplineId, GalleryAsset, PortfolioData } from './types/portfolio';

const STORAGE_KEY = 'seetha_dm_portfolio_v2';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as PortfolioData;
      }
    } catch {
      // Fallback to CV defaults if storage is unavailable
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch {
      // Ignore quota exceeded if large local images were added
    }
  }, [portfolioData]);

  const handleUpdatePortrait = (portraitUrl: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      hero: { ...prev.hero, portraitUrl },
    }));
  };

  const handleUpdateDisciplineMedia = (id: DisciplineId, sampleMediaUrl: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      disciplines: prev.disciplines.map((d) =>
        d.id === id ? { ...d, sampleMediaUrl } : d
      ),
    }));
  };

  const handleUpdateProjectMedia = (
    projectId: string,
    mediaUrl: string,
    mediaType: 'image' | 'video'
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, mediaUrl, mediaType } : p
      ),
    }));
  };

  const handleUpdateGalleryMedia = (
    assetId: string,
    mediaUrl: string,
    mediaType: 'image' | 'video'
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) =>
        g.id === assetId ? { ...g, mediaUrl, mediaType } : g
      ),
    }));
  };

  const handleAddGalleryAsset = (asset: GalleryAsset) => {
    setPortfolioData((prev) => ({
      ...prev,
      gallery: [asset, ...prev.gallery],
    }));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAF6F0] text-[#23191B] flex flex-col">
        <Navbar contact={portfolioData.contact} />

        <main className="flex-1">
          <Hero
            hero={portfolioData.hero}
            contact={portfolioData.contact}
            onOpenEditor={() => setIsEditorOpen(true)}
            onUpdatePortrait={handleUpdatePortrait}
          />

          <AboutSection about={portfolioData.about} />

          <SkillsSection categories={portfolioData.skillCategories} />

          <DisciplinesSection
            disciplines={portfolioData.disciplines}
            onUpdateDisciplineMedia={handleUpdateDisciplineMedia}
          />

          <ProjectsSection
            projects={portfolioData.projects}
            onUpdateProjectMedia={handleUpdateProjectMedia}
          />

          <CreativeGallerySection
            gallery={portfolioData.gallery}
            onUpdateAssetMedia={handleUpdateGalleryMedia}
            onAddGalleryAsset={handleAddGalleryAsset}
          />

          <CredentialsSection
            certifications={portfolioData.certifications}
            education={portfolioData.education}
          />
        </main>

        <ContactSection
          contact={portfolioData.contact}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <EditorDrawer
          isOpen={isEditorOpen}
          data={portfolioData}
          onClose={() => setIsEditorOpen(false)}
          onChangeData={setPortfolioData}
          onResetDefaults={handleResetDefaults}
        />
      </div>
    </MotionConfig>
  );
}
