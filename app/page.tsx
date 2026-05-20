import Hero from "@/components/Hero";
import ParticleBackground from "@/components/ParticleBackground";

const PortfolioPage = () => {
  return (
    <>
      <ParticleBackground />
      <main>
        <Hero />
        <div className="min-h-screen">Hello World</div>
      </main>
    </>
  );
};

export default PortfolioPage;
