import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/sections/ParticleBackground";
import { NAV_KEYS } from "@/lib/constants";
import ProgressBar from "@/components/ui/ProgressBar";

const PortfolioPage = () => {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <ProgressBar />
        <Hero />
        {NAV_KEYS.map((id) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-nav min-h-[40vh] border-t border-border-subtle px-6 py-24"
            aria-label={id}
          />
        ))}
      </main>
    </>
  );
};

export default PortfolioPage;
