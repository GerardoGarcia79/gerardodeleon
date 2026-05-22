import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { NAV_KEYS } from "@/lib/nav";

const PortfolioPage = () => {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
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
